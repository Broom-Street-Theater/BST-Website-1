namespace BST.Admin {

    export interface IShowFormElems extends IViewElements {
        base: HTMLElement;
        title: HTMLElement;
        select: HTMLSelectElement;
    }

    /**...........................................................................
     * @class ShowForm
     * ...........................................................................
     * Allows details about a show to be added or edited
     * @version 1.0
     * @author  Kip Price
     * ...........................................................................
     */
    export class ShowForm extends View {

        /** the elements for this form */
        protected _elems: IShowFormElems;

        /** backing data of seasons info */
        protected _seasons: ISeasons;

        /** keep track of what show we have currently loaded */
        protected _loadedShowID: string;

        /** keep track of whether we can make updates to the show's ID */
        protected _unsavedID: boolean = true;

        /** create the actual form that will collect data */
        protected _form: KIP.Forms.Form<IShowData>;
        public get form(): KIP.Forms.Form<IShowData> { return this._form; }

        /** style some elements for this form */
        protected static _uncoloredStyles : KIP.Styles.IStandardStyles = {
            ".adminShowForm": {
                marginTop: "3em"
            },

            ".adminShowForm .showSelect": {
                display: "flex",
                justifyContent: "center"
            },

            ".adminShowForm .showSelect #showSelector": {
                fontSize: "1.2em",
                width: "50%",
                marginBottom: "10px",
                marginTop: "10px",
                fontFamily: "OpenSansLight"
            }
        }

        protected _shouldSkipCreateElements(): boolean { return true; }

        /**...........................................................................
         * Creates a show form
         * @param   seasons     The current backing data for this form
         * ........................................................................... 
         */
        constructor(seasons: ISeasons) {
            super({cls: "adminShowForm"});
            this._seasons = seasons;
            this._createElements();
        }

        //#region ADD THE APPROPRIATE TITLE

        /**...........................................................................
         * _createTitle
         * ...........................................................................
         * Create the title element for the form
         * ...........................................................................
         */
        protected _createTitle() {
            this._elems.title = KIP.createElement({ 
                cls: "title", 
                content: "Editing Show"
            });
        }

        /**...........................................................................
         * _createSelectElement
         * ...........................................................................
         * create the element to select  
         * @returns The created select element
         * ...........................................................................
         */
        protected _createSelectElement(): HTMLSelectElement {
            let selectContainer: HTMLElement = KIP.createElement({
                id: "adminDetails",
                cls: "showSelect",
                parent: this._elems.base
            });

            // Otherwise return a newly created select field
            this._elems.select = KIP.createElement({
                type: "select",
                id: "showSelector",
                parent: selectContainer
            }) as HTMLSelectElement;

            return this._elems.select;
        }
        //#endregion

        //#region POPULATE THE DROPDOWN

        /**...........................................................................
         * _updateSelectForSeasons
         * ...........................................................................
         * Update our select field when the seasons data changes
         * ...........................................................................
         */
        protected _updateSelectForSeasons(): void {
            let selectElem: HTMLSelectElement = this._elems.select;

            // Clear out the last contents of the select field
            selectElem.innerHTML = "<option value='new'>-- Add a New Show --</option>";

            // loop through all shows in the season
            let idx: number;
            this._seasons = Helpers.sortSeasons(this._seasons);
            for (idx = 0; idx < this._seasons.length; idx += 1) {
                let miniShow = this._seasons[idx];
                let year: string = new Date(miniShow.endDate).getFullYear().toString();

                // create the option element for this show
                let option: HTMLOptionElement = KIP.createElement({
                    type: "option",
                    attr: { value: miniShow.id },
                    content: year + " - " + miniShow.name,
                    parent: selectElem
                }) as HTMLOptionElement;

            }
        }
        //#endregion

        //#region LOADING AND SAVING DATA

        /**...........................................................................
         * _loadShowData
         * ...........................................................................
         * Load data about the show
         * @param   showID  The show to load data for 
         * ...........................................................................
         */
        protected _loadShowData(showID: string): void {
            if (showID === "new") {
                this._form.clear();
                this._unsavedID = true;
            } else {
                Server.loadShow(showID, (show: IShowData) => {
                    this._loadedShowID = showID;
                    this._unsavedID = false;

                    // update the form details
                    this._form.clear();
                    this._form.update(show);
                });
            }
        }

        /**...........................................................................
         * _adminSaveShow
         * ...........................................................................
         * Make sure we can save our show
         * 
         * @param   show    The show to save
         * ........................................................................... 
         */
        protected _adminSaveShow(show: IShowData): void {
            let run: IRun = Helpers.getShowStartAndEndDates(show);

            // save the show
            Server.saveShow(show, (data: any) => {
                
                // show a toast that we were successful
                let toast = new KIP.ToastPopup((show.showTitle.title || "Show") + " successfully saved!");
                toast.setThemeColor(0, "#EA0");
                toast.draw(document.body);

                let miniShow: IMiniShow = {
                    endDate: KIP.Dates.shortDate(run.end),
                    id: show.showTitle.id,
                    name: show.showTitle.title + (show.showTitle.subtitle ? ": " + show.showTitle.subtitle : ""),
                    icon: show.showTitle.icon
                };

                this._addShowToSeason(miniShow);
                Server.saveSeasons(this._seasons, (savedSeasons: ISeasons) => {
                    this._seasons = savedSeasons;
                    this._updateSelectForSeasons();
                    if (this._elems.select.value !== show.showTitle.id) {
                        this._elems.select.value = show.showTitle.id;
                    }
                });
            });
        }
        //#endregion

        //#region HANDLE CREATING A UNIQUE SHOW ID

        /**...........................................................................
         * _turnDatesToShowID
         * ...........................................................................
         * Create a show ID from the run dates
         * 
         * @param   dates   The dates to turn into an ID
         * ...........................................................................
         */
        protected _turnDatesToShowID(dates: Date[]): string {
            let minDate: Date;
            dates.sort();
            minDate = dates[0];

            return minDate.getFullYear().toString();
        }

        /**...........................................................................
         * _turnNameToShowID
         * ...........................................................................
         * Create a show ID from the show name / subtitle
         * 
         * @param   name    The show name to turn into an ID
         * ...........................................................................
         */
        protected _turnNameToShowID(name: string): string {
            let safeStr: string = name.replace(/[^a-zA-Z0-9]/g, "");
            return safeStr;
        }
        //#endregion



        //#region ADJUST SEASONS

        /**...........................................................................
         * _addShowToSeason
         * ...........................................................................
         * Make sure to update our seasons with this new show
         * 
         * @param   showDeets   Details about the show to add
         * ...........................................................................
         */
        protected _addShowToSeason(showDeets: IMiniShow): boolean {

            let idx: number = 0;
            for (idx; idx < this._seasons.length; idx += 1) {
                let elem: IMiniShow = this._seasons[idx];
                if ((elem.id === showDeets.id) || (elem.name === showDeets.name)) {
                    this._seasons[idx] = showDeets;
                    return true;
                }
            };

            this._seasons.push(showDeets);
            return true;
        }


        //#endregion

        //#region ACTUALLY CREATE THE FORM

        /**...........................................................................
         * _createElements
         * ...........................................................................
         * create all of the elements we need for this show form 
         * ...........................................................................
         */
        protected _createElements(): void {
            this._createTitle();
            this._createSelectElement();
            this._updateSelectForSeasons();
            this._createForm();

            KIP.Events.addEventListener(KIP.Forms.FORM_ELEM_CHANGE, {
                func: (event: KIP.Events.Event) => {
                    if (event.context.key !== "id") { return; }
                    this._loadedShowID = event.context.val;
                }
            });
        }

        /**...........................................................................
         * _createForm
         * ...........................................................................
         * create the show editing form 
         * ...........................................................................
         */
        protected _createForm(): void {
            let showForm: KIP.Forms.Form<IShowData> = new KIP.Forms.Form<IShowData>(
                "showForm",
                {
                    colors: ["#EA0", "#555"],
                    label: "Show Details"
                },
                {
                    showTitle: new KIP.Forms.SectionElement("showTitle", { label: "High-level show details" }, {
                        id: new KIP.Forms.HiddenElement<string>("id", {
                            onOtherChange: (key: string, val: any, formElem: KIP.Forms.FormElement<string>) => {
                                if (!this._unsavedID) { return; }
                                if ((key !== "title") && (key !== "runDates") && (key !== "subtitle")) { return; }
                                let str: string;

                                let idArr: string[] = (formElem.data || "__").split("_");

                                // Grab the appropriate sub string to change
                                if (key === "title") {
                                    str = this._turnNameToShowID(val);
                                    idArr[0] = str;
                                } else if (key === "subtitle") {
                                    str = this._turnNameToShowID(val);
                                    idArr[1] = str;
                                } else {
                                    str = this._turnDatesToShowID(val);
                                    idArr[2] = str;
                                }

                                // Fill any empty spots if needed
                                for (let i = 0; i < 3; i += 1) {
                                    if (!idArr[i]) { idArr[i] = ""; }
                                }

                                formElem.data = idArr.join("_");
                            }
                        }),
                        title: new KIP.Forms.TextElement("title", { label: "Title of the show", required: true }),
                        subtitle: new KIP.Forms.TextElement("subtitle", { label: "Subtitle of the show (optional)" }),
                        writer: new KIP.Forms.TextElement("writer", { label: "Writer of the show" }),
                        director: new KIP.Forms.TextElement("director", { label: "Director of the show" }),
                        icon: new BSTPhotoPathElement("icon", {
                            label: "Icon",
                            onChange: (files: FileList) => {
                                let filePath: string = "img/shows/" + this._loadedShowID + "/icons/" + files[0].name;
                                return filePath;
                            },
                            onSave: (files: FileList) => {
                                Server.saveIconPhoto(files[0], this._loadedShowID, (success: string) => {
                                    if (success !== "1") { return; }
                                });
                            }
                        }),
                        bptLink: new KIP.Forms.TextElement("link", { label: "Brown Paper Ticket event ID" }) 
                    }),

                    showDetails: new KIP.Forms.SectionElement("showDetails", { label: "Deeper show details" }, {
                        synopsis: new KIP.Forms.TextAreaElement("synopsis", { label: "Show synopsis" }),
                        warnings: new KIP.Forms.TextElement("warnings", { label: "What warnings should be displayed for the show?" }),

                        showLength: new KIP.Forms.NumberElement("showLength", { label: "Length of show" }),
                        hasIntermission: new KIP.Forms.CheckElement("hasIntermission", { label: "Does the show have an intermission?" }),
                        isKidFriendly: new KIP.Forms.CheckElement("isKidFriendly", { label: "Is the show kid friendly?" })
                    }),

                    runDates: new KIP.Forms.ArrayElement<Date>("runDates", { label: "Dates", newLabel: "+ New Date" }, new DateSelector("showdate", { label: "Run date" })),

                    bios: new KIP.Forms.ArrayElement<IBioData>("bios", { label: "Cast + Crew Bios", newLabel: "+ New Bio" }, {
                        imageURL: new BSTPhotoPathElement("imageURL", {
                            label: "Photo of cast / crew member",
                            onChange: (files: FileList) => {
                                let filePath: string = "img/actors/" + files[0].name;
                                return filePath;
                            },
                            onSave: (files: FileList) => {
                                Server.saveActorPhoto(files[0], (success: string) => {
                                    if (success !== "1") { return; }
                                });
                                return;
                            }
                        }),
                        actorName: new KIP.Forms.TextElement("actorName", { label: "Person Name" }),
                        roleName: new KIP.Forms.TextElement("roleName", { label: "Role Name" }),
                        bio: new KIP.Forms.TextAreaElement("bio", { label: "Bio" }),
                        website: new KIP.Forms.TextElement("website", { label: "Person's website" }),
                        type: new KIP.Forms.SingleSelectButtonElem("bioType", { label: "Type", options: [
                            {value: CastOrCrew.CAST, label: "Cast"},
                            {value: CastOrCrew.CREW, label: "Crew"},
                            {value: CastOrCrew.SPECIAL_MENTION, label: "Special Mention"}
                        ] })
                    }),

                    reviews: new KIP.Forms.ArrayElement<IReviewData>("reviews", { label: "Reviews", newLabel: "+ New Review" }, {
                        reviewer: new KIP.Forms.TextElement("reviewer", { label: "Reviewer" }),
                        date: new KIP.Forms.DateElement("reviewDate", { label: "Date of review" }),
                        link: new KIP.Forms.TextElement("link", { label: "Link to review" }),
                        review: new KIP.Forms.TextAreaElement("review", { label: "Review Text" })
                    }),

                    photos: new KIP.Forms.ArrayElement<IPhoto>("photos", { label: "Photos", newLabel: "+ New Photo" }, {
                        url: new BSTPhotoPathElement("photoURL", {
                            label: "URL",
                            onChange: (files: FileList) => {
                                let filePath: string = "img/shows/" + this._loadedShowID + "/photos/" + files[0].name;
                                return filePath;
                            },

                            onSave: (files: FileList) => {
                                Server.saveShowPhoto(files[0], this._loadedShowID, (success: string) => {
                                    if (success !== "1") { return; }
                                });
                                return;
                            }
                        }),
                        photographer: new KIP.Forms.TextElement("photographer", { label: "Photographer / Artist" }),
                        copyrightText: new KIP.Forms.TextElement("copyright", { label: "Copyright info" }),
                        isPoster: new KIP.Forms.CheckElement("isPoster", { label: "Is this a poster for the show?" }),
                        isHilite: new KIP.Forms.CheckElement("isHilite", { label: "Is this the photo that should show for the show on the homepage?" })
                    }),

                    auditions: new KIP.Forms.SectionElement<IAuditionInfo>("auditions", { label: "Audition Info" }, {
                        dates: new KIP.Forms.ArrayElement<IAuditionDate>("auditionDates", { label: "Audition Dates", required: true }, {
                            start: new KIP.Forms.DateTimeElement("auditionStart", { label: "Audition start" }),
                            end: new KIP.Forms.TimeElement("auditionEnd", { label: "Audition End" }),
                            location: new KIP.Forms.SectionElement<IAddress>("location", { label: "Audition Location" }, {
                                name: new KIP.Forms.TextElement("addressName", { label: "Audition Location Name" }),
                                addressLines: new KIP.Forms.TextAreaElement("adressLines", { label: "Address" }),
                                city: new KIP.Forms.TextElement("addressCity", { label: "City" }),
                                state: new KIP.Forms.TextElement("addressState", { label: "State" }),
                                zip: new KIP.Forms.NumberElement("zip", { label: "Zip Code" })
                            }),
                        }),

                        characters: new KIP.Forms.ArrayElement<ICharacter>("characters", { label: "Characters being auditioned", newLabel: "+ New Audition Character" }, {
                            name: new KIP.Forms.TextElement("characterName", { label: "Character Name" }),
                            description: new KIP.Forms.TextAreaElement("characterDescription", { label: "Description" }),
                            gender: new KIP.Forms.SingleSelectButtonElem<IGenderEnum>("gender", {
                                label: "Gender",
                                options: [
                                    { label: "No Preference", value: IGenderEnum.NO_PREFERENCE },
                                    { label: "Female", value: IGenderEnum.FEMALE },
                                    { label: "Male", value: IGenderEnum.MALE },
                                    { label: "Non-Binary", value: IGenderEnum.NON_BINARY }
                                ]
                            }),
                            minAge: new KIP.Forms.NumberElement("minAge", { label: "Age (low)" }),
                            maxAge: new KIP.Forms.NumberElement("maxAge", { label: "Age (high)" })
                        }),

                        expectations: new KIP.Forms.MultiSelectButtonElem<AuditionExpectationType>("expectations", {
                            label: "Audition expectations",
                            options: [
                                { value: AuditionExpectationType.MONOLOGUE, label: "Monologue" },
                                { value: AuditionExpectationType.COLD_READ, label: "Cold Read" },
                                { value: AuditionExpectationType.DANCE_CALL, label: "Dance call" },
                                { value: AuditionExpectationType.SINGING, label: "Singing" },
                                { value: AuditionExpectationType.IMPROV, label: "Improv" }
                            ]
                        }),
                        contactInfo: new KIP.Forms.TextElement("contactInfo", { label: "Who is the point of contact?" }),
                        reservationLink: new KIP.Forms.TextElement("reservationLink", { label: "Link to reserve a spot" })
                    })
                }
            );

            // make sure we can detect the form saving
            showForm.registerSaveListener((data: IShowData) => {
                this._adminSaveShow(data);
            });

            // show the form
            showForm.draw(this._elems.base);

            this._elems.select.addEventListener("change", () => {
                this._loadShowData(this._elems.select.value);
            });

            this._form = showForm;
        }
        //#endregion

        public update(seasons: ISeasons): void {
            this._seasons = seasons;
            this._updateSelectForSeasons();
            this._form.clear();
        }

    }

    export class BSTPhotoPathElement extends KIP.Forms.PhotoPathElement {
        public update(data: string): void {
            super.update(data);
            if (!data) { return; }
            if (data.indexOf("http") === -1) {
                this._elems.display.src = "../" + data;
            }
        }

        protected _createClonedElement(appendToID: string): BSTPhotoPathElement {
            return new BSTPhotoPathElement(this.id + appendToID, this);
        }
    }
}
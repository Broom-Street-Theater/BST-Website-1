namespace BST.Admin {

    export class HomeForm extends View {

        protected _data: IHomeData;

        protected _form: KIP.Forms.Form<IHomeData>;
        public get form(): KIP.Forms.Form<IHomeData> { return this._form; }

        constructor(homeData?: IHomeData) {
            super({ cls: "adminHomeForm" });
            this._data = homeData;
            this._createElements();
        }

        //#region INITIALIZE THE RIGHT DISPLAY

        /**...........................................................................
         * _updateTitle
         * ...........................................................................
         * change the title of the header
         * ........................................................................... 
         */
        protected _createTitle() {
            this._elems.title = KIP.createElement({
                cls: "title",
                content: "Editing BST Home",
                parent: this._elems.base
            });
        }
        //#endregion

        /**...........................................................................
         * initializeHomeForm
         * ...........................................................................
         * Create the form that an editor will use to edit the home details of the
         * BST website
         * ...........................................................................
         */
        protected _createElements(): void {

            // Make sure the page reflects the right title
            this._createTitle();

            // also create the form for the page
            this._createForm();
        }

        /**...........................................................................
         * _createForm
         * ...........................................................................
         * Create the form to change data about the home screen
         * ...........................................................................
         */
        protected _createForm(): void {
            // Form to collect info about the home screen
            this._form = new KIP.Forms.Form<IHomeData>(
                "home",
                {
                    label: "BST Home",
                    colors: ["#EA0", "#555"]
                },
                {
                    about: new KIP.Forms.SectionElement<IAboutData>("about", { label: "About Broom Street" }, {
                        general: new KIP.Forms.TextAreaElement("general", { label: "General Info" }),
                        board: new KIP.Forms.ArrayElement<ILeaderData>("board", { label: "Board Members" }, {
                            name: new KIP.Forms.TextElement("boardMember", { label: "Board Member Name" }),
                            position: new KIP.Forms.TextElement("boardPosition", { label: "Position on the board" })
                        }),
                        staff: new KIP.Forms.ArrayElement<ILeaderData>("staff", { label: "Staff Members" }, {
                            name: new KIP.Forms.TextElement("staffMember", { label: "Staff Member Name" }),
                            position: new KIP.Forms.TextElement("staffPosition", { label: "Position on staff" })
                        }),
                        bylaws: new KIP.Forms.TextAreaElement("bylaws", { label: "ByLaws" }),
                        history: new KIP.Forms.TextAreaElement("history", { label: "History of Broom Street" }),
                        detailedHistory: new KIP.Forms.ArrayElement<IEvent>("detailedHistory", { label: "Detailed History" }, {
                            date: new KIP.Forms.DateElement("detailedHxDate", { label: "Date of Event" }),
                            header: new KIP.Forms.TextElement("detailedHxTitle", { label: "Title of Event" }),
                            details: new KIP.Forms.TextAreaElement("detailedHxDetails", { label: "Details of Event" })
                        })
                    }),
                    news: new KIP.Forms.ArrayElement<INews>("news", { label: "News" }, {
                        title: new KIP.Forms.TextElement("newsTitle", { label: "Title" }),
                        content: new KIP.Forms.TextAreaElement("newsContent", { label: "Content" }),
                        author: new KIP.Forms.TextElement("newsAuthor", { label: "Author" }),
                        date: new KIP.Forms.DateTimeElement("newsDate", { label: "Date" }),
                        isImportant: new KIP.Forms.CheckElement("newsImportant", { label: "Keep on front page?" })
                    }),
                    getInvolved: new KIP.Forms.SectionElement<IGetInvolved>("getinvolved", { label: "Get Involved" }, {
                        technicians: new KIP.Forms.ArrayElement<IInvolvement>("techInvolvement", { label: "Technicians" }, {
                            icon: new BSTPhotoPathElement("involveTechIcon", {
                                label: "Icon",
                                onChange: (files: FileList) => {
                                    return this._onInvolvedPhotoChange(files);
                                },
                                onSave: (files: FileList) => {
                                    Server.saveGetInvolvedPhoto(files[0], (success: string) => {
                                        if (success !== "1") { return; }
                                    });
                                }
                            }),
                            text: new KIP.Forms.TextElement("involveTechText", { label: "Short description" }),
                            content: new KIP.Forms.TextAreaElement("involvedTechContent", { label: "Detailed Description" }),
                            contactInfo: new KIP.Forms.SectionElement("involveTechContact", { label: "Contact Info" }, {
                                name: new KIP.Forms.TextElement("involveTechContactName", { label: "Contact's name" }),
                                email: new KIP.Forms.TextElement("involveTechContactEmail", { label: "Contact E-Mail" }),
                                phone: new KIP.Forms.TextElement("involveTechContactPhone", { label: "Phone Number" })
                            })
                        }),
                        actors: new KIP.Forms.ArrayElement<IInvolvement>("actorInvolvement", { label: "Actors" }, {
                            icon: new BSTPhotoPathElement("involveActorIcon", {
                                label: "Icon",
                                onChange: (files: FileList) => {
                                    return this._onInvolvedPhotoChange(files);
                                },
                                onSave: (files: FileList) => {
                                    Server.saveGetInvolvedPhoto(files[0], (success: string) => {
                                        if (success !== "1") { return; }
                                    });
                                }
                            }),
                            text: new KIP.Forms.TextElement("involveActorText", { label: "Short description" }),
                            content: new KIP.Forms.TextAreaElement("involvedActorContent", { label: "Detailed Description" }),
                            contactInfo: new KIP.Forms.SectionElement("involveActorContact", { label: "Contact Info" }, {
                                name: new KIP.Forms.TextElement("involveActorContactName", { label: "Contact's name" }),
                                email: new KIP.Forms.TextElement("involveActorContactEmail", { label: "Contact E-Mail" }),
                                phone: new KIP.Forms.TextElement("involveActorContactPhone", { label: "Phone Number" })
                            })
                        }),
                        writers: new KIP.Forms.ArrayElement<IInvolvement>("writerInvolvement", { label: "Writers" }, {
                            icon: new BSTPhotoPathElement("involveWriterIcon", {
                                label: "Icon",
                                onChange: (files: FileList) => {
                                    return this._onInvolvedPhotoChange(files);
                                },
                                onSave: (files: FileList) => {
                                    Server.saveGetInvolvedPhoto(files[0], (success: string) => {
                                        if (success !== "1") { return; }
                                    });
                                }
                            }),
                            text: new KIP.Forms.TextElement("involveWriterText", { label: "Short description" }),
                            content: new KIP.Forms.TextAreaElement("involvedWriterContent", { label: "Detailed Description" }),
                            contactInfo: new KIP.Forms.SectionElement("involveWriterContact", { label: "Contact Info" }, {
                                name: new KIP.Forms.TextElement("involveWriterContactName", { label: "Contact's name" }),
                                email: new KIP.Forms.TextElement("involveWriterContactEmail", { label: "Contact E-Mail" }),
                                phone: new KIP.Forms.TextElement("involveWriterContactPhone", { label: "Phone Number" })
                            })
                        }),
                        directors: new KIP.Forms.ArrayElement<IInvolvement>("directorInvolvement", { label: "Directors" }, {
                            icon: new BSTPhotoPathElement("involveDirectorIcon", {
                                label: "Icon",
                                onChange: (files: FileList) => {
                                    return this._onInvolvedPhotoChange(files);
                                },
                                onSave: (files: FileList) => {
                                    Server.saveGetInvolvedPhoto(files[0], (success: string) => {
                                        if (success !== "1") { return; }
                                    });
                                }
                            }),
                            text: new KIP.Forms.TextElement("involveDirectorText", { label: "Short description" }),
                            content: new KIP.Forms.TextAreaElement("involvedDirectorContent", { label: "Detailed Description" }),
                            contactInfo: new KIP.Forms.SectionElement("involveDirectorContact", { label: "Contact Info" }, {
                                name: new KIP.Forms.TextElement("involveDirectorContactName", { label: "Contact's name" }),
                                email: new KIP.Forms.TextElement("involveDirectorContactEmail", { label: "Contact E-Mail" }),
                                phone: new KIP.Forms.TextElement("involveDirectorContactPhone", { label: "Phone Number" })
                            })
                        }),
                        general: new KIP.Forms.ArrayElement<IInvolvement>("generalInvolvement", { label: "General" }, {
                            icon: new BSTPhotoPathElement("involveGeneralIcon", {
                                label: "Icon",
                                onChange: (files: FileList) => {
                                    return this._onInvolvedPhotoChange(files);
                                },
                                onSave: (files: FileList) => {
                                    Server.saveGetInvolvedPhoto(files[0], (success: string) => {
                                        if (success !== "1") { return; }
                                    });
                                }
                            }),
                            text: new KIP.Forms.TextElement("involveGeneralText", { label: "Short description" }),
                            content: new KIP.Forms.TextAreaElement("involvedGeneralContent", { label: "Detailed Description" }),
                            contactInfo: new KIP.Forms.SectionElement("involveGeneralContact", { label: "Contact Info" }, {
                                name: new KIP.Forms.TextElement("involveGeneralContactName", { label: "Contact's name" }),
                                email: new KIP.Forms.TextElement("involveGeneralContactEmail", { label: "Contact E-Mail" }),
                                phone: new KIP.Forms.TextElement("involveGeneralContactPhone", { label: "Phone Number" })
                            })
                        }),
                    }),
                    menuItems: new KIP.Forms.ArrayElement<IMenuItem>("menus", { label: "Menu Options" }, {
                        name: new KIP.Forms.TextElement("menuName", { label: "Menu link name" }),
                        type: new KIP.Forms.SingleSelectButtonElem("menuType", {
                            label: "What type of link is this?",
                            options: [
                                { label: "External", value: MenuTypeEnum.EXTERNAL },
                                { label: "Section", value: MenuTypeEnum.SECTION }
                            ]
                        }),
                        link: new KIP.Forms.TextElement("menuLink", { label: "Where does this link go?" })
                    }),
                    logoURL: new BSTPhotoPathElement("logoURL", {
                        label: "Logo",
                        onChange: (files: FileList) => {
                            return this._onInvolvedPhotoChange(files);
                        },
                        onSave: (files: FileList) => {
                            Server.saveLogoPhoto(files[0], (success: string) => {
                                if (success !== "1") { return; }
                            });
                        }
                    }),
                    bgURL: new BSTPhotoPathElement("backgroundImg", {
                        label: "Background Image",
                        onChange: (files: FileList) => {
                            return this._onInvolvedPhotoChange(files);
                        },
                        onSave: (files: FileList) => {
                            Server.saveBgPhoto(files[0], (success: string) => {
                                if (success !== "1") { return; }
                            });
                        }
                    }),
                    resources: new KIP.Forms.ArrayElement("resources", { label: "Resources" }, {
                        name: new KIP.Forms.TextElement("resourceName", { label: "Name" }),
                        content: new KIP.Forms.TextAreaElement("resourceContent", { label: "Details" }),
                        link: new KIP.Forms.TextElement("resourceLink", { label: "Link" })
                    }),
                    donateInfo: new KIP.Forms.SectionElement("donate", { label: "Donation Info" }, {
                        blurb: new KIP.Forms.TextAreaElement("donateBlurb", { label: "Donate Blurb" }),
                        paypalAccount: new KIP.Forms.TextElement("paypalID", { label: "Paypal ID" })
                    })
                }
            );

            // show the appropriate form
            this._form.draw(this._elems.base);

            // update the form if need be
            if (this._data) {
                this._form.update(this._data);
            }

            // handle saving
            this._form.registerSaveListener((home: IHomeData) => {
                this._saveData(home);
            });
        }

        /**...........................................................................
         * _saveData
         * ...........................................................................
         * Make sure that we can actually save our data
         * 
         * @param   home    The data to actually save
         * ...........................................................................
         */
        protected _saveData(home: IHomeData): void {
            Server.saveHome(home, () => {
                let toast: KIP.ToastPopup = new KIP.ToastPopup("BST home details saved!");
                toast.setThemeColor(0, "#EA0");
                toast.draw(document.body);
            });
        }

        /**...........................................................................
         * update
         * ...........................................................................
         * Update the form
         * 
         * @param   home    the data to show in the form 
         * ...........................................................................
         */
        public update(home: IHomeData): void {
            this._form.update(home);
        }

        private _onInvolvedPhotoChange(files: FileList): string {
            let filePath: string = "img/home/bg/" + files[0].name;
            return filePath;
        }

    }
}
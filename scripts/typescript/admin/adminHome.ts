namespace BST.Admin {

    export class HomeForm extends View {

        protected _data: IHomeData;

        protected _form: KIP.Forms.Form<IHomeData>;
        public get form(): KIP.Forms.Form<IHomeData> { return this._form; } 

        constructor(homeData?: IHomeData) {
            super({cls: "adminHomeForm"});
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
    protected _createElements () : void {

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
                about: new KIP.Forms.SectionElement<IAboutData>("about", { label: "About Broom Street"}, {
                    general: new KIP.Forms.TextAreaElement("general", { label: "General Info" }),
                    board: new KIP.Forms.ArrayElement<ILeaderData>("board", { label: "Board Members" }, {
                        name: new KIP.Forms.TextElement("boardMember", { label: "Board Member Name"}),
                        position: new KIP.Forms.TextElement("boardPosition", { label: "Position on the board"})
                    }),
                    staff: new KIP.Forms.ArrayElement<ILeaderData>("staff", { label: "Staff Members" }, {
                        name: new KIP.Forms.TextElement("staffMember", { label: "Staff Member Name"}),
                        position: new KIP.Forms.TextElement("staffPosition", { label: "Position on staff"})
                    }),
                    bylaws: new KIP.Forms.TextAreaElement("bylaws", { label: "ByLaws" }),
                    history: new KIP.Forms.TextAreaElement("history", { label: "History of Broom Street"}),
                    detailedHistory: new KIP.Forms.ArrayElement<IEvent>("detailedHistory", { label: "Detailed History"}, {
                        date: new KIP.Forms.DateElement("detailedHxDate", { label: "Date of Event" }),
                        header: new KIP.Forms.TextElement("detailedHxTitle", { label: "Title of Event" }),
                        details: new KIP.Forms.TextAreaElement("detailedHxDetails", { label: "Details of Event" })
                    })
                }),
                news: new KIP.Forms.ArrayElement<INews>("news", {label: "News"}, {
                    title: new KIP.Forms.TextElement("newsTitle", {label: "Title"}),
                    content: new KIP.Forms.TextAreaElement("newsContent", { label: "Content" }),
                    author: new KIP.Forms.TextElement("newsAuthor", { label: "Author" }),
                    date: new KIP.Forms.DateTimeElement("newsDate", { label: "Date" }),
                    isImportant: new KIP.Forms.CheckElement("newsImportant", { label: "Keep on front page?" })
                }),
                getInvolved: new KIP.Forms.SectionElement<IGetInvolved>("getinvolved", {label: "Get Involved" }, {
                    technicians: new KIP.Forms.ArrayElement<IInvolvement>("techInvolvement", { label: "Technicians"}, {
                        icon: new BSTPhotoPathElement("involveIcon", {
                            label: "Icon",
                            onChange: (files: FileList) => {
                                let filePath: string = "img/home/getInvolved/" + files[0].name;
                                return filePath;
                            },
                            onSave: (files: FileList) => {
                                Server.saveGetInvolvedPhoto(files[0], (success: string) => {
                                    if (success !== "1") { return; }
                                });
                            }
                        }),
                        text: new KIP.Forms.TextElement("involveText", { label: "Short description" }),
                        content: new KIP.Forms.TextAreaElement("involvedContent", { label: "Detailed Description" }),
                        contactInfo: new KIP.Forms.SectionElement("involveContact", { label: "Contact Info"}, {
                            name: new KIP.Forms.TextElement("involveContactName", { label: "Contact's name"}),
                            email: new KIP.Forms.TextElement("involveContactEmail", { label: "Contact E-Mail"}),
                            phone: new KIP.Forms.TextElement("involveContactPhone", { label: "Phone Number"})
                        })
                    }),
                    actors: new KIP.Forms.ArrayElement<IInvolvement>("techInvolvement", { label: "Actors"}, {
                        icon: new BSTPhotoPathElement("involveIcon", {
                            label: "Icon",
                            onChange: (files: FileList) => {
                                let filePath: string = "img/home/getInvolved/" + files[0].name;
                                return filePath;
                            },
                            onSave: (files: FileList) => {
                                Server.saveGetInvolvedPhoto(files[0], (success: string) => {
                                    if (success !== "1") { return; }
                                });
                            }
                        }),
                        text: new KIP.Forms.TextElement("involveText", { label: "Short description" }),
                        content: new KIP.Forms.TextAreaElement("involvedContent", { label: "Detailed Description" }),
                        contactInfo: new KIP.Forms.SectionElement("involveContact", { label: "Contact Info"}, {
                            name: new KIP.Forms.TextElement("involveContactName", { label: "Contact's name"}),
                            email: new KIP.Forms.TextElement("involveContactEmail", { label: "Contact E-Mail"}),
                            phone: new KIP.Forms.TextElement("involveContactPhone", { label: "Phone Number"})
                        })
                    }),
                    writers: new KIP.Forms.ArrayElement<IInvolvement>("techInvolvement", { label: "Writers"}, {
                        icon: new BSTPhotoPathElement("involveIcon", {
                            label: "Icon",
                            onChange: (files: FileList) => {
                                let filePath: string = "img/home/getInvolved/" + files[0].name;
                                return filePath;
                            },
                            onSave: (files: FileList) => {
                                Server.saveGetInvolvedPhoto(files[0], (success: string) => {
                                    if (success !== "1") { return; }
                                });
                            }
                        }),
                        text: new KIP.Forms.TextElement("involveText", { label: "Short description" }),
                        content: new KIP.Forms.TextAreaElement("involvedContent", { label: "Detailed Description" }),
                        contactInfo: new KIP.Forms.SectionElement("involveContact", { label: "Contact Info"}, {
                            name: new KIP.Forms.TextElement("involveContactName", { label: "Contact's name"}),
                            email: new KIP.Forms.TextElement("involveContactEmail", { label: "Contact E-Mail"}),
                            phone: new KIP.Forms.TextElement("involveContactPhone", { label: "Phone Number"})
                        })
                    }),
                    directors: new KIP.Forms.ArrayElement<IInvolvement>("techInvolvement", { label: "Directors"}, {
                        icon: new BSTPhotoPathElement("involveIcon", {
                            label: "Icon",
                            onChange: (files: FileList) => {
                                let filePath: string = "img/home/getInvolved/" + files[0].name;
                                return filePath;
                            },
                            onSave: (files: FileList) => {
                                Server.saveGetInvolvedPhoto(files[0], (success: string) => {
                                    if (success !== "1") { return; }
                                });
                            }
                        }),
                        text: new KIP.Forms.TextElement("involveText", { label: "Short description" }),
                        content: new KIP.Forms.TextAreaElement("involvedContent", { label: "Detailed Description" }),
                        contactInfo: new KIP.Forms.SectionElement("involveContact", { label: "Contact Info"}, {
                            name: new KIP.Forms.TextElement("involveContactName", { label: "Contact's name"}),
                            email: new KIP.Forms.TextElement("involveContactEmail", { label: "Contact E-Mail"}),
                            phone: new KIP.Forms.TextElement("involveContactPhone", { label: "Phone Number"})
                        })
                    }),
                    general: new KIP.Forms.ArrayElement<IInvolvement>("techInvolvement", { label: "General"}, {
                        icon: new BSTPhotoPathElement("involveIcon", {
                            label: "Icon",
                            onChange: (files: FileList) => {
                                let filePath: string = "img/home/getInvolved/" + files[0].name;
                                return filePath;
                            },
                            onSave: (files: FileList) => {
                                Server.saveGetInvolvedPhoto(files[0], (success: string) => {
                                    if (success !== "1") { return; }
                                });
                            }
                        }),
                        text: new KIP.Forms.TextElement("involveText", { label: "Short description" }),
                        content: new KIP.Forms.TextAreaElement("involvedContent", { label: "Detailed Description" }),
                        contactInfo: new KIP.Forms.SectionElement("involveContact", { label: "Contact Info"}, {
                            name: new KIP.Forms.TextElement("involveContactName", { label: "Contact's name"}),
                            email: new KIP.Forms.TextElement("involveContactEmail", { label: "Contact E-Mail"}),
                            phone: new KIP.Forms.TextElement("involveContactPhone", { label: "Phone Number"})
                        })
                    }),
                }),
                menuItems: new KIP.Forms.ArrayElement<IMenuItem>("menus", { label: "Menu Options"}, {
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
                        let filePath: string = "img/home/logo/" + files[0].name;
                        return filePath;
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
                        let filePath: string = "img/home/bg/" + files[0].name;
                        return filePath;
                    },
                    onSave: (files: FileList) => {
                        Server.saveBgPhoto(files[0], (success: string) => {
                            if (success !== "1") { return; }
                        });
                    }
                }),
                resources: new KIP.Forms.ArrayElement("resources", { label: "Resources" }, {
                    name: new KIP.Forms.TextElement("resourceName", { label: "Name" }),
                    content: new KIP.Forms.TextAreaElement("resourceContent", { label: "Details"}),
                    link: new KIP.Forms.TextElement("resourceLink", { label: "Link" })
                }),
                donateInfo: new KIP.Forms.SectionElement("donate", { label: "Donation Info"}, {
                    blurb: new KIP.Forms.TextAreaElement("donateBlurb", { label: "Donate Blurb"}),
                    paypalAccount: new KIP.Forms.TextElement("paypalID", { label: "Paypal ID"})
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


}
}
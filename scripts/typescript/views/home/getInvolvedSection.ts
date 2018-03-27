namespace BST {

    /**...........................................................................
     * @class GetInvolvedSection
     * ...........................................................................
     * Create the section that details how people can get involved with the 
     * theater.
     * @version 1.0
     * ...........................................................................
     */
    export class GetInvolvedSection extends SectionView {

        //#region PROPERTIES

        /** keep track of the data backing this section */
        protected _data: IGetInvolved;

        /** keep track of the sub sections */
        protected _sectionContent: SubSections;

        /** keep track of the styles used by this section */
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles = {
        }

        //#endregion

        /**...........................................................................
         * _createSectionElements
         * ...........................................................................
         *  create elements specific to the get involved section 
         * ...........................................................................
         */
        protected _createSectionElements(): void {

            // initialize the subsections controller
            this._sectionContent = new SubSections();

            // create each of the subsections
            let techs: InvolvementSubsection = new InvolvementSubsection(this._data.technicians, "TECHNICIANS");
            let actors: InvolvementSubsection = new InvolvementSubsection(this._data.actors, "ACTORS");
            let writers: InvolvementSubsection = new InvolvementSubsection(this._data.writers, "WRITERS");
            let directors: InvolvementSubsection = new InvolvementSubsection(this._data.directors, "DIRECTORS");
            let general: InvolvementSubsection = new InvolvementSubsection(this._data.general, "VOLUNTEERS");

            // add the subsections to the display
            this._sectionContent.addSubSections(techs, actors, writers, directors, general);
            this._elems.content.appendChild(this._sectionContent.base);
        }
       
    }

    /**...........................................................................
     * @class InvolvementPopup
     * ...........................................................................
     * Creates a popup for a way for someone to get involved
     * @version 1.0
     * ...........................................................................
     */
    export class InvolvementPopup extends KIP.Popup {

        //#region PROPERTIES

        /** data to show for the involvement popup */
        protected _data: IInvolvement;

        /** styles to use for involvement popup */
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles = {
            ".popup": {
                zIndex: "5"
            },

            ".popup .frame": {
                maxWidth: "50%",
                maxHeight: "80%",
                position: "relative"
            },

            ".popup .frame .content": {
                padding: "20px",
                overflowY: "auto",
                maxHeight: (window.innerHeight * 0.8) - 40 + "px"
            },

            ".popup .frame .content .bstContent": {
                overflowY: "auto",
                display: "flex",
                flexDirection: "column"
            },

            ".popupTitle": {
                fontSize: "2em",
                fontFamily: "OpenSansBold"
            },

            ".popupContent": {
                marginTop: "10px"
            },

            ".contactLbl": {
                color: "#555",
                marginTop: "15px",
                fontSize: "0.9em"
            },

            ".contactInfo": {
                display: "flex",
                color: "#555",
                fontSize: "0.9em",
                alignItems: "center"
            },

            ".contactInfo > div": {
                marginLeft: "10px",
                marginRight: "10px"
            },

            ".contactInfo > div > a": {
                color: "#555"
            },

            ".contactName": {
                fontSize: "1em",
                fontFamily: "OpenSansBold"
            },

            ".popup .image": {
                width: "50px",
                height: "50px",
                borderRadius: "50px",
                boxShadow: "1px 1px 4px 2px rgba(0,0,0,.1)",
                overflow: "hidden"
            },

            ".popup .image.noIcn":{
                display: "none"
            },

            ".popup .image img": {
                width: "100%"
            },

            ".mobile.popup .frame": {
                width: "95%",
                fontSize: "2em",
                maxWidth: "95%",
                maxHeight: "95%"
            },

            ".mobile.popup .frame .closeBtn":
            {
                width: "5vw",
                height: "5vw",
                left: "calc(100% - 4vw)",
                top: "-2vw",
                borderRadius: "100%"
            },

            ".mobile.popup .image": {
                width: "10vw",
                height: "10vw"
            }
        }

        /** return the styles for this element */
        protected _getUncoloredStyles(): KIP.Styles.IStandardStyles {
            return this._mergeThemes(InvolvementPopup._uncoloredStyles, KIP.Popup._uncoloredStyles);
        }

        /** determines whether we need additional data in order to call the "createElements" function */
        protected _shouldSkipCreateElements(): boolean {
            return !this._data;
        }

        //#endregion

        /**...........................................................................
         * Creates the Get Involved popup 
         * @param   data    Data contained within the section
         * ...........................................................................
         */
        constructor(data: IInvolvement, isMobile?: boolean) {
            super();
            this._data = data;
            
            this.setThemeColor(0, "#EA0");
            this._createElements();
            if (isMobile) { KIP.addClass(this._elems.base, "mobile"); }
        }

        /**...........................................................................
         * _createElements
         * ...........................................................................
         * Creates the elements needed for a "Getting Involved" popup
         * ...........................................................................
         */
        protected _createElements(): void {
            super._createElements();

            // create the standard elements
            let children: KIP.IElemDefinition[] = [
                { cls: "popupTitleContainer", children: [
                    { cls: "image " + (this._data.icon ? "" : "noIcn"), children: [
                        { type: "img", attr: { src: this._data.icon} }
                    ]},
                    { cls: "popupTitle", content: this._data.text }
                ]},
                { cls: "popupContent", content: this._data.content }
            ];

            // add the contact section if applicable
            if (this._data.contactInfo && this._data.contactInfo.name) {
                children.push({ cls: "contactLbl", content: "Interested? Contact " });
                children.push({
                    cls: "contactInfo", children: [,
                        { cls: "contactName", content: this._data.contactInfo.name },
                        {
                            cls: "contactEmail", children: [
                                {
                                    type: "a",
                                    content: this._data.contactInfo.email,
                                    attr: {
                                        href: "mailto:" + this._data.contactInfo.email
                                    }
                                }
                            ]
                        },
                        { cls: "contactPhone", content: this._data.contactInfo.phone }
                    ]
                });
            }

            this.addContent({ cls: "bstContent", children: children });
        }

        /**...........................................................................
         * draw
         * ...........................................................................
         * Draw the popup
         * 
         * @param   parent  The parent upon which to draw this element
         * ...........................................................................
         */
        public draw(parent: HTMLElement): void {
            super.draw(parent);

            document.body.style.overflow = "hidden";

        }

        /**...........................................................................
         * erase
         * ...........................................................................
         * Erase the popup
         * ...........................................................................
         */
        public erase(): void {
            super.erase();
            document.body.style.overflow = "auto";
        }


    }

    /**...........................................................................
     * @class InvolvementSubSection
     * ...........................................................................
     * Display ways a person could get involved with the theater
     * @version 1.0
     * @author  Kip Price
     * ...........................................................................
     */
    export class InvolvementSubsection extends SubSection<IInvolvement[]> {

        //#region PROPERTIES

        /** styles to use for the subsection */
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles = {
           
            ".getInvolved .involvementSubsection .involvementWrapper" : {
                marginBottom: "7px",
                marginTop: "7px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center"
            },
           
            ".getInvolved .involvementSubsection .involvementWrapper:hover" : {
                textDecoration: "underline"
            },

            ".getInvolved .involvementSubsection .imageContainer": {
                borderRadius: "20px",
                padding: "3px",
                borderStyle: "none",
                border: "0",
                width: "20px",
                height: "20px",
                overflow: "hidden"
            },

            ".getInvolved .involvementSubsection .icn.noIcn": {
                display: "none"
            },

            ".getInvolved .involvementSubsection .icn": {
                width: "100%"
            },

            ".getInvolved.mobile .involvementSubsection .imageContainer": {
                width: "5vw",
                height: "5vw",
                marginRight: "0.5vw"
            },

            ".getInvolved.mobile .involvementSubsection .involvementWrapper": {
                height: "10vw"
            },

            ".getInvolved .noData": {
                color: "rgba(0,0,0,.5)",
                fontSize: "0.9em"
            }

        }

        protected _getUncoloredStyles(): KIP.Styles.IStandardStyles {
            return this._mergeThemes(InvolvementSubsection._uncoloredStyles, SubSection._uncoloredStyles);
        }

        //#endregion

        /**...........................................................................
         * _createContent
         * ...........................................................................
         * Create the details that will fill this subsection
         * ...........................................................................
         */
        protected _createContent(): void {

            this._elems.content = KIP.createElement({
                cls: "involvementSubsection"
            });

            // loop trhough the involvement opportunities and create the UI for each
            let idx: number = 0;
            for (idx; idx < this._data.length; idx += 1) {
                let involvedItem: HTMLElement = this._createGetInvolvedItem(this._data[idx]);
                this._elems.content.appendChild(involvedItem);
            }

            if (this._data.length === 0) {
                this._elems.content.appendChild(KIP.createElement({
                    cls: "noData",
                    content: "Nothing right now; check back later."
                }))
            }
        }

        /**...........................................................................
         * _createGetInvolvedItem
         * ...........................................................................
         * create an individual way to get involved 
         * 
         * @param   involvedItem    The item the user could get involved with
         * 
         * @returns The created element
         * ...........................................................................
         */
        private _createGetInvolvedItem(involvedItem: IInvolvement): HTMLElement {
            let involvedIcon: HTMLElement = KIP.createElement({
                type: 'img',
                attr: {
                    src: involvedItem.icon || ""
                },
                cls: "icn " + (involvedItem.icon? "" : "noIcn")
            });
            let involvedText: HTMLElement = KIP.createSimpleElement("", "involved", involvedItem.text);
            let elem: HTMLElement = KIP.createElement({ 
                cls: "involvementWrapper",  children: 
                [
                    { cls: "imageContainer", children: [involvedIcon] }, 
                    involvedText
                ]
            });

            elem.addEventListener("click", () => {
                this._showInvolvementPopup(involvedItem);
            });

            return elem;
            
        }

         /**...........................................................................
         * _showInvolvementPopup
         * ...........................................................................
         *  Show the get involved item specifically
         * 
         * @param   involvedItem    The element we are currently drawing
         * ...........................................................................
         */
        protected _showInvolvementPopup(involvedItem: IInvolvement): void {
            let popup: InvolvementPopup = new InvolvementPopup(involvedItem, this._isMobile);
            popup.draw(document.body);
        }
    }
}
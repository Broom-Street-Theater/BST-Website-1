namespace BST {

    /**...........................................................................
     * @class SeasonsSidelineView
     * handle showing seasons in the side of the home page
     * @version 1.0
     * ...........................................................................
     */
    export class SeasonsSidelineView extends View {

        private _selectedShow: HTMLElement;
        private _currentShowView: CurrentShowView;
        private _seasons: ISeasons;

        private _elements: {
            sidelineElem: HTMLElement;
            showsElem: HTMLElement;
        };

        protected static _uncoloredStyles: KIP.Styles.IStandardStyles = {

            ".shows .show img.icon": {
                width: "32px",
                height: "32px",
                borderRadius: "100%",
                backgroundColor: "rgba(255,255,255,.5)"
            },

            ".mobile .shows img.icon": {
                width: "8vw",
                height: "8vw"
            },

            ".seasons .sideline": {
                display: "flex",
                flexDirection: "row-reverse",
                maxHeight: "100%",
                height: "100%",
                position: "absolute",
                top: "0"
            },

            ".mobile.seasons .sideline": {
                width: "100%",
                height: "auto",

            },

            ".mobile.seasons .sideline .shows": {
                flexDirection: "row",
                width: "100%",
                paddingBottom: "1vh",
                backgroundColor: "#242424"
            },

            ".seasons .sideline .shows": {
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                color: "#FFF",
                textShadow: "1px 1px 3px rgba(0,0,0,.2)",
                paddingLeft: "8px",
                paddingRight: "8px",
                height: "100%",
                backgroundColor: "#242423",
                boxShadow: "1px 0px 5px 3px rgba(0,0,0,.3)",
                alignItems: "center",
                paddingTop: "100px",
                boxSizing: "border-box"
            },

            ".seasons.mobile .sideline .shows": {
                paddingTop: "10px"
            },

            ".seasons .sideline .shows .show": {
                transition: "all ease-in-out 0.08s",
                cursor: "pointer",
                opacity: "0.2",
                height: "8.333%",
                alignSelf: "middle",
                margin: "auto"
            },

            ".seasons .sideline .years .yearLabel:hover, .seasons .sideline .years .yearLabel.selected, .seasons .sideline .shows .show:hover, .seasons .sideline .shows .show.selected": {
                transform: "scale(1.1)",
                textDecoration: "underline",
                opacity: "1"
            }

        }

        /**...........................................................................
         * construct the view for the seasons on the side of the home page 
         * ...........................................................................
         */
        constructor(header: BSTHeader) {
            super();
            this._currentShowView = new CurrentShowView(header);
            this._createElements();
            this._loadSeasons();
        }

        /**...........................................................................
         * _createElements
         * ...........................................................................
         * create the elements that make up the seasons view
         * ...........................................................................
         */
        protected _createElements(): void {
            if (!this._currentShowView) { return; }

            this._elems.base = KIP.createSimpleElement("", "seasons", "", null, [this._currentShowView.base]);
            
            this._elems.base.style.top = "0";
            this._elems.base.style.left = "0";

            slowScroll(this.base);
        }

        /**...........................................................................
         * _createSectionElements
         * ...........................................................................
         * create the elements for the shows
         * ...........................................................................
         */
        protected _createSectionElements(): void {
            if (!this._seasons) { return; }

            this._elements = {
                sidelineElem: KIP.createSimpleElement("", "sideline"),
                showsElem: this._createShows()
            };

            this._currentShowView.sidebar = this._elements.sidelineElem;

            this._elements.sidelineElem.appendChild(this._elements.showsElem);

            this.base.appendChild(this._elements.sidelineElem);
        }

        //#region NEW UI FUNCTIONS

        /**...........................................................................
         * _createShows
         * ...........................................................................
         * 
         * ...........................................................................
         */
        private _createShows(): HTMLElement {
            let showsElem: HTMLElement = KIP.createSimpleElement("", "shows");

            // find the right shows
            let shows: IMiniShow[] = Helpers.findImmediateShow(this._seasons);
            shows.map((show: IMiniShow) => {
                let showElem: HTMLElement = this._createShow(show);
                showsElem.appendChild(showElem);
                if (show.selected) {
                    this._selectCurShowAfterTimeout(showElem, show.id);
                }
            });

            return showsElem;
        }

        /**...........................................................................
         * _createShow
         * ...........................................................................
         * create the HTMl element for a particular show
         * @param miniShow - the show to create an icon for
         * @returns
         * ...........................................................................
         */
        private _createShow(miniShow: IMiniShow): HTMLElement {
            let showElem: HTMLElement = KIP.createSimpleElement("", "show");
            let showIcon: HTMLElement = KIP.createElement({
                cls: "icon",
                type: "img",
                attr: {
                    src: miniShow.icon
                },
                parent: showElem
            });

            // add the event listener
            showElem.addEventListener("click", () => {
                this._selectShow(showElem, miniShow.id);
            });

            return showElem;
        }
        //#endregion

        //#region LOAD SEASONS

        /**
         * load the data from the seasons file
         */
        private _loadSeasons(): void {
            Server.loadSeasons((seasons: ISeasons) => {
                this._seasons = seasons;
                this._createSectionElements();
            });
        }
        //#endregion

        /**  */
        private _selectCurShowAfterTimeout(showElem: HTMLElement, showID: string): void {
            window.setTimeout(() => {
                this._selectShow(showElem, showID);
            });
        }

        /** handle loading a particular show */
        private _loadShow(showID: string, showElem: HTMLElement): void {
            this._currentShowView.showID = showID;
            this._currentShowView.bubbleReference = showElem.offsetTop;
        }

        /** handle selecting a particular element */
        private _selectShow(elem: HTMLElement, showID: string): void {
            if (!this._selectElem(elem, this._selectedShow)) { return; }
            this._selectedShow = elem;
            this._loadShow(showID, elem);
        }

        private _selectElem(elem: HTMLElement, selectedElem: HTMLElement): boolean {
            if (selectedElem === elem) { return false; }    // Quit if this elem is already selected

            if (selectedElem) {                             // Remove the old selection
                KIP.removeClass(selectedElem, "selected");
            }
            KIP.addClass(elem, "selected");                 // Add the new selected class

            return true;                                    // Return that selecting was a success
        }
    }

}
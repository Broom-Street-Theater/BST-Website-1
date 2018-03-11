namespace BST {

    /**...........................................................................
     * @class SynopsisSection
     * Synopsis section for a particular show
     * @version 1.0
     * ...........................................................................
     */
    export class SynopsisSection extends SectionView {

        protected static _uncoloredStyles: KIP.Styles.IStandardStyles = {
            
            ".synopsis.section:not(.mobile)" : {
                paddingLeft: "25%",
                paddingRight: "20%"
            },

            ".synopsis.section": {
                
            },
           
            ".synopsis.section .overview" : {
                display: "flex",
                width: "100%"
            },

            ".synopsis.section.mobile .overview": {
                flexWrap: "wrap"
            },
           
            ".synopsis.section:not(.mobile) .overview .synopsis": {
                width: "60%"
            },
           
            ".synopsis.section .overview .sidebar" : {
                width: "35%",
                marginLeft:" 5%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start"
            },

            ".synopsis.section.mobile .overview .sidebar": {
                width: "100%",
                flexDirection: "row",
                flexWrap: "wrap"
            },
           
            ".synopsis.section .sidebar .sidebarElem": {
                display: "flex",
                flexWrap: "wrap",
                fontSize: "0.9em",
                marginBottom: "6px",
                alignItems: "center",
                paddingTop: "1vh",
                paddingBottom: "1vh"
            },
           
            ".synopsis.section .sidebar .sidebarElem .lbl": {
                marginRight: "4px",
                fontFamily: "OpenSansBold",
                fontSize: "0.8em"
            },

            ".synopsis.section .showStatsAlt, .synopsis.section .otherShowStats": {
                display: "flex",
                flexDirection: "column"
            },

            ".synopsis.section:not(.mobile) .showStatsAlt": {
                display: "none"
            },

            ".synopsis.section.mobile": {
                nested: {
                    ".showStatsAlt": { width: "50%"},
                    ".otherShowStats": {width: "50%"}
                }
            }
        };

        protected _data: IShowData;
        protected _setData (data: IShowData) {
            super._setData(data);

            // update the css
            this._elems.base.style.marginTop = window.innerHeight + "px";
        }

        /**...........................................................................
         * _createSectionElements
         * ...........................................................................
         * create all elements needed by the synopsis section 
         * ...........................................................................
         */
        protected _createSectionElements () : void {
            let synopsisContent: HTMLElement = this._createSynopsisContent();
            this._elems.content.appendChild(synopsisContent);
        }

        /**...........................................................................
         * _createSynopsisSection
         * ...........................................................................
         * create the synopsis section 
         * @returns
         * ...........................................................................
         */
        private _createSynopsisContent (): HTMLElement {

            let hasSynopsis: boolean = (!!this._data.showDetails.synopsis);

            // create the two columns of info
            let mainContent: HTMLElement = KIP.createSimpleElement("", "synopsis", this._data.showDetails.synopsis || "(Coming soon)");
            let sidebar: HTMLElement = this._createSynopsisSidebar(hasSynopsis);

            // return the wrapping element that contains both of the columns
            let base: HTMLElement = KIP.createSimpleElement("", "overview", "", null, [mainContent, sidebar]);        
            return base;
        }

        private _createQuickStats(): HTMLElement {
            let run : IRun = Helpers.getShowStartAndEndDates(this._data);
            let children: HTMLElement[] = [];

            // add the name of the writer
            if (this._data.showTitle.writer) {
                children.push(this._createSidebarElement("Author", this._data.showTitle.writer));
            }

            // add the name of the director
            if (this._data.showTitle.director) {
                children.push(this._createSidebarElement("Director", this._data.showTitle.director));
            }

            // add the run stats
            if (run.start && run.end) {
                children.push( this._createSidebarElement("Run Dates", KIP.Dates.shortDate(run.start) + " - " + KIP.Dates.shortDate(run.end)));
            }

            let quickElems: HTMLElement = KIP.createElement({
                cls: "showStatsAlt",
                children: children
            });


            return quickElems;
        }

        private _createOtherStats(hasSynopsis: boolean): HTMLElement {
            let details: IShowDetails = this._data.showDetails;
            let children: HTMLElement[] = [];

            let showLength: string = KIP.Dates.getDisplayDuration({minutes: details.showLength});

            // only show show details if we have a synopsis
            if (hasSynopsis) {
                children = [
                    this._createSidebarElement("Show Length:", showLength),
                    this._createSidebarElement("Has Intermission? ", details.hasIntermission ? "Yes" : "No"),
                    this._createSidebarElement("Family Friendly?", details.isKidFriendly ? "Yes" : "No"),
                    this._createSidebarElement("Warnings: ", details.warnings)
                ]
            }

            let wrapper: HTMLElement = KIP.createElement({
                cls: "otherShowStats",
                children: children
            });

            return wrapper;
        }

        /**...........................................................................
         * _createSynopsisSidebar
         * ...........................................................................
         * create the sidebar of quick facts about a show 
         * @returns 
         * ...........................................................................
         */
        private _createSynopsisSidebar (hasSynopsis: boolean): HTMLElement {

            let quickElems: HTMLElement = this._createQuickStats();
            let otherStats: HTMLElement = this._createOtherStats(hasSynopsis);

            let sidebar: HTMLElement = KIP.createSimpleElement("", "sidebar", "", null, [quickElems, otherStats]);
            return sidebar;
        }

         /**...........................................................................
          * _createSidebarElement
          * ...........................................................................
          * sidebar element for the synopsis section 
          * @param  lbl
          * @param  content
          * @returns
          * ...........................................................................
          */
        private _createSidebarElement (lbl: string, content: string): HTMLElement {
            if (!content) { return KIP.createElement({cls: "sidebarElem"})}
            let sidebarLbl: HTMLElement = KIP.createSimpleElement("", "lbl", lbl);
            let sidebarData: HTMLElement = KIP.createSimpleElement("", "data", content);
            let sidebarElem: HTMLElement = KIP.createSimpleElement("", "sidebarElem", "", null, [sidebarLbl, sidebarData]);
            return sidebarElem;
        }

        protected _onResize(): void {
            super._onResize();
            let marginTop: number;
            if (this._data && this._data.photos.length > 0) {
                marginTop = window.innerHeight
            } else if (this._isMobile) {
                marginTop = 215;
            } else {
                marginTop = 100;
            }
            this._elems.base.style.marginTop = (marginTop + "px");
        }
    }
}
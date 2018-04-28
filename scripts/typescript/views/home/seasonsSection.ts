namespace BST {

    /**...........................................................................
     * @class   SeasonsSection
     * ...........................................................................
     * @version 1.0
     * @author  Kip Price
     * ...........................................................................
    */
    export class SeasonsSection extends SectionView {

        /** content for the section */
        protected _sectionContent: SubSections;

        /** data for the section */
        protected _data: ISeasons;

        /** keep track of the data by the year */
        protected _dataByYear: KIP.Collection<IMiniShow[]>;

        /** whether this should only be the current season */
        protected _onlyCurrent: boolean;
        public set onlyCurrent(onlyCurrent: boolean) { 
            this._onlyCurrent = onlyCurrent; 
            KIP.addClass(this._elems.base, "onlyCurrent");
        }

        /** styles for the section */
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles = {
            ".seasonsSection .tabContainer" : {
                justifyContent: "flex-start",

                nested: {
                    ".tab" : {
                        paddingRight: "15px"
                    },

                }
            },

            ".seasonsSection.onlyCurrent .tabContainer": {
                display: "none"
            }
        }

        /**...........................................................................
         * Create the section that will hold our seasons
         * @param id 
         * @param title 
         * @param addlCls 
         * ...........................................................................
         */
        constructor (id: string, title: string, addlCls?: string) {
            super(id, title, addlCls);
            this._loadSeasons();
            this._createElements();
        }

        /**...........................................................................
         * _loadSeasons
         * ...........................................................................
         * handle loading the servers 
         * ...........................................................................
         */
        private _loadSeasons(): void {
            Server.loadSeasons((data: ISeasons) => {
                this._data = data;
                this._createSectionElements();
            });
        }

        /**...........................................................................
         * _createSectionElements
         * ...........................................................................
         * 
         * ...........................................................................
         */
        protected _createSectionElements(): void {
            if (!this._data) { return; }
            this._processData();
            this._sectionContent = new SubSections();

            this._dataByYear.map((shows: IMiniShow[], key: string) => {
                let subsection: SeasonShowSubsection = new SeasonShowSubsection(shows, key);
                this._sectionContent.addSubSection(subsection);
            });

            this._sectionContent.draw(this._elems.content);

        }

        /**...........................................................................
         * _processData
         * ...........................................................................
         * 
         * ...........................................................................
         */
        protected _processData(): void {
            if (this._dataByYear) { return; }
            this._dataByYear = new KIP.Collection<IMiniShow[]>(KIP.CollectionTypeEnum.ReplaceDuplicateKeys);

            // sort the shows by year
            let sortedData: IMiniShow[] = this._data.slice();
            sortedData.sort((a: IMiniShow, b: IMiniShow) => {
                let dateA: Date = new Date(a.endDate);
                let dateB: Date = new Date(b.endDate);

                if (dateA < dateB) {
                    return -1;
                } else if (dateA > dateB) {
                    return 1;
                } else {
                    return 0;
                }
            });

            // add all the shows to the appropriate year
            let miniShow: IMiniShow;
            for (miniShow of sortedData) {
                let year: number = new Date(miniShow.endDate).getFullYear();
                if (isNaN(year)) { continue; }
                let yearArr: IMiniShow[] = this._dataByYear.getValue(year.toString());
                if (!yearArr) {
                    yearArr = [];
                }

                yearArr.push(miniShow);

                this._dataByYear.addElement(year.toString(), yearArr);
            }

            this._dataByYear.sort((a: KIP.ICollectionElement<IMiniShow[]>, b: KIP.ICollectionElement<IMiniShow[]>) => {
                if (a.key > b.key) { return -1; }
                else if (a.key < b.key) { return 1; }
                return 0;
            });

        }

    }

    /**...........................................................................
     * @class   SeasonShowSubsection
     * ...........................................................................
     * @version 1.0
     * @author  Kip Price
     * ...........................................................................
     */
    export class SeasonShowSubsection extends SubSection<IMiniShow[]> {

        protected static _uncoloredStyles: KIP.Styles.IStandardStyles = {
            ".mobile .seasonContainer": {
                maxHeight: "unset",

                nested: {
                    ".show": {
                        height: "auto",
                        width: "100%",
                        paddingTop: "15px",
                        paddingBottom: "15px"
                    }
                }
            },

            ".seasonContainer": {
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                overflow: "hidden",
                maxHeight: "250px",

                nested: {

                    ".show": {
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        paddingTop: "5px",
                        paddingBottom: "5px",
                        width: "50%",
                        height: "50px",
                    
                        nested: {
                            "&:hover": {
                                textDecoration: "underline"
                            },

                            ".showIcon": {
                                width: "30px",
                                height: "30px",
                                flexShrink: "0",
                                borderRadius: "100%",
                                overflow: "hidden",
                                backgroundColor: "#FFF",
                                border: "1px solid rgba(0,0,0,.1)",

                                nested: {
                                    "&.noIcon": {
                                        border: "1px solid transparent"
                                    }, 

                                    "img": {
                                        width: "100%",
                                    }
                                }
                            },

                            ".showName" : {
                                paddingLeft: "10px"
                            }
                        }
                    }
                }
            }
        }
        /**...........................................................................
         * _createContent
         * ...........................................................................
         * 
         * ...........................................................................
         */
        protected _createContent(): void {
            this._createSeasonContainer();

        }

        /**...........................................................................
         * _createSeasonContainer
         * ...........................................................................
         * Create the container for all of the shows
         * ...........................................................................
         */
        protected _createSeasonContainer(): void {
            this._elems.content = KIP.createElement({
                cls: "seasonContainer",
                parent: this._elems.base
            });

            for (let show of this._data){
                this._createShowInSeason(show);
            }
        }

        /**...........................................................................
         * _createShowInSeason
         * ...........................................................................
         * Create a show in our season display
         * @param   show    Create a show
         * ...........................................................................
         */
        protected _createShowInSeason(show: IMiniShow): void {
            let imgCls: string = "showIcon"
            if (!show.icon) { imgCls += " noIcon"; }

            // create the actual show element
            let showElem: HTMLElement = KIP.createElement({
                cls: "show",
                parent: this._elems.content,
                children: [
                    {cls: imgCls, children: [
                        {type: "img", attr: { src: show.icon }}
                    ]},
                    {cls: "showName", content: show.name},
                    {cls: "subtitle", content: (show.subtitle? ": " + show.subtitle : "")}
                ],

                eventListeners: {
                    click: () => {
                        navigate(show.id, NavigationType.SHOW);
                    }
                }
            });
        }
    }
}
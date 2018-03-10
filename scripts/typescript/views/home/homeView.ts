namespace BST {

    export class HomeView extends View {

        /** styles for the home view */
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles = {
            "body" : {
                backgroundColor: "#000",
                fontFamily: "OpenSans"
            },

            ".hidden" : {
                display: "none"
            }
        }

        /** data for the home screen */
        protected _data: IHomeData;

        protected _header: BSTHeader;

        /** initialize the view */
        constructor(data: IHomeData, header: BSTHeader) {
            super();
            this._header = header;
            this._data = data;
            this._createElements();
        };

        /**...........................................................................
         * _createElements
         * ...........................................................................
         * Create all elements needed for the home view
         * ...........................................................................
         */
        protected _createElements(): void {
            if (!this._data) { return; }

            // TOP SECTION: CURRENT SHOW AND OLD SHOWS
            let seasonsView: SeasonsSidelineView = new SeasonsSidelineView(this._header);

            // SECTIONS
            let newsSection: NewsSection = this._createNewsSection();
            let involvedSection: GetInvolvedSection = this._createGetInvolvedSection();
            let aboutSection: AboutSection = this._createAboutSection();
            let resourcesSection: ResourcesSection = this._createResourcesSection();
            let donateSection: DonateSection = this._createDonateSection();

            // CREATE THE PAGE
            let page: HTMLElement = KIP.createElement(
                {
                    id: "home",
                    cls: "home",
                    children: [
                        //menu.base,
                        seasonsView.base,
                        newsSection.base,
                        involvedSection.base,
                        aboutSection.base,
                        resourcesSection.base,
                        donateSection.base
                    ]
                }
            );

            this._elems.base = page;

            // update the bg image of the page
            document.body.style.backgroundImage = "url(" + this._data.bgURL + ")";
        }

        /**...........................................................................
         * _createAboutSection
         * ...........................................................................
         *  create the section about BST 
         * ...........................................................................
         */
        private _createAboutSection(): AboutSection {
            let section: AboutSection = new AboutSection("about", "ABOUT BROOM STREET", "about");
            section.data = this._data.about;
            return section;
        }

        /**...........................................................................
         * _createGetInvolvedSection
         * ...........................................................................
         * create the section of ways people can get involved 
         * ...........................................................................
         */
        private _createGetInvolvedSection(): GetInvolvedSection {
            let section: GetInvolvedSection = new GetInvolvedSection("getInvolved", "GET INVOLVED", "getInvolved");
            section.data = this._data.getInvolved;
            return section;
        }

        /**...........................................................................
         * _createNewsSection
         * ...........................................................................
         * create the section containing news items 
         * ...........................................................................
         */
        private _createNewsSection(): NewsSection {
            let section: NewsSection = new NewsSection("news", "NEWS", "news");
            section.data = this._data.news;
            return section;
        }

        /**...........................................................................
         * _createResourcesSection
         * ...........................................................................
         * Create section holding resources for interested parties
         * 
         * @returns The created resources section
         * ...........................................................................
         */
        private _createResourcesSection(): ResourcesSection {
            let section: ResourcesSection = new ResourcesSection("resources", "RESOURCES", "resources");
            section.data = this._data.resources;
            return section;
        }

        /**...........................................................................
         * _createDonateSection
         * ...........................................................................
         * Create section where patrons can add donations
         * 
         * @returns The created donate section
         * ...........................................................................
         */
        private _createDonateSection(): DonateSection {
            let section: DonateSection = new DonateSection("donate", "DONATE", "donate");
            section.data = this._data.donateInfo;
            return section;
        }
    }
}
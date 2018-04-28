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

        protected _seasons: ISeasons;

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
            let sidebar: SeasonsSidelineView = new SeasonsSidelineView(this._header);

            // SECTIONS
            let sections: HTMLElement[] = this._determineSections();
            sections.splice(0, 0, sidebar.base);

            // CREATE THE PAGE
            let page: HTMLElement = KIP.createElement(
                {
                    id: "home",
                    cls: "home",
                    children: sections
                }
            );

            this._elems.base = page;

            // update the bg image of the page
            document.body.style.backgroundImage = "url(" + this._data.bgURL + ")";
        }

        /** 
         * _determineSections
         * 
         * Figure out which sections should be displayed
         * @returns The array of sections to display
         * 
         */
        protected _determineSections(): HTMLElement[] {
            let sections: HTMLElement[] = [];
            for (let menuItem of this._data.menuItems){
                let section: SectionView = this._determineSection(menuItem.link);
                if (!section) { continue; }
                sections.push(section.base);
            }

            return sections;
        } 

        /**
         * _determineSection
         * 
         * Figure out which section should be created
         * @param   key     The key for this section
         * @returns The created section
         */
        protected _determineSection(key: string): SectionView {
            switch (key) {
                case "news":
                    return this._createNewsSection();
                case "getInvolved":
                    return this._createGetInvolvedSection();
                case "about":
                    return this._createAboutSection();
                case "resources":
                    return this._createResourcesSection();
                case "donate":
                    return this._createDonateSection();
                case "seasonsSection":
                    return this._createSeasonsSection();
                default:
                    return null;
            }
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

        /**...........................................................................
         * _createSeasonsSection
         * ...........................................................................
         * Create a section for the seasons
         * ...........................................................................
         */
        private _createSeasonsSection(): SeasonsSection {
            let section: SeasonsSection = new SeasonsSection("seasonsSection", "SEASON", "seasonsSection");
            section.onlyCurrent = true;
            return section;
        }
    }
}
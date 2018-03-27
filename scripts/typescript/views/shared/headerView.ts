namespace BST {

    /**...........................................................................
     * IHeaderElems
     * ...........................................................................
     * Keep track of all elements in the shared header
     * 
     * @version 1.0
     * ...........................................................................
     */
    export interface IHeaderElems extends IViewElements {

        /** overall header for all elements */
        wrapper: HTMLElement;

        /** home specific elements */
        home: HTMLElement;
        homeTitle: HTMLElement;
        homeLogo: HTMLElement;

        /** shared menu space */
        menuElems: HTMLElement;
        homeMenuElems: HTMLElement;
        showMenuElems: HTMLElement;

        /** show specific elements */
        show: HTMLElement;
        showTitle: HTMLElement;
        showSubtitle: HTMLElement;
        showStats: HTMLElement;

    }

    const ANIMATION_TIME: number = 800;

    /**...........................................................................
     * @class BSTHeader
     * ...........................................................................
     * Create the shared header
     * @version 1.0
     * ...........................................................................
     */
    export class BSTHeader extends View {

        //#region PROPERTIES

        /** keep track of the data that applies to the home screen */
        protected _homeData: IHomeData;
        public set homeData(data: IHomeData) { this._homeData = data; }

        /** keep track of the show specific data, when in the show view */
        protected _showData: Show;
        public get showData(): Show { return this._showData; }
        public set showData(data: Show) { this._showData = data; }

        /** elements that make up the header */
        protected _elems: IHeaderElems;

        /** handle listening to resize events */
        protected _resizeListeners: Function[];

        /** styles specific for this header */
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles = {
            "#header": {
                position: "fixed",
                width: "100%",
                top: "0",
                left: "0",
                zIndex: "3"
            },

            "#header .header" : {
                position: "relative",
                width: "100%",
                color: "#FFF",
                display: "inline-block"
            },

            ".header .headerWrapper": {
                display: "flex",
                flexDirection: "row",
                paddingBottom: "5px"
            },

            ".mobile.header .headerWrapper": {
                flexWrap: "wrap"
            },

            ".header .headerWrapper .home": {
                paddingLeft: "105px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: "#222",
                boxShadow: "1px 1px 8px 4px rgba(0,0,0,.2)",
                paddingBottom: "10px",
            },

            ".header.showVisible .headerWrapper .home": {
                paddingRight: "20px"
            },

            ".mobile.header .headerWrapper .home": {
                width: "100%",
                paddingLeft: "105px",
                paddingRight: "0"
            },

            ".header .headerWrapper .homeName": {
                position: "relative",
                whiteSpace: "nowrap"
            },

            ".mobile.header .headerWrapper .homeName": {
                fontSize: "2.7vw",
                textAlign: "left",
                width: "100%",
                transition: "font-size .1s ease-in-out"
            },

            ".mobile.header.showVisible .headerWrapper .homeName": {
                fontSize: "1em"
            },

            ".header .headerWrapper .homeTitle": {
                fontFamily: "OpenSansBold",
                textTransform: "uppercase",
                fontSize: "calc(1em + 1.1vw)"
            },

            ".header .headerWrapper .bstLogo": {
                height: "105px",
                top: "0px",
                left: "-105px",
                position: "absolute",
                cursor: "pointer"
            },

            ".header.mobile.showVisible .headerWrapper .homeTitle:before": {
                content:'"HOME"',
                fontFamily: "OpenSansLight",
                fontSize: "0.6em",
                position: "absolute",
                left: "-86px",
                top: "106px"
            },

            ".header.mobile .headerWrapper .menuItems": {
                display: "none"
            },

            ".header .headerWrapper .menuItems": {
                display: "flex",
                justifyContent: "flex-start",
                transition: "opacity .4s ease-in-out",
                marginLeft: "0",
                overflow: "hidden"
            },

            ".header .headerWrapper .menuItems.hidden": {
                opacity: "0",
                width: "0"
            },

            ".header .headerWrapper .menuItems .menuItem": {
                textTransform: "uppercase",
                cursor: "pointer",
                paddingRight: "15px",
                whiteSpace: "nowrap"
            },

            ".header .headerWrapper .menuItems .menuItem:hover": {
                textDecoration: "underline"
            },

            ".header .headerWrapper .menuItems .menuItem a.menuLink": {
                marginLeft: "0",
                marginRight: "0"
            },

            ".header .headerWrapper .show": {
                flexGrow: "1",
                backgroundColor: "#1A1A1A",
                boxShadow: "1px 1px 8px 4px rgba(0,0,0,.2)",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                paddingRight: "5%",
                zIndex: "-1",
                paddingBottom: "10px",
                overflow: "hidden",
                whiteSpace: "nowrap"
            },

            ".header.mobile .headerWrapper .show": {
                fontSize: "1.9em",
                alignItems: "flex-start",
                backgroundColor: "rgba(30,30,30,.8)"
            },

            ".header .headerWrapper .show .titleWrapper": {
                display: "flex",
                alignItems: "baseline",
            },

            ".header.mobile .headerWrapper .show .titleWrapper": {
                display: "block",
                textAlign: "left",
                paddingLeft: "105px"
            },

            ".header .headerWrapper .show .showTitle": {
                fontSize: "calc(1em + 1vw)",
                fontFamily: "OpenSansBold",
                textTransform: "uppercase",
                textAlign: "left",
                
            },

            ".header .headerWrapper .show .showSubtitle": {
                fontSize: "calc(.75em + 0.8vw)",
                lineHeight: "0",
                opacity: "0.8",
                fontFamily: "OpenSansLight",
                marginBottom: "15px"
            },

            

            ".header.mobile .headerWrapper .show .showSubtitle": {
                lineHeight: "1"
            },

            ".header .headerWrapper .show .showStats": {
                display: "flex",
                justifyContent: "flex-start"
            },

            ".header.mobile .headerWrapper .show .showStats": {
                marginTop: "2vw",
                fontSize: "1.2em",
                justifyContent: "space-around",
                paddingLeft: "2vw",
                flexWrap: "wrap",
                display: "none"
            },

            ".header .headerWrapper .show .showStats .combo": {
                paddingLeft: "10px",
                textAlign: "center",
                display: "flex",
                alignItems: "center"
            },

            ".header.mobile .headerWrapper .show .showStats .combo": {
                width: "100%"
            },

            ".header .headerWrapper .show .showStats .combo .lbl": {
                color: "rgba(255,255,255,.6)",
                fontSize: "0.9em",
                marginRight: "5px"
            },

            ".header .headerWrapper .show.fade": {
                maxWidth: "0",
                padding: "0",
                display: "none"
            }

        }
        //#endregion

        /**...........................................................................
         * Creates a shared header view
         * 
         * @param   home    The data that will be displayed as the home
         * ...........................................................................
         */
        constructor(home: IHomeData) {
            super();
            this._homeData = home;
            this._resizeListeners = [];
            this._data = {};
            this._createElements();
        }

        /**...........................................................................
         * _createElements
         * ...........................................................................
         * Create all of the elements needed for the header
         * ...........................................................................
         */
        protected _createElements(): void {

            // create the base + wrapper elements
            this._elems.base = KIP.createElement({ cls: "header" });
            this._elems.wrapper = KIP.createElement({ cls: "headerWrapper", parent: this._elems.base });

            // create specific home elements
            this._createHomeElements();

            // create specific show elements
            this._createShowElements();

        }

        //#region CREATE HOME / SHARED ELEMENTS

        /**...........................................................................
         * _createHomeElements
         * ...........................................................................
         * create the elements that are specific to the home side of the header
         * ...........................................................................
         */
        protected _createHomeElements(): void {
            this._elems.home = KIP.createElement({ cls: "home", parent: this._elems.wrapper });

            // create the logo and name
            this._createBSTNameAndLogo();

            // create the menu element
            this._createHomeMenuElements();
        }

        /**...........................................................................
         * _createBSTNameAndLogo
         * ...........................................................................
         * create the elements to show the BST logo and name
         * ...........................................................................
         */
        protected _createBSTNameAndLogo(): void {

            // create the wrapper element
            let wrapper: HTMLElement = KIP.createElement({ cls: "homeName", parent: this._elems.home });

            // create the home name
            this._elems.homeTitle = KIP.createElement({ cls: "homeTitle", content: "Broom Street Theater", parent: wrapper });

            // create the appropriate logo
            this._elems.homeLogo = KIP.createElement({
                cls: "bstLogo",
                type: "img",
                attr: {
                    "src": this._homeData.logoURL
                },
                parent: wrapper
            });

            this._elems.homeLogo.addEventListener("click", () => {
                navigate("home", NavigationType.HOME);
            });

        }

        /**...........................................................................
         * _createShowMenuElements
         * ...........................................................................
         * create the menu elements relevant for shows
         * ...........................................................................
         */
        protected _createShowMenuElements(): void {
            
            // create the buttons specific to sections in the show
            let synopsisBtn: HTMLElement = this._createShowNavButton("SYNOPSIS", "|synopsis");
            let biosBtn: HTMLElement = this._createShowNavButton("BIOS", "|bios");
            let reviewBtn: HTMLElement = this._createShowNavButton("BUZZ", "|buzz");
            let tixBtn: HTMLElement = this._createShowNavButton("GET TICKETS", "|tix");

            // create the button that will go back to the home screen
            let homeBtn: HTMLElement = KIP.createSimpleElement("", "menuItem", "HOME");
            homeBtn.addEventListener("click", () => {
                navigate("", NavigationType.HOME);
            });

            // create the array of the button elements
            let children: HTMLElement[] = [];
            if (this._showData) {
                children.push(homeBtn);
                children.push(synopsisBtn);
                if (this._showData.shouldShowBioSection()) { children.push(biosBtn); }
                if (this._showData.shouldShowBuzzSection()) { children.push(reviewBtn); }
                if (this._showData.shouldShowTicketSection()) { children.push(tixBtn); }
            }

            // add the children to the appropriate element
            if (!this._elems.showMenuElems) {
                this._elems.showMenuElems = KIP.createElement({ cls: "showMnu menuItems hidden", children: children, parent: this._elems.menuElems });
            } else {
                this._elems.showMenuElems.innerHTML = "";
                for (let i = 0; i < children.length; i += 1) {
                    this._elems.showMenuElems.appendChild(children[i]);
                }
            }
            
        }

        /**...........................................................................
         * _createSubNavBarButton
         * ...........................................................................
         * helper to create a button in the show nav bar 
         * @param   lbl         The label to use for this button
         * @param   sectionID   The section
         * @returns The created navigation element
         * ...........................................................................
         */
        private _createShowNavButton(lbl: string, sectionID: string): HTMLElement {
            let menuItem: IMenuItem = {
                type: MenuTypeEnum.SECTION,
                name: lbl,
                link: sectionID
            }
            
            let menuElem: HTMLElement = this._createHomeMenuItem(menuItem);
            menuElem.addEventListener("click", () => {
                scrollTo(this._showData.showTitle.id + sectionID, this._elems.base.offsetHeight);
            })

            return menuElem;
        }

        /**...........................................................................
         * _createHomeMenuElements
         * ...........................................................................
         * create the elements that make up the home menu
         * ...........................................................................
         */
        protected _createHomeMenuElements(): void {

            // create the base elements
            this._elems.menuElems = KIP.createElement({ cls: "menuItems", parent: this._elems.home });
            this._elems.homeMenuElems = KIP.createElement({ cls: "homeMnu menuItems", parent: this._elems.menuElems });

            // add each of the configured menu items
            let item: IMenuItem;
            for (item of this._homeData.menuItems) {
                if (item.type === MenuTypeEnum.SECTION && !HomeData.shouldShowSectionLink(item.link)) { continue; }
                let menuItemElem: HTMLElement = this._createHomeMenuItem(item);

                    // make sure we can get to the appropriate spot
                if (item.type === MenuTypeEnum.SECTION) {
                    this._addMenuLink(menuItemElem, item.link);
                }

                this._elems.homeMenuElems.appendChild(menuItemElem);
            }
        }

        /**...........................................................................
         * _addMenuLink
         * ...........................................................................
         * 
         * @param elem 
         * @param link 
         * ...........................................................................
         */
        protected _addMenuLink(elem: HTMLElement, link: string): void {
            elem.addEventListener("click", () => {
                scrollTo(link, this._elems.base.offsetHeight);
            });
        }

        /**...........................................................................
         * _createMenuItem
         * ...........................................................................
         * create an item in the menu 
         * 
         * @param	menuItem
         * 
         * @returns The created element
         * ........................................................................... 
         */
        private _createHomeMenuItem(menuItem: IMenuItem): HTMLElement {

            // Figure out what the link should be
            let linkRef: string;
            if (menuItem.type === MenuTypeEnum.SECTION) {
                linkRef = "";
                //linkRef = "#" + menuItem.link;
            } else {
                linkRef = menuItem.link;
            }

            // Create the linking element
            let linkElem: HTMLElement = KIP.createElement({
                type: "a",
                cls: "menuLink",
                attr: {
                    href: linkRef
                },
                content: menuItem.name
            });

            // Create the containing element
            let itemElem: HTMLElement = KIP.createSimpleElement("", "menuItem", "", null, [linkElem]);
            return itemElem;
        }

        //#endregion

        //#region CREATE SHOW ELEMENTS

        /**...........................................................................
         * _createShowElements
         * ...........................................................................
         * create the elements needed for a specific show
         * ...........................................................................
         */
        protected _createShowElements(): void {
            if (!this._elems.show) { 
                this._elems.show = KIP.createElement({ cls: "show fade", parent: this._elems.wrapper });
            }

            this._createShowTitle();
            this._createShowStatistics();
            this._createShowMenuElements();
        }

        /**...........................................................................
         * _createShowTitle
         * ...........................................................................
         * Create the title for the show that is currently showing
         * ...........................................................................
         */
        protected _createShowTitle(): void {

            let shouldAddWrapper: boolean = false;
            let title: string = (this._showData && this._showData.showTitle.title) || "";
            let subtitle: string = (this._showData && this._showData.showTitle.subtitle) || ""; 

            let wrapper: HTMLElement = KIP.createElement({
                cls: "titleWrapper"
            });
            
            if (!this._elems.showTitle) {
                this._elems.showTitle = KIP.createElement({
                    content: title,
                    cls: "showTitle",
                    parent: wrapper
                });
                shouldAddWrapper = true;
            } else {
                this._elems.showTitle.innerHTML = title;
            }

            let displaySubtitle: string = subtitle? ": " + subtitle : "";
            if (this._isMobile) { displaySubtitle = subtitle; }
            if (!this._elems.showSubtitle) {
                
                this._elems.showSubtitle = KIP.createElement({
                    content: displaySubtitle,
                    cls: "showSubtitle",
                    parent: wrapper
                });
                shouldAddWrapper = true;
            } else {
                this._elems.showSubtitle.innerHTML = displaySubtitle;
            }

            if (shouldAddWrapper) {
                this._elems.show.appendChild(wrapper);
            }
        }

        /**...........................................................................
         * _createShowStatistics
         * ...........................................................................
         * create the statistics about the show (writer, director, run dates)
         * ...........................................................................
         */
        protected _createShowStatistics(): void {
            if (!this._elems.showStats) {
                this._elems.showStats = KIP.createElement({ cls: "showStats", parent: this._elems.show });
            } else {
                this._elems.showStats.innerHTML = "";
            }

            // quit if there is no additional show data to show
            if (!this._showData) { return; }

            // writer / director
            if (this._showData.showTitle.writer === this._showData.showTitle.director) {
                this._createShowStatistic("Written + Directed by", this._showData.showTitle.writer);
            
            // writer + director individually
            } else {
                this._createShowStatistic("Written by", this._showData.showTitle.writer);
                this._createShowStatistic("Directed by", this._showData.showTitle.director);
            }

            // run dates
            let runData: string = KIP.format("{0} - {1}", KIP.Dates.shortDate(this._showData.run.start), KIP.Dates.shortDate(this._showData.run.end));
            this._createShowStatistic("Runs", runData);
        }

        /**...........................................................................
         * _createShowStatistic
         * ...........................................................................
         * Creates a label + data elem for the stats section of the show header
         * 
         * @param   lbl     Label for the stat
         * @param   data    Data for the stat
         * 
         * @returns Created element for this statistic
         * ...........................................................................
         */
        protected _createShowStatistic(lbl: string, data: string): HTMLElement {
            let comboElem: HTMLElement = KIP.createElement({
                id: this._showData.showTitle.id + "|combo", 
                cls: "combo",
                parent: this._elems.showStats
            });

            if (!data) { return comboElem; }
            
            let comboLbl: HTMLElement = KIP.createElement({cls: "lbl", content: lbl + ":", parent: comboElem});
            let comboData: HTMLElement = KIP.createElement({cls: "datum", content: data, parent: comboElem });

            return comboElem;
        }
        //#endregion

        //#region SWITCH BETWEEN HEADER MODES

        /**...........................................................................
         * displayAsShow
         * ...........................................................................
         * Switches to the show specific version of the header
         * 
         * @param   show    The show to display
         * ...........................................................................
         */
        public displayAsShow(show: Show): void {
            if (this._showData === show) { return; }

            // in the off chance we are switching between one show to another, 
            // clear out the old UI first
            if (this._showData) {
                this.displayAsHome();
            }

            // set the new data & update the UI for it
            this._showData = show;
            this._updateShowElements();

            // update the show specific elements
            this._changeShowVisibility();

            // update the menu elements
            this._swapMenu();
        }

        /**...........................................................................
         * displayAsHome
         * ...........................................................................
         * Switches to the home specific version of the header
         * ...........................................................................
         */
        public displayAsHome(): void {
            if (!this._showData) { return; }
            this._showData = null;

            // update the show specific elements
            this._changeShowVisibility();

            // update the menu elements
            this._swapMenu();
        }

        /**...........................................................................
         * _updateShowElements
         * ...........................................................................
         * Make sure the show side of the header reflects the new data
         * ...........................................................................
         */
        protected _updateShowElements (): void {
            this._createShowElements();
        }

        /**...........................................................................
         * _swapMenu
         * ...........................................................................
         * Swap to the appropriate menu, based on whether we have show data
         * ...........................................................................
         */
        protected _swapMenu () : void {

            // show the show menu if we have a show
            if (this._showData) {

                KIP.addClass(this._elems.homeMenuElems, "hidden");
                KIP.removeClass(this._elems.showMenuElems, "hidden");
                
            // otherwise, show the home menu
            } else {
                KIP.removeClass(this._elems.homeMenuElems, "hidden");
                KIP.addClass(this._elems.showMenuElems, "hidden");
            }
        }

        /**...........................................................................
         * _changeShowVisibility
         * ...........................................................................
         * Hide or show the regular show element
         * ...........................................................................
         */
        protected _changeShowVisibility(): void {

            // if we have a show, show the details
            if (this._showData) {

                KIP.removeClass(this._elems.show, "fade");
                KIP.transition(
                    this._elems.show,
                    {  maxWidth: "0", opacity: "0"},
                    { maxWidth: "calc(<width> - 20px)", opacity: "1"},
                    ANIMATION_TIME
                ).then(() => {
                    this._notifyListeners();
                });

                KIP.addClass(this._elems.base, "showVisible");
            
            // show just the home elements
            } else {
                KIP.transition(
                    this._elems.show,
                    { maxWidth: "<width>", opacity: "1" },
                    { maxWidth: "0", opacity: "0" },
                    ANIMATION_TIME
                ).then(() => {
                    KIP.addClass(this._elems.show, "fade");
                    this._notifyListeners();
                });
                KIP.removeClass(this._elems.base, "showVisible");
            }

            scrollTo("header", 0, true);
        }

        //#endregion

        /**
         * allow other classes to ask for updates when the size of the header changes
         * @param listener 
         */
        public registerListener(listener) : void {
            this._resizeListeners.push(listener);
        }

        /**
         * notify when a resize happened
         */
        protected _notifyListeners(): void {
            let listener: Function;
            for (listener of this._resizeListeners) {
                listener();
            }
        }
    }
}
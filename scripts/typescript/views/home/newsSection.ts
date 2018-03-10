namespace BST {
    /**...........................................................................
     * @class NewsSection
     * Contains recent news + information
     * @version 1.0
     * ...........................................................................
     */
    export class NewsSection extends SectionView {

        /** the data containing information about upcoming events */
        protected _data: INews[];

        protected readonly _NEWS_ITEMS: number = 3;

        protected static _uncoloredStyles: KIP.Styles.IStandardStyles = {

            ".newsItem .newsTitle" : {
                fontSize: "1.2em",
                color: "#555",
                fontFamily: "OpenSansBold"
            },

            ".authorDateWrapper": {
                fontSize: "0.8em",
                color: "#777",
                display: "flex",
                marginTop: "10px",
                marginBottom: "20px"
            },

            ".authorDateWrapper .newsAuthor" : {
                marginRight: "10px"
            },

            ".newsSection" : {
                overflow: "hidden"
            },

            ".newsSection.collapsed": {
                height: "0",
                
            },

            ".expandNews, .collapseNews": {
                marginTop: "10px",
                marginBottom: "10px",
                cursor: "pointer",
                fontSize: "0.8em",
                fontFamily: "OpenSansBold",
                textAlign: "right"
            },

            ".expandNews:hover, .collapseNews:hover": {
                textDecoration: "underline"
            },

            ".expandNews + .collapseNews + .newsSection.collapsed + .expandNews": {
                display: "none"
            },

            ".newsSection a": {
                color: "#36A",
                margin: "0"
            }
        }

         /**...........................................................................
          * _createSectionElements
          * ...........................................................................
          * 
          * ...........................................................................
          */
        protected _createSectionElements(): void {

            this._elems.base.style.marginTop = window.innerHeight + "px";

            // make sure the all of the sections are sorted for display
            this._data = this._data.sort((a: INews, b: INews) => {

                // check for importance first
                if (a.isImportant && !b.isImportant) { return -1; }
                else if (!a.isImportant && b.isImportant) { return 1; }

                // if the importance level is the same, just compare dates
                if (a.date > b.date) { return -1; }
                if (b.date > a.date) { return 1; }
                return 0;
            });

            // loop through our news & use it to create the individual items
            for (let i = 0; i < this._data.length; i += this._NEWS_ITEMS) {
                let lastIdx: number = Math.min(this._NEWS_ITEMS + i, this._data.length);
                this._createNewsSection(this._data.slice(i, lastIdx), i !== 0);
            }
        }

        protected _createNewsSection(newsItems: INews[], isCollapsed?: boolean): void {

            // create the section that can expand collapse
            let section: HTMLElement = KIP.createElement({
                cls: "newsSection" + (isCollapsed? " collapsed" : "")
            });

            // add the individual news elements
            let newsItem: INews;
            for (newsItem of newsItems) {
                let newsElem: HTMLElement = this._createNewsItem(newsItem);
                section.appendChild(newsElem);
            }

            // add an expand section if we need it
            if (isCollapsed) { 
                let expandLink: HTMLElement = KIP.createElement({
                    cls: "expandNews",
                    content: "SEE MORE",
                    parent: this._elems.content
                });

                let collapseLink: HTMLElement = KIP.createElement({
                    cls: "collapseNews hidden",
                    content: "SEE LESS",
                    parent: this._elems.content
                });

                expandLink.addEventListener("click", () => {
                    this._expand(section, expandLink, collapseLink);
                });

                collapseLink.addEventListener("click", () => {
                    this._collapse(section, expandLink, collapseLink);
                });
            }

            // actually add the section to the content
            this._elems.content.appendChild(section);
        }

        /**...........................................................................
         * _createNewItem
         * ...........................................................................
         * create an individual news item 
         * 
         * @param   newsItem
         * ...........................................................................
         */
        private _createNewsItem (newsItem: INews): HTMLElement {

            // Create the main text of the news item
            let title: HTMLElement = KIP.createSimpleElement("", "newsTitle", newsItem.title);
            let content: HTMLElement = KIP.createSimpleElement("", "newsContent", newsItem.content);

            // Create the meta details
            let author: HTMLElement = KIP.createSimpleElement("", "newsAuthor", newsItem.author);
            let date: HTMLElement = KIP.createSimpleElement("", "newsDate", KIP.Dates.shortDate(newsItem.date));
            let authorDateWrapper : HTMLElement = KIP.createSimpleElement("", "authorDateWrapper", "", null, [author, date]);

            // Add all to a single element
            let elem: HTMLElement = KIP.createSimpleElement("", "newsItem", "", null, [title, content, authorDateWrapper]);

            return elem;
        }

        protected _expand(section: HTMLElement, expandLink: HTMLElement, collapseLink: HTMLElement): void {
            KIP.removeClass(section, "collapsed");
            KIP.transition(section, { height: "0", maxHeight: "auto" }, { height: "<height>" }, 500).then(() => {
                KIP.removeClass(collapseLink, "hidden");
                KIP.addClass(expandLink, "hidden");
            });
        }

        protected _collapse(section: HTMLElement, expandLink: HTMLElement, collapseLink: HTMLElement): void {
            KIP.transition(section, { height: "<height>" }, { height: "0" }, 500).then(() => {
                KIP.addClass(section, "collapsed");
                KIP.addClass(collapseLink, "hidden");
                KIP.removeClass(expandLink, "hidden");
            });
        }

        protected _onResize(): void {
            super._onResize();
            let marginTop: number = window.innerHeight;
            if (this._isMobile) {
                marginTop *= 0.9;
            }
            this._elems.base.style.marginTop = (marginTop + "px");
        }
    }
}
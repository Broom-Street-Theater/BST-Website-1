namespace BST {

    /**...........................................................................
     * @class ShowView
     * 
     * @version 1.0
     * ...........................................................................
     */
    export class ShowView extends View{
        protected _data: Show

        protected static _uncoloredStyles: KIP.Styles.IStandardStyles = {
            
        }

        /**...........................................................................
         * Create the view particular for a show
         * @param show 
         * ...........................................................................
         */
        constructor (show: Show) {
            super();
            this._data = show;
            this._createElements();
        }

        /** ...........................................................................
         * _createElements
         * ...........................................................................
         * create all of the elements needed for a show page
         * ...........................................................................
         */
        protected _createElements (): void {
            if (!this._data) { return; }

            // BUILD NAVBARS AND PHOTO DISPLAY
            //let header: HeaderView = this._createShowHeader();
            
            // BUILD SHOW SECTIONS
            let synopsisSection: SynopsisSection = this._createSynopsisSection();
            let bioSection: BioSection = this._createBioSection();    
            let buzzSection: BuzzSection = this._createBuzzSection();
            //let ticketSection: TicketSection = this._createTicketSection();
            let ticketSection: SimpleTicketSection = this._createSimpleTicketSection();

            // BUILD THE PHOTOS
            let photos: PhotoLoopView = this._createPhotos();
            //let photos: ScrollableShowPhotos = this._createScrollablePhotos();

            let children: HTMLElement[] = [];
            //children.push(header.base);
            children.push(photos.base);
            children.push(synopsisSection.base);
            if (this._data.shouldShowBioSection()) { children.push(bioSection.base); }
            if (this._data.shouldShowBuzzSection()) { children.push(buzzSection.base); }
            if (this._data.shouldShowTicketSection()) { children.push(ticketSection.base); }

            // CREATE THE SHOW PAGE
            this._elems.base = KIP.createSimpleElement(
                this._data.showTitle.id +"|show", 
                "show", 
                "", 
                null, 
                children
            );

            //setupPhotoScrolling (photos.photos, [subNavBar.base, synopsisSection.base, bioSection.base, reviewSection.base, ticketSection.base]);

        //     let sections: HTMLElement[] = [];
        //    // sections = sections.concat(photos.photos);
        //     sections.splice(1,0,synopsisSection.view);
        //     sections.splice(3,0,bioSection.view);
        //     sections.splice(5,0,buzzSection.view);
        //     sections.splice(7,0,ticketSection.view)
        //     sectionScroll(sections);

        }

        private _createPhotos(): PhotoLoopView {
            let photos: PhotoLoopView = new PhotoLoopView(this._data);
            return photos;
        }

        private _createScrollablePhotos(): ScrollableShowPhotos {
            let photos: ScrollableShowPhotos = new ScrollableShowPhotos(this._data.photos);
            return photos;
        }

        // private _createShowHeader(): HeaderView {
        //     let header: HeaderView = new HeaderView(this._data);
        //     return header;
        // }

        private _createSynopsisSection(): SynopsisSection {
            let synopsisSection: SynopsisSection = new SynopsisSection(this._data.showTitle.id + "|synopsis", "SYNOPSIS", "synopsis");
            synopsisSection.data = this._data;
            return synopsisSection;
        }

        private _createBioSection(): BioSection {
            let bioSection: BioSection = new BioSection(this._data.showTitle.id + "|bios", "BIOS", "bios");
            bioSection.data = this._data.bios;
            return bioSection;
        }

        private _createBuzzSection(): BuzzSection {
            let buzzSection: BuzzSection = new BuzzSection(this._data.showTitle.id + "|buzz", "BUZZ", "buzz");
            buzzSection.data = this._data.reviews;
            return buzzSection;
        }

        private _createTicketSection(): TicketSection {
            let section: TicketSection = new TicketSection(this._data.showTitle.id + "|tix", "GET TICKETS", "tix");
            section.data = this._data;
            return section;
        }

        private _createSimpleTicketSection(): SimpleTicketSection {
            let section: SimpleTicketSection = new SimpleTicketSection(this._data.showTitle.id + "|tix", "GET TICKETS", "tix");
            section.data = this._data.showTitle.bptLink;
            return section;
        }
        
    }
}
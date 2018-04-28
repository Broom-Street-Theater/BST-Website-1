namespace BST {

    /** how quickly we should scroll between photos */
    const SCROLL_SPEED: number = 5000;

    /** handle transitioning */
    const TRANSITION_SPEED: number = 1000;

    /** the opacity to use when an image isn't centered */
    const UNCENTERED_OPACITY: string = "0.2";

    /**...........................................................................
     * @class PhotoLoopView
     * ...........................................................................
     * Allow show photos to loop through
     * @version 1.0
     * @author  Kip Price
     * ...........................................................................
     */
    export class PhotoLoopView extends View {

        /** keep track of the cental photo */
        private _center: LinkedPhoto;

        /** keep track of the photos we should be showing */
        protected _data: IShowData;

        /** if true, loop through the photos */
        private _looped: boolean;

        /** allow the trailer to be hosted in the scrolling photo view */
        private _trailer: TrailerView;

        /** styles to use for the photo element */
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles = {
            ".showPhotos" : {
                display: "flex",
                justifyContent: "space-around",
                position: "fixed",
                left: "0",
                top: "85px",
                width: "100%",
                zIndex: "-1",
                overflow: "hidden",
                height: "calc(100% - 85px)"
            },

            ".showPhotos.mobile": {
                top: "200px",
                height: "calc(100% - 200px)"
            },
            
            ".showPhotos > div > img": {
                height:"100%",
                width: "auto"
            },
            
            ".showPhotoWrapper": {
                height: "100%",
                position: "absolute",
                transition: "1s ease-in-out all",
                display: "flex",
                justifyContent: "center",
                opacity: "0.2"
            },
            
            ".showPhotoWrapper.center": {
                opacity: "1",
                boxShadow: "1px 1px 15px 7px rgba(0,0,0,.3)"
            }
        }

        /**...........................................................................
         * Create the element that can scroll through show photos
         * @param   show 
         * ...........................................................................
         */
        constructor(show: IShowData) {
            super();
            this._data = show;
            this._center = null;
            this._createElements();
        }

        /**...........................................................................
         * _createPhotos
         * ...........................................................................
         * Create the photo elements we will be scrolling through
         * ...........................................................................
         */
        protected _createElements(): void {

            // grab the appropriate view
            this._elems.base = KIP.createSimpleElement(this._data.showTitle.id + "|showPhotos", "showPhotos");

            // quit if there is not enough data
            if (!this._data) { return; }
            if ((this._data.photos.length === 0) && (!this._data.trailer)) { return; }

            // if we have a trailer, create a trailer photo
            if (this._data.trailer) {
                this._createTrailer(this._data.trailer, true);
            }

            // loop through all photos and create the elements
            let photo: IPhoto;
            for (let i = 0; i < this._data.photos.length; i += 1) {
                photo = this._data.photos[i];
                this._createPhoto(photo, ((i === 1) && (!this._data.trailer)));
            }

            if (this._data.photos.length > 1) {

                // if we only have two photos, do some duplication so it still scrolls nicely
                if (this._data.photos.length < 4) {
                    for (photo of this._data.photos) {
                        this._createPhoto(photo);
                    }
                }

                if (this._data.photos.length < 3) {
                    for (photo of this._data.photos) {
                        this._createPhoto(photo);
                    }
                }
            }

            // finish the loop
            this._finalizeLoop();

            // actually center the appropriate photo
            window.setTimeout(() => { this._tryInitialize(); }, 10);
        }

        private _tryInitialize(): void {
            if (this._center.displayElem.offsetHeight <= 1) {
                window.setTimeout(() => { this._tryInitialize(); }, 10);
                return;
            } else {
                window.setTimeout(() => {
                    this._center.center();
                    window.setTimeout(() => { this._rotate(); }, SCROLL_SPEED);
                    slowScroll(this.base);
                }, 200);
            }

            
        }

        /**...........................................................................
         * _createPhoto
         * ...........................................................................
         * create an individual photo for the show 
         * ...........................................................................
         */
        private _createPhoto(photo: IPhoto, shouldBeCenter?: boolean): void {

            // create element
            let photoElem: HTMLImageElement = new Image();
            photoElem.src = photo.url;

            KIP.createElement({
                type: "img",
                attr: {
                    "src": photo.url,
                },
                cls: "showPhoto"
            });
            let wrapper: HTMLElement = KIP.createSimpleElement("", "showPhotoWrapper", "", null, [photoElem]);
            wrapper.style.left = window.innerWidth + "px";

            // create the linked piece of the photo & add it
            let linkedPhoto: LinkedPhoto = new LinkedPhoto(wrapper);
            this._insertNode(linkedPhoto);

            // add the element to the view
            this.base.appendChild(wrapper);

        }

        private _createTrailer(trailerData: ITrailer, shouldBeCenter?: boolean): void {
            let linkedTrailer: LinkedTrailer = new LinkedTrailer(trailerData);
            this._insertNode(linkedTrailer);
            this.base.appendChild(linkedTrailer.trailerView.base);
        }

        /**...........................................................................
         * _insertNode
         * ...........................................................................
         * add a node into the list 
         * @param   node    The node to add
         * ...........................................................................
         */
        private _insertNode(node: LinkedPhoto): void {

            let curNode: LinkedPhoto = this._center;

            // set the center if it is unset
            if (curNode === null) {
                this._center = node;
                return;
            }

            while (curNode.next !== null) {
                curNode = curNode.next;
            }

            // Hook up the two elements
            curNode.next = node;
            node.previous = curNode;

        }

        /**...........................................................................
         * _finalizeLoop
         * ...........................................................................
         *  link the first and last nodes together 
         * ...........................................................................
         */
        private _finalizeLoop(): void {
            if (this._looped) { return; }
            if (!this._center) { return; }

            let firstNode: LinkedPhoto = this._center;
            if (!firstNode) { return; }
            while (firstNode.previous !== null) {
                firstNode = firstNode.previous;
            }

            let lastNode = this._center;
            while (lastNode.next !== null) {
                lastNode = lastNode.next;
            }

            if (firstNode === lastNode) { return; }

            firstNode.previous = lastNode;
            lastNode.next = firstNode;

            this._looped = true;
        }

        /**...........................................................................
         * _rotate
         * ...........................................................................
         * Rotate to the next photo
         * ...........................................................................
         */
        private _rotate(): void {
            if (!this._center.next) { return; }
            if (!(this._center as LinkedTrailer).isPlaying) { return; }
            this._center = this._center.next;
            this._center.center();

            window.setTimeout(() => {
                this._rotate();
            }, SCROLL_SPEED);
        }
    }

    /**...........................................................................
     * @class LinkedPhoto
     * ...........................................................................
     * Keep track of a photo that displays in the scrolling display
     * @version 1.0
     * @author  Kip Price
     * ...........................................................................
     */
    export class LinkedPhoto {

        //#region PROPERTIES
        protected static _count : number = 0;

        /** element for the photo itself */
        private _displayElem: HTMLElement;
        public get displayElem(): HTMLElement { return this._displayElem; }

        /** keep track of the photo that should come next */
        private _next: LinkedPhoto;
        public set next(next: LinkedPhoto) { this._next = next; }
        public get next(): LinkedPhoto { return this._next; }

        /** keep track of the photo that came before */
        private _previous: LinkedPhoto;
        public set previous(previous: LinkedPhoto) { this._previous = previous; }
        public get previous(): LinkedPhoto { return this._previous; }

        protected _shiftedCount: number;

        protected _id: number;

        //#endregion

        /**...........................................................................
         * Create the linked photo object
         * @param   photo   The photo to display for this node
         * ...........................................................................
         */
        constructor(photo: HTMLElement) {
            this._id = LinkedPhoto._count;
            LinkedPhoto._count += 1;

            this._displayElem = photo;
            this._next = null;
            this._previous = null;
            this._shiftedCount = 0;
        }

        //#region MOTION CONTROLS
        /**...........................................................................
         * center
         * ...........................................................................
         * Recenter the photo while additionally adjusting which photo is in the middle
         * ...........................................................................
         */
        public center(): void {

            let left: number = ((window.innerWidth - this._displayElem.offsetWidth) / 2);

            // first set my position
            this._displayElem.style.left = left + "px";
            this._displayElem.style.opacity = "1";
            KIP.addClass(this._displayElem, "center");
            this._shiftedCount += 1;

            // adjust my partners
            if (this._previous) { this._previous.moveLeft(); }
            if (this._next) { this._next.moveLeft(true); }
        }

        /**...........................................................................
         * moveLeft
         * ...........................................................................
         * Move this photo to the left
         * @param   lookToPrevious  If true, figure out how far our previous node is 
         *                          before moving
         * ...........................................................................
         */
        public moveLeft(lookToPrevious?: boolean): void {
            this._shiftedCount += 1;
            let left: number;

            // determine whether our left value should be based on our next or previous node
            if (lookToPrevious) {
                if (!this._previous) { return; }
                left = parseInt(this._previous.displayElem.style.left) + this._previous.displayElem.offsetWidth;
            } else {
                if (!this.next) { return; }
                left = parseInt(this._next.displayElem.style.left) - this._displayElem.offsetWidth;
            }

            // move this particular element
            this._displayElem.style.left = left + "px";
            this._displayElem.style.opacity = UNCENTERED_OPACITY;
            KIP.removeClass(this._displayElem, "center");

            // if we are completely offscreen, we should adjust it to the other side
            if (left + this._displayElem.offsetWidth <= 0) {
                this.moveRight();
            }
            
            // if we are the right hand side, adjust our next element
            if (left > (window.innerWidth / 2)) {
                //console.log("next: " + this.next._id + " (" + this.next._shiftedCount + " < " + this._shiftedCount + ")");
                window.setTimeout(() => { if (this.next._shiftedCount < this._shiftedCount) { this.next.moveLeft(true); } }, 0);

            // if we are the left hand side, adjust our previous element
            } else if (left < (window.innerWidth / 2)) {
                //console.log("previous: "  + this.previous._id + " (" + this.previous._shiftedCount + " < " + this._shiftedCount + ")");
                window.setTimeout(() => { if (this.previous._shiftedCount < this._shiftedCount) { this.previous.moveLeft(); } }, 0);

            }
        }

        /**...........................................................................
         * moveRight
         * ...........................................................................
         * Move this node to the right
         * ...........................................................................
         */
        public moveRight(): void {
            if (!this._previous) { return; }
            
            // hide the element for the transition
            window.setTimeout( () => {
 
                this._displayElem.style.opacity = "0";

                // move and unhide the element
                window.setTimeout( () => {
                    // actually move the element
                    let position: number = parseInt(this._previous.displayElem.style.left) + this._previous.displayElem.offsetWidth;
                    this._displayElem.style.left = position + "px";

                    window.setTimeout( () => { 
                        this._displayElem.style.opacity = UNCENTERED_OPACITY;
                    }, TRANSITION_SPEED);
                }, TRANSITION_SPEED);
            }, TRANSITION_SPEED);
                
        }

        //#endregion
    }

    /**
     * @class   LinkedTrailer
     * 
     * Create the linked photo display of a trailer
     * @version 1.0.0
     * @author  Kip Price
     */
    export class LinkedTrailer extends LinkedPhoto {
        private _trailerView: TrailerView;
        public get trailerView(): TrailerView { return this._trailerView; }

        private _isPlaying: boolean;
        public get isPlaying(): boolean { return this._isPlaying; }

        constructor(trailerInfo: ITrailer) {
            let trailerView: TrailerView = new TrailerView();
            trailerView.data = trailerInfo;
            super(trailerView.base);
            this._trailerView = trailerView;

            this._trailerView.addPauseListeners(() => {
                this._isPlaying = false;
            });

            this._trailerView.addPlayListener(() => {
                this._isPlaying = true;
            });
        }
    }
}
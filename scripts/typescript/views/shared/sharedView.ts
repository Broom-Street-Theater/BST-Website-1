namespace BST {

    /**...........................................................................
     * IViewElements
     * ...........................................................................
     * Elements to display for the view. Overriding to specify that the base is an
     * HTML Element rather than another element
     * ...........................................................................
     */
    export interface IViewElements extends KIP.IDrawableElements {

        /** base element for the View */
        base: HTMLElement;
    }

    /**...........................................................................
     * @class View
     * Shared class for handling all view types 
     * @version 1.0
     * ...........................................................................
     */
    export abstract class View extends KIP.Drawable {

        /** the data element that backs this View */
        protected _data: any; 

        /** the appropriate elements for this view */
        protected _elems: IViewElements;

        /** keep track of whether we're on a screen that should be considered mobile */
        protected _isMobile: boolean;
        
        /** the base element for this View */
        public get base(): HTMLElement { return this._elems.base; }

        constructor(objElem?: KIP.IElemDefinition) {
            super(objElem);
            this._registerResizeListener();
            window.setTimeout(() => { 
                this._updateMobileClasses();
                this._onResize();
            });
        }

        /**...........................................................................
         * _registerResizeListener
         * ...........................................................................
         * Handle resizing
         * ...........................................................................
         */
        protected _registerResizeListener(): void {
            window.addEventListener("resize", () => {
                this._updateMobileClasses();
                this._onResize();
            })
        }

        protected _updateMobileClasses(): void {
            KIP.removeClass(this._elems.base, "vertical");
            KIP.removeClass(this._elems.base, "mobile");
            KIP.removeClass(this._elems.base, "small");
            KIP.removeClass(this._elems.base, "med");
            KIP.removeClass(this._elems.base, "large");

            let dim: KIP.IDimensions = {
                width: window.innerWidth,
                height: window.innerHeight
            };

            console.log("reg width: " + dim.width);

            let ratio: number = (dim.width / dim.height);

            if (ratio < 1) { KIP.addClass(this._elems.base, "vertical"); }
            if (dim.width < 400) { KIP.addClass(this._elems.base, "small mobile")}
            else if (dim.width < 800) { KIP.addClass(this._elems.base, "med mobile"); }
            else if (dim.width < 1025) { KIP.addClass(this._elems.base, "large mobile"); }

            if (dim.width < 1025) { this._isMobile = true; }
        }

        /**...........................................................................
         * _shouldSkipCreateElements
         * ...........................................................................
         * Checks if we should prevent creating elements
         * 
         * @returns True if we should not create the elements
         * ...........................................................................
         */
        protected _shouldSkipCreateElements(): boolean {
            return (!this._data);
        }
    }

}
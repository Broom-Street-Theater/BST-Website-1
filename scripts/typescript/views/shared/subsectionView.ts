namespace BST {

    /**...........................................................................
     * ISubSectionElems
     * ...........................................................................
     * Keep track of elements for the subsection
     * ...........................................................................
     */
    export interface ISubSectionElems extends ISectionElems {

        /** the tab element to show for the subsection */
        tab: HTMLElement;
    }

    /**...........................................................................
     * @class SubSection
     * ...........................................................................
     * Creates a subsection for display
     * @version 1.1
     * ...........................................................................
     */
    export abstract class SubSection<T> extends View {

        /** styles specific to subsections */
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles = {
            ".subsection" : {
                display: "inline-block",
                maxWidth: "50%",
                boxSizing: "border-box",
                verticalAlign: "top"
            },
            
            ".subsection + .subsection" : {
                paddingLeft: "40px"
            }, 

            ".subsection .subheader" : {
                fontSize: "1.5em",
                fontFamily: "OpenSansBold",
                textTransform: "uppercase",
                marginTop: "10px",
                marginBottom: "5px"
            },

            ".mobile .subsectionView": {
                marginTop: "2vh"
            }
        }

        /** grab the tab for this particular element */
        public get tab(): HTMLElement { return this._elems.tab; }

        /** grab the content element */
        public get content(): HTMLElement { return this._elems.content; }

        /** keep track of the data for this particular subsection */
        protected _data: T;

        /** keep a hold of the name of the tab */
        private _name: string;

        /** keep track of the elements for this drawable */
        protected _elems: ISubSectionElems;

        /** keep track of this individual  */
        protected _index: number;
        public get index(): number { return this._index; }
        public set index(idx: number) { this._index = idx; }

        /**...........................................................................
         * Creates a subsection element
         * 
         * @param   data    Data to shows as a part of this subsection
         * @param   name    The name of the subsection tab
         * ........................................................................... 
         */
        constructor(data: T, name: string) {
            super();
            this._data = data;
            this._name = name;
            this._createElements();
        }

        /**...........................................................................
         * _createElements
         * ...........................................................................
         * Create the elements for the subsection
         * ...........................................................................
         */
        protected _createElements() {
            this._elems.tab = KIP.createSimpleElement("", "tab", this._name);
            this._createContent();
            this._elems.base = KIP.createSimpleElement("", "subsectionView hidden", "", null, [this._elems.content]);
        }

        /**...........................................................................
         * _createContent
         * ...........................................................................
         * Abstract function for all subsections to implement for particular
         * ...........................................................................
         */
        protected abstract _createContent(): void;

        /**...........................................................................
         * select
         * ...........................................................................
         * show a particular section 
         * ...........................................................................
         */
        public select(): void {
            KIP.removeClass(this._elems.base, "hidden");
            KIP.transition(this._elems.base, { opacity: "0 !important", maxHeight: "0" }, { opacity: "1 !important", maxHeight: "<height>" }, 400, 200).then(() => {
                KIP.addClass(this._elems.tab, "selected");
            });

        }

        /**...........................................................................
         * deselect
         * ...........................................................................
         * hide a particular subsection 
         * ...........................................................................
         */
        public deselect(): void {
            KIP.removeClass(this._elems.tab, "selected");
            KIP.transition(this._elems.base, { opacity: "1", maxHeight: "<height>" }, { opacity: "0 !important", maxHeight: "0" }, 400).then(() => {
               KIP.addClass(this._elems.base, "hidden"); 
            });
        }



    }
}
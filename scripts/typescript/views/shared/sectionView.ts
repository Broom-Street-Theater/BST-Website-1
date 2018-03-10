namespace BST {
    export abstract class SectionView extends View {

        /** ID for the section */
        protected _id: string;

        /** title of the section */
        protected _title: string;

        /** CSS class to use for the section (in addition to standard classes) */
        protected _class: string;

        /** Background image for  */
        protected _bgImage: string;

        /** content contained within the section */
        protected _data: any;
        public set data(data: any) {
            this._setData(data);
        }

        protected _setData(data: any): void {
            this._data = data;
            if (!this._elems.base) {
                this._createElements();
            }
            this._createSectionElements();
        }

        protected _elems: ISectionElems;

        protected static _uncoloredStyles: KIP.Styles.IStandardStyles = {
            ".section": {
                    position: "relative",
                    backgroundColor: "#FFF",
                    color: "#222",
                    paddingLeft: "30%",
                    paddingRight: "30%",
                    fontFamily: "OpenSansLight",
                    wordWrap: "break-word",
                    boxShadow: "0px 1px 15px 8px rgba(0, 0, 0, .2)",
                    paddingTop: "15px",
                    paddingBottom: "15px",
                    zIndex: "1",
                    margin: "20px 0",
                    boxSizing: "border-box",
                    width: "100%"
                },

                ".mobile .section": {
                    paddingLeft: "4vw",
                    paddingRight: "4vw",
                    fontSize: "2em",
                    paddingBottom: "2vh"
                },

                ".section .sectionTitle": {
                    fontSize: "2em",
                    fontFamily: "OpenSansBold",
                    color: "#23262b"
                }
            }

/** 
 * create a section 
 * 
 * @param   id
 * @param   title
 * @param   addlClass
 */
constructor(id: string, title: string, addlClass: string) {
    super();

    this._id = id;
    this._title = title;
    this._class = addlClass;
}

        /** 
         * handle the creation of the base section elements 
         */
        protected _createElements(): void {

    // Create the appropriate class
    let cls: string = "section";
    if(this._class) { cls += " " + this._class; }

            // Create the elements we need
            let elem: HTMLElement = KIP.createSimpleElement(this._id, cls);
    let titleElem: HTMLElement = KIP.createSimpleElement(this._id + "|title", "sectionTitle", this._title, null, null, elem);
    let contentElem: HTMLElement = KIP.createSimpleElement(this._id + "|content", "sectionContent", "", null, null, elem);

    // Save off the elements to our general array
    this._elems = {
        base: elem,
        title: titleElem,
        content: contentElem
    };
}
    
        protected abstract _createSectionElements(): void;

    }
}
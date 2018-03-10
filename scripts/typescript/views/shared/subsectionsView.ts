namespace BST {

    /**...........................................................................
     * ISubSectionElems
     * ...........................................................................
     * Elements that will be displayed for this set of subsections
     * ...........................................................................
     */
    export interface ISubSectionsElems extends IViewElements {

        /** tabs for all of the subsections */
        tabs: HTMLElement;

        /** content for the currently selected sub section */
        contentPane: HTMLElement;
    }

    /**...........................................................................
     * @class SubSections
     * Keep track of several subsection elements
     * @version 1.0
     * ...........................................................................
     */
    export class SubSections extends View{
        
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles = {
            ".subsectionContent": {
                transition: "all ease-in-out .3s",
                
            },

            ".tabContainer" : {
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
                marginTop: "10px",
                fontFamily: "OpenSansBold",

                nested: {
                    ".tab" : {
                        cursor: "pointer",
                        transition: ".08s ease-in-out all",
                        color: "#666",
                        whiteSpace: "nowrap",

                        nested: {
                            "&.tab:hover": {
                                transform: "scale(1.1)",
                                textDecoration: "underline",
                                color: "#333"
                            },

                            "&.tab.selected": {
                                transform: "scale(1.1)",
                                textDecoration: "underline",
                                color: "#333"
                            }
                        }
                    },
                }
            },

            ".mobile": {
                nested: {
                    ".subsectionContainer": {
                        display: "flex",
                    
                        nested: {
                            ".tabContainer" : {
                                flexDirection: "column",
                                marginRight: "25px",
                                textAlign: "right",
                                justifyContent: "flex-start",

                                nested: {
                                    ".tab": {
                                        fontSize: "0.8em",
                                        marginBottom: "25px"
                                    }
                                }
                            },

                            ".subsectionContent": {
                                borderLeft: "1px dotted rgba(0,0,0,.5)",
                                paddingLeft: "20px",

                                nested: {
                                    ".subsectionView": {
                                        marginTop: "0"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        protected _elems: ISubSectionsElems;
        private _subsections: SubSection<any>[];
        private _currentSelection: number;

        constructor () {
            super();
            this._subsections = [];
            this._currentSelection = null;
            this._createElements();
        }

        /**...........................................................................
         * _createElements
         * ...........................................................................
         * Create elements for the subsections
         * ...........................................................................
         */
        protected _createElements(): void {
            this._elems.tabs = KIP.createSimpleElement("", "tabContainer");
            this._elems.contentPane = KIP.createSimpleElement("", "subsectionContent");
            this._elems.base = KIP.createSimpleElement("", "subsectionContainer", "", null, [this._elems.tabs, this._elems.contentPane]);
        }

        /**...........................................................................
         * addSubSections
         * ...........................................................................
         * Add a set of subsections to this element
         * 
         * @param   subsections     Any number of subsections that should be added
         * ...........................................................................
         */
        public addSubSections (...subsections: SubSection<any>[]) : void {
            let subsection: SubSection<any>;
            for (subsection of subsections) {
                this.addSubSection(subsection);
            }
        }

        /**...........................................................................
         * addSubSection
         * ...........................................................................
         * add a subsection to our collection 
         * @param   subsection  The subsection to add
         * ...........................................................................
         */
        public addSubSection (subsection: SubSection<any>) : void {
            subsection.index = this._subsections.length;
            this._subsections.push(subsection);
            subsection.tab.addEventListener("click", (e: MouseEvent) => {
                this.selectTab(subsection.index);
            });

            // if this is the first subsection, select it
            if (this._subsections.length === 1) {
                this.selectTab(0);
            }

            // add to our view
            this._elems.contentPane.appendChild(subsection.base);
            this._elems.tabs.appendChild(subsection.tab);
        }

        /**...........................................................................
         * selectTab
         * ...........................................................................
         * selects the appropriate tab 
         * @param   index   The index of the subsection to select
         * ...........................................................................
         */
        public selectTab (index: number): void {

            if (index === this._currentSelection) { return; }
            
            // handle the currently selected section
            let selectedSection: SubSection<any>;
            if (this._currentSelection !== null) {
                selectedSection = this._subsections[this._currentSelection];
            }

            if (selectedSection) {
                selectedSection.deselect();
            }

            // select the new section
            let newSection: SubSection<any> = this._subsections[index];
            if (newSection) {
                newSection.select();
                this._currentSelection = index;
            }

            //this._contentPane.style.marginLeft = (index * -100) + "%";
        }

        
    }
}
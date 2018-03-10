namespace BST {

    /**...........................................................................
     * @class ResourcesSection
     * ...........................................................................
     * Keep track of the resources offered by Broom Street
     * @version 1.0
     * ...........................................................................
     */
    export class ResourcesSection extends SectionView {

        /** resources to show in this section */
        protected _data: IResource[];

        /** styles for the resources section */
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles = {
            ".resources .sectionContent": {
                display: "flex",
                flexWrap: "wrap"
            },

            ".resource": {
                width: "33%",
                marginTop: "10px",
                paddingLeft: "10px",
                paddingRight: "10px",
                boxSizing: "border-box"
            },

            ".resource .resourceTitle": {
                fontSize: "1.1em",
            },

            ".resources .resource a.resourceTitle": {
                color: "#333",
                marginLeft: "0",
                marginRight: "0",
                fontFamily: "OpenSans"
            },

            ".resource .resourceContent": {
                fontSize: "0.9em",
                marginTop: "5px",
                color: "#555"
            },

            ".mobile .resource": {
                paddingBottom: "2vh",
                width: "50%"
            }
        }

        /**...........................................................................
         * _createSectionElements
         * ...........................................................................
         * Create the section elements for resources
         * ...........................................................................
         */
        protected _createSectionElements(): void {
            let resource: IResource;
            for (resource of this._data) {
                this._createResource(resource);
            }
        }

        /**...........................................................................
         * _createResource
         * ...........................................................................
         * Create an individual resource
         * 
         * @param   data    The resource we're creating
         * ...........................................................................
         */
        protected _createResource(data: IResource): void {
            let resourceConatiner: HTMLElement = KIP.createElement({
                cls: "resource", 
                parent: this._elems.content,
                children: [
                    {
                        cls: "resourceTitle",
                        type: "a",
                        attr: {
                            href: data.link,
                            target: "_blank"
                        },
                        content: data.name
                    },

                    {
                        cls: "resourceContent",
                        content: data.content
                    }
                ]

            });
        }
    }
}
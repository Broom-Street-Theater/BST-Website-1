namespace BST {

    /**...........................................................................
     * @class DonateSection
     * ...........................................................................
     * Create the section to collect donations for BST
     * @version 1.0
     * ...........................................................................
     */
    export class DonateSection extends SectionView {

        /** the data contained for the donation section */
        protected _data: IDonateInfo;

        /** styles to use for this section  */
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles = {
            ".donate .donateBlurb a": {
                color: "#333",
                marginLeft: "0",
                marginRight: "0"
            },

            ".donate .paypal": {
                marginTop: "5%",
                display: "flex",
                justifyContent: "center"
            },

            ".donate.mobile .paypal .paypalInner": {
                transform: "scale(2.5)",
                marginTop: "4vh",
                marginBottom: "3vh"
            }
        }

        /**...........................................................................
         * _createSectionElements
         * ...........................................................................
         * Create the elements for the section
         * ...........................................................................
         */
        protected _createSectionElements(): void {
            
            let blurb: HTMLElement = KIP.createElement({
                cls: "donateBlurb",
                content: this._data.blurb,
                parent: this._elems.content
            });

            this._createPaypalElement();
        }

        /**...........................................................................
         * _createPayPalElement
         * ...........................................................................
         * Create the link to Paypal so people can in fact donate
         * ...........................................................................
         */
        protected _createPaypalElement(): void {
            let paypalLink: HTMLElement = KIP.createElement({
                type: "form",
                cls: "paypalInner",
                attr: {
                    action: "https://www.paypal.com/cgi-bin/webscr",
                    method: "post",
                    target: "_top"
                },
                children: [
                    { 
                        type: "input", 
                        attr: {
                            type: "hidden",
                            name: "cmd",
                            value: "_s-xclick"
                        }
                    },

                    {
                        type: "input",
                        attr: {
                            type: "hidden",
                            name: "hosted_button_id",
                            value: this._data.paypalAccount
                        }
                    },

                    {
                        type: "input",
                        attr: {
                            type: "image",
                            src: "https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif",
                            border: "0",
                            name: "submit",
                            alt: "PayPal - The safer, easier way to pay online!"
                        }
                    },

                    {
                        type: "img",
                        attr: {
                            alt: "",
                            border: "0",
                            src: "https://www.paypalobjects.com/en-US/i/scr/pixel.gif",
                            width: "1",
                            height: "1"
                        }
                    }
                ]
            });

            let paypalWrapper: HTMLElement = KIP.createElement({
                cls: "paypal",
                parent: this._elems.content,
                children: [paypalLink]
            });

        }
    }
}
namespace BST {

    /**
     * Section for reviews
     * @version 1.0
     */
    export class BuzzSection extends SectionView {

        /** the actual reviews */
        protected _data: IReviewData[];
        protected _setData (data: IReviewData[]) {
            super._setData(data);
            if (!this._data || (this._data.length === 0)) {
                KIP.addClass(this._elems.base, "hidden");
            }
        }

        /** create the elements needed by review sections */
        protected _createSectionElements (): void {
            let review: IReviewData;
            for (review of this._data) {
                let miniReview: HTMLElement = this._createReview(review);
                this._elems.content.appendChild(miniReview);
            }
        }
        
        /** create a review for a show */
        private _createReview(review: IReviewData): HTMLElement {
            let metaDetails: HTMLElement = this._createMetaDetails(review);                                                         // create the meta label
            let reviewElem: HTMLElement = KIP.createSimpleElement(this._id + "what", "what", review.review);                        // create the actual review
            let blurb: HTMLElement = KIP.createSimpleElement(this._id + "|blurb", "blurb", "", null, [metaDetails, reviewElem]);    // create the base element

            // return the elements that callers will need
            return blurb;
        }

        /** create the label on the side of a review, detailing where / when the review came from */
        private _createMetaDetails(review: IReviewData) : HTMLElement {
            let whoElem: HTMLElement = KIP.createSimpleElement(this._id + "|who", "who", review.reviewer);
            let whenElem: HTMLElement = KIP.createSimpleElement(this._id + "|when", "when", KIP.Dates.shortDate(review.date));
            let linkElem: HTMLElement = KIP.createElement({
                type: "a",
                attr: {
                    href: review.link
                },
                cls: "link",
                content: "Full Review"
            });
            let linkWrapper: HTMLElement = KIP.createSimpleElement(this._id + "|link", "link", "", null, [linkElem]);
            let whoWhenElem: HTMLElement = KIP.createSimpleElement(this._id + "|whoWhen", "whoWhen", "", null, [whoElem, whenElem, linkWrapper]);
            let whoWhenWrapper: HTMLElement = KIP.createSimpleElement("", "whoWhenWrapper", "", null, [whoWhenElem]);

            return whoWhenWrapper;
        }

    }
}
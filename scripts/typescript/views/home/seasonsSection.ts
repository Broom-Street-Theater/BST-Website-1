namespace BST {

    /**...........................................................................
     * ISeasonsElems
     * ...........................................................................
     * Keeps track of elements needed for displaying seasons data
     * ...........................................................................
     */
    export interface ISeasonElems extends ISectionElems {

        /** left hand pane */
        leftPane: HTMLElement;

        /** right hand pane */
        rightPane: HTMLElement;

        /** collect the various elements */
        wrapper: HTMLElement;

        /** allow the user to change the selected season */
        seasonSelector: HTMLElement;
    };

    export class SeasonsSection extends SectionView {

        /** elements for the section */
        protected _elems: ISeasonElems;

        /** keep track of the season the user selected */
        protected _selectedSeason: number;

        /** data about all seasons */
        protected _data: ISeasons;

        /** style the seasons section */
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles = {

        }

        /**...........................................................................
         * _createSectionElements
         * ...........................................................................
         * Create the elements needed for the section
         * ...........................................................................
         */
        protected _createSectionElements(): void {

            this._createSeasonSelector();

        }

        /**...........................................................................
         * _createSeasonSelector
         * ...........................................................................
         * Create the season selector menu
         * ...........................................................................
         */
        protected _createSeasonSelector(): void {
            this._elems.seasonSelector = KIP.createElement({
                cls: "seasonSelector"
            });



        }

        /**...........................................................................
         * _getSeasonElement
         * ...........................................................................
         * Get the element to select a particular season
         * 
         * @param   season  The season year to select
         * 
         * @returns The element for this particular element
         * ...........................................................................
         */
        protected _getSeasonElement(season: number): HTMLElement {
            return document.getElementById("season" + season);
        }
     }
}
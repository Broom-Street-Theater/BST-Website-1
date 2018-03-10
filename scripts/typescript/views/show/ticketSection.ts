namespace BST {

    /*...........................................................................
     * @class TicketSection
     * ...........................................................................
     * section keeping track of available tickets for a show
     * @version 1.0
     * ...........................................................................
     */
    export class TicketSection extends SectionView {
        protected _data: IShowData;

        protected _weekNum: number = 0;

        protected _ticketBtns: HTMLElement;

        private _selectedElement: HTMLElement;
        private static _COLORS: string[] = ["closed", "booked", "semi", "free"];
        private static _HEADERS: string[] = ["Thurs.", "Fri.", "Sat."];

        /** create the appropriate elements for the ticket section */
        protected _createSectionElements(): void {
            let tbl: HTMLElement = this._createDateGrid();
            let tix: HTMLElement = this._createTicketButtons();

            this._elems.content.appendChild(tbl);
            this._elems.content.appendChild(tix);
        }

        /**...........................................................................
         * _createDateGrid
         * ...........................................................................
         *  create the ticket date grid 
         * ...........................................................................
         */
        private _createDateGrid(): HTMLElement {

            let cells: HTMLElement[][] = [];

            // create the day headers
            cells[0] = this._createDayHeaders();

            // loop through the dates themselves
            let date: Date;
            for (date of this._data.runDates) {

                // Create the cell to store here
                let dayCell: HTMLElement = this._createDayCell(date);
                this._addDayToCellArray(dayCell, date, cells);

            }

            // actually construct the table with each of the cells
            try {
                let finalTable: HTMLElement = KIP.createTable(this._id + "|grid", "ticketDates", cells);
                return finalTable;
            } catch (e) {
                return KIP.createSimpleElement();
            }
        }


        /**...........................................................................
         * _createDayHeaders
         * ...........................................................................
         * create headers for each of the show days 
         * ...........................................................................
         */
        private _createDayHeaders(): HTMLElement[] {
            let out: HTMLElement[] = [];
            
            // Loop through the headers
            let header: string;
            for (header of TicketSection._HEADERS) {

                // create the header and add to the array
                let headerElem: HTMLElement = KIP.createSimpleElement("", "dateHeader", header);
                out.push(headerElem);
            }

            return out;
        }

        /**...........................................................................
         * _addDayToCellArray
         * ...........................................................................
         * add a day to the cell array
         * ...........................................................................
         */
        private _addDayToCellArray(dayCell: HTMLElement, date: Date, cells: HTMLElement[][]): void {
            let run: IRun = Helpers.getShowStartAndEndDates(this._data);

            // Calculate the week position
            let diff: number = KIP.Dates.dateDiff(run.end, date, false);
            if (!cells[this._weekNum]) { cells[this._weekNum] = []; }

            // Calculate the day position
            let day: number = date.getDay();

            if (day < 5) {
                this._weekNum += 1;
                cells[this._weekNum] = [];
            }

            // Add the cell to the array at the correct spot
            cells[this._weekNum][day - 4] = dayCell;
        }

        /** create a cell for a particular day */
        private _createDayCell(date: Date): HTMLElement {
            let dayCell: HTMLElement = KIP.createSimpleElement("", "date", date.getDate().toString());
            dayCell.addEventListener("click", () => {

                // Track whether this is the selected element
                let isThisSelected: boolean = (this._selectedElement === dayCell);

                // Unselect the selected element
                this._unselectCell();

                // Disable the ticket button if we're deselecting
                if (isThisSelected) {
                    this._disableTicketButtons();

                    // otherwise, make sure the ticket button is enabled
                } else {
                    this._selectCell(dayCell);
                    this._enableTicketButtons();
                }

            });
            this._setDayColor(date, dayCell);

            return dayCell;
        }

        /** select a particular day in our date grid */
        private _selectCell(cell: HTMLElement): void {
            KIP.addClass(cell, "selected");
            this._selectedElement = cell;
        }

        /** unselect a particular day in our date grid */
        private _unselectCell(): void {
            if (!this._selectedElement) { return; }
            KIP.removeClass(this._selectedElement, "selected");
            this._selectedElement = null;
        }

        private _setDayColor(date: Date, dayCell: HTMLElement): void {
            // TODO: make a real function
            let colorNum: number = Math.floor(Math.random() * 4);
            KIP.addClass(dayCell, TicketSection._COLORS[colorNum]);
        }

        /** create the buttons that allow someone to buy and / or reserve a ticket */
        private _createTicketButtons(): HTMLElement {
            let reserveBtn: HTMLElement = this._createTicketButton("RESERVE", "reserve");
            let buyBtn: HTMLElement = this._createTicketButton("BUY", "buy", 1.38);

            let wrapperElem: HTMLElement = KIP.createSimpleElement("ticketBtns", "buttons", "", null, [reserveBtn, buyBtn]);
            this._ticketBtns = wrapperElem;
            return wrapperElem;
        }

        /** create an individual ticket button */
        private _createTicketButton(txt: string, cls: string, addlFee?: number, warning?: string): HTMLElement {
            if (!warning) {
                warning = "If you do not arrive by 7:55pm, your tickets may be forfeit!";
            }

            let btn: HTMLElement = KIP.createSimpleElement("", "btn " + cls, txt);
            let price: HTMLElement = KIP.createSimpleElement("", "price", "$11.00" + (addlFee ? " + $" + addlFee + " convenience fee" : ""));
            let numLbl: HTMLElement = KIP.createSimpleElement("", "lbl", " x ");

            let numSelect: HTMLInputElement = KIP.createElement({
                type: "input",
                attr: {
                    "type": "number",
                    "min": "0",
                    "value": "0"
                },
                cls: "numOfTix",
            }) as HTMLInputElement;
            numSelect.addEventListener("change", () => {
                this._updateCalculation(+numSelect.value, 11 + (addlFee ? addlFee : 0), calculation);
            });

            numSelect.addEventListener("keyup", () => {
                this._updateCalculation(+numSelect.value, 11 + (addlFee ? addlFee : 0), calculation);
            });
            let calculationLbl: HTMLElement = KIP.createSimpleElement("", "lbl", " = ");
            let calculation: HTMLElement = KIP.createSimpleElement("", "calculation", "$0.00")
            let warningElem: HTMLElement = KIP.createSimpleElement("", "warning", warning);

            let wrapper: HTMLElement = KIP.createSimpleElement("", "ticketBtn", "", null, [btn, price, numLbl, numSelect, calculationLbl, calculation, warningElem]);
            return wrapper;
        }

        private _updateCalculation(tixNum: number, cost: number, calculationElem: HTMLElement): void {
            let dollarAmt: number = KIP.roundToPlace(cost * tixNum, 100);
            let cents: string = KIP.piece(dollarAmt.toString(), ".", 1);
            calculationElem.innerHTML = "$" + dollarAmt;
            if (cents.length === 1) { calculationElem.innerHTML += "0"; }
            else if (cents.length === 0) { calculationElem.innerHTML += ".00"; }
        }

        private _enableTicketButtons(): void {
            KIP.addClass(this._ticketBtns, "enabled");
        }

        private _disableTicketButtons(): void {
            KIP.removeClass(this._ticketBtns, "enabled");
        }

    }
}
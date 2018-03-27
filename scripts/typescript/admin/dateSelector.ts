namespace BST {
     /**
     * create a date selector specific to BST shows with a default time & date
     * @version 1.0
     */
    export class DateSelector extends KIP.Forms.DateTimeElement {
        protected static _lastDate: Date;

        /** figure out what the default value should be */
        protected get _defaultValue(): Date { 
            let dt: Date;
            if (DateSelector._lastDate) {
                dt = new Date(DateSelector._lastDate.toString()); 
            } else {
                dt = KIP.Dates.getToday(); 
            }
            dt = KIP.Dates.clearTimeInfo(dt);

            // try to grab the next day that would be likely be appropriate
            switch (dt.getDay()) {

                // wednesday or thursday or friday
                case 3:
                case 4:
                case 5: 
                    dt = KIP.Dates.addToDate(dt, {days: 1});
                    break;
                
                default:
                    let diff: number = (4 - dt.getDay());
                    if (diff < 0) { diff += 7; }
                    dt = KIP.Dates.addToDate(dt, {days: diff});
            }
            dt.setHours(20); 
            
            return dt; 
        }

        protected _parseElemTemplate(template: KIP.Forms.IFormElemTemplate<Date>): void {
            
            super._parseElemTemplate(template);
        }

        public render(parent: HTMLElement): void {
            super.render(parent);
            DateSelector._lastDate = this._data;
        }

        protected _onChange(): boolean {
            let result: boolean = super._onChange();
            if (result) {
                DateSelector._lastDate = this._data;
            }
            return result;
        }

        public update (data: Date) : void {
            super.update(data);
        }

        protected _createClonedElement(appendToID?: string): DateSelector {
            if (!appendToID) { appendToID = ""; }
            return new DateSelector(this._id + appendToID, this);
        }

    }
}
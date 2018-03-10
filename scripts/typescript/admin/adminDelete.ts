namespace BST.Admin {

    export interface IDeleteShowElements extends IViewElements {
        base: HTMLElement;
        shows: HTMLElement;
    }

    export class DeleteShowForm extends View {

        /** elements used for displaying the delete form */
        protected _elems: IDeleteShowElements;

        /** data about the seasons from which we will actually do our deleting */
        protected _seasons: ISeasons;

        /** styles for the delete show page */
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles = {
            ".showDelete": {
                width: "100%",
                boxSizing: "border-box",
                paddingLeft: "20%",
                paddingRight: "20%",
                backgroundColor: "#FFF",
                marginTop: "5%",
                paddingBottom: "20px"
            },

            ".showDelete .title": {
                fontSize: "2em",
                fontFamily: "OpenSansBold",
                textTransform: "uppercase",
                marginBottom: "10px"
            },

            ".showRow": {
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 10px"
            },

            ".showRow .showname": {
                fontSize: "1.3em",
                paddingRight: "10px"
            },

            ".showRow .delete": {
                cursor: "pointer",
                backgroundColor: "#C30",
                color: "#FFF",
                fontSize: "1.1em",
                padding: "3px 10px",
                borderRadius: "2px"
            },

            ".showRow .delete:hover": {
                transform: "scale(1.1)",
                transformOrigin: "50% 50%"
            }
        }

        /**
         * Create the view for deleting shows
         * @param seasons 
         */
        public constructor(seasons: ISeasons) {
            super();
            this._seasons = seasons;
            this._createElements();
        }

        protected _createElements(): void {
            this._elems.base = KIP.createElement({
                cls: "showDelete"
            });

            let title: HTMLElement = KIP.createElement({
                cls: "title",
                content: "Deleting Shows",
                parent: this._elems.base
            });

            this._createShows();
        }

        protected _createShows(): void {
            if (!this._elems.shows) { this._elems.shows = KIP.createElement({ cls: "shows", parent: this._elems.base }); }

            let show: IMiniShow;
            for (show of this._seasons) {
                let elem: HTMLElement = this._createShowLine(show);
                this._elems.shows.appendChild(elem);
            }
        }

        protected _createShowLine(show: IMiniShow): HTMLElement {

            let showRow: HTMLElement = KIP.createElement({
                cls: "showRow"
            });

            let showName: HTMLElement = KIP.createElement({
                cls: "showname",
                content: show.name + (show.subtitle? ": " + show.subtitle : ""),
                parent: showRow
            });

            let deleteBtn: HTMLElement = KIP.createElement({
                cls: "delete btn",
                content: "DELETE",
                parent: showRow
            });
            deleteBtn.addEventListener("click", () => {
                this._confirmDeletion(show);
            });

            return showRow;
        }

        private _confirmDeletion(show: IMiniShow): void {
            let ynPopup = new KIP.YesNoPopup("Are you sure you want to delete this show?", (result: KIP.YesNoEnum) => {
                if (result === KIP.YesNoEnum.YES) {

                    // we won't actually delete the show file
                    // instead we will update the seasons file to no longer have this show
                    KIP.remove(this._seasons, show, true, (a: IMiniShow, b: IMiniShow) => { return (a.id === b.id); });

                    // then we will call the season saving code
                    Server.saveSeasons(this._seasons, (seasons: ISeasons) => { this.update(seasons);});
                    ynPopup.erase();
                }
            })
            ynPopup.setThemeColor(0, "#EA0");
            ynPopup.draw(document.body);
        }

        public update(seasons: ISeasons) : void {
            this._seasons = seasons;
            this._elems.shows.innerHTML = "";
            this._createShows();
        }
    }
}
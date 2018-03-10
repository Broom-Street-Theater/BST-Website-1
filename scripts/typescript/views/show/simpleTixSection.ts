namespace BST {
    const CODE: string = '<DIV ID="bpt_eventbody"><CENTER><BR><BR>Brown Paper Tickets Ticket Widget Loading...<BR><BR>' +
                         '<A HREF="https://www.brownpapertickets.com/event/{{EVENT_ID}}">Click Here</A> to visit the Brown Paper' +
                         ' Tickets event page.</CENTER><BR><BR></DIV>'
        
    export class SimpleTicketSection extends SectionView {
        protected _data: string;

        protected static _uncoloredStyles: KIP.Styles.IStandardStyles = {
            // ".bptHolder": {
            //     transform: "none",
            // }, 
            
            // ".mobile .bptHolder": {
            //     transform: "scale(1.2)",
            //     transformOrigin: "0 0",
               
            // }
        }

        protected _shouldSkipCreateElements(): boolean { return true; }

        protected _createSectionElements(): void {
            let htmlString: string = CODE.replace(/\{\{EVENT_ID\}\}/g, this._data);

            let stylesheet: HTMLElement = KIP.createElement({
                type: "link",
                attr: {
                    rel: "stylesheet",
                    type: "text/css",
                    href: "https://www.brownpapertickets.com/widget_v651.css"
                }
            });

            let scriptTag: HTMLElement = KIP.createElement({
                type: "script",
                attr: {
                    src: "https://www.brownpapertickets.com/eventwidget.js?event=" + this._data + "&nodescription=1",
                    type: "text/javascript",
                    language: "javascript"
                }
            });

            let otherScriptTag: HTMLElement = KIP.createElement({
                type: "script",
                attr: {
                    src: "https://www.brownpapertickets.com/widget_v651.js?event=" + this._data,
                    type: "text/javascript",
                    language: "javascript"
                }
            });


            let elem: HTMLElement = KIP.createElement({
                cls: "bptHolder",
                before_content: htmlString,
                children: [stylesheet,scriptTag],
                parent: this._elems.content
            });
        }
    }
}
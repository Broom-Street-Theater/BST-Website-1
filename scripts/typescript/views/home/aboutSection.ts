namespace BST {

    //#region ABOUT SECTION

    /** enum for the types of data that can appear in the about section */
    enum AboutSubsectionType {
        GENERAL = 1,
        HISTORY = 2,
        BOARD = 3,
        BYLAWS = 4
    };

    /**...........................................................................
     * @class AboutSectionView
     * handles the about section of the BST homepage 
     * @version 1.0
     * ...........................................................................
     */
    export class AboutSection extends SectionView {
       
        /** contains the subsections of this section */
        protected _sectionContent: SubSections;

        /** contains additional details about  */
        protected _data: IAboutData;

        protected static _uncoloredStyles: KIP.Styles.IStandardStyles = {
            ".mobile.about .subsectionContainer": {
                display: "block",

                nested: {
                    ".tabContainer": {
                        flexDirection: "row",
                        flexWrap: "wrap",
                        width: "100%",
                        justifyContent: "space-between",

                        nested: {
                            ".tab": {
                                marginRight: "15px",
                                transformOrigin: "100% 50%"
                            }
                        }
                        
                    },

                    ".subsectionContent": {
                        borderLeft: "none"
                    }
                }
            }
        }

        protected _getUncoloredStyles(): KIP.Styles.IStandardStyles {
            return this._mergeThemes(AboutSection._uncoloredStyles, SectionView._uncoloredStyles);
        }
    
        /**...........................................................................
         * _createSectionElements
         * ...........................................................................
         * Creates all of the elements needed for this section
         * ...........................................................................
         */
        public _createSectionElements (): void {
            this._sectionContent = new SubSections();

            let mission: MissionSubsection = new MissionSubsection(this._data.general, "MISSION");
            let history: HistorySubsection = new HistorySubsection(this._data, "HISTORY");
            let boardStaff: BoardStaffSubsection = new BoardStaffSubsection(this._data, "BOARD + STAFF");
            let bylaws: BylawsSubsection = new BylawsSubsection(this._data.bylaws, "BYLAWS + POLICIES");

            this._sectionContent.addSubSections(mission, history, boardStaff, bylaws);
            this._elems.content.appendChild(this._sectionContent.base);

        }
    } 

    //#endregion

    //#region MISSION SUBSECTION

    /**...........................................................................
     * @class MissionSubsection
     * sub class for the mission subsection 
     * @version 1.0
     * ...........................................................................
     */
    class MissionSubsection extends SubSection<string> {
        
        /**...........................................................................
         * _createContent
         * ...........................................................................
         * Creates the content element for the mession subsection
         * ...........................................................................
         */
        protected _createContent (): void {
            this._elems.content = KIP.createSimpleElement("", "general aboutSection", this._data);
        }
    }

    //#endregion

    //#region BOARD AND STAFF SUBSECTION

    /**...........................................................................
     * @class BoardStaffSubsection
     * sub class for the display of board and staff members 
     * @version 1.0
     * ...........................................................................
     */
    class BoardStaffSubsection extends SubSection<IAboutData> {

        protected static _uncoloredStyles: KIP.Styles.IStandardStyles = {
            ".leaders" : {
                display: "table"
            },

            ".leader" : {
                 fontFamily: "OpenSansLight",
                 alignItems: "center",
                 marginBottom: "5px",
                 justifyContent: "center",
                 boxSizing:"border-box",
                 display: "table-row"
             },
            
             ".leader .lbl" : {
                 marginRight: "15px",
                 fontSize: "0.7em",
                 textTransform: "uppercase",
                 fontFamily: "OpenSans",
                 textAlign: "right",
                 display: "block",
                 boxSizing:"border-box"
             },
            
             ".leader .name" : {
                textAlign: "left",
                boxSizing: "border-box",
                display: "table-cell"
             },

             ".mobile .staffBoard .subsection": {
                width: "100%",
                display: "block",
                maxWidth: "100%"
             },

             ".mobile .staffBoard .board.subsection": {
                 padding: "0",
                 marginTop: "3vw"
             }
        }

        protected _getUncoloredStyles(): KIP.Styles.IStandardStyles {
            return this._mergeThemes(BoardStaffSubsection._uncoloredStyles, SubSection._uncoloredStyles);
        }
        
        /**...........................................................................
         * _createContent
         * ...........................................................................
         * Create the content needed for the board section
         * ...........................................................................
         */
        protected _createContent(): void {
            let board: HTMLElement = this._createBoardSection();
            let staff: HTMLElement = this._createStaffSection();
            this._elems.content = KIP.createSimpleElement("", "staffBoard aboutSection", "", null, [staff, board]);
        }
        
        /**...........................................................................
         * _createBoardSection
         * ...........................................................................
         * Create the section specifically for board members
         * 
         * @returns The created board section element
         * ...........................................................................
         */
        private _createBoardSection (): HTMLElement {
            return this._createLeadersSection("BROOM STREET BOARD", this._data.board, "board");
        }

        /**...........................................................................
         * _createStaffSection
         * ...........................................................................
         * Create the section specifically for staff members
         * 
         * @returns The created staff section element
         * ...........................................................................
         */
        private _createStaffSection () : HTMLElement {
            return this._createLeadersSection("BROOM STREET STAFF", this._data.staff, "staff");
        }

        /**...........................................................................
         * _createLeadersSection
         * ...........................................................................
         * Creates a section of BST leaders (board or staff)
         * 
         * @param   name    The name of the section
         * @param   data    The data to use for this section
         * @param   cls     The specific class for this section
         * 
         * @returns The element that is created for the leaders section
         * ...........................................................................
         */
        private _createLeadersSection (name: string, data: ILeaderData[], cls: string): HTMLElement {
            let header: HTMLElement = KIP.createSimpleElement("", "subheader", name);

            let leaders: HTMLElement = KIP.createSimpleElement("", cls + " leaders");
            let leader: ILeaderData;
            for (leader of data) {
                let leaderElem: HTMLElement = this._createLeaderElem(leader);
                leaders.appendChild(leaderElem);
            }

            let wrapper: HTMLElement = KIP.createSimpleElement("", cls + " subsection", "", null, [header, leaders]);
            return wrapper;
        }

        /**...........................................................................
         * _createLeaderElem
         * ...........................................................................
         * create a line for a leader 
         * 
         * @param   member  The leader we are creating data for
         * 
         * @returns The element that is created for this member
         * ...........................................................................
         */
        private _createLeaderElem (member: ILeaderData) : HTMLElement {
            let leaderLbl: HTMLElement = KIP.createSimpleElement("", "leader lbl", member.position);
            let leaderName: HTMLElement = KIP.createSimpleElement("", "leader name", member.name);
            
            let leaderElem: HTMLElement = KIP.createSimpleElement("", "leader", "", null, [leaderLbl, leaderName]);
            return leaderElem;
        }
    }

    //#endregion

    //#region HISTORY SUBSECTION

    /**...........................................................................
     * @class HistorySubsection
     * subclass for displaying the history of the theater 
     * @version 1.0
     * ...........................................................................
     */
    class HistorySubsection extends SubSection<IAboutData> {

        protected static _uncoloredStyles: KIP.Styles.IStandardStyles = {
            ".timelineEvent": {
                display: "flex",
            },

            ".timelineEvent + .timelineEvent": {
                marginTop: "2em"
            },

            ".timelineEvent .timelineDate": {
                textTransform: "uppercase",
                fontSize: "0.8em",
                fontFamily: "OpenSansBold",
                paddingTop: "4px",
                width: "10%",
                color: "#444"
            },

            ".timelineEvent .eventDetailsWrapper": {
                marginLeft: "10px",
                width: "90%"
            },

            ".timelineEvent .eventTitle": {
                fontSize: "1.2em",
                fontFamily: "OpenSansBold"
            },

            ".timelineEvent .eventDetails": {
                fontSize: "0.9em",
                fontFamily: "OpenSansLight"
            }
        }
        /**...........................................................................
         * _createContent
         * ...........................................................................
         * Creates the content needed for the history section
         * ...........................................................................
         */
        protected _createContent() : void {
            this._elems.content = KIP.createElement({ cls: "history aboutSection"});
            if (!this._data.detailedHistory) { this._createSimpleHistory(); }
            else { this._createDetailedHistory(); }
        }

        protected _createSimpleHistory(): void {
            this._elems.content.innerHTML = this._data.history;
        }

        protected _createDetailedHistory(): void {

            // first sort the data
            this._data.detailedHistory = this._data.detailedHistory.sort((a: IEvent, b: IEvent): number => {
                if (!a.date && !b.date) { return 0; }
                if (!a.date) { return 1; }
                if (!b.date) { return -1; }
                if (a.date < b.date) { return -1; }
                else if (a.date > b.date) { return 1; }
                return 0;
            });

            // then create the events
            this._data.detailedHistory.map((event: IEvent) => {
                let elem: HTMLElement = this._createHistoryEvent(event);
                this._elems.content.appendChild(elem);
            });
        }

        protected _createHistoryEvent(event: IEvent): HTMLElement {
            let wrapper: HTMLElement = KIP.createElement({ cls: "timelineEvent"});
            let dateElem: HTMLElement = KIP.createElement({ cls: "timelineDate", content: (event.date? event.date.getFullYear().toString() : ""), parent: wrapper });

            let eventWrapper: HTMLElement = KIP.createElement({ cls: "eventDetailsWrapper", parent: wrapper });
            let eventTitle: HTMLElement = KIP.createElement({ cls: "eventTitle", content: event.header, parent: eventWrapper });
            let eventDetails: HTMLElement = KIP.createElement({ cls: "eventDetails", content: event.details, parent: eventWrapper });

            return wrapper;
        }
    }

    //#endregion

    //#region BYLAWS SUBSECTION

    /**...........................................................................
     * @class BylawsSubsection
     * subclass for displaying bylaws & policies 
     * @version 1.0
     * ...........................................................................
     */
    class BylawsSubsection extends SubSection<string> {

        /** add the particular styles for this subsection */
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles = {
            ".about .bylaws" : {
                display: "flex"
            },
           
            ".about .bylaws a" : {
               color: "#333 !important",
               textDecoration: "underline"
           }
        }

        /** make sure our styles are a combination of this class and its parent */
        protected _getUncoloredStyles(): KIP.Styles.IStandardStyles {
            return this._mergeThemes(BylawsSubsection._uncoloredStyles, SubSection._uncoloredStyles);
        }

        /**...........................................................................
         * _createContent
         * ...........................................................................
         * Create the content needed for the bylaws section
         * ...........................................................................
         */
        protected _createContent(): void {
            let lbl: HTMLElement = KIP.createElement({ cls: "bylaws lbl", content: "View current bylaws" });
            let link: HTMLElement = KIP.createElement({
                type: "a",
                cls: "bylaws link",
                content: "here",
                attr: {
                    href : this._data
                }
            });
            this._elems.content = KIP.createElement({cls: "bylaws aboutSection hidden", children: [lbl, link] });
        }
    }

    //#endregion

}
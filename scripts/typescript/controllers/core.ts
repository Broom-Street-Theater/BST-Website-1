///<reference path="../../../../../toolkip.ts/compiled_js/kip.d.ts" />
namespace BST {

    //#region HELPER FUNCTIONS

    /**...........................................................................
     * isAdmin
     * ...........................................................................
     * Checks if we are currently in an administrative workflow
     * 
     * @returns True if we are an admin section of the site
     * ...........................................................................
     */
    export function isAdmin(): boolean {
        return (window.location.href.indexOf("admin") !== -1);
    }

    export function isTicketSales(): boolean {
        return (window.location.href.indexOf("tickets") !== -1);
    }

    //#endregion

    //#region INITIALIZE THE PAGE

    /**...........................................................................
     * _initiate
     * ...........................................................................
     * Initializes the data we need for the site
     * ...........................................................................
     */
    function _initiate(): void {

        if (isAdmin()) {
            navigate("admin", NavigationType.ADMIN)
        } else if (isTicketSales()) {
            navigate("tickets", NavigationType.TICKETS);
        } else {
            navigate("home", NavigationType.HOME);
        }
    }

    //#endregion

    //#region DISPLAY NAME FOR GET INVOLVED KEYS

    /**...........................................................................
     * keyNameToDisplayName
     * ...........................................................................
     * Turns a key value for the get involved section into the appropriate display string
     * 
     * @param   keyName     The key name to turn into a real name
     * 
     * @returns The name to display for this particular key name
     * ...........................................................................
     */
    export function keyNameToDisplayName(keyName: string): string {
        let chars: string[] = keyName.split("");
        let outStr: string = "";

        for (let idx = 0; idx < chars.length; idx += 1) {
            let char: string = chars[idx];

            // Add a space before new words
            if (char === char.toUpperCase()) {
                outStr += " ";
            }

            // if this is the first character, capitalize it
            if (idx === 0) {
                char = char.toUpperCase();
            }

            if (char !== "_") {
                outStr += char;
            }
        }

        return outStr;
    }
    //#endregion

    //#region HANDLE WINDOW LISTENERS
    window.addEventListener("load", () => { _initiate(); });
    //#endregion
}
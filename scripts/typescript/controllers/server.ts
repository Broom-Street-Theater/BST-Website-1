namespace BST.Server {

    export const DEBUG: boolean = false;

    /**...........................................................................
     * getPath
     * ...........................................................................
     * helper to grab the path the the right file 
     * 
     * @returns the appropriate path the relevant files
     * ...........................................................................
     */
    export function getPath(): string {
        let path: string;
        if  (isAdmin() && DEBUG) {
            path = "../php/bst.php";
        } else if (isAdmin()) {
            path = "../router.php";
        } else if (DEBUG) {
            path = "../php/bst.php";
        } else {
            //path = "../../../php/bst/bst.php"
            path = "router.php";
        }
        return path;
    }

    /**...........................................................................
     * loadShow
     * ...........................................................................
     * load data for a particular show 
     * 
     * @param   showId      ID of the show we are loading
     * @param   onLoaded    What to do when the show has loaded
     * @param   onError     What to do if the show fails to load
     * ...........................................................................
     */
    export function loadShow(showId: string, onLoaded: IOnShowLoaded, onError?: KIP.IAjaxErrorFunction): void {
        let path: string = getPath();

        // TODO : set a real URL for this request
        KIP.ajaxRequest(
            KIP.AjaxTypeEnum.POST,
            path,
            (data: string) => {
                let showData: IShowData;
                let show: Show;
                if (data) {
                    // try to parse the show
                    try {
                        showData = JSON.parse(data);

                    } catch (e) {
                        console.log("Err: JSON couldn't be parsed");
                        console.log(data);

                        if (onError) {
                            onError(data);
                        }

                        return;
                    }

                    // Create a real show from this data
                    show = new Show(showData);
                    
                }

                // actually run the logic to load the show
                onLoaded(show);
            },
            (data: string) => { },
            { type: "loadShow", showID: showId }
        );
    }

    /**...........................................................................
     * loadHome
     * ...........................................................................
     * load the data for the home page 
     * 
     * @param   onLoaded
     * ...........................................................................
     */
    export function loadHome(onLoaded: IOnHomeLoaded): void {
        let path: string = getPath();

        // POST THE REQUEST
        KIP.ajaxRequest(
            KIP.AjaxTypeEnum.POST,
            path,
            (data: string) => {
                let home: IHomeData;

                // try to parse the show
                try {
                    home = JSON.parse(data);

                } catch (e) {
                    console.log("Err: JSON couldn't be parsed");
                    console.log(data);
                    return;
                }

                // map the appropriate dates
                let i: number;
                for (i = 0; i < home.news.length; i += 1) {
                    home.news[i].date = new Date(home.news[i].date as any);
                }

                for (i = 0; i < home.about.detailedHistory.length; i += 1) {
                    if (!home.about.detailedHistory[i].date) { continue; }
                    home.about.detailedHistory[i].date = new Date(home.about.detailedHistory[i].date as any);
                }

                // actually run the logic to load the show
                onLoaded(home);
            },
            (data: string) => { },
            { type: "loadHome" }
        );
    }

    /**...........................................................................
     * loadSeasons
     * ...........................................................................
     * Loads the seasons of BST
     * 
     * @param onLoaded
     * ........................................................................... 
     */
    export function loadSeasons(onLoaded: IOnSeasonsLoaded): void {
        let path: string = getPath();

        // POST THE REQUEST
        KIP.ajaxRequest(
            KIP.AjaxTypeEnum.POST,
            path,
            (data: string) => {
                let seasons: ISeasons;

                // try to parse the show
                try {
                    seasons = JSON.parse(data);

                } catch (e) {
                    console.log("Err: JSON couldn't be parsed");
                    console.log(data);
                    return;
                }

                // actually run the logic to load the show
                onLoaded(seasons);
            },
            (data: string) => { },
            { type: "loadSeasons" }
        );

    }

    export function testBptAPI(eventID: string, success: KIP.IAjaxSuccessFunction): void {
        let path: string = getPath();
        KIP.ajaxRequest(
            KIP.AjaxTypeEnum.POST,
            path,
            (data: string) => { console.log("success!"); success(data); },
            () => { console.log("failure!"); },
            { type: "bptGetShowAvailability", eventID: eventID }
        );
    }

    export function testIsAdmin():void {
        let path: string = getPath();
        KIP.ajaxRequest(
            KIP.AjaxTypeEnum.POST,
            path,
            (data: string) => { console.log(data); },
            () => { console.log("err"); },
            {type: "isAdminContext"}
        );
    }




}
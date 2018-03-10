namespace BST.Server {

    /**...........................................................................
     * saveSeasons (public)
     * ...........................................................................
     * Save an updated season list
     * 
     * @param   data        The new seasons list
     * @param   onLoaded    What to do when the seasons have been saved
     * ...........................................................................
     */
    export function saveSeasons(data: ISeasons, onLoaded?: IOnSeasonsLoaded): void {
        if (!isAdmin()) { return; }
        let path: string = getPath();

        KIP.ajaxRequest(
            KIP.AjaxTypeEnum.POST,
            path,
            (data: string) => {
                if (data === "not admin") {
                    _showNonAdminPopup();
                    return;
                }
                let seasons: ISeasons;
                try {
                    seasons = JSON.parse(data);
                    if (onLoaded) {
                        onLoaded(seasons);
                    }
                } catch (e) {
                    console.warn("saveSeasons - JSON couldn't be parsed: " + data);
                    return;
                }
            },
            () => {},
            { type: "saveSeasons", seasons: JSON.stringify(data) }
        );
    }

    export function saveHome(data: IHomeData, onLoaded?: IOnHomeLoaded): void {
        if (!isAdmin()) { return; }
        let path: string = getPath();

        KIP.ajaxRequest(
            KIP.AjaxTypeEnum.POST,
            path,
            (data: string) => {
                let home: IHomeData;
                if (data === "not admin") {
                    _showNonAdminPopup();
                    return;
                }
                try {
                    home = JSON.parse(data);
                    if (onLoaded) {
                        onLoaded(home);
                    }
                } catch (e) {
                    console.warn("saveHome - JSON couldn't be parsed: " + data);
                    return;
                }
            },
            () => {},
            {type: "saveHome", home: JSON.stringify(data) }
        );
    }

    /**...........................................................................
     * saveShow
     * ...........................................................................
     * Saves a particular show to the server. Requires admin access
     * 
     * @param   showData    The data to save
     * @param   onComplete  What to do when the show has been saved
     * ...........................................................................
     */
    export function saveShow(showData: IShowData, onComplete: KIP.IAjaxSuccessFunction): void {
        if (!isAdmin()) { return; }
        let data: IShowData = convertDatesToStrings(showData);

        let path: string = getPath();
        KIP.ajaxRequest(
            KIP.AjaxTypeEnum.POST,
            path,
            (data: string) => {
                if (data === "not admin") {
                    _showNonAdminPopup();
                    return;
                }
                if (onComplete) {
                    onComplete(data);
                }
             },
            () => { },
            { type: "showEdited", showID: data.showTitle.id, showData: JSON.stringify(data) }
        );
    }
    /**...........................................................................
     * _convertDatesToStrings
     * ...........................................................................
     * Converts any dates in an object to JSON-ready strings
     * 
     * @param   data    Any data that may contain a date
     * 
     * @returns The same data, but with dates as JSON strings
     * ...........................................................................
     */
    function convertDatesToStrings<T extends Object, K extends keyof T>(data: T): T {
        KIP.map(data, (elem: any, key: K) => {
            if (elem instanceof Date) {
                data[key] = KIP.Dates.shortDateTime(elem);
            } else if (typeof elem === "object") {
                data[key] = convertDatesToStrings(data[key]);
            }
        });

        return data;
    }

    /**...........................................................................
     * saveActorPhoto
     * ...........................................................................
     * Save a photo associated with an actor's photo
     * 
     * @param file 
     * @param successCb 
     * ...........................................................................
     */
    export function saveActorPhoto(file: File, successCb: KIP.IAjaxSuccessFunction): void {
        _savePhoto(file, successCb, "saveActorPhoto");
    }

    /**...........................................................................
     * saveShowPhoto
     * ...........................................................................
     * Save a show photo
     * 
     * @param file 
     * @param showID 
     * @param successCb 
     */
    export function saveShowPhoto(file: File, showID: string, successCb: KIP.IAjaxSuccessFunction): void {
       _savePhoto(file, successCb, "saveShowPhoto", showID);
    }

    /**...........................................................................
     * saveIconPhoto
     * ...........................................................................
     * 
     * @param file 
     * @param showID 
     * @param successCb 
     * ...........................................................................
     */
    export function saveIconPhoto(file: File, showID: string, successCb: KIP.IAjaxSuccessFunction): void {
        _savePhoto(file, successCb, "saveIconPhoto", showID);
    }

    export function saveGetInvolvedPhoto(file: File, successCb: KIP.IAjaxSuccessFunction) : void {
        _savePhoto(file, successCb, "saveGetInvolvedPhoto");
    }

    export function saveLogoPhoto(file: File, successCb: KIP.IAjaxSuccessFunction): void {
        _savePhoto(file, successCb, "saveLogoPhoto");
    }

    export function saveBgPhoto(file: File, successCb: KIP.IAjaxSuccessFunction): void {
        _savePhoto(file, successCb, "saveBGPhoto");
    }

    /**...........................................................................
     * _savePhoto
     * ...........................................................................
     * @param file 
     * @param successCb 
     * @param type 
     * @param showID 
     * ...........................................................................
     */
    function _savePhoto(file: File, successCb: KIP.IAjaxSuccessFunction, type: string, showID?: string): void {
        if (!file) { return; }
        let form: FormData = new FormData();
        form.append("picture", file, file.name);
        form.append("type", type);
        if (showID) {
            form.append("showID", showID);
        }

        let path: string = getPath();
        KIP.ajaxRequest(
            KIP.AjaxTypeEnum.POST,
            path,
            (data: any) => {

                if (data === "not admin") {
                    _showNonAdminPopup();
                    return;
                }

                if (successCb) {
                    successCb(data as string);
                }
            },
            () => { },
            form
        );
    }

    //#region LOGIN HANDLING

    /**...........................................................................
     * login
     * ...........................................................................
     * Handle the user logging into a google account
     * 
     * @param   token       The token sent to us by Google
     * @param   success     What to do if we can log the user in
     * @param   failure     What to do if we can't log the user in
     * ...........................................................................
     */
    export function login(token: string, success: KIP.IAjaxSuccessFunction, failure: KIP.IAjaxErrorFunction) : void {
        if (!isAdmin()) { return; }

        let path: string = getPath();
        KIP.ajaxRequest(
            KIP.AjaxTypeEnum.POST,
            path,
            (data: string) => {
                if (+data) {
                    success(data);
                } else {
                    failure(data);
                }
             },
            () => { failure("-1"); },
            { type: "login", token: token}
        );
    }

    /**...........................................................................
     * logout
     * ...........................................................................
     * Handle the user logging out of a google account
     * ...........................................................................
     */
    export function logout(): void {
        let path: string = getPath();
        KIP.ajaxRequest(
            KIP.AjaxTypeEnum.POST,
            path,
            (data: string) => {
                console.log("logged out: " + data);
             },
            () => { },
            { type: "logout"}
        );
    }

    /**...........................................................................
     * _showNonAdminPopup
     * ...........................................................................
     * Handle when the user tries to take an action that they are not registered
     * as an administrator for (e.g. saving data)
     * ...........................................................................
     */
    function _showNonAdminPopup(): void {
        let err: KIP.ErrorPopup = new KIP.ErrorPopup(
            "You probably shouldn't be seeing this error, but you can try refreshing & relogging in", 
            "Hmm...looks like you aren't authorized to make changes"
        );
        err.setThemeColor(0, "#EA0");
        err.draw(document.body);
    }
    //#endregion
}
namespace BST {

    //#region DECLARE CONSTANTS
    const TRANSITION_SPEED: number = 1000;

    export enum NavigationType {
        HOME = 0,
        SHOW = 1,
        ADMIN = 2,
        TICKETS = 3
    }
    //#endregion

    //#region NAVIGATE TO A DIFFERENT AREA OF THE SITE

    let header: BSTHeader;
    let homeView: HomeView;
    /**...........................................................................
     * navigate
     * ...........................................................................
     * Navigate to a page in the BST site
     * 
     * @param   navigateTo      the id to navigate to
     * @param   navigateType    whether we're navigating to a show or the home page
     * ...........................................................................
     */
    export function navigate(navigateTo: string, navigateType: NavigationType): void {
        // the idea here is that we would swap out the content of the page
        // dynamically

        if (navigateType === NavigationType.SHOW) {
            _navigateToShow(navigateTo);
        } else if (navigateType === NavigationType.HOME) {
            _navigateHome();
        } else if (navigateType === NavigationType.TICKETS) {
            _navigateToTickets();
        } else if (navigateType === NavigationType.ADMIN) {
            _navigateAdmin();
        }
    }

    /**...........................................................................
     * _navigateToShow
     * ...........................................................................
     * Handle swapping which show is currently being displayed
     * 
     * @param navigateTo - the show ID that we should launch to
     * ...........................................................................
     */
    function _navigateToShow(navigateTo: string): void {
        let hState: IHistoryData = {
            url: "./?showID=" + navigateTo,
            type: NavigationType.SHOW,
            title: navigateTo,
            showID: navigateTo
        };
        pushHistoryState(hState);

        let onLoaded: IOnShowLoaded = (show: Show) => {
            _displayShow(show);
        }

        Server.loadShow(navigateTo, onLoaded);
    }

    /**...........................................................................
    * _navigateHome
    * ...........................................................................
    * Go to the public facing page
    * ...........................................................................
    */
    function _navigateHome(): void {

        let hState: IHistoryData = {
            url: "./",
            type: NavigationType.HOME,
            title: "home",
            showID: ""
        };
        pushHistoryState(hState);

        let onLoaded: IOnHomeLoaded = (home: IHomeData) => {
            _displayHome(home);
        }

        Server.loadHome(onLoaded);
    }

    /**...........................................................................
     * _navigateAdmin
     * ...........................................................................
     * Navigate to the admin page
     * ...........................................................................
     */
    function _navigateAdmin(): void {
        _displayAdmin();
    }

    function _navigateToTickets(): void {
        _displayTickets();
    }

    //#endregion

    //#region HANDLE DISPLAYING A DIFFERENT SECTION

    /**...........................................................................
     * _displayShow
     * ...........................................................................
     * Actually display a particular show
     * 
     * @param   show  the details of the show to open
     * ...........................................................................
     */
    function _displayShow(show: Show): void {

        let showPage: ShowView = new ShowView(show);
        let elem: HTMLElement = showPage.base;

        // move the home elements offscreen
        let home: HTMLElement = document.getElementById("homeElements");
        if (home) {
            window.setTimeout(() => {
                KIP.addClass(home, "offscreen");
            }, TRANSITION_SPEED);
        }

        // add the show details
        let host: HTMLElement = document.getElementById("mainShow");
        host.innerHTML = "";
        host.appendChild(elem);

        // update the header
        header.displayAsShow(show);

        // do some transition magic
        KIP.addClass(host, "moving");
        KIP.removeClass(host, "offscreen");
        window.setTimeout(() => {
            KIP.removeClass(host, "moving");
        }, TRANSITION_SPEED)
    }

    /**...........................................................................
     * _displayHome
     * ...........................................................................
     * Display the public facing home page
     * 
     * @param   home    Data to display on the home page
     * ...........................................................................
     */
    function _displayHome(home: IHomeData): void {
        if (!header) {
            header = new BSTHeader(home);
            header.draw(document.getElementById("header"));
        }
        header.displayAsHome();

        // only create the home view at the first time
        if (!homeView) {
            homeView = new HomeView(home, header);
        }
        
        let elem: HTMLElement = homeView.base;

        let show: HTMLElement = document.getElementById("mainShow");
        if (show) {
            KIP.addClass(show, "offscreen");
        }

        let host: HTMLElement = document.getElementById("homeElements");
        host.innerHTML = "";
        host.appendChild(elem);
        KIP.removeClass(host, "offscreen");
    }

    /**...........................................................................
     * _displayAdmin
     * ...........................................................................
     * Show the admin screen
     * ...........................................................................
     */
    function _displayAdmin(): void {
        let adminView: Admin.AdminView = new Admin.AdminView();
        adminView.draw(document.body);
    }

    function _displayTickets(): void {
        //let ticketView: 
    }

    //#endregion

}
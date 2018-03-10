namespace BST.Admin {

    /** allow the google api to be called for sign-in and out */
    //let gapi: any;
    declare var gapi : any;

    export interface IAdminViewElems extends IViewElements {
        base: HTMLElement;
        topMenu: HTMLElement;
        contentPane: HTMLElement;
        menu: HTMLElement;
        backBtn: HTMLElement;
        logoutBtn: HTMLElement;
        googleBtn: HTMLElement;
        googleDeets: HTMLElement;
        googleHelpText: HTMLElement;
    }

    interface IGoogleProfile {
        getId(): string;
        getName(): string;
        getGivenName(): string;
        getFamilyName(): string;
        getImageUrl(): string;
        getEmail(): string;
    }

    /**...........................................................................
     * @class AdminView
     * ...........................................................................
     * Create the controller for all of the admin screens
     * @version 1.0
     * ...........................................................................
     */
    export class AdminView extends View {

        /** keep track of our elements */
        protected _elems: IAdminViewElems;

        /** keep track of the home form */
        protected _homeForm: HomeForm;

        /** keep track of the show form */
        protected _showForm: ShowForm;

        /** allow users to delete shows */
        protected _deleteForm: DeleteShowForm;

        /** keep track of what type of display we have going on */
        protected _currentlyShowing: "menu" | "home" | "show" | "delete";

        /** don't let an unauthenticated user get into any admin tools */
        private _isLoggedIn: boolean = false;

        private _googleProfile: IGoogleProfile;

        /** styles to use for the admin view */
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles = {
            "body": {
                backgroundColor: "#333",
                margin: "0",
                padding: "0"
            },

            ".admin" : {
                fontFamily: "OpenSansLight"
            },

            ".admin .kipForm": {
                backgroundColor: "#FFF"
            },

            ".admin .topMenu": {
                backgroundColor: "#222",
                display: "flex",
                justifyContent: "space-between",
                boxShadow: "0px 1px 5px 3px rgba(0,0,0,.2)",
                color: "#FFF",
                fontSize: "1.2em",
                position: "fixed",
                left: "0",
                top: "0",
                width: "100%",
                padding: "5px",
                boxSizing: "border-box"
            },

            ".admin .topMenu .btn": {
                cursor: "pointer"
            },

            ".admin .topMenu .btn:hover": {
                transform: "scale(1.1)"
            },

            ".admin .logout.hidden, .admin .helptext.hidden": {
                display: "none"
            },

            ".admin .hidden": {
                opacity: "0"
            },

            ".admin .topMenu .elgoog": {
                display: "flex",
                alignSelf: "flex-end",
                padding: "3px",
                alignItems: "center"
            },

            ".admin .topMenu .loginInfo": {
                paddingRight: "20px",
                opacity: "0.7",
                fontSize: "0.9em"
            },

            ".admin .menu": {
                backgroundColor: "#FFF",
                marginTop: "5%",
                width: "100%",
                boxSizing: "border-box",
                paddingLeft: "20%",
                paddingRight: "20%",
                paddingBottom: "10px",
                paddingTop: "10px"
            },

            ".admin .menu .title": {
                fontSize: "2em",
                fontFamily: "OpenSansBold",
                marginBottom: "20px"
            },

            ".admin .menu .menuItem": {
                fontSize: "1.3em",
                marginBottom: "20px",
                cursor: "pointer",
                transformOrigin: "0 0",
                transition: "all ease-in-out .1s"
            },

            ".admin .menu .menuItem:hover": {
                transform: "scale(1.1)"
            },

            ".admin .content .helptext": {
                fontSize: "1.3em",
                opacity: "0.5",
                color: "#FFF",
                textAlign: "center",
                position: "relative",
                marginTop: "5%",
            }
        }

        /** create the admin page */
        constructor() {
            super({cls: "admin"});
        }

        /**...........................................................................
         * _shouldSkipCreateElements
         * ...........................................................................
         * 
         * @returns False
         * ...........................................................................
         */
        protected _shouldSkipCreateElements(): boolean { return false; }

        /**...........................................................................
         * _createElements
         * ...........................................................................
         * create elements for the admin page 
         * ...........................................................................
         */
        protected _createElements(): void {
            this._createContent();
            this._createTopMenu();

            if (this._isLoggedIn) {
                this._createMenu();
            }
        }

        protected _createLoginElements(): HTMLElement {
            this._createGoogleButton();

            this._elems.googleDeets = KIP.createElement({ cls: "loginInfo" });

            this._elems.logoutBtn = KIP.createElement({ cls: "logout btn hidden", content: "LOGOUT" });
            this._elems.logoutBtn.addEventListener("click", () => { this._signOut(); });

            let googleWrapper: HTMLElement = KIP.createElement({
                cls: "elgoog",
                children: [
                    this._elems.googleDeets,
                    this._elems.logoutBtn,
                    this._elems.googleBtn
                ]
            });

            this._elems.googleHelpText = KIP.createElement({
                cls: "helptext",
                content: "Log into your Broom Street email account to access the administrative tools",
                parent: this._elems.contentPane
            });

            return googleWrapper;
        }

        protected _createGoogleButton(): HTMLElement {
            gapi.load('auth2', () => {
                let auth2 = gapi.auth2.init({
                    client_id: "835724530357-rsdkjat0b8vai2msb2aj11l4kc11t61s.apps.googleusercontent.com",
                    hd: 'bstonline.org'
                });

                //auth2.isSignedIn.listen(() => { this._onSignIn(); }); // TODO: handle signin state changes
                auth2.currentUser.listen((user) => { 
                    if (!user.getBasicProfile()) { 
                        //console.log("false alarm"); 
                    } else { 
                        //this._onSignIn(user); 
                    }
                });
            })
            
            this._elems.googleBtn = KIP.createElement({
                id: "elgoog",
                cls: "g-signin2",
                parent: this._elems.topMenu
            });

            // actually create the styled button
            window.setTimeout(() => {
                gapi.signin2.render('elgoog', {
                    'scope': 'profile email',
                    'longtitle': false,
                    'theme': 'light',
                    'onsuccess': (data) => { this._onSignIn(data); },
                    'onfailure': () => { console.log("error occurred"); }
                });
            }, 10);

            return this._elems.googleBtn;
        }

        /**...........................................................................
         * _createTopMenu
         * ...........................................................................
         * create the top menu for the admin page
         * ...........................................................................
         */
        protected _createTopMenu(): void {
            this._elems.backBtn = KIP.createElement({
                cls: "back hidden btn", 
                content: "BACK"
            });

            this._elems.backBtn.addEventListener("click", () =>{
                if (!this._canReturnToMenu()) { return; }
                this.returnToMenu();
            });

            let googleElems: HTMLElement = this._createLoginElements();

            this._elems.topMenu = KIP.createElement({
                cls: "topMenu",
                parent: this._elems.base,
                children: [
                    this._elems.backBtn,
                    googleElems
                ]
            });
        }

        /**...........................................................................
         * _createContent
         * ...........................................................................
         * create the content needed for the admin page
         * ...........................................................................
         */
        protected _createContent(): void {
            this._elems.contentPane = KIP.createElement({
                cls: "content",
                parent: this._elems.base
            });
        }

        /**...........................................................................
         * _createMenu
         * ...........................................................................
         * Show the main menu for the admin page
         * ...........................................................................
         */
        protected _createMenu(): void {
            let homeEdit: HTMLElement = KIP.createElement({
                content: "Edit details that show on the BST home page",
                cls: "menuItem"
            });
            homeEdit.addEventListener("click", () => {
                this._showHomeForm();
            });

            let showEdit: HTMLElement = KIP.createElement({
                cls: "menuItem",
                content: "Create or edit a show"
            });
            showEdit.addEventListener("click", () => {
                this._showShowForm();
            });

            let showDelete: HTMLElement = KIP.createElement({
                cls: "menuItem",
                content: "Delete a show"
            });
            showDelete.addEventListener("click", () => {
                this._showDeleteForm();
            })

            this._elems.menu = KIP.createElement({
                cls: "menu",
                parent: this._elems.contentPane,
                children: [
                    { cls: "title", content: "ADMINISTRATIVE TASKS" },
                    homeEdit,
                    showEdit,
                    showDelete
                ]
            });
        }

        /**...........................................................................
         * _showHomeForm
         * ...........................................................................
         * Create the view for the home form
         * ...........................................................................
         */
        protected _showHomeForm(): void {
            
            let shield: KIP.LoadingShield = new KIP.LoadingShield("Loading BST Home...");
            shield.draw(document.body);

             // actually load the appropriate data
             Server.loadHome((home: IHomeData) => {
                console.log("loading again");
                
                if (!this._homeForm) { 
                    this._homeForm = new HomeForm(home);
                    this._homeForm.form.registerCancelListener(() => {
                        this.returnToMenu();
                    });
                }
                else { this._homeForm.update(home); }

                this._elems.contentPane.innerHTML = "";
                this._elems.contentPane.appendChild(this._homeForm.base);
                KIP.removeClass(this._elems.backBtn, "hidden");

                this._currentlyShowing = "home";
                shield.erase();
            });
            
        }

        /**...........................................................................
         * _showShowForm
         * ...........................................................................
         * Create the view for the show editor form
         * ...........................................................................
         */
        protected _showShowForm(): void {
            let shield: KIP.LoadingShield = new KIP.LoadingShield("Loading shows...");
            shield.draw(document.body);

            // load data about the seasons
            Server.loadSeasons((seasons: ISeasons) => {

                if (!this._showForm) { 
                    this._showForm = new ShowForm(seasons);
                    this._showForm.form.registerCancelListener(() => {
                        this.returnToMenu();
                    });
                }
                else { this._showForm.update(seasons); }

                this._elems.contentPane.innerHTML = "";
                this._elems.contentPane.appendChild(this._showForm.base);
                KIP.removeClass(this._elems.backBtn, "hidden");

                this._currentlyShowing = "show";
                shield.erase();
            });
        }

        private _showDeleteForm(): void {
            let shield: KIP.LoadingShield = new KIP.LoadingShield("Loading shows...");
            shield.draw(document.body);

            // load data about the seasons
            Server.loadSeasons((seasons: ISeasons) => {

                if (!this._deleteForm) { 
                    this._deleteForm = new DeleteShowForm(seasons);
                }
                else { this._deleteForm.update(seasons); }

                this._elems.contentPane.innerHTML = "";
                this._elems.contentPane.appendChild(this._deleteForm.base);
                KIP.removeClass(this._elems.backBtn, "hidden");

                this._currentlyShowing = "delete";
                shield.erase();
            });
        }

        
        protected _canReturnToMenu(): boolean {
            switch (this._currentlyShowing) {
                case "home":
                    if (!this._homeForm.form.tryCancel()) {
                        return false;
                    }
                    break;
                case "show":
                    if (!this._showForm.form.tryCancel()) {
                        return false;
                    }
                    break;
            }
            return true;
        }
        /**...........................................................................
         * returnToMenu
         * ...........................................................................
         * Handle going back to the main menu
         * ...........................................................................
         */
        public returnToMenu(): void {
            this._elems.contentPane.innerHTML = "";
            this._elems.contentPane.appendChild(this._elems.menu);
            KIP.addClass(this._elems.backBtn, "hidden");
            this._currentlyShowing = "menu";
        }
        //#endregion

        //#region HANDLE LOGGING IN AND OUT

        /**
         * _onSignIn
         * 
         * Handle when we've attempted to log in through google's api
         * @param googleUser 
         */
        private _onSignIn(googleUser: any): void {
            // verify that this is a new login
            let profile = googleUser.getBasicProfile();
            if (this._googleProfile && (profile.getId() === this._googleProfile.getId())) { return; }

            // if it is, update our profile info
            this._googleProfile = profile;
            let id_token = googleUser.getAuthResponse().id_token;

            // validate against the server as well
            Server.login(id_token, () => { this._onSignedIn(); }, () => { this._onSignInFailure(); });

            // be overlay cautious; logout with every refresh
            window.addEventListener("beforeunload", () => {
                this._signOut();
            });
        }

        /**
         * _onSignedIn
         * 
         * Handle when the user has successfully authenticated with Google and us
         */
        private _onSignedIn(): void {
            // show the rest of the menu if we haven't yet
            if (!this._elems.menu) { this._createMenu(); }
            
            // update the header elements
            this._elems.googleBtn.style.display = "none";
            this._elems.googleDeets.innerHTML = "Logged in as: " + this._googleProfile.getName();
            KIP.addClass(this._elems.googleHelpText, "hidden");
            KIP.removeClass(this._elems.logoutBtn, "hidden");

            // internal tag for tracking
            this._isLoggedIn = true;
        }

        /**
         * _onSignInFailure
         * 
         * Handle when we couldn't log in appropriately
         */
        private _onSignInFailure(): void {
            let errorPopup = new KIP.ErrorPopup("We couldn't log you in securely. Are you using a BST email?");
            errorPopup.draw(document.body);
            this._signOut();
        }

        /**
         * _signOut
         * 
         * Tell Google and our server that we are logging out
         */
        private _signOut(): void {
            let auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(() => {
                this._googleProfile = null;

                // update stylings
                KIP.addClass(this._elems.logoutBtn, "hidden");
                this._elems.googleDeets.innerHTML = "";
                this._elems.googleBtn.style.display = "block";
                KIP.removeClass(this._elems.googleHelpText, "hidden");

                // handle removing the menu
                if (this._elems.menu && !this._elems.menu.parentNode) {
                    this.returnToMenu();
                }
                
                this._elems.menu.parentNode.removeChild(this._elems.menu);
                this._elems.menu = undefined;

                // update our server as well
                Server.logout();
            });
        }
        //#endregion
    }
}
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BST;
(function (BST) {
    //#region DECLARE CONSTANTS
    var TRANSITION_SPEED = 1000;
    var NavigationType;
    (function (NavigationType) {
        NavigationType[NavigationType["HOME"] = 0] = "HOME";
        NavigationType[NavigationType["SHOW"] = 1] = "SHOW";
        NavigationType[NavigationType["ADMIN"] = 2] = "ADMIN";
        NavigationType[NavigationType["TICKETS"] = 3] = "TICKETS";
    })(NavigationType = BST.NavigationType || (BST.NavigationType = {}));
    //#endregion
    //#region NAVIGATE TO A DIFFERENT AREA OF THE SITE
    var header;
    var homeView;
    /**...........................................................................
     * navigate
     * ...........................................................................
     * Navigate to a page in the BST site
     *
     * @param   navigateTo      the id to navigate to
     * @param   navigateType    whether we're navigating to a show or the home page
     * ...........................................................................
     */
    function navigate(navigateTo, navigateType) {
        // the idea here is that we would swap out the content of the page
        // dynamically
        if (navigateType === NavigationType.SHOW) {
            _navigateToShow(navigateTo);
        }
        else if (navigateType === NavigationType.HOME) {
            _navigateHome();
        }
        else if (navigateType === NavigationType.TICKETS) {
            _navigateToTickets();
        }
        else if (navigateType === NavigationType.ADMIN) {
            _navigateAdmin();
        }
    }
    BST.navigate = navigate;
    /**...........................................................................
     * _navigateToShow
     * ...........................................................................
     * Handle swapping which show is currently being displayed
     *
     * @param navigateTo - the show ID that we should launch to
     * ...........................................................................
     */
    function _navigateToShow(navigateTo) {
        var hState = {
            url: "./?showID=" + navigateTo,
            type: NavigationType.SHOW,
            title: navigateTo,
            showID: navigateTo
        };
        BST.pushHistoryState(hState);
        var onLoaded = function (show) {
            _displayShow(show);
        };
        BST.Server.loadShow(navigateTo, onLoaded);
    }
    /**...........................................................................
    * _navigateHome
    * ...........................................................................
    * Go to the public facing page
    * ...........................................................................
    */
    function _navigateHome() {
        var hState = {
            url: "./",
            type: NavigationType.HOME,
            title: "home",
            showID: ""
        };
        BST.pushHistoryState(hState);
        var onLoaded = function (home) {
            _displayHome(home);
        };
        BST.Server.loadHome(onLoaded);
    }
    /**...........................................................................
     * _navigateAdmin
     * ...........................................................................
     * Navigate to the admin page
     * ...........................................................................
     */
    function _navigateAdmin() {
        _displayAdmin();
    }
    function _navigateToTickets() {
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
    function _displayShow(show) {
        var showPage = new BST.ShowView(show);
        var elem = showPage.base;
        // move the home elements offscreen
        var home = document.getElementById("homeElements");
        if (home) {
            window.setTimeout(function () {
                KIP.addClass(home, "offscreen");
            }, TRANSITION_SPEED);
        }
        // add the show details
        var host = document.getElementById("mainShow");
        host.innerHTML = "";
        host.appendChild(elem);
        // update the header
        header.displayAsShow(show);
        // do some transition magic
        KIP.addClass(host, "moving");
        KIP.removeClass(host, "offscreen");
        window.setTimeout(function () {
            KIP.removeClass(host, "moving");
        }, TRANSITION_SPEED);
    }
    /**...........................................................................
     * _displayHome
     * ...........................................................................
     * Display the public facing home page
     *
     * @param   home    Data to display on the home page
     * ...........................................................................
     */
    function _displayHome(home) {
        if (!header) {
            header = new BST.BSTHeader(home);
            header.draw(document.getElementById("header"));
        }
        header.displayAsHome();
        // only create the home view at the first time
        if (!homeView) {
            homeView = new BST.HomeView(home, header);
        }
        var elem = homeView.base;
        var show = document.getElementById("mainShow");
        if (show) {
            KIP.addClass(show, "offscreen");
        }
        var host = document.getElementById("homeElements");
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
    function _displayAdmin() {
        var adminView = new BST.Admin.AdminView();
        adminView.draw(document.body);
    }
    function _displayTickets() {
        //let ticketView: 
    }
    //#endregion
})(BST || (BST = {}));
var BST;
(function (BST) {
    /**...........................................................................
     * pushHistoryState
     * ...........................................................................
     * make sure we can return to the right page
     *
     * @param   history     The page to return to when hitting the back button
     * ...........................................................................
     */
    function pushHistoryState(history) {
        window.history.pushState(history, history.title, history.url);
    }
    BST.pushHistoryState = pushHistoryState;
    /**...........................................................................
     * _handleState
     * ...........................................................................
     * Override the back button to go to the right page
     * ...........................................................................
     */
    function _handleState() {
        var state = window.history.state;
        if (!state) {
            return;
        }
        BST.navigate(state.showID, state.type);
    }
    window.addEventListener("popstate", function () {
        _handleState();
    });
})(BST || (BST = {}));
///<reference path="../../../../../toolkip.ts/compiled_js/kip.d.ts" />
var BST;
(function (BST) {
    //#region HELPER FUNCTIONS
    /**...........................................................................
     * isAdmin
     * ...........................................................................
     * Checks if we are currently in an administrative workflow
     *
     * @returns True if we are an admin section of the site
     * ...........................................................................
     */
    function isAdmin() {
        return (window.location.href.indexOf("admin") !== -1);
    }
    BST.isAdmin = isAdmin;
    function isTicketSales() {
        return (window.location.href.indexOf("tickets") !== -1);
    }
    BST.isTicketSales = isTicketSales;
    //#endregion
    //#region INITIALIZE THE PAGE
    /**...........................................................................
     * _initiate
     * ...........................................................................
     * Initializes the data we need for the site
     * ...........................................................................
     */
    function _initiate() {
        if (isAdmin()) {
            BST.navigate("admin", BST.NavigationType.ADMIN);
        }
        else if (isTicketSales()) {
            BST.navigate("tickets", BST.NavigationType.TICKETS);
        }
        else {
            BST.navigate("home", BST.NavigationType.HOME);
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
    function keyNameToDisplayName(keyName) {
        var chars = keyName.split("");
        var outStr = "";
        for (var idx = 0; idx < chars.length; idx += 1) {
            var char = chars[idx];
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
    BST.keyNameToDisplayName = keyNameToDisplayName;
    //#endregion
    //#region HANDLE WINDOW LISTENERS
    window.addEventListener("load", function () { _initiate(); });
    //#endregion
})(BST || (BST = {}));
var BST;
(function (BST) {
    /**
    * create a date selector specific to BST shows with a default time & date
    * @version 1.0
    */
    var DateSelector = /** @class */ (function (_super) {
        __extends(DateSelector, _super);
        function DateSelector() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(DateSelector.prototype, "_defaultValue", {
            /** figure out what the default value should be */
            get: function () {
                var dt;
                if (DateSelector._lastDate) {
                    dt = new Date(DateSelector._lastDate.toString());
                }
                else {
                    dt = KIP.Dates.getToday();
                }
                dt = KIP.Dates.clearTimeInfo(dt);
                // try to grab the next day that would be likely be appropriate
                switch (dt.getDay()) {
                    // wednesday or thursday or friday
                    case 3:
                    case 4:
                    case 5:
                        dt = KIP.Dates.addToDate(dt, { days: 1 });
                        break;
                    default:
                        var diff = (4 - dt.getDay());
                        if (diff < 0) {
                            diff += 7;
                        }
                        dt = KIP.Dates.addToDate(dt, { days: diff });
                }
                dt.setHours(20);
                return dt;
            },
            enumerable: true,
            configurable: true
        });
        DateSelector.prototype._parseElemTemplate = function (template) {
            _super.prototype._parseElemTemplate.call(this, template);
        };
        DateSelector.prototype.render = function (parent) {
            _super.prototype.render.call(this, parent);
            DateSelector._lastDate = this._data;
        };
        DateSelector.prototype._onChange = function () {
            var result = _super.prototype._onChange.call(this);
            if (result) {
                DateSelector._lastDate = this._data;
            }
            return result;
        };
        DateSelector.prototype.update = function (data) {
            _super.prototype.update.call(this, data);
        };
        DateSelector.prototype._createClonedElement = function (appendToID) {
            if (!appendToID) {
                appendToID = "";
            }
            return new DateSelector(this._id + appendToID, this);
        };
        return DateSelector;
    }(KIP.Forms.DateTimeElement));
    BST.DateSelector = DateSelector;
})(BST || (BST = {}));
var BST;
(function (BST) {
    //#region SEASON LOADING
    /**...........................................................................
     * MenuTypeEnum
     * ...........................................................................
     * Types of buttons that can be in a menu
     * ...........................................................................
     */
    var MenuTypeEnum;
    (function (MenuTypeEnum) {
        /** link to a section */
        MenuTypeEnum[MenuTypeEnum["SECTION"] = 1] = "SECTION";
        /** link to an external page */
        MenuTypeEnum[MenuTypeEnum["EXTERNAL"] = 2] = "EXTERNAL";
    })(MenuTypeEnum = BST.MenuTypeEnum || (BST.MenuTypeEnum = {}));
    ;
    //#endregion
})(BST || (BST = {}));
var BST;
(function (BST) {
    ;
    ;
    var TrailerType;
    (function (TrailerType) {
        TrailerType[TrailerType["YOUTUBE"] = 1] = "YOUTUBE";
        TrailerType[TrailerType["VIMEO"] = 2] = "VIMEO";
        TrailerType[TrailerType["OTHER"] = 3] = "OTHER";
    })(TrailerType = BST.TrailerType || (BST.TrailerType = {}));
    var IGenderEnum;
    (function (IGenderEnum) {
        IGenderEnum[IGenderEnum["NO_PREFERENCE"] = 0] = "NO_PREFERENCE";
        IGenderEnum[IGenderEnum["FEMALE"] = 1] = "FEMALE";
        IGenderEnum[IGenderEnum["MALE"] = 2] = "MALE";
        IGenderEnum[IGenderEnum["NON_BINARY"] = 3] = "NON_BINARY";
    })(IGenderEnum = BST.IGenderEnum || (BST.IGenderEnum = {}));
    var AuditionExpectationType;
    (function (AuditionExpectationType) {
        AuditionExpectationType[AuditionExpectationType["MONOLOGUE"] = 1] = "MONOLOGUE";
        AuditionExpectationType[AuditionExpectationType["COLD_READ"] = 2] = "COLD_READ";
        AuditionExpectationType[AuditionExpectationType["DANCE_CALL"] = 3] = "DANCE_CALL";
        AuditionExpectationType[AuditionExpectationType["SINGING"] = 4] = "SINGING";
        AuditionExpectationType[AuditionExpectationType["IMPROV"] = 5] = "IMPROV";
    })(AuditionExpectationType = BST.AuditionExpectationType || (BST.AuditionExpectationType = {}));
    var CastOrCrew;
    (function (CastOrCrew) {
        CastOrCrew[CastOrCrew["CAST"] = 1] = "CAST";
        CastOrCrew[CastOrCrew["CREW"] = 2] = "CREW";
        CastOrCrew[CastOrCrew["SPECIAL_MENTION"] = 3] = "SPECIAL_MENTION";
    })(CastOrCrew = BST.CastOrCrew || (BST.CastOrCrew = {}));
    /**...........................................................................
     * @class Show
     * Keep track of the show object
     * @version 1.0
     * ...........................................................................
     */
    var Show = /** @class */ (function () {
        /**...........................................................................
         * create a show class
         *
         * @param   showData    Content of this show
         * ...........................................................................
         */
        function Show(showData) {
            showData = this._parseDates(showData);
            this._showTitle = showData.showTitle;
            this._showDetails = showData.showDetails;
            this._runDates = showData.runDates;
            this._bios = showData.bios;
            this._reviews = showData.reviews;
            this._photos = showData.photos;
            this._trailer = showData.trailer;
            this._auditions = showData.auditions;
        }
        Object.defineProperty(Show.prototype, "showTitle", {
            get: function () { return this._showTitle; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Show.prototype, "showDetails", {
            get: function () { return this._showDetails; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Show.prototype, "runDates", {
            get: function () { return this._runDates; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Show.prototype, "bios", {
            get: function () { return this._bios; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Show.prototype, "reviews", {
            get: function () { return this._reviews; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Show.prototype, "photos", {
            get: function () { return this._photos; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Show.prototype, "trailer", {
            get: function () { return this._trailer; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Show.prototype, "auditions", {
            get: function () { return this._auditions; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Show.prototype, "run", {
            get: function () { return this.getStartAndEndDates(); },
            enumerable: true,
            configurable: true
        });
        /**...........................................................................
         * _parseDates
         * ...........................................................................
         * Parse the string version of dates that come from the server
         *
         * @param   showData  Data from the server
         *
         * @returns The updated showData element with proper dates
         * ...........................................................................
         */
        Show.prototype._parseDates = function (showData) {
            // map the appropriate dates
            var i;
            if (!showData.runDates) {
                showData.runDates = [];
            }
            for (i = 0; i < showData.runDates.length; i += 1) {
                showData.runDates[i] = new Date(showData.runDates[i]);
            }
            // handle review dates
            if (!showData.reviews) {
                showData.reviews = [];
            }
            for (i = 0; i < showData.reviews.length; i += 1) {
                if (!showData.reviews[i]) {
                    continue;
                }
                showData.reviews[i].date = new Date(showData.reviews[i].date);
            }
            // handle audition dates
            if (showData.auditions && showData.auditions.dates) {
                for (i = 0; i < showData.auditions.dates.length; i += 1) {
                    var auditionDate = showData.auditions.dates[i];
                    auditionDate.start = new Date(auditionDate.start);
                    auditionDate.end = new Date(auditionDate.end);
                    showData.auditions.dates[i] = auditionDate;
                }
            }
            return showData;
        };
        /**...........................................................................
         * getStartAndEndDates
         * ...........................................................................
         * Figure out when the show is actually running
         *
         * @returns Run dates of the show
         * ...........................................................................
         */
        Show.prototype.getStartAndEndDates = function () {
            // return the already calculated run if we have it
            if (this._run) {
                return this._run;
            }
            // otherwise, loop through 
            var dates = this._runDates;
            dates = dates.sort(function (a, b) {
                if (a < b) {
                    return -1;
                }
                if (a > b) {
                    return 1;
                }
                return 0;
            });
            var out = {
                start: dates[0],
                end: dates[dates.length - 1]
            };
            this._run = out;
            return out;
        };
        /**...........................................................................
         * shouldShowBioSection
         * ...........................................................................
         * determine whether there are bios to show
         *
         * @returns True if this show has bios
         * ...........................................................................
         */
        Show.prototype.shouldShowBioSection = function () {
            if (!this.bios) {
                return false;
            }
            if (this.bios.length === 0) {
                return false;
            }
            return true;
        };
        /**...........................................................................
         * shouldShowBuzzSection
         * ...........................................................................
         * determine whether there are reviews to show
         *
         * @returns True if this show has any reviews
         * ...........................................................................
         */
        Show.prototype.shouldShowBuzzSection = function () {
            if (!this.reviews) {
                return false;
            }
            if (this.reviews.length === 0) {
                return false;
            }
            return true;
        };
        /**...........................................................................
         * shouldShowAuditionsSection
         * ...........................................................................
         * determine whether there are auditions
         *
         * @returns True if this show has any auditions
         * ...........................................................................
         */
        Show.prototype.shouldShowAuditionsSection = function () {
            if (!this.auditions) {
                return false;
            }
            if (this.auditions.dates.length === 0) {
                return false;
            }
            var run = this.run;
            var today = KIP.Dates.getToday();
            if (run.start < today) {
                return false;
            }
            return true;
        };
        /**...........................................................................
         * shouldShowTicketSection
         * ...........................................................................
         * determine whether we should be showing the ticket section
         *
         * @returns True if this show has tickets available
         * ...........................................................................
         */
        Show.prototype.shouldShowTicketSection = function () {
            if (!this.runDates) {
                return false;
            }
            if (this.runDates.length === 0) {
                return false;
            }
            if (!this.showTitle.bptLink) {
                return false;
            }
            return this.hasShowEnded();
        };
        /**...........................................................................
         * hasShowEnded
         * ...........................................................................
         * Determine if this show is already over
         *
         * @returns True if the show has ended
         * ...........................................................................
         */
        Show.prototype.hasShowEnded = function () {
            var run = this.run;
            var today = KIP.Dates.getToday();
            if (run.end < today) {
                return false;
            }
            return true;
        };
        return Show;
    }());
    BST.Show = Show;
})(BST || (BST = {}));
var BST;
(function (BST) {
    /**
     * @class   HomeData
     *
     * @version 1.0
     * @author  Kip Price
     */
    var HomeData = /** @class */ (function () {
        function HomeData() {
        }
        /**
         * shouldShowSectionLink
         *
         * Determines if a particular link should show for a section, based
         * on whether that section actually exists in code.
         * @param   key     The key of the section
         * @returns True if the key matches a section, false otherwise
         */
        HomeData.shouldShowSectionLink = function (key) {
            switch (key) {
                case "news":
                case "getInvolved":
                case "about":
                case "resources":
                case "donate":
                case "seasonsSection":
                    return true;
                default:
                    return false;
            }
        };
        return HomeData;
    }());
    BST.HomeData = HomeData;
})(BST || (BST = {}));
var BST;
(function (BST) {
    var scrollDistance = 0;
    var SLOW_SCROLL = -0.4; // Slow scroll is half the pace of the rest
    var FAST_SCROLL = -1.5;
    var OFFSET_TOP = 150;
    var TRANSPARENCY_SCALE = .01;
    var TRANSFORM_SCALE = .001;
    var SCROLL_TYPE;
    (function (SCROLL_TYPE) {
        SCROLL_TYPE[SCROLL_TYPE["SLOW_SCROLL"] = 1] = "SLOW_SCROLL";
        SCROLL_TYPE[SCROLL_TYPE["REVERSE_SLOW_SCROLL"] = 2] = "REVERSE_SLOW_SCROLL";
        SCROLL_TYPE[SCROLL_TYPE["FAST_SCROLL"] = 3] = "FAST_SCROLL";
    })(SCROLL_TYPE = BST.SCROLL_TYPE || (BST.SCROLL_TYPE = {}));
    ;
    BST.scrollers = [];
    function scrollTo(elemID, target, forceTarget) {
        var elem = document.getElementById(elemID);
        if (!elem) {
            return;
        }
        if (!forceTarget && (elem.offsetHeight < (window.innerHeight - target))) {
            target = null;
        }
        KIP.Helpers.scrollTo(elem, target);
    }
    BST.scrollTo = scrollTo;
    /** let an element scroll slower than the rest of the page */
    function slowScroll(elem) {
        var origPt = {
            x: 0,
            y: parseInt(elem.style.top) || elem.offsetTop
        };
        var scrollableElem = {
            elem: elem,
            origPt: origPt,
            type: SCROLL_TYPE.SLOW_SCROLL
        };
        BST.scrollers.push(scrollableElem);
    }
    BST.slowScroll = slowScroll;
    /** allow an element to scroll slower than the rest - assigns negative values */
    function slowReverseScroll(elem) {
        var origPt = {
            x: 0,
            y: parseInt(elem.style.top) || elem.offsetTop
        };
        var scrollableElem = {
            elem: elem,
            origPt: origPt,
            type: SCROLL_TYPE.REVERSE_SLOW_SCROLL
        };
        BST.scrollers.push(scrollableElem);
    }
    BST.slowReverseScroll = slowReverseScroll;
    /** handles the slow scrolling */
    function onSlowScroll(elem, originalPosition, curPosition, reverse) {
        var deltaDistance = curPosition.y;
        var tmp = deltaDistance * (reverse ? -1 * SLOW_SCROLL : SLOW_SCROLL);
        elem.style.top = (originalPosition.y + tmp) + "px";
    }
    /** scroll an element faster than the rest of the screen */
    function fastScroll(elem) {
        // window.addEventListener("scroll", (e: Event) => {
        //     onFastScroll(e, elem);
        // });
    }
    BST.fastScroll = fastScroll;
    /** handles the fast scrolling */
    function onFastScroll(e, elem) {
        var scrollPosition = KIP.getScrollPosition();
        var deltaDistance = scrollPosition.y - scrollDistance;
        scrollDistance = scrollPosition.y;
        // Subtract the appropriate amount from the top / left vars
        var tmp = deltaDistance * FAST_SCROLL;
        deltaDistance = tmp - deltaDistance;
        KIP.moveElemRelativePosition(elem, { x: 0, y: deltaDistance });
    }
    /** use the built in  animation stuff */
    // handleScrollAnimation();
    // function handleScrollAnimation () {
    //     let scrollPosition: KIP.IPoint = KIP.getScrollPosition();
    //     scrollers.map((elem: IScrollableElem) => {
    //         if (elem.type === SCROLL_TYPE.FAST_SCROLL) { return; }
    //         let reverse: boolean =  (elem.type === SCROLL_TYPE.REVERSE_SLOW_SCROLL);
    //         onSlowScroll(elem.elem, elem.origPt, scrollPosition, reverse);
    //     });
    //     window.requestAnimationFrame(() => { handleScrollAnimation(); });
    // }
    window.addEventListener("scroll", function (e) {
        var scrollPosition = KIP.getScrollPosition();
        BST.scrollers.map(function (elem) {
            if (elem.type === SCROLL_TYPE.FAST_SCROLL) {
                return;
            }
            var reverse = (elem.type === SCROLL_TYPE.REVERSE_SLOW_SCROLL);
            onSlowScroll(elem.elem, elem.origPt, scrollPosition, reverse);
        });
    });
})(BST || (BST = {}));
var BST;
(function (BST) {
    var Server;
    (function (Server) {
        Server.DEBUG = true;
        /**...........................................................................
         * getPath
         * ...........................................................................
         * helper to grab the path the the right file
         *
         * @returns the appropriate path the relevant files
         * ...........................................................................
         */
        function getPath() {
            var path;
            if (BST.isAdmin() && Server.DEBUG) {
                path = "../php/bst.php";
            }
            else if (BST.isAdmin()) {
                path = "../router.php";
            }
            else if (Server.DEBUG) {
                path = "../php/bst.php";
            }
            else {
                //path = "../../../php/bst/bst.php"
                path = "router.php";
            }
            return path;
        }
        Server.getPath = getPath;
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
        function loadShow(showId, onLoaded, onError) {
            var path = getPath();
            // TODO : set a real URL for this request
            KIP.ajaxRequest(KIP.AjaxTypeEnum.POST, path, function (data) {
                var showData;
                var show;
                if (data) {
                    // try to parse the show
                    try {
                        showData = JSON.parse(data);
                    }
                    catch (e) {
                        console.log("Err: JSON couldn't be parsed");
                        console.log(data);
                        if (onError) {
                            onError(data);
                        }
                        return;
                    }
                    // Create a real show from this data
                    show = new BST.Show(showData);
                }
                // actually run the logic to load the show
                onLoaded(show);
            }, function (data) { }, { type: "loadShow", showID: showId });
        }
        Server.loadShow = loadShow;
        /**...........................................................................
         * loadHome
         * ...........................................................................
         * load the data for the home page
         *
         * @param   onLoaded
         * ...........................................................................
         */
        function loadHome(onLoaded) {
            var path = getPath();
            // POST THE REQUEST
            KIP.ajaxRequest(KIP.AjaxTypeEnum.POST, path, function (data) {
                var home;
                // try to parse the show
                try {
                    home = JSON.parse(data);
                }
                catch (e) {
                    console.log("Err: JSON couldn't be parsed");
                    console.log(data);
                    return;
                }
                // map the appropriate dates
                var i;
                for (i = 0; i < home.news.length; i += 1) {
                    home.news[i].date = new Date(home.news[i].date);
                }
                for (i = 0; i < home.about.detailedHistory.length; i += 1) {
                    if (!home.about.detailedHistory[i].date) {
                        continue;
                    }
                    home.about.detailedHistory[i].date = new Date(home.about.detailedHistory[i].date);
                }
                // actually run the logic to load the show
                onLoaded(home);
            }, function (data) { }, { type: "loadHome" });
        }
        Server.loadHome = loadHome;
        /**...........................................................................
         * loadSeasons
         * ...........................................................................
         * Loads the seasons of BST
         *
         * @param onLoaded
         * ...........................................................................
         */
        function loadSeasons(onLoaded) {
            var path = getPath();
            // POST THE REQUEST
            KIP.ajaxRequest(KIP.AjaxTypeEnum.POST, path, function (data) {
                var seasons;
                // try to parse the show
                try {
                    seasons = JSON.parse(data);
                }
                catch (e) {
                    console.log("Err: JSON couldn't be parsed");
                    console.log(data);
                    return;
                }
                // actually run the logic to load the show
                onLoaded(seasons);
            }, function (data) { }, { type: "loadSeasons" });
        }
        Server.loadSeasons = loadSeasons;
        function testBptAPI(eventID, success) {
            var path = getPath();
            KIP.ajaxRequest(KIP.AjaxTypeEnum.POST, path, function (data) { console.log("success!"); success(data); }, function () { console.log("failure!"); }, { type: "bptGetShowAvailability", eventID: eventID });
        }
        Server.testBptAPI = testBptAPI;
        function testIsAdmin() {
            var path = getPath();
            KIP.ajaxRequest(KIP.AjaxTypeEnum.POST, path, function (data) { console.log(data); }, function () { console.log("err"); }, { type: "isAdminContext" });
        }
        Server.testIsAdmin = testIsAdmin;
    })(Server = BST.Server || (BST.Server = {}));
})(BST || (BST = {}));
var BST;
(function (BST) {
    var Helpers;
    (function (Helpers) {
        /**...........................................................................
         * getShowStartAndEndDates
         * ...........................................................................
         * Grab the run of the show
         *
         * @param   showData    The data to grab the run from
         *
         * @returns The run of the show
         * ...........................................................................
         */
        function getShowStartAndEndDates(showData) {
            var show = new BST.Show(showData);
            return show.getStartAndEndDates();
        }
        Helpers.getShowStartAndEndDates = getShowStartAndEndDates;
    })(Helpers = BST.Helpers || (BST.Helpers = {}));
})(BST || (BST = {}));
var BST;
(function (BST) {
    var Helpers;
    (function (Helpers) {
        /**...........................................................................
         * sortSeasons
         * ...........................................................................
         * Sort all shows, from earliest to latest
         *
         * @param   seasons     The list of all shows
         *
         * @returns The sorted set of seasons
         * ...........................................................................
         */
        function sortSeasons(seasons) {
            var newArr = seasons.sort(function (a, b) {
                var dateA = new Date(a.endDate);
                var dateB = new Date(b.endDate);
                if (dateA < dateB) {
                    return -1;
                }
                if (dateB < dateA) {
                    return 1;
                }
                return 0;
            });
            return seasons;
        }
        Helpers.sortSeasons = sortSeasons;
        /**...........................................................................
         * findImmediateShow
         * ...........................................................................
         * Find the show that is currently running, along with 2 before and 2 after
         *
         * @param   seasons     The list of all shows
         *
         * @returns A list of shows that should be shown on the home page
         * ...........................................................................
         */
        function findImmediateShow(seasons) {
            var out = [];
            seasons = sortSeasons(seasons);
            var today = KIP.Dates.getToday();
            var idx = seasons.length - 1;
            var foundCenter = seasons.length - 1;
            for (idx; idx >= 0; idx -= 1) {
                var show = seasons[idx];
                var curEndDate = new Date(show.endDate);
                // this is the first out of bounds show
                if (today > curEndDate) {
                    break;
                }
                foundCenter = idx;
            }
            seasons[foundCenter].selected = true;
            // now that we have found an index, get the things around it
            var startIdx = foundCenter - 2;
            var endIdx = foundCenter + 2;
            if (endIdx >= seasons.length) {
                startIdx = Math.max(startIdx - (endIdx - seasons.length), 0);
                endIdx = seasons.length - 1;
            }
            if (startIdx < 0) {
                endIdx = Math.min(endIdx - startIdx, seasons.length - 1);
            }
            out = seasons.slice(startIdx, endIdx + 1);
            return out;
        }
        Helpers.findImmediateShow = findImmediateShow;
    })(Helpers = BST.Helpers || (BST.Helpers = {}));
})(BST || (BST = {}));
var BST;
(function (BST) {
    var Server;
    (function (Server) {
        /**...........................................................................
         * saveSeasons (public)
         * ...........................................................................
         * Save an updated season list
         *
         * @param   data        The new seasons list
         * @param   onLoaded    What to do when the seasons have been saved
         * ...........................................................................
         */
        function saveSeasons(data, onLoaded) {
            if (!BST.isAdmin()) {
                return;
            }
            var path = Server.getPath();
            KIP.ajaxRequest(KIP.AjaxTypeEnum.POST, path, function (data) {
                if (data === "not admin") {
                    _showNonAdminPopup();
                    return;
                }
                var seasons;
                try {
                    seasons = JSON.parse(data);
                    if (onLoaded) {
                        onLoaded(seasons);
                    }
                }
                catch (e) {
                    console.warn("saveSeasons - JSON couldn't be parsed: " + data);
                    return;
                }
            }, function () { }, { type: "saveSeasons", seasons: JSON.stringify(data) });
        }
        Server.saveSeasons = saveSeasons;
        function saveHome(data, onLoaded) {
            if (!BST.isAdmin()) {
                return;
            }
            var path = Server.getPath();
            KIP.ajaxRequest(KIP.AjaxTypeEnum.POST, path, function (data) {
                var home;
                if (data === "not admin") {
                    _showNonAdminPopup();
                    return;
                }
                try {
                    home = JSON.parse(data);
                    if (onLoaded) {
                        onLoaded(home);
                    }
                }
                catch (e) {
                    console.warn("saveHome - JSON couldn't be parsed: " + data);
                    return;
                }
            }, function () { }, { type: "saveHome", home: JSON.stringify(data) });
        }
        Server.saveHome = saveHome;
        /**...........................................................................
         * saveShow
         * ...........................................................................
         * Saves a particular show to the server. Requires admin access
         *
         * @param   showData    The data to save
         * @param   onComplete  What to do when the show has been saved
         * ...........................................................................
         */
        function saveShow(showData, onComplete) {
            if (!BST.isAdmin()) {
                return;
            }
            var data = convertDatesToStrings(showData);
            var path = Server.getPath();
            KIP.ajaxRequest(KIP.AjaxTypeEnum.POST, path, function (data) {
                if (data === "not admin") {
                    _showNonAdminPopup();
                    return;
                }
                if (onComplete) {
                    onComplete(data);
                }
            }, function () { }, { type: "showEdited", showID: data.showTitle.id, showData: JSON.stringify(data) });
        }
        Server.saveShow = saveShow;
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
        function convertDatesToStrings(data) {
            KIP.map(data, function (elem, key) {
                if (elem instanceof Date) {
                    data[key] = KIP.Dates.shortDateTime(elem);
                }
                else if (typeof elem === "object") {
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
        function saveActorPhoto(file, successCb) {
            _savePhoto(file, successCb, "saveActorPhoto");
        }
        Server.saveActorPhoto = saveActorPhoto;
        /**...........................................................................
         * saveShowPhoto
         * ...........................................................................
         * Save a show photo
         *
         * @param file
         * @param showID
         * @param successCb
         */
        function saveShowPhoto(file, showID, successCb) {
            _savePhoto(file, successCb, "saveShowPhoto", showID);
        }
        Server.saveShowPhoto = saveShowPhoto;
        /**...........................................................................
         * saveIconPhoto
         * ...........................................................................
         *
         * @param file
         * @param showID
         * @param successCb
         * ...........................................................................
         */
        function saveIconPhoto(file, showID, successCb) {
            _savePhoto(file, successCb, "saveIconPhoto", showID);
        }
        Server.saveIconPhoto = saveIconPhoto;
        function saveGetInvolvedPhoto(file, successCb) {
            _savePhoto(file, successCb, "saveGetInvolvedPhoto");
        }
        Server.saveGetInvolvedPhoto = saveGetInvolvedPhoto;
        function saveLogoPhoto(file, successCb) {
            _savePhoto(file, successCb, "saveLogoPhoto");
        }
        Server.saveLogoPhoto = saveLogoPhoto;
        function saveBgPhoto(file, successCb) {
            _savePhoto(file, successCb, "saveBGPhoto");
        }
        Server.saveBgPhoto = saveBgPhoto;
        /**...........................................................................
         * _savePhoto
         * ...........................................................................
         * @param file
         * @param successCb
         * @param type
         * @param showID
         * ...........................................................................
         */
        function _savePhoto(file, successCb, type, showID) {
            if (!file) {
                return;
            }
            var form = new FormData();
            form.append("picture", file, file.name);
            form.append("type", type);
            if (showID) {
                form.append("showID", showID);
            }
            var path = Server.getPath();
            KIP.ajaxRequest(KIP.AjaxTypeEnum.POST, path, function (data) {
                if (data === "not admin") {
                    _showNonAdminPopup();
                    return;
                }
                if (successCb) {
                    successCb(data);
                }
            }, function () { }, form);
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
        function login(token, success, failure) {
            if (!BST.isAdmin()) {
                return;
            }
            var path = Server.getPath();
            KIP.ajaxRequest(KIP.AjaxTypeEnum.POST, path, function (data) {
                if (+data) {
                    success(data);
                }
                else {
                    failure(data);
                }
            }, function () { failure("-1"); }, { type: "login", token: token });
        }
        Server.login = login;
        /**...........................................................................
         * logout
         * ...........................................................................
         * Handle the user logging out of a google account
         * ...........................................................................
         */
        function logout() {
            var path = Server.getPath();
            KIP.ajaxRequest(KIP.AjaxTypeEnum.POST, path, function (data) {
                console.log("logged out: " + data);
            }, function () { }, { type: "logout" });
        }
        Server.logout = logout;
        /**...........................................................................
         * _showNonAdminPopup
         * ...........................................................................
         * Handle when the user tries to take an action that they are not registered
         * as an administrator for (e.g. saving data)
         * ...........................................................................
         */
        function _showNonAdminPopup() {
            var err = new KIP.ErrorPopup("You probably shouldn't be seeing this error, but you can try refreshing & relogging in", "Hmm...looks like you aren't authorized to make changes");
            err.setThemeColor(0, "#EA0");
            err.draw(document.body);
        }
        //#endregion
    })(Server = BST.Server || (BST.Server = {}));
})(BST || (BST = {}));
var BST;
(function (BST) {
    /**...........................................................................
     * @class View
     * Shared class for handling all view types
     * @version 1.0
     * ...........................................................................
     */
    var View = /** @class */ (function (_super) {
        __extends(View, _super);
        function View(objElem) {
            var _this = _super.call(this, objElem) || this;
            _this._registerResizeListener();
            window.setTimeout(function () {
                _this._updateMobileClasses();
                _this._onResize();
            });
            return _this;
        }
        Object.defineProperty(View.prototype, "base", {
            /** the base element for this View */
            get: function () { return this._elems.base; },
            enumerable: true,
            configurable: true
        });
        /**...........................................................................
         * _registerResizeListener
         * ...........................................................................
         * Handle resizing
         * ...........................................................................
         */
        View.prototype._registerResizeListener = function () {
            var _this = this;
            window.addEventListener("resize", function () {
                _this._updateMobileClasses();
                _this._onResize();
            });
        };
        View.prototype._updateMobileClasses = function () {
            KIP.removeClass(this._elems.base, "vertical");
            KIP.removeClass(this._elems.base, "mobile");
            KIP.removeClass(this._elems.base, "small");
            KIP.removeClass(this._elems.base, "med");
            KIP.removeClass(this._elems.base, "large");
            var dim = {
                width: window.innerWidth,
                height: window.innerHeight
            };
            console.log("reg width: " + dim.width);
            var ratio = (dim.width / dim.height);
            if (ratio < 1) {
                KIP.addClass(this._elems.base, "vertical");
            }
            if (dim.width < 400) {
                KIP.addClass(this._elems.base, "small mobile");
            }
            else if (dim.width < 800) {
                KIP.addClass(this._elems.base, "med mobile");
            }
            else if (dim.width < 1025) {
                KIP.addClass(this._elems.base, "large mobile");
            }
            if (dim.width < 1025) {
                this._isMobile = true;
            }
        };
        /**...........................................................................
         * _shouldSkipCreateElements
         * ...........................................................................
         * Checks if we should prevent creating elements
         *
         * @returns True if we should not create the elements
         * ...........................................................................
         */
        View.prototype._shouldSkipCreateElements = function () {
            return (!this._data);
        };
        return View;
    }(KIP.Drawable));
    BST.View = View;
})(BST || (BST = {}));
var BST;
(function (BST) {
    var SectionView = /** @class */ (function (_super) {
        __extends(SectionView, _super);
        /**
         * create a section
         *
         * @param   id
         * @param   title
         * @param   addlClass
         */
        function SectionView(id, title, addlClass) {
            var _this = _super.call(this) || this;
            _this._id = id;
            _this._title = title;
            _this._class = addlClass;
            return _this;
        }
        Object.defineProperty(SectionView.prototype, "data", {
            set: function (data) {
                this._setData(data);
            },
            enumerable: true,
            configurable: true
        });
        SectionView.prototype._setData = function (data) {
            this._data = data;
            if (!this._elems.base) {
                this._createElements();
            }
            this._createSectionElements();
        };
        /**
         * handle the creation of the base section elements
         */
        SectionView.prototype._createElements = function () {
            // Create the appropriate class
            var cls = "section";
            if (this._class) {
                cls += " " + this._class;
            }
            // Create the elements we need
            var elem = KIP.createSimpleElement(this._id, cls);
            var titleElem = KIP.createSimpleElement(this._id + "|title", "sectionTitle", this._title, null, null, elem);
            var contentElem = KIP.createSimpleElement(this._id + "|content", "sectionContent", "", null, null, elem);
            // Save off the elements to our general array
            this._elems = {
                base: elem,
                title: titleElem,
                content: contentElem
            };
        };
        SectionView._uncoloredStyles = {
            ".section": {
                position: "relative",
                backgroundColor: "#FFF",
                color: "#222",
                paddingLeft: "30%",
                paddingRight: "30%",
                fontFamily: "OpenSansLight",
                wordWrap: "break-word",
                boxShadow: "0px 1px 15px 8px rgba(0, 0, 0, .2)",
                paddingTop: "15px",
                paddingBottom: "15px",
                zIndex: "1",
                margin: "20px 0",
                boxSizing: "border-box",
                width: "100%"
            },
            ".mobile .section": {
                paddingLeft: "4vw",
                paddingRight: "4vw",
                fontSize: "2em",
                paddingBottom: "2vh"
            },
            ".section .sectionTitle": {
                fontSize: "2em",
                fontFamily: "OpenSansBold",
                color: "#23262b"
            }
        };
        return SectionView;
    }(BST.View));
    BST.SectionView = SectionView;
})(BST || (BST = {}));
var BST;
(function (BST) {
    /**...........................................................................
     * @class SubSection
     * ...........................................................................
     * Creates a subsection for display
     * @version 1.1
     * ...........................................................................
     */
    var SubSection = /** @class */ (function (_super) {
        __extends(SubSection, _super);
        /**...........................................................................
         * Creates a subsection element
         *
         * @param   data    Data to shows as a part of this subsection
         * @param   name    The name of the subsection tab
         * ...........................................................................
         */
        function SubSection(data, name) {
            var _this = _super.call(this) || this;
            _this._data = data;
            _this._name = name;
            _this._createElements();
            return _this;
        }
        Object.defineProperty(SubSection.prototype, "tab", {
            /** grab the tab for this particular element */
            get: function () { return this._elems.tab; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubSection.prototype, "content", {
            /** grab the content element */
            get: function () { return this._elems.content; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubSection.prototype, "index", {
            get: function () { return this._index; },
            set: function (idx) { this._index = idx; },
            enumerable: true,
            configurable: true
        });
        /**...........................................................................
         * _createElements
         * ...........................................................................
         * Create the elements for the subsection
         * ...........................................................................
         */
        SubSection.prototype._createElements = function () {
            this._elems.tab = KIP.createSimpleElement("", "tab", this._name);
            this._createContent();
            this._elems.base = KIP.createSimpleElement("", "subsectionView hidden", "", null, [this._elems.content]);
        };
        /**...........................................................................
         * select
         * ...........................................................................
         * show a particular section
         * ...........................................................................
         */
        SubSection.prototype.select = function () {
            var _this = this;
            KIP.removeClass(this._elems.base, "hidden");
            KIP.transition(this._elems.base, { opacity: "0 !important", maxHeight: "0" }, { opacity: "1 !important", maxHeight: "<height>" }, 400, 200).then(function () {
                KIP.addClass(_this._elems.tab, "selected");
            });
        };
        /**...........................................................................
         * deselect
         * ...........................................................................
         * hide a particular subsection
         * ...........................................................................
         */
        SubSection.prototype.deselect = function () {
            var _this = this;
            KIP.removeClass(this._elems.tab, "selected");
            KIP.transition(this._elems.base, { opacity: "1", maxHeight: "<height>" }, { opacity: "0 !important", maxHeight: "0" }, 400).then(function () {
                KIP.addClass(_this._elems.base, "hidden");
            });
        };
        /** styles specific to subsections */
        SubSection._uncoloredStyles = {
            ".subsection": {
                display: "inline-block",
                maxWidth: "50%",
                boxSizing: "border-box",
                verticalAlign: "top"
            },
            ".subsection + .subsection": {
                paddingLeft: "40px"
            },
            ".subsection .subheader": {
                fontSize: "1.5em",
                fontFamily: "OpenSansBold",
                textTransform: "uppercase",
                marginTop: "10px",
                marginBottom: "5px"
            },
            ".mobile .subsectionView": {
                marginTop: "2vh"
            }
        };
        return SubSection;
    }(BST.View));
    BST.SubSection = SubSection;
})(BST || (BST = {}));
var BST;
(function (BST) {
    /**...........................................................................
     * @class SubSections
     * Keep track of several subsection elements
     * @version 1.0
     * ...........................................................................
     */
    var SubSections = /** @class */ (function (_super) {
        __extends(SubSections, _super);
        function SubSections() {
            var _this = _super.call(this) || this;
            _this._subsections = [];
            _this._currentSelection = null;
            _this._createElements();
            return _this;
        }
        /**...........................................................................
         * _createElements
         * ...........................................................................
         * Create elements for the subsections
         * ...........................................................................
         */
        SubSections.prototype._createElements = function () {
            this._elems.tabs = KIP.createSimpleElement("", "tabContainer");
            this._elems.contentPane = KIP.createSimpleElement("", "subsectionContent");
            this._elems.base = KIP.createSimpleElement("", "subsectionContainer", "", null, [this._elems.tabs, this._elems.contentPane]);
        };
        /**...........................................................................
         * addSubSections
         * ...........................................................................
         * Add a set of subsections to this element
         *
         * @param   subsections     Any number of subsections that should be added
         * ...........................................................................
         */
        SubSections.prototype.addSubSections = function () {
            var subsections = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                subsections[_i] = arguments[_i];
            }
            var subsection;
            for (var _a = 0, subsections_1 = subsections; _a < subsections_1.length; _a++) {
                subsection = subsections_1[_a];
                this.addSubSection(subsection);
            }
        };
        /**...........................................................................
         * addSubSection
         * ...........................................................................
         * add a subsection to our collection
         * @param   subsection  The subsection to add
         * ...........................................................................
         */
        SubSections.prototype.addSubSection = function (subsection) {
            var _this = this;
            subsection.index = this._subsections.length;
            this._subsections.push(subsection);
            subsection.tab.addEventListener("click", function (e) {
                _this.selectTab(subsection.index);
            });
            // if this is the first subsection, select it
            if (this._subsections.length === 1) {
                this.selectTab(0);
            }
            // add to our view
            this._elems.contentPane.appendChild(subsection.base);
            this._elems.tabs.appendChild(subsection.tab);
        };
        /**...........................................................................
         * selectTab
         * ...........................................................................
         * selects the appropriate tab
         * @param   index   The index of the subsection to select
         * ...........................................................................
         */
        SubSections.prototype.selectTab = function (index) {
            if (index === this._currentSelection) {
                return;
            }
            // handle the currently selected section
            var selectedSection;
            if (this._currentSelection !== null) {
                selectedSection = this._subsections[this._currentSelection];
            }
            if (selectedSection) {
                selectedSection.deselect();
            }
            // select the new section
            var newSection = this._subsections[index];
            if (newSection) {
                newSection.select();
                this._currentSelection = index;
            }
            //this._contentPane.style.marginLeft = (index * -100) + "%";
        };
        SubSections._uncoloredStyles = {
            ".subsectionContent": {
                transition: "all ease-in-out .3s",
            },
            ".tabContainer": {
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
                marginTop: "10px",
                fontFamily: "OpenSansBold",
                nested: {
                    ".tab": {
                        cursor: "pointer",
                        transition: ".08s ease-in-out all",
                        color: "#666",
                        whiteSpace: "nowrap",
                        nested: {
                            "&.tab:hover": {
                                transform: "scale(1.1)",
                                textDecoration: "underline",
                                color: "#333"
                            },
                            "&.tab.selected": {
                                transform: "scale(1.1)",
                                textDecoration: "underline",
                                color: "#333"
                            }
                        }
                    },
                }
            },
            ".mobile": {
                nested: {
                    ".subsectionContainer": {
                        display: "flex",
                        nested: {
                            ".tabContainer": {
                                flexDirection: "column",
                                marginRight: "25px",
                                textAlign: "right",
                                justifyContent: "flex-start",
                                nested: {
                                    ".tab": {
                                        fontSize: "0.8em",
                                        marginBottom: "25px"
                                    }
                                }
                            },
                            ".subsectionContent": {
                                borderLeft: "1px dotted rgba(0,0,0,.5)",
                                paddingLeft: "20px",
                                nested: {
                                    ".subsectionView": {
                                        marginTop: "0"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
        return SubSections;
    }(BST.View));
    BST.SubSections = SubSections;
})(BST || (BST = {}));
var BST;
(function (BST) {
    var ANIMATION_TIME = 800;
    /**...........................................................................
     * @class BSTHeader
     * ...........................................................................
     * Create the shared header
     * @version 1.0
     * ...........................................................................
     */
    var BSTHeader = /** @class */ (function (_super) {
        __extends(BSTHeader, _super);
        //#endregion
        /**...........................................................................
         * Creates a shared header view
         *
         * @param   home    The data that will be displayed as the home
         * ...........................................................................
         */
        function BSTHeader(home) {
            var _this = _super.call(this) || this;
            _this._homeData = home;
            _this._resizeListeners = [];
            _this._data = {};
            _this._createElements();
            return _this;
        }
        Object.defineProperty(BSTHeader.prototype, "homeData", {
            set: function (data) { this._homeData = data; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BSTHeader.prototype, "showData", {
            get: function () { return this._showData; },
            set: function (data) { this._showData = data; },
            enumerable: true,
            configurable: true
        });
        /**...........................................................................
         * _createElements
         * ...........................................................................
         * Create all of the elements needed for the header
         * ...........................................................................
         */
        BSTHeader.prototype._createElements = function () {
            // create the base + wrapper elements
            this._elems.base = KIP.createElement({ cls: "header" });
            this._elems.wrapper = KIP.createElement({ cls: "headerWrapper", parent: this._elems.base });
            // create specific home elements
            this._createHomeElements();
            // create specific show elements
            this._createShowElements();
        };
        //#region CREATE HOME / SHARED ELEMENTS
        /**...........................................................................
         * _createHomeElements
         * ...........................................................................
         * create the elements that are specific to the home side of the header
         * ...........................................................................
         */
        BSTHeader.prototype._createHomeElements = function () {
            this._elems.home = KIP.createElement({ cls: "home", parent: this._elems.wrapper });
            // create the logo and name
            this._createBSTNameAndLogo();
            // create the menu element
            this._createHomeMenuElements();
        };
        /**...........................................................................
         * _createBSTNameAndLogo
         * ...........................................................................
         * create the elements to show the BST logo and name
         * ...........................................................................
         */
        BSTHeader.prototype._createBSTNameAndLogo = function () {
            // create the wrapper element
            var wrapper = KIP.createElement({ cls: "homeName", parent: this._elems.home });
            // create the home name
            this._elems.homeTitle = KIP.createElement({ cls: "homeTitle", content: "Broom Street Theater", parent: wrapper });
            // create the appropriate logo
            this._elems.homeLogo = KIP.createElement({
                cls: "bstLogo",
                type: "img",
                attr: {
                    "src": this._homeData.logoURL
                },
                parent: wrapper
            });
            this._elems.homeLogo.addEventListener("click", function () {
                BST.navigate("home", BST.NavigationType.HOME);
            });
        };
        /**...........................................................................
         * _createShowMenuElements
         * ...........................................................................
         * create the menu elements relevant for shows
         * ...........................................................................
         */
        BSTHeader.prototype._createShowMenuElements = function () {
            // create the buttons specific to sections in the show
            var synopsisBtn = this._createShowNavButton("SYNOPSIS", "|synopsis");
            var biosBtn = this._createShowNavButton("BIOS", "|bios");
            var reviewBtn = this._createShowNavButton("BUZZ", "|buzz");
            var tixBtn = this._createShowNavButton("GET TICKETS", "|tix");
            // create the button that will go back to the home screen
            var homeBtn = KIP.createSimpleElement("", "menuItem", "HOME");
            homeBtn.addEventListener("click", function () {
                BST.navigate("", BST.NavigationType.HOME);
            });
            // create the array of the button elements
            var children = [];
            if (this._showData) {
                children.push(homeBtn);
                children.push(synopsisBtn);
                if (this._showData.shouldShowBioSection()) {
                    children.push(biosBtn);
                }
                if (this._showData.shouldShowBuzzSection()) {
                    children.push(reviewBtn);
                }
                if (this._showData.shouldShowTicketSection()) {
                    children.push(tixBtn);
                }
            }
            // add the children to the appropriate element
            if (!this._elems.showMenuElems) {
                this._elems.showMenuElems = KIP.createElement({ cls: "showMnu menuItems hidden", children: children, parent: this._elems.menuElems });
            }
            else {
                this._elems.showMenuElems.innerHTML = "";
                for (var i = 0; i < children.length; i += 1) {
                    this._elems.showMenuElems.appendChild(children[i]);
                }
            }
        };
        /**...........................................................................
         * _createSubNavBarButton
         * ...........................................................................
         * helper to create a button in the show nav bar
         * @param   lbl         The label to use for this button
         * @param   sectionID   The section
         * @returns The created navigation element
         * ...........................................................................
         */
        BSTHeader.prototype._createShowNavButton = function (lbl, sectionID) {
            var _this = this;
            var menuItem = {
                type: BST.MenuTypeEnum.SECTION,
                name: lbl,
                link: sectionID
            };
            var menuElem = this._createHomeMenuItem(menuItem);
            menuElem.addEventListener("click", function () {
                BST.scrollTo(_this._showData.showTitle.id + sectionID, _this._elems.base.offsetHeight);
            });
            return menuElem;
        };
        /**...........................................................................
         * _createHomeMenuElements
         * ...........................................................................
         * create the elements that make up the home menu
         * ...........................................................................
         */
        BSTHeader.prototype._createHomeMenuElements = function () {
            // create the base elements
            this._elems.menuElems = KIP.createElement({ cls: "menuItems", parent: this._elems.home });
            this._elems.homeMenuElems = KIP.createElement({ cls: "homeMnu menuItems", parent: this._elems.menuElems });
            // add each of the configured menu items
            var item;
            for (var _i = 0, _a = this._homeData.menuItems; _i < _a.length; _i++) {
                item = _a[_i];
                if (item.type === BST.MenuTypeEnum.SECTION && !BST.HomeData.shouldShowSectionLink(item.link)) {
                    continue;
                }
                var menuItemElem = this._createHomeMenuItem(item);
                // make sure we can get to the appropriate spot
                if (item.type === BST.MenuTypeEnum.SECTION) {
                    this._addMenuLink(menuItemElem, item.link);
                }
                this._elems.homeMenuElems.appendChild(menuItemElem);
            }
        };
        /**...........................................................................
         * _addMenuLink
         * ...........................................................................
         *
         * @param elem
         * @param link
         * ...........................................................................
         */
        BSTHeader.prototype._addMenuLink = function (elem, link) {
            var _this = this;
            elem.addEventListener("click", function () {
                BST.scrollTo(link, _this._elems.base.offsetHeight);
            });
        };
        /**...........................................................................
         * _createMenuItem
         * ...........................................................................
         * create an item in the menu
         *
         * @param	menuItem
         *
         * @returns The created element
         * ...........................................................................
         */
        BSTHeader.prototype._createHomeMenuItem = function (menuItem) {
            // Figure out what the link should be
            var linkRef;
            if (menuItem.type === BST.MenuTypeEnum.SECTION) {
                linkRef = "";
                //linkRef = "#" + menuItem.link;
            }
            else {
                linkRef = menuItem.link;
            }
            // Create the linking element
            var linkElem = KIP.createElement({
                type: "a",
                cls: "menuLink",
                attr: {
                    href: linkRef
                },
                content: menuItem.name
            });
            // Create the containing element
            var itemElem = KIP.createSimpleElement("", "menuItem", "", null, [linkElem]);
            return itemElem;
        };
        //#endregion
        //#region CREATE SHOW ELEMENTS
        /**...........................................................................
         * _createShowElements
         * ...........................................................................
         * create the elements needed for a specific show
         * ...........................................................................
         */
        BSTHeader.prototype._createShowElements = function () {
            if (!this._elems.show) {
                this._elems.show = KIP.createElement({ cls: "show fade", parent: this._elems.wrapper });
            }
            this._createShowTitle();
            this._createShowStatistics();
            this._createShowMenuElements();
        };
        /**...........................................................................
         * _createShowTitle
         * ...........................................................................
         * Create the title for the show that is currently showing
         * ...........................................................................
         */
        BSTHeader.prototype._createShowTitle = function () {
            var shouldAddWrapper = false;
            var title = (this._showData && this._showData.showTitle.title) || "";
            var subtitle = (this._showData && this._showData.showTitle.subtitle) || "";
            var wrapper = KIP.createElement({
                cls: "titleWrapper"
            });
            if (!this._elems.showTitle) {
                this._elems.showTitle = KIP.createElement({
                    content: title,
                    cls: "showTitle",
                    parent: wrapper
                });
                shouldAddWrapper = true;
            }
            else {
                this._elems.showTitle.innerHTML = title;
            }
            var displaySubtitle = subtitle ? ": " + subtitle : "";
            if (this._isMobile) {
                displaySubtitle = subtitle;
            }
            if (!this._elems.showSubtitle) {
                this._elems.showSubtitle = KIP.createElement({
                    content: displaySubtitle,
                    cls: "showSubtitle",
                    parent: wrapper
                });
                shouldAddWrapper = true;
            }
            else {
                this._elems.showSubtitle.innerHTML = displaySubtitle;
            }
            if (shouldAddWrapper) {
                this._elems.show.appendChild(wrapper);
            }
        };
        /**...........................................................................
         * _createShowStatistics
         * ...........................................................................
         * create the statistics about the show (writer, director, run dates)
         * ...........................................................................
         */
        BSTHeader.prototype._createShowStatistics = function () {
            if (!this._elems.showStats) {
                this._elems.showStats = KIP.createElement({ cls: "showStats", parent: this._elems.show });
            }
            else {
                this._elems.showStats.innerHTML = "";
            }
            // quit if there is no additional show data to show
            if (!this._showData) {
                return;
            }
            // writer / director
            if (this._showData.showTitle.writer === this._showData.showTitle.director) {
                this._createShowStatistic("Written + Directed by", this._showData.showTitle.writer);
                // writer + director individually
            }
            else {
                this._createShowStatistic("Written by", this._showData.showTitle.writer);
                this._createShowStatistic("Directed by", this._showData.showTitle.director);
            }
            // run dates
            var runData = KIP.format("{0} - {1}", KIP.Dates.shortDate(this._showData.run.start), KIP.Dates.shortDate(this._showData.run.end));
            this._createShowStatistic("Runs", runData);
        };
        /**...........................................................................
         * _createShowStatistic
         * ...........................................................................
         * Creates a label + data elem for the stats section of the show header
         *
         * @param   lbl     Label for the stat
         * @param   data    Data for the stat
         *
         * @returns Created element for this statistic
         * ...........................................................................
         */
        BSTHeader.prototype._createShowStatistic = function (lbl, data) {
            var comboElem = KIP.createElement({
                id: this._showData.showTitle.id + "|combo",
                cls: "combo",
                parent: this._elems.showStats
            });
            if (!data) {
                return comboElem;
            }
            var comboLbl = KIP.createElement({ cls: "lbl", content: lbl + ":", parent: comboElem });
            var comboData = KIP.createElement({ cls: "datum", content: data, parent: comboElem });
            return comboElem;
        };
        //#endregion
        //#region SWITCH BETWEEN HEADER MODES
        /**...........................................................................
         * displayAsShow
         * ...........................................................................
         * Switches to the show specific version of the header
         *
         * @param   show    The show to display
         * ...........................................................................
         */
        BSTHeader.prototype.displayAsShow = function (show) {
            if (this._showData === show) {
                return;
            }
            // in the off chance we are switching between one show to another, 
            // clear out the old UI first
            if (this._showData) {
                this.displayAsHome();
            }
            // set the new data & update the UI for it
            this._showData = show;
            this._updateShowElements();
            // update the show specific elements
            this._changeShowVisibility();
            // update the menu elements
            this._swapMenu();
        };
        /**...........................................................................
         * displayAsHome
         * ...........................................................................
         * Switches to the home specific version of the header
         * ...........................................................................
         */
        BSTHeader.prototype.displayAsHome = function () {
            if (!this._showData) {
                return;
            }
            this._showData = null;
            // update the show specific elements
            this._changeShowVisibility();
            // update the menu elements
            this._swapMenu();
        };
        /**...........................................................................
         * _updateShowElements
         * ...........................................................................
         * Make sure the show side of the header reflects the new data
         * ...........................................................................
         */
        BSTHeader.prototype._updateShowElements = function () {
            this._createShowElements();
        };
        /**...........................................................................
         * _swapMenu
         * ...........................................................................
         * Swap to the appropriate menu, based on whether we have show data
         * ...........................................................................
         */
        BSTHeader.prototype._swapMenu = function () {
            // show the show menu if we have a show
            if (this._showData) {
                KIP.addClass(this._elems.homeMenuElems, "hidden");
                KIP.removeClass(this._elems.showMenuElems, "hidden");
                // otherwise, show the home menu
            }
            else {
                KIP.removeClass(this._elems.homeMenuElems, "hidden");
                KIP.addClass(this._elems.showMenuElems, "hidden");
            }
        };
        /**...........................................................................
         * _changeShowVisibility
         * ...........................................................................
         * Hide or show the regular show element
         * ...........................................................................
         */
        BSTHeader.prototype._changeShowVisibility = function () {
            var _this = this;
            // if we have a show, show the details
            if (this._showData) {
                KIP.removeClass(this._elems.show, "fade");
                KIP.transition(this._elems.show, { maxWidth: "0", opacity: "0" }, { maxWidth: "calc(<width> - 20px)", opacity: "1" }, ANIMATION_TIME).then(function () {
                    _this._notifyListeners();
                });
                KIP.addClass(this._elems.base, "showVisible");
                // show just the home elements
            }
            else {
                KIP.transition(this._elems.show, { maxWidth: "<width>", opacity: "1" }, { maxWidth: "0", opacity: "0" }, ANIMATION_TIME).then(function () {
                    KIP.addClass(_this._elems.show, "fade");
                    _this._notifyListeners();
                });
                KIP.removeClass(this._elems.base, "showVisible");
            }
            BST.scrollTo("header", 0, true);
        };
        //#endregion
        /**
         * allow other classes to ask for updates when the size of the header changes
         * @param listener
         */
        BSTHeader.prototype.registerListener = function (listener) {
            this._resizeListeners.push(listener);
        };
        /**
         * notify when a resize happened
         */
        BSTHeader.prototype._notifyListeners = function () {
            var listener;
            for (var _i = 0, _a = this._resizeListeners; _i < _a.length; _i++) {
                listener = _a[_i];
                listener();
            }
        };
        /** styles specific for this header */
        BSTHeader._uncoloredStyles = {
            "#header": {
                position: "fixed",
                width: "100%",
                top: "0",
                left: "0",
                zIndex: "3"
            },
            "#header .header": {
                position: "relative",
                width: "100%",
                color: "#FFF",
                display: "inline-block"
            },
            ".header .headerWrapper": {
                display: "flex",
                flexDirection: "row",
                paddingBottom: "5px"
            },
            ".mobile.header .headerWrapper": {
                flexWrap: "wrap"
            },
            ".header .headerWrapper .home": {
                paddingLeft: "105px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: "#222",
                boxShadow: "1px 1px 8px 4px rgba(0,0,0,.2)",
                paddingBottom: "10px",
            },
            ".header.showVisible .headerWrapper .home": {
                paddingRight: "20px"
            },
            ".mobile.header .headerWrapper .home": {
                width: "100%",
                paddingLeft: "105px",
                paddingRight: "0"
            },
            ".header .headerWrapper .homeName": {
                position: "relative",
                whiteSpace: "nowrap"
            },
            ".mobile.header .headerWrapper .homeName": {
                fontSize: "2.7vw",
                textAlign: "left",
                width: "100%",
                transition: "font-size .1s ease-in-out"
            },
            ".mobile.header.showVisible .headerWrapper .homeName": {
                fontSize: "1em"
            },
            ".header .headerWrapper .homeTitle": {
                fontFamily: "OpenSansBold",
                textTransform: "uppercase",
                fontSize: "calc(1em + 1.1vw)"
            },
            ".header .headerWrapper .bstLogo": {
                height: "105px",
                top: "0px",
                left: "-105px",
                position: "absolute",
                cursor: "pointer"
            },
            ".header.mobile.showVisible .headerWrapper .homeTitle:before": {
                content: '"HOME"',
                fontFamily: "OpenSansLight",
                fontSize: "0.6em",
                position: "absolute",
                left: "-86px",
                top: "106px"
            },
            ".header.mobile .headerWrapper .menuItems": {
                display: "none"
            },
            ".header .headerWrapper .menuItems": {
                display: "flex",
                justifyContent: "flex-start",
                transition: "opacity .4s ease-in-out",
                marginLeft: "0",
                overflow: "hidden"
            },
            ".header .headerWrapper .menuItems.hidden": {
                opacity: "0",
                width: "0"
            },
            ".header .headerWrapper .menuItems .menuItem": {
                textTransform: "uppercase",
                cursor: "pointer",
                paddingRight: "15px",
                whiteSpace: "nowrap"
            },
            ".header .headerWrapper .menuItems .menuItem:hover": {
                textDecoration: "underline"
            },
            ".header .headerWrapper .menuItems .menuItem a.menuLink": {
                marginLeft: "0",
                marginRight: "0"
            },
            ".header .headerWrapper .show": {
                flexGrow: "1",
                backgroundColor: "#1A1A1A",
                boxShadow: "1px 1px 8px 4px rgba(0,0,0,.2)",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                paddingRight: "5%",
                zIndex: "-1",
                paddingBottom: "10px",
                overflow: "hidden",
                whiteSpace: "nowrap"
            },
            ".header.mobile .headerWrapper .show": {
                fontSize: "1.9em",
                alignItems: "flex-start",
                backgroundColor: "rgba(30,30,30,.8)"
            },
            ".header .headerWrapper .show .titleWrapper": {
                display: "flex",
                alignItems: "baseline",
            },
            ".header.mobile .headerWrapper .show .titleWrapper": {
                display: "block",
                textAlign: "left",
                paddingLeft: "105px"
            },
            ".header .headerWrapper .show .showTitle": {
                fontSize: "calc(1em + 1vw)",
                fontFamily: "OpenSansBold",
                textTransform: "uppercase",
                textAlign: "left",
            },
            ".header .headerWrapper .show .showSubtitle": {
                fontSize: "calc(.75em + 0.8vw)",
                lineHeight: "0",
                opacity: "0.8",
                fontFamily: "OpenSansLight",
                marginBottom: "15px"
            },
            ".header.mobile .headerWrapper .show .showSubtitle": {
                lineHeight: "1"
            },
            ".header .headerWrapper .show .showStats": {
                display: "flex",
                justifyContent: "flex-start"
            },
            ".header.mobile .headerWrapper .show .showStats": {
                marginTop: "2vw",
                fontSize: "1.2em",
                justifyContent: "space-around",
                paddingLeft: "2vw",
                flexWrap: "wrap",
                display: "none"
            },
            ".header .headerWrapper .show .showStats .combo": {
                paddingLeft: "10px",
                textAlign: "center",
                display: "flex",
                alignItems: "center"
            },
            ".header.mobile .headerWrapper .show .showStats .combo": {
                width: "100%"
            },
            ".header .headerWrapper .show .showStats .combo .lbl": {
                color: "rgba(255,255,255,.6)",
                fontSize: "0.9em",
                marginRight: "5px"
            },
            ".header .headerWrapper .show.fade": {
                maxWidth: "0",
                padding: "0",
                display: "none"
            }
        };
        return BSTHeader;
    }(BST.View));
    BST.BSTHeader = BSTHeader;
})(BST || (BST = {}));
var BST;
(function (BST) {
    var Admin;
    (function (Admin) {
        var HomeForm = /** @class */ (function (_super) {
            __extends(HomeForm, _super);
            function HomeForm(homeData) {
                var _this = _super.call(this, { cls: "adminHomeForm" }) || this;
                _this._data = homeData;
                _this._createElements();
                return _this;
            }
            Object.defineProperty(HomeForm.prototype, "form", {
                get: function () { return this._form; },
                enumerable: true,
                configurable: true
            });
            //#region INITIALIZE THE RIGHT DISPLAY
            /**...........................................................................
             * _updateTitle
             * ...........................................................................
             * change the title of the header
             * ...........................................................................
             */
            HomeForm.prototype._createTitle = function () {
                this._elems.title = KIP.createElement({
                    cls: "title",
                    content: "Editing BST Home",
                    parent: this._elems.base
                });
            };
            //#endregion
            /**...........................................................................
             * initializeHomeForm
             * ...........................................................................
             * Create the form that an editor will use to edit the home details of the
             * BST website
             * ...........................................................................
             */
            HomeForm.prototype._createElements = function () {
                // Make sure the page reflects the right title
                this._createTitle();
                // also create the form for the page
                this._createForm();
            };
            /**...........................................................................
             * _createForm
             * ...........................................................................
             * Create the form to change data about the home screen
             * ...........................................................................
             */
            HomeForm.prototype._createForm = function () {
                var _this = this;
                // Form to collect info about the home screen
                this._form = new KIP.Forms.Form("home", {
                    label: "BST Home",
                    colors: ["#EA0", "#555"]
                }, {
                    about: new KIP.Forms.SectionElement("about", { label: "About Broom Street" }, {
                        general: new KIP.Forms.TextAreaElement("general", { label: "General Info" }),
                        board: new KIP.Forms.ArrayElement("board", { label: "Board Members" }, {
                            name: new KIP.Forms.TextElement("boardMember", { label: "Board Member Name" }),
                            position: new KIP.Forms.TextElement("boardPosition", { label: "Position on the board" })
                        }),
                        staff: new KIP.Forms.ArrayElement("staff", { label: "Staff Members" }, {
                            name: new KIP.Forms.TextElement("staffMember", { label: "Staff Member Name" }),
                            position: new KIP.Forms.TextElement("staffPosition", { label: "Position on staff" })
                        }),
                        bylaws: new KIP.Forms.TextAreaElement("bylaws", { label: "ByLaws" }),
                        history: new KIP.Forms.TextAreaElement("history", { label: "History of Broom Street" }),
                        detailedHistory: new KIP.Forms.ArrayElement("detailedHistory", { label: "Detailed History" }, {
                            date: new KIP.Forms.DateElement("detailedHxDate", { label: "Date of Event" }),
                            header: new KIP.Forms.TextElement("detailedHxTitle", { label: "Title of Event" }),
                            details: new KIP.Forms.TextAreaElement("detailedHxDetails", { label: "Details of Event" })
                        })
                    }),
                    news: new KIP.Forms.ArrayElement("news", { label: "News" }, {
                        title: new KIP.Forms.TextElement("newsTitle", { label: "Title" }),
                        content: new KIP.Forms.TextAreaElement("newsContent", { label: "Content" }),
                        author: new KIP.Forms.TextElement("newsAuthor", { label: "Author" }),
                        date: new KIP.Forms.DateTimeElement("newsDate", { label: "Date" }),
                        isImportant: new KIP.Forms.CheckElement("newsImportant", { label: "Keep on front page?" })
                    }),
                    getInvolved: new KIP.Forms.SectionElement("getinvolved", { label: "Get Involved" }, {
                        technicians: new KIP.Forms.ArrayElement("techInvolvement", { label: "Technicians" }, {
                            icon: new Admin.BSTPhotoPathElement("involveTechIcon", {
                                label: "Icon",
                                onChange: function (files) {
                                    return _this._onInvolvedPhotoChange(files);
                                },
                                onSave: function (files) {
                                    BST.Server.saveGetInvolvedPhoto(files[0], function (success) {
                                        if (success !== "1") {
                                            return;
                                        }
                                    });
                                }
                            }),
                            text: new KIP.Forms.TextElement("involveTechText", { label: "Short description" }),
                            content: new KIP.Forms.TextAreaElement("involvedTechContent", { label: "Detailed Description" }),
                            contactInfo: new KIP.Forms.SectionElement("involveTechContact", { label: "Contact Info" }, {
                                name: new KIP.Forms.TextElement("involveTechContactName", { label: "Contact's name" }),
                                email: new KIP.Forms.TextElement("involveTechContactEmail", { label: "Contact E-Mail" }),
                                phone: new KIP.Forms.TextElement("involveTechContactPhone", { label: "Phone Number" })
                            })
                        }),
                        actors: new KIP.Forms.ArrayElement("actorInvolvement", { label: "Actors" }, {
                            icon: new Admin.BSTPhotoPathElement("involveActorIcon", {
                                label: "Icon",
                                onChange: function (files) {
                                    return _this._onInvolvedPhotoChange(files);
                                },
                                onSave: function (files) {
                                    BST.Server.saveGetInvolvedPhoto(files[0], function (success) {
                                        if (success !== "1") {
                                            return;
                                        }
                                    });
                                }
                            }),
                            text: new KIP.Forms.TextElement("involveActorText", { label: "Short description" }),
                            content: new KIP.Forms.TextAreaElement("involvedActorContent", { label: "Detailed Description" }),
                            contactInfo: new KIP.Forms.SectionElement("involveActorContact", { label: "Contact Info" }, {
                                name: new KIP.Forms.TextElement("involveActorContactName", { label: "Contact's name" }),
                                email: new KIP.Forms.TextElement("involveActorContactEmail", { label: "Contact E-Mail" }),
                                phone: new KIP.Forms.TextElement("involveActorContactPhone", { label: "Phone Number" })
                            })
                        }),
                        writers: new KIP.Forms.ArrayElement("writerInvolvement", { label: "Writers" }, {
                            icon: new Admin.BSTPhotoPathElement("involveWriterIcon", {
                                label: "Icon",
                                onChange: function (files) {
                                    return _this._onInvolvedPhotoChange(files);
                                },
                                onSave: function (files) {
                                    BST.Server.saveGetInvolvedPhoto(files[0], function (success) {
                                        if (success !== "1") {
                                            return;
                                        }
                                    });
                                }
                            }),
                            text: new KIP.Forms.TextElement("involveWriterText", { label: "Short description" }),
                            content: new KIP.Forms.TextAreaElement("involvedWriterContent", { label: "Detailed Description" }),
                            contactInfo: new KIP.Forms.SectionElement("involveWriterContact", { label: "Contact Info" }, {
                                name: new KIP.Forms.TextElement("involveWriterContactName", { label: "Contact's name" }),
                                email: new KIP.Forms.TextElement("involveWriterContactEmail", { label: "Contact E-Mail" }),
                                phone: new KIP.Forms.TextElement("involveWriterContactPhone", { label: "Phone Number" })
                            })
                        }),
                        directors: new KIP.Forms.ArrayElement("directorInvolvement", { label: "Directors" }, {
                            icon: new Admin.BSTPhotoPathElement("involveDirectorIcon", {
                                label: "Icon",
                                onChange: function (files) {
                                    return _this._onInvolvedPhotoChange(files);
                                },
                                onSave: function (files) {
                                    BST.Server.saveGetInvolvedPhoto(files[0], function (success) {
                                        if (success !== "1") {
                                            return;
                                        }
                                    });
                                }
                            }),
                            text: new KIP.Forms.TextElement("involveDirectorText", { label: "Short description" }),
                            content: new KIP.Forms.TextAreaElement("involvedDirectorContent", { label: "Detailed Description" }),
                            contactInfo: new KIP.Forms.SectionElement("involveDirectorContact", { label: "Contact Info" }, {
                                name: new KIP.Forms.TextElement("involveDirectorContactName", { label: "Contact's name" }),
                                email: new KIP.Forms.TextElement("involveDirectorContactEmail", { label: "Contact E-Mail" }),
                                phone: new KIP.Forms.TextElement("involveDirectorContactPhone", { label: "Phone Number" })
                            })
                        }),
                        general: new KIP.Forms.ArrayElement("generalInvolvement", { label: "General" }, {
                            icon: new Admin.BSTPhotoPathElement("involveGeneralIcon", {
                                label: "Icon",
                                onChange: function (files) {
                                    return _this._onInvolvedPhotoChange(files);
                                },
                                onSave: function (files) {
                                    BST.Server.saveGetInvolvedPhoto(files[0], function (success) {
                                        if (success !== "1") {
                                            return;
                                        }
                                    });
                                }
                            }),
                            text: new KIP.Forms.TextElement("involveGeneralText", { label: "Short description" }),
                            content: new KIP.Forms.TextAreaElement("involvedGeneralContent", { label: "Detailed Description" }),
                            contactInfo: new KIP.Forms.SectionElement("involveGeneralContact", { label: "Contact Info" }, {
                                name: new KIP.Forms.TextElement("involveGeneralContactName", { label: "Contact's name" }),
                                email: new KIP.Forms.TextElement("involveGeneralContactEmail", { label: "Contact E-Mail" }),
                                phone: new KIP.Forms.TextElement("involveGeneralContactPhone", { label: "Phone Number" })
                            })
                        }),
                    }),
                    menuItems: new KIP.Forms.ArrayElement("menus", { label: "Menu Options" }, {
                        name: new KIP.Forms.TextElement("menuName", { label: "Menu link name" }),
                        type: new KIP.Forms.SingleSelectButtonElem("menuType", {
                            label: "What type of link is this?",
                            options: [
                                { label: "External", value: BST.MenuTypeEnum.EXTERNAL },
                                { label: "Section", value: BST.MenuTypeEnum.SECTION }
                            ]
                        }),
                        link: new KIP.Forms.TextElement("menuLink", { label: "Where does this link go?" })
                    }),
                    logoURL: new Admin.BSTPhotoPathElement("logoURL", {
                        label: "Logo",
                        onChange: function (files) {
                            return _this._onInvolvedPhotoChange(files);
                        },
                        onSave: function (files) {
                            BST.Server.saveLogoPhoto(files[0], function (success) {
                                if (success !== "1") {
                                    return;
                                }
                            });
                        }
                    }),
                    bgURL: new Admin.BSTPhotoPathElement("backgroundImg", {
                        label: "Background Image",
                        onChange: function (files) {
                            return _this._onInvolvedPhotoChange(files);
                        },
                        onSave: function (files) {
                            BST.Server.saveBgPhoto(files[0], function (success) {
                                if (success !== "1") {
                                    return;
                                }
                            });
                        }
                    }),
                    resources: new KIP.Forms.ArrayElement("resources", { label: "Resources" }, {
                        name: new KIP.Forms.TextElement("resourceName", { label: "Name" }),
                        content: new KIP.Forms.TextAreaElement("resourceContent", { label: "Details" }),
                        link: new KIP.Forms.TextElement("resourceLink", { label: "Link" })
                    }),
                    donateInfo: new KIP.Forms.SectionElement("donate", { label: "Donation Info" }, {
                        blurb: new KIP.Forms.TextAreaElement("donateBlurb", { label: "Donate Blurb" }),
                        paypalAccount: new KIP.Forms.TextElement("paypalID", { label: "Paypal ID" })
                    })
                });
                // show the appropriate form
                this._form.draw(this._elems.base);
                // update the form if need be
                if (this._data) {
                    this._form.update(this._data);
                }
                // handle saving
                this._form.registerSaveListener(function (home) {
                    _this._saveData(home);
                });
            };
            /**...........................................................................
             * _saveData
             * ...........................................................................
             * Make sure that we can actually save our data
             *
             * @param   home    The data to actually save
             * ...........................................................................
             */
            HomeForm.prototype._saveData = function (home) {
                BST.Server.saveHome(home, function () {
                    var toast = new KIP.ToastPopup("BST home details saved!");
                    toast.setThemeColor(0, "#EA0");
                    toast.draw(document.body);
                });
            };
            /**...........................................................................
             * update
             * ...........................................................................
             * Update the form
             *
             * @param   home    the data to show in the form
             * ...........................................................................
             */
            HomeForm.prototype.update = function (home) {
                this._form.update(home);
            };
            HomeForm.prototype._onInvolvedPhotoChange = function (files) {
                var filePath = "img/home/bg/" + files[0].name;
                return filePath;
            };
            return HomeForm;
        }(BST.View));
        Admin.HomeForm = HomeForm;
    })(Admin = BST.Admin || (BST.Admin = {}));
})(BST || (BST = {}));
var BST;
(function (BST) {
    var Admin;
    (function (Admin) {
        /**...........................................................................
         * @class ShowForm
         * ...........................................................................
         * Allows details about a show to be added or edited
         * @version 1.0
         * @author  Kip Price
         * ...........................................................................
         */
        var ShowForm = /** @class */ (function (_super) {
            __extends(ShowForm, _super);
            /**...........................................................................
             * Creates a show form
             * @param   seasons     The current backing data for this form
             * ...........................................................................
             */
            function ShowForm(seasons) {
                var _this = _super.call(this, { cls: "adminShowForm" }) || this;
                /** keep track of whether we can make updates to the show's ID */
                _this._unsavedID = true;
                _this._seasons = seasons;
                _this._createElements();
                return _this;
            }
            Object.defineProperty(ShowForm.prototype, "form", {
                get: function () { return this._form; },
                enumerable: true,
                configurable: true
            });
            ShowForm.prototype._shouldSkipCreateElements = function () { return true; };
            //#region ADD THE APPROPRIATE TITLE
            /**...........................................................................
             * _createTitle
             * ...........................................................................
             * Create the title element for the form
             * ...........................................................................
             */
            ShowForm.prototype._createTitle = function () {
                this._elems.title = KIP.createElement({
                    cls: "title",
                    content: "Editing Show"
                });
            };
            /**...........................................................................
             * _createSelectElement
             * ...........................................................................
             * create the element to select
             * @returns The created select element
             * ...........................................................................
             */
            ShowForm.prototype._createSelectElement = function () {
                var selectContainer = KIP.createElement({
                    id: "adminDetails",
                    cls: "showSelect",
                    parent: this._elems.base
                });
                // Otherwise return a newly created select field
                this._elems.select = KIP.createElement({
                    type: "select",
                    id: "showSelector",
                    parent: selectContainer
                });
                return this._elems.select;
            };
            //#endregion
            //#region POPULATE THE DROPDOWN
            /**...........................................................................
             * _updateSelectForSeasons
             * ...........................................................................
             * Update our select field when the seasons data changes
             * ...........................................................................
             */
            ShowForm.prototype._updateSelectForSeasons = function () {
                var selectElem = this._elems.select;
                // Clear out the last contents of the select field
                selectElem.innerHTML = "<option value='new'>-- Add a New Show --</option>";
                // loop through all shows in the season
                var idx;
                this._seasons = BST.Helpers.sortSeasons(this._seasons);
                for (idx = 0; idx < this._seasons.length; idx += 1) {
                    var miniShow = this._seasons[idx];
                    var year = new Date(miniShow.endDate).getFullYear().toString();
                    // create the option element for this show
                    var option = KIP.createElement({
                        type: "option",
                        attr: { value: miniShow.id },
                        content: year + " - " + miniShow.name,
                        parent: selectElem
                    });
                }
            };
            //#endregion
            //#region LOADING AND SAVING DATA
            /**...........................................................................
             * _loadShowData
             * ...........................................................................
             * Load data about the show
             * @param   showID  The show to load data for
             * ...........................................................................
             */
            ShowForm.prototype._loadShowData = function (showID) {
                var _this = this;
                if (showID === "new") {
                    this._form.clear();
                    this._unsavedID = true;
                }
                else {
                    BST.Server.loadShow(showID, function (show) {
                        _this._loadedShowID = showID;
                        _this._unsavedID = false;
                        // update the form details
                        _this._form.clear();
                        _this._form.update(show);
                    });
                }
            };
            /**...........................................................................
             * _adminSaveShow
             * ...........................................................................
             * Make sure we can save our show
             *
             * @param   show    The show to save
             * ...........................................................................
             */
            ShowForm.prototype._adminSaveShow = function (show) {
                var _this = this;
                var run = BST.Helpers.getShowStartAndEndDates(show);
                // save the show
                BST.Server.saveShow(show, function (data) {
                    // show a toast that we were successful
                    var toast = new KIP.ToastPopup((show.showTitle.title || "Show") + " successfully saved!");
                    toast.setThemeColor(0, "#EA0");
                    toast.draw(document.body);
                    var miniShow = {
                        endDate: KIP.Dates.shortDate(run.end),
                        id: show.showTitle.id,
                        name: show.showTitle.title + (show.showTitle.subtitle ? ": " + show.showTitle.subtitle : ""),
                        icon: show.showTitle.icon
                    };
                    _this._addShowToSeason(miniShow);
                    BST.Server.saveSeasons(_this._seasons, function (savedSeasons) {
                        _this._seasons = savedSeasons;
                        _this._updateSelectForSeasons();
                        if (_this._elems.select.value !== show.showTitle.id) {
                            _this._elems.select.value = show.showTitle.id;
                        }
                    });
                });
            };
            //#endregion
            //#region HANDLE CREATING A UNIQUE SHOW ID
            /**...........................................................................
             * _turnDatesToShowID
             * ...........................................................................
             * Create a show ID from the run dates
             *
             * @param   dates   The dates to turn into an ID
             * ...........................................................................
             */
            ShowForm.prototype._turnDatesToShowID = function (dates) {
                var minDate;
                dates.sort();
                minDate = dates[0];
                return minDate.getFullYear().toString();
            };
            /**...........................................................................
             * _turnNameToShowID
             * ...........................................................................
             * Create a show ID from the show name / subtitle
             *
             * @param   name    The show name to turn into an ID
             * ...........................................................................
             */
            ShowForm.prototype._turnNameToShowID = function (name) {
                var safeStr = name.replace(/[^a-zA-Z0-9]/g, "");
                return safeStr;
            };
            //#endregion
            //#region ADJUST SEASONS
            /**...........................................................................
             * _addShowToSeason
             * ...........................................................................
             * Make sure to update our seasons with this new show
             *
             * @param   showDeets   Details about the show to add
             * ...........................................................................
             */
            ShowForm.prototype._addShowToSeason = function (showDeets) {
                var idx = 0;
                for (idx; idx < this._seasons.length; idx += 1) {
                    var elem = this._seasons[idx];
                    if ((elem.id === showDeets.id) || (elem.name === showDeets.name)) {
                        this._seasons[idx] = showDeets;
                        return true;
                    }
                }
                ;
                this._seasons.push(showDeets);
                return true;
            };
            //#endregion
            //#region ACTUALLY CREATE THE FORM
            /**...........................................................................
             * _createElements
             * ...........................................................................
             * create all of the elements we need for this show form
             * ...........................................................................
             */
            ShowForm.prototype._createElements = function () {
                var _this = this;
                this._createTitle();
                this._createSelectElement();
                this._updateSelectForSeasons();
                this._createForm();
                KIP.Events.addEventListener(KIP.Forms.FORM_ELEM_CHANGE, {
                    func: function (event) {
                        if (event.context.key !== "id") {
                            return;
                        }
                        _this._loadedShowID = event.context.val;
                    }
                });
            };
            /**...........................................................................
             * _createForm
             * ...........................................................................
             * create the show editing form
             * ...........................................................................
             */
            ShowForm.prototype._createForm = function () {
                var _this = this;
                var showForm = new KIP.Forms.Form("showForm", {
                    colors: ["#EA0", "#555"],
                    label: "Show Details"
                }, {
                    showTitle: new KIP.Forms.SectionElement("showTitle", { label: "High-level show details" }, {
                        id: new KIP.Forms.HiddenElement("id", {
                            onOtherChange: function (key, val, formElem) {
                                if (!_this._unsavedID) {
                                    return;
                                }
                                if ((key !== "title") && (key !== "runDates") && (key !== "subtitle")) {
                                    return;
                                }
                                var str;
                                var idArr = (formElem.data || "__").split("_");
                                // Grab the appropriate sub string to change
                                if (key === "title") {
                                    str = _this._turnNameToShowID(val);
                                    idArr[0] = str;
                                }
                                else if (key === "subtitle") {
                                    str = _this._turnNameToShowID(val);
                                    idArr[1] = str;
                                }
                                else {
                                    str = _this._turnDatesToShowID(val);
                                    idArr[2] = str;
                                }
                                // Fill any empty spots if needed
                                for (var i = 0; i < 3; i += 1) {
                                    if (!idArr[i]) {
                                        idArr[i] = "";
                                    }
                                }
                                formElem.data = idArr.join("_");
                            }
                        }),
                        title: new KIP.Forms.TextElement("title", { label: "Title of the show", required: true }),
                        subtitle: new KIP.Forms.TextElement("subtitle", { label: "Subtitle of the show (optional)" }),
                        writer: new KIP.Forms.TextElement("writer", { label: "Writer of the show" }),
                        director: new KIP.Forms.TextElement("director", { label: "Director of the show" }),
                        icon: new BSTPhotoPathElement("icon", {
                            label: "Icon",
                            onChange: function (files) {
                                var filePath = "img/shows/" + _this._loadedShowID + "/icons/" + files[0].name;
                                return filePath;
                            },
                            onSave: function (files) {
                                BST.Server.saveIconPhoto(files[0], _this._loadedShowID, function (success) {
                                    if (success !== "1") {
                                        return;
                                    }
                                });
                            }
                        }),
                        bptLink: new KIP.Forms.TextElement("link", { label: "Brown Paper Ticket event ID" })
                    }),
                    showDetails: new KIP.Forms.SectionElement("showDetails", { label: "Deeper show details" }, {
                        synopsis: new KIP.Forms.TextAreaElement("synopsis", { label: "Show synopsis" }),
                        warnings: new KIP.Forms.TextElement("warnings", { label: "What warnings should be displayed for the show?" }),
                        showLength: new KIP.Forms.NumberElement("showLength", { label: "Length of show" }),
                        hasIntermission: new KIP.Forms.CheckElement("hasIntermission", { label: "Does the show have an intermission?" }),
                        isKidFriendly: new KIP.Forms.CheckElement("isKidFriendly", { label: "Is the show kid friendly?" })
                    }),
                    runDates: new KIP.Forms.ArrayElement("runDates", { label: "Dates", newLabel: "+ New Date" }, new BST.DateSelector("showdate", { label: "Run date" })),
                    bios: new KIP.Forms.ArrayElement("bios", { label: "Cast + Crew Bios", newLabel: "+ New Bio" }, {
                        imageURL: new BSTPhotoPathElement("imageURL", {
                            label: "Photo of cast / crew member",
                            onChange: function (files) {
                                var filePath = "img/actors/" + files[0].name;
                                return filePath;
                            },
                            onSave: function (files) {
                                BST.Server.saveActorPhoto(files[0], function (success) {
                                    if (success !== "1") {
                                        return;
                                    }
                                });
                                return;
                            }
                        }),
                        actorName: new KIP.Forms.TextElement("actorName", { label: "Person Name" }),
                        roleName: new KIP.Forms.TextElement("roleName", { label: "Role Name" }),
                        bio: new KIP.Forms.TextAreaElement("bio", { label: "Bio" }),
                        website: new KIP.Forms.TextElement("website", { label: "Person's website" }),
                        type: new KIP.Forms.SingleSelectButtonElem("bioType", { label: "Type", options: [
                                { value: BST.CastOrCrew.CAST, label: "Cast" },
                                { value: BST.CastOrCrew.CREW, label: "Crew" },
                                { value: BST.CastOrCrew.SPECIAL_MENTION, label: "Special Mention" }
                            ] })
                    }),
                    reviews: new KIP.Forms.ArrayElement("reviews", { label: "Reviews", newLabel: "+ New Review" }, {
                        reviewer: new KIP.Forms.TextElement("reviewer", { label: "Reviewer" }),
                        date: new KIP.Forms.DateElement("reviewDate", { label: "Date of review" }),
                        link: new KIP.Forms.TextElement("link", { label: "Link to review" }),
                        review: new KIP.Forms.TextAreaElement("review", { label: "Review Text" })
                    }),
                    photos: new KIP.Forms.ArrayElement("photos", { label: "Photos", newLabel: "+ New Photo" }, {
                        url: new BSTPhotoPathElement("photoURL", {
                            label: "URL",
                            onChange: function (files) {
                                var filePath = "img/shows/" + _this._loadedShowID + "/photos/" + files[0].name;
                                return filePath;
                            },
                            onSave: function (files) {
                                BST.Server.saveShowPhoto(files[0], _this._loadedShowID, function (success) {
                                    if (success !== "1") {
                                        return;
                                    }
                                });
                                return;
                            }
                        }),
                        photographer: new KIP.Forms.TextElement("photographer", { label: "Photographer / Artist" }),
                        copyrightText: new KIP.Forms.TextElement("copyright", { label: "Copyright info" }),
                        isPoster: new KIP.Forms.CheckElement("isPoster", { label: "Is this a poster for the show?" }),
                        isHilite: new KIP.Forms.CheckElement("isHilite", { label: "Is this the photo that should show for the show on the homepage?" })
                    }),
                    trailer: new KIP.Forms.SectionElement("trailer", { label: "Trailer information" }, {
                        link: new KIP.Forms.TextElement("trailerURL", { label: "Link to Trailer" }),
                        type: new KIP.Forms.SingleSelectButtonElem("trailerType", {
                            label: "What type of video is this?",
                            options: [
                                { label: "YouTube", value: BST.TrailerType.YOUTUBE },
                                { label: "Vimeo", value: BST.TrailerType.VIMEO },
                                { label: "Other", value: BST.TrailerType.OTHER }
                            ]
                        })
                    }),
                    auditions: new KIP.Forms.SectionElement("auditions", { label: "Audition Info" }, {
                        dates: new KIP.Forms.ArrayElement("auditionDates", { label: "Audition Dates", required: true }, {
                            start: new KIP.Forms.DateTimeElement("auditionStart", { label: "Audition start" }),
                            end: new KIP.Forms.TimeElement("auditionEnd", { label: "Audition End" }),
                            location: new KIP.Forms.SectionElement("location", { label: "Audition Location" }, {
                                name: new KIP.Forms.TextElement("addressName", { label: "Audition Location Name" }),
                                addressLines: new KIP.Forms.TextAreaElement("adressLines", { label: "Address" }),
                                city: new KIP.Forms.TextElement("addressCity", { label: "City" }),
                                state: new KIP.Forms.TextElement("addressState", { label: "State" }),
                                zip: new KIP.Forms.NumberElement("zip", { label: "Zip Code" })
                            }),
                        }),
                        characters: new KIP.Forms.ArrayElement("characters", { label: "Characters being auditioned", newLabel: "+ New Audition Character" }, {
                            name: new KIP.Forms.TextElement("characterName", { label: "Character Name" }),
                            description: new KIP.Forms.TextAreaElement("characterDescription", { label: "Description" }),
                            gender: new KIP.Forms.SingleSelectButtonElem("gender", {
                                label: "Gender",
                                options: [
                                    { label: "No Preference", value: BST.IGenderEnum.NO_PREFERENCE },
                                    { label: "Female", value: BST.IGenderEnum.FEMALE },
                                    { label: "Male", value: BST.IGenderEnum.MALE },
                                    { label: "Non-Binary", value: BST.IGenderEnum.NON_BINARY }
                                ]
                            }),
                            minAge: new KIP.Forms.NumberElement("minAge", { label: "Age (low)" }),
                            maxAge: new KIP.Forms.NumberElement("maxAge", { label: "Age (high)" })
                        }),
                        expectations: new KIP.Forms.MultiSelectButtonElem("expectations", {
                            label: "Audition expectations",
                            options: [
                                { value: BST.AuditionExpectationType.MONOLOGUE, label: "Monologue" },
                                { value: BST.AuditionExpectationType.COLD_READ, label: "Cold Read" },
                                { value: BST.AuditionExpectationType.DANCE_CALL, label: "Dance call" },
                                { value: BST.AuditionExpectationType.SINGING, label: "Singing" },
                                { value: BST.AuditionExpectationType.IMPROV, label: "Improv" }
                            ]
                        }),
                        contactInfo: new KIP.Forms.TextElement("contactInfo", { label: "Who is the point of contact?" }),
                        reservationLink: new KIP.Forms.TextElement("reservationLink", { label: "Link to reserve a spot" })
                    })
                });
                // make sure we can detect the form saving
                showForm.registerSaveListener(function (data) {
                    _this._adminSaveShow(data);
                });
                // show the form
                showForm.draw(this._elems.base);
                this._elems.select.addEventListener("change", function () {
                    _this._loadShowData(_this._elems.select.value);
                });
                this._form = showForm;
            };
            //#endregion
            ShowForm.prototype.update = function (seasons) {
                this._seasons = seasons;
                this._updateSelectForSeasons();
                this._form.clear();
            };
            /** style some elements for this form */
            ShowForm._uncoloredStyles = {
                ".adminShowForm": {
                    marginTop: "3em"
                },
                ".adminShowForm .showSelect": {
                    display: "flex",
                    justifyContent: "center"
                },
                ".adminShowForm .showSelect #showSelector": {
                    fontSize: "1.2em",
                    width: "50%",
                    marginBottom: "10px",
                    marginTop: "10px",
                    fontFamily: "OpenSansLight"
                }
            };
            return ShowForm;
        }(BST.View));
        Admin.ShowForm = ShowForm;
        var BSTPhotoPathElement = /** @class */ (function (_super) {
            __extends(BSTPhotoPathElement, _super);
            function BSTPhotoPathElement() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            BSTPhotoPathElement.prototype.update = function (data) {
                _super.prototype.update.call(this, data);
                if (!data) {
                    return;
                }
                if (data.indexOf("http") === -1) {
                    this._elems.display.src = "../" + data;
                }
            };
            BSTPhotoPathElement.prototype._createClonedElement = function (appendToID) {
                return new BSTPhotoPathElement(this.id + appendToID, this);
            };
            return BSTPhotoPathElement;
        }(KIP.Forms.PhotoPathElement));
        Admin.BSTPhotoPathElement = BSTPhotoPathElement;
    })(Admin = BST.Admin || (BST.Admin = {}));
})(BST || (BST = {}));
var BST;
(function (BST) {
    var Admin;
    (function (Admin) {
        /**...........................................................................
         * @class AdminView
         * ...........................................................................
         * Create the controller for all of the admin screens
         * @version 1.0
         * ...........................................................................
         */
        var AdminView = /** @class */ (function (_super) {
            __extends(AdminView, _super);
            /** create the admin page */
            function AdminView() {
                var _this = _super.call(this, { cls: "admin" }) || this;
                /** don't let an unauthenticated user get into any admin tools */
                _this._isLoggedIn = false;
                return _this;
            }
            /**...........................................................................
             * _shouldSkipCreateElements
             * ...........................................................................
             *
             * @returns False
             * ...........................................................................
             */
            AdminView.prototype._shouldSkipCreateElements = function () { return false; };
            /**...........................................................................
             * _createElements
             * ...........................................................................
             * create elements for the admin page
             * ...........................................................................
             */
            AdminView.prototype._createElements = function () {
                this._createContent();
                this._createTopMenu();
                if (this._isLoggedIn) {
                    this._createMenu();
                }
            };
            AdminView.prototype._createLoginElements = function () {
                var _this = this;
                this._createGoogleButton();
                this._elems.googleDeets = KIP.createElement({ cls: "loginInfo" });
                this._elems.logoutBtn = KIP.createElement({ cls: "logout btn hidden", content: "LOGOUT" });
                this._elems.logoutBtn.addEventListener("click", function () { _this._signOut(); });
                var googleWrapper = KIP.createElement({
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
            };
            AdminView.prototype._createGoogleButton = function () {
                var _this = this;
                gapi.load('auth2', function () {
                    var auth2 = gapi.auth2.init({
                        client_id: "835724530357-rsdkjat0b8vai2msb2aj11l4kc11t61s.apps.googleusercontent.com",
                        hd: 'bstonline.org'
                    });
                    //auth2.isSignedIn.listen(() => { this._onSignIn(); }); // TODO: handle signin state changes
                    auth2.currentUser.listen(function (user) {
                        if (!user.getBasicProfile()) {
                            //console.log("false alarm"); 
                        }
                        else {
                            //this._onSignIn(user); 
                        }
                    });
                });
                this._elems.googleBtn = KIP.createElement({
                    id: "elgoog",
                    cls: "g-signin2",
                    parent: this._elems.topMenu
                });
                // actually create the styled button
                window.setTimeout(function () {
                    gapi.signin2.render('elgoog', {
                        'scope': 'profile email',
                        'longtitle': false,
                        'theme': 'light',
                        'onsuccess': function (data) { _this._onSignIn(data); },
                        'onfailure': function () { console.log("error occurred"); }
                    });
                }, 10);
                return this._elems.googleBtn;
            };
            /**...........................................................................
             * _createTopMenu
             * ...........................................................................
             * create the top menu for the admin page
             * ...........................................................................
             */
            AdminView.prototype._createTopMenu = function () {
                var _this = this;
                this._elems.backBtn = KIP.createElement({
                    cls: "back hidden btn",
                    content: "BACK"
                });
                this._elems.backBtn.addEventListener("click", function () {
                    if (!_this._canReturnToMenu()) {
                        return;
                    }
                    _this.returnToMenu();
                });
                var googleElems = this._createLoginElements();
                this._elems.topMenu = KIP.createElement({
                    cls: "topMenu",
                    parent: this._elems.base,
                    children: [
                        this._elems.backBtn,
                        googleElems
                    ]
                });
            };
            /**...........................................................................
             * _createContent
             * ...........................................................................
             * create the content needed for the admin page
             * ...........................................................................
             */
            AdminView.prototype._createContent = function () {
                this._elems.contentPane = KIP.createElement({
                    cls: "content",
                    parent: this._elems.base
                });
            };
            /**...........................................................................
             * _createMenu
             * ...........................................................................
             * Show the main menu for the admin page
             * ...........................................................................
             */
            AdminView.prototype._createMenu = function () {
                var _this = this;
                var homeEdit = KIP.createElement({
                    content: "Edit details that show on the BST home page",
                    cls: "menuItem"
                });
                homeEdit.addEventListener("click", function () {
                    _this._showHomeForm();
                });
                var showEdit = KIP.createElement({
                    cls: "menuItem",
                    content: "Create or edit a show"
                });
                showEdit.addEventListener("click", function () {
                    _this._showShowForm();
                });
                var showDelete = KIP.createElement({
                    cls: "menuItem",
                    content: "Delete a show"
                });
                showDelete.addEventListener("click", function () {
                    _this._showDeleteForm();
                });
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
            };
            /**...........................................................................
             * _showHomeForm
             * ...........................................................................
             * Create the view for the home form
             * ...........................................................................
             */
            AdminView.prototype._showHomeForm = function () {
                var _this = this;
                var shield = new KIP.LoadingShield("Loading BST Home...");
                shield.draw(document.body);
                // actually load the appropriate data
                BST.Server.loadHome(function (home) {
                    console.log("loading again");
                    if (!_this._homeForm) {
                        _this._homeForm = new Admin.HomeForm(home);
                        _this._homeForm.form.registerCancelListener(function () {
                            _this.returnToMenu();
                        });
                    }
                    else {
                        _this._homeForm.update(home);
                    }
                    _this._elems.contentPane.innerHTML = "";
                    _this._elems.contentPane.appendChild(_this._homeForm.base);
                    KIP.removeClass(_this._elems.backBtn, "hidden");
                    _this._currentlyShowing = "home";
                    shield.erase();
                });
            };
            /**...........................................................................
             * _showShowForm
             * ...........................................................................
             * Create the view for the show editor form
             * ...........................................................................
             */
            AdminView.prototype._showShowForm = function () {
                var _this = this;
                var shield = new KIP.LoadingShield("Loading shows...");
                shield.draw(document.body);
                // load data about the seasons
                BST.Server.loadSeasons(function (seasons) {
                    if (!_this._showForm) {
                        _this._showForm = new Admin.ShowForm(seasons);
                        _this._showForm.form.registerCancelListener(function () {
                            _this.returnToMenu();
                        });
                    }
                    else {
                        _this._showForm.update(seasons);
                    }
                    _this._elems.contentPane.innerHTML = "";
                    _this._elems.contentPane.appendChild(_this._showForm.base);
                    KIP.removeClass(_this._elems.backBtn, "hidden");
                    _this._currentlyShowing = "show";
                    shield.erase();
                });
            };
            AdminView.prototype._showDeleteForm = function () {
                var _this = this;
                var shield = new KIP.LoadingShield("Loading shows...");
                shield.draw(document.body);
                // load data about the seasons
                BST.Server.loadSeasons(function (seasons) {
                    if (!_this._deleteForm) {
                        _this._deleteForm = new Admin.DeleteShowForm(seasons);
                    }
                    else {
                        _this._deleteForm.update(seasons);
                    }
                    _this._elems.contentPane.innerHTML = "";
                    _this._elems.contentPane.appendChild(_this._deleteForm.base);
                    KIP.removeClass(_this._elems.backBtn, "hidden");
                    _this._currentlyShowing = "delete";
                    shield.erase();
                });
            };
            AdminView.prototype._canReturnToMenu = function () {
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
            };
            /**...........................................................................
             * returnToMenu
             * ...........................................................................
             * Handle going back to the main menu
             * ...........................................................................
             */
            AdminView.prototype.returnToMenu = function () {
                this._elems.contentPane.innerHTML = "";
                this._elems.contentPane.appendChild(this._elems.menu);
                KIP.addClass(this._elems.backBtn, "hidden");
                this._currentlyShowing = "menu";
            };
            //#endregion
            //#region HANDLE LOGGING IN AND OUT
            /**
             * _onSignIn
             *
             * Handle when we've attempted to log in through google's api
             * @param googleUser
             */
            AdminView.prototype._onSignIn = function (googleUser) {
                var _this = this;
                // verify that this is a new login
                var profile = googleUser.getBasicProfile();
                if (this._googleProfile && (profile.getId() === this._googleProfile.getId())) {
                    return;
                }
                // if it is, update our profile info
                this._googleProfile = profile;
                var id_token = googleUser.getAuthResponse().id_token;
                // validate against the server as well
                BST.Server.login(id_token, function () { _this._onSignedIn(); }, function () { _this._onSignInFailure(); });
                // be overlay cautious; logout with every refresh
                window.addEventListener("beforeunload", function () {
                    _this._signOut();
                });
            };
            /**
             * _onSignedIn
             *
             * Handle when the user has successfully authenticated with Google and us
             */
            AdminView.prototype._onSignedIn = function () {
                // show the rest of the menu if we haven't yet
                if (!this._elems.menu) {
                    this._createMenu();
                }
                // update the header elements
                this._elems.googleBtn.style.display = "none";
                this._elems.googleDeets.innerHTML = "Logged in as: " + this._googleProfile.getName();
                KIP.addClass(this._elems.googleHelpText, "hidden");
                KIP.removeClass(this._elems.logoutBtn, "hidden");
                // internal tag for tracking
                this._isLoggedIn = true;
            };
            /**
             * _onSignInFailure
             *
             * Handle when we couldn't log in appropriately
             */
            AdminView.prototype._onSignInFailure = function () {
                var errorPopup = new KIP.ErrorPopup("We couldn't log you in securely. Are you using a BST email?");
                errorPopup.draw(document.body);
                this._signOut();
            };
            /**
             * _signOut
             *
             * Tell Google and our server that we are logging out
             */
            AdminView.prototype._signOut = function () {
                var _this = this;
                var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(function () {
                    _this._googleProfile = null;
                    // update stylings
                    KIP.addClass(_this._elems.logoutBtn, "hidden");
                    _this._elems.googleDeets.innerHTML = "";
                    _this._elems.googleBtn.style.display = "block";
                    KIP.removeClass(_this._elems.googleHelpText, "hidden");
                    // handle removing the menu
                    if (_this._elems.menu && !_this._elems.menu.parentNode) {
                        _this.returnToMenu();
                    }
                    _this._elems.menu.parentNode.removeChild(_this._elems.menu);
                    _this._elems.menu = undefined;
                    // update our server as well
                    BST.Server.logout();
                });
            };
            /** styles to use for the admin view */
            AdminView._uncoloredStyles = {
                "body": {
                    backgroundColor: "#333",
                    margin: "0",
                    padding: "0"
                },
                ".admin": {
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
            };
            return AdminView;
        }(BST.View));
        Admin.AdminView = AdminView;
    })(Admin = BST.Admin || (BST.Admin = {}));
})(BST || (BST = {}));
var BST;
(function (BST) {
    var Admin;
    (function (Admin) {
        var DeleteShowForm = /** @class */ (function (_super) {
            __extends(DeleteShowForm, _super);
            /**
             * Create the view for deleting shows
             * @param seasons
             */
            function DeleteShowForm(seasons) {
                var _this = _super.call(this) || this;
                _this._seasons = seasons;
                _this._createElements();
                return _this;
            }
            DeleteShowForm.prototype._createElements = function () {
                this._elems.base = KIP.createElement({
                    cls: "showDelete"
                });
                var title = KIP.createElement({
                    cls: "title",
                    content: "Deleting Shows",
                    parent: this._elems.base
                });
                this._createShows();
            };
            DeleteShowForm.prototype._createShows = function () {
                if (!this._elems.shows) {
                    this._elems.shows = KIP.createElement({ cls: "shows", parent: this._elems.base });
                }
                var show;
                for (var _i = 0, _a = this._seasons; _i < _a.length; _i++) {
                    show = _a[_i];
                    var elem = this._createShowLine(show);
                    this._elems.shows.appendChild(elem);
                }
            };
            DeleteShowForm.prototype._createShowLine = function (show) {
                var _this = this;
                var showRow = KIP.createElement({
                    cls: "showRow"
                });
                var showName = KIP.createElement({
                    cls: "showname",
                    content: show.name + (show.subtitle ? ": " + show.subtitle : ""),
                    parent: showRow
                });
                var deleteBtn = KIP.createElement({
                    cls: "delete btn",
                    content: "DELETE",
                    parent: showRow
                });
                deleteBtn.addEventListener("click", function () {
                    _this._confirmDeletion(show);
                });
                return showRow;
            };
            DeleteShowForm.prototype._confirmDeletion = function (show) {
                var _this = this;
                var ynPopup = new KIP.YesNoPopup("Are you sure you want to delete this show?", function (result) {
                    if (result === KIP.YesNoEnum.YES) {
                        // we won't actually delete the show file
                        // instead we will update the seasons file to no longer have this show
                        KIP.remove(_this._seasons, show, true, function (a, b) { return (a.id === b.id); });
                        // then we will call the season saving code
                        BST.Server.saveSeasons(_this._seasons, function (seasons) { _this.update(seasons); });
                        ynPopup.erase();
                    }
                });
                ynPopup.setThemeColor(0, "#EA0");
                ynPopup.draw(document.body);
            };
            DeleteShowForm.prototype.update = function (seasons) {
                this._seasons = seasons;
                this._elems.shows.innerHTML = "";
                this._createShows();
            };
            /** styles for the delete show page */
            DeleteShowForm._uncoloredStyles = {
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
            };
            return DeleteShowForm;
        }(BST.View));
        Admin.DeleteShowForm = DeleteShowForm;
    })(Admin = BST.Admin || (BST.Admin = {}));
})(BST || (BST = {}));
var BST;
(function (BST) {
    //#region ABOUT SECTION
    /** enum for the types of data that can appear in the about section */
    var AboutSubsectionType;
    (function (AboutSubsectionType) {
        AboutSubsectionType[AboutSubsectionType["GENERAL"] = 1] = "GENERAL";
        AboutSubsectionType[AboutSubsectionType["HISTORY"] = 2] = "HISTORY";
        AboutSubsectionType[AboutSubsectionType["BOARD"] = 3] = "BOARD";
        AboutSubsectionType[AboutSubsectionType["BYLAWS"] = 4] = "BYLAWS";
    })(AboutSubsectionType || (AboutSubsectionType = {}));
    ;
    /**...........................................................................
     * @class AboutSectionView
     * handles the about section of the BST homepage
     * @version 1.0
     * ...........................................................................
     */
    var AboutSection = /** @class */ (function (_super) {
        __extends(AboutSection, _super);
        function AboutSection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AboutSection.prototype._getUncoloredStyles = function () {
            return this._mergeThemes(AboutSection._uncoloredStyles, BST.SectionView._uncoloredStyles);
        };
        /**...........................................................................
         * _createSectionElements
         * ...........................................................................
         * Creates all of the elements needed for this section
         * ...........................................................................
         */
        AboutSection.prototype._createSectionElements = function () {
            this._sectionContent = new BST.SubSections();
            var mission = new MissionSubsection(this._data.general, "MISSION");
            var history = new HistorySubsection(this._data, "HISTORY");
            var boardStaff = new BoardStaffSubsection(this._data, "BOARD + STAFF");
            var bylaws = new BylawsSubsection(this._data.bylaws, "BYLAWS + POLICIES");
            this._sectionContent.addSubSections(mission, history, boardStaff, bylaws);
            this._elems.content.appendChild(this._sectionContent.base);
        };
        AboutSection._uncoloredStyles = {
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
        };
        return AboutSection;
    }(BST.SectionView));
    BST.AboutSection = AboutSection;
    //#endregion
    //#region MISSION SUBSECTION
    /**...........................................................................
     * @class MissionSubsection
     * sub class for the mission subsection
     * @version 1.0
     * ...........................................................................
     */
    var MissionSubsection = /** @class */ (function (_super) {
        __extends(MissionSubsection, _super);
        function MissionSubsection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**...........................................................................
         * _createContent
         * ...........................................................................
         * Creates the content element for the mession subsection
         * ...........................................................................
         */
        MissionSubsection.prototype._createContent = function () {
            this._elems.content = KIP.createSimpleElement("", "general aboutSection", this._data);
        };
        return MissionSubsection;
    }(BST.SubSection));
    //#endregion
    //#region BOARD AND STAFF SUBSECTION
    /**...........................................................................
     * @class BoardStaffSubsection
     * sub class for the display of board and staff members
     * @version 1.0
     * ...........................................................................
     */
    var BoardStaffSubsection = /** @class */ (function (_super) {
        __extends(BoardStaffSubsection, _super);
        function BoardStaffSubsection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BoardStaffSubsection.prototype._getUncoloredStyles = function () {
            return this._mergeThemes(BoardStaffSubsection._uncoloredStyles, BST.SubSection._uncoloredStyles);
        };
        /**...........................................................................
         * _createContent
         * ...........................................................................
         * Create the content needed for the board section
         * ...........................................................................
         */
        BoardStaffSubsection.prototype._createContent = function () {
            var board = this._createBoardSection();
            var staff = this._createStaffSection();
            this._elems.content = KIP.createSimpleElement("", "staffBoard aboutSection", "", null, [staff, board]);
        };
        /**...........................................................................
         * _createBoardSection
         * ...........................................................................
         * Create the section specifically for board members
         *
         * @returns The created board section element
         * ...........................................................................
         */
        BoardStaffSubsection.prototype._createBoardSection = function () {
            return this._createLeadersSection("BROOM STREET BOARD", this._data.board, "board");
        };
        /**...........................................................................
         * _createStaffSection
         * ...........................................................................
         * Create the section specifically for staff members
         *
         * @returns The created staff section element
         * ...........................................................................
         */
        BoardStaffSubsection.prototype._createStaffSection = function () {
            return this._createLeadersSection("BROOM STREET STAFF", this._data.staff, "staff");
        };
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
        BoardStaffSubsection.prototype._createLeadersSection = function (name, data, cls) {
            var header = KIP.createSimpleElement("", "subheader", name);
            var leaders = KIP.createSimpleElement("", cls + " leaders");
            var leader;
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                leader = data_1[_i];
                var leaderElem = this._createLeaderElem(leader);
                leaders.appendChild(leaderElem);
            }
            var wrapper = KIP.createSimpleElement("", cls + " subsection", "", null, [header, leaders]);
            return wrapper;
        };
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
        BoardStaffSubsection.prototype._createLeaderElem = function (member) {
            var leaderLbl = KIP.createSimpleElement("", "leader lbl", member.position);
            var leaderName = KIP.createSimpleElement("", "leader name", member.name);
            var leaderElem = KIP.createSimpleElement("", "leader", "", null, [leaderLbl, leaderName]);
            return leaderElem;
        };
        BoardStaffSubsection._uncoloredStyles = {
            ".leaders": {
                display: "table"
            },
            ".leader": {
                fontFamily: "OpenSansLight",
                alignItems: "center",
                marginBottom: "5px",
                justifyContent: "center",
                boxSizing: "border-box",
                display: "table-row"
            },
            ".leader .lbl": {
                marginRight: "15px",
                fontSize: "0.7em",
                textTransform: "uppercase",
                fontFamily: "OpenSans",
                textAlign: "right",
                display: "block",
                boxSizing: "border-box"
            },
            ".leader .name": {
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
        };
        return BoardStaffSubsection;
    }(BST.SubSection));
    //#endregion
    //#region HISTORY SUBSECTION
    /**...........................................................................
     * @class HistorySubsection
     * subclass for displaying the history of the theater
     * @version 1.0
     * ...........................................................................
     */
    var HistorySubsection = /** @class */ (function (_super) {
        __extends(HistorySubsection, _super);
        function HistorySubsection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**...........................................................................
         * _createContent
         * ...........................................................................
         * Creates the content needed for the history section
         * ...........................................................................
         */
        HistorySubsection.prototype._createContent = function () {
            this._elems.content = KIP.createElement({ cls: "history aboutSection" });
            if (!this._data.detailedHistory) {
                this._createSimpleHistory();
            }
            else {
                this._createDetailedHistory();
            }
        };
        HistorySubsection.prototype._createSimpleHistory = function () {
            this._elems.content.innerHTML = this._data.history;
        };
        HistorySubsection.prototype._createDetailedHistory = function () {
            var _this = this;
            // first sort the data
            this._data.detailedHistory = this._data.detailedHistory.sort(function (a, b) {
                if (!a.date && !b.date) {
                    return 0;
                }
                if (!a.date) {
                    return 1;
                }
                if (!b.date) {
                    return -1;
                }
                if (a.date < b.date) {
                    return -1;
                }
                else if (a.date > b.date) {
                    return 1;
                }
                return 0;
            });
            // then create the events
            this._data.detailedHistory.map(function (event) {
                var elem = _this._createHistoryEvent(event);
                _this._elems.content.appendChild(elem);
            });
        };
        HistorySubsection.prototype._createHistoryEvent = function (event) {
            var wrapper = KIP.createElement({ cls: "timelineEvent" });
            var dateElem = KIP.createElement({ cls: "timelineDate", content: (event.date ? event.date.getFullYear().toString() : ""), parent: wrapper });
            var eventWrapper = KIP.createElement({ cls: "eventDetailsWrapper", parent: wrapper });
            var eventTitle = KIP.createElement({ cls: "eventTitle", content: event.header, parent: eventWrapper });
            var eventDetails = KIP.createElement({ cls: "eventDetails", content: event.details, parent: eventWrapper });
            return wrapper;
        };
        HistorySubsection._uncoloredStyles = {
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
        };
        return HistorySubsection;
    }(BST.SubSection));
    //#endregion
    //#region BYLAWS SUBSECTION
    /**...........................................................................
     * @class BylawsSubsection
     * subclass for displaying bylaws & policies
     * @version 1.0
     * ...........................................................................
     */
    var BylawsSubsection = /** @class */ (function (_super) {
        __extends(BylawsSubsection, _super);
        function BylawsSubsection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /** make sure our styles are a combination of this class and its parent */
        BylawsSubsection.prototype._getUncoloredStyles = function () {
            return this._mergeThemes(BylawsSubsection._uncoloredStyles, BST.SubSection._uncoloredStyles);
        };
        /**...........................................................................
         * _createContent
         * ...........................................................................
         * Create the content needed for the bylaws section
         * ...........................................................................
         */
        BylawsSubsection.prototype._createContent = function () {
            var lbl = KIP.createElement({ cls: "bylaws lbl", content: "View current bylaws" });
            var link = KIP.createElement({
                type: "a",
                cls: "bylaws link",
                content: "here",
                attr: {
                    href: this._data
                }
            });
            this._elems.content = KIP.createElement({ cls: "bylaws aboutSection hidden", children: [lbl, link] });
        };
        /** add the particular styles for this subsection */
        BylawsSubsection._uncoloredStyles = {
            ".about .bylaws": {
                display: "flex"
            },
            ".about .bylaws a": {
                color: "#333 !important",
                textDecoration: "underline"
            }
        };
        return BylawsSubsection;
    }(BST.SubSection));
    //#endregion
})(BST || (BST = {}));
var BST;
(function (BST) {
    /**...........................................................................
     * @class GetInvolvedSection
     * ...........................................................................
     * Create the section that details how people can get involved with the
     * theater.
     * @version 1.0
     * ...........................................................................
     */
    var GetInvolvedSection = /** @class */ (function (_super) {
        __extends(GetInvolvedSection, _super);
        function GetInvolvedSection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //#endregion
        /**...........................................................................
         * _createSectionElements
         * ...........................................................................
         *  create elements specific to the get involved section
         * ...........................................................................
         */
        GetInvolvedSection.prototype._createSectionElements = function () {
            // initialize the subsections controller
            this._sectionContent = new BST.SubSections();
            // create each of the subsections
            var techs = new InvolvementSubsection(this._data.technicians, "TECHNICIANS");
            var actors = new InvolvementSubsection(this._data.actors, "ACTORS");
            var writers = new InvolvementSubsection(this._data.writers, "WRITERS");
            var directors = new InvolvementSubsection(this._data.directors, "DIRECTORS");
            var general = new InvolvementSubsection(this._data.general, "VOLUNTEERS");
            // add the subsections to the display
            this._sectionContent.addSubSections(techs, actors, writers, directors, general);
            this._elems.content.appendChild(this._sectionContent.base);
        };
        /** keep track of the styles used by this section */
        GetInvolvedSection._uncoloredStyles = {};
        return GetInvolvedSection;
    }(BST.SectionView));
    BST.GetInvolvedSection = GetInvolvedSection;
    /**...........................................................................
     * @class InvolvementPopup
     * ...........................................................................
     * Creates a popup for a way for someone to get involved
     * @version 1.0
     * ...........................................................................
     */
    var InvolvementPopup = /** @class */ (function (_super) {
        __extends(InvolvementPopup, _super);
        //#endregion
        /**...........................................................................
         * Creates the Get Involved popup
         * @param   data    Data contained within the section
         * ...........................................................................
         */
        function InvolvementPopup(data, isMobile) {
            var _this = _super.call(this) || this;
            _this._data = data;
            _this.setThemeColor(0, "#EA0");
            _this._createElements();
            if (isMobile) {
                KIP.addClass(_this._elems.base, "mobile");
            }
            return _this;
        }
        /** return the styles for this element */
        InvolvementPopup.prototype._getUncoloredStyles = function () {
            return this._mergeThemes(InvolvementPopup._uncoloredStyles, KIP.Popup._uncoloredStyles);
        };
        /** determines whether we need additional data in order to call the "createElements" function */
        InvolvementPopup.prototype._shouldSkipCreateElements = function () {
            return !this._data;
        };
        /**...........................................................................
         * _createElements
         * ...........................................................................
         * Creates the elements needed for a "Getting Involved" popup
         * ...........................................................................
         */
        InvolvementPopup.prototype._createElements = function () {
            _super.prototype._createElements.call(this);
            // create the standard elements
            var children = [
                { cls: "popupTitleContainer", children: [
                        { cls: "image " + (this._data.icon ? "" : "noIcn"), children: [
                                { type: "img", attr: { src: this._data.icon } }
                            ] },
                        { cls: "popupTitle", content: this._data.text }
                    ] },
                { cls: "popupContent", content: this._data.content }
            ];
            // add the contact section if applicable
            if (this._data.contactInfo && this._data.contactInfo.name) {
                children.push({ cls: "contactLbl", content: "Interested? Contact " });
                children.push({
                    cls: "contactInfo", children: [,
                        { cls: "contactName", content: this._data.contactInfo.name },
                        {
                            cls: "contactEmail", children: [
                                {
                                    type: "a",
                                    content: this._data.contactInfo.email,
                                    attr: {
                                        href: "mailto:" + this._data.contactInfo.email
                                    }
                                }
                            ]
                        },
                        { cls: "contactPhone", content: this._data.contactInfo.phone }
                    ]
                });
            }
            this.addContent({ cls: "bstContent", children: children });
        };
        /**...........................................................................
         * draw
         * ...........................................................................
         * Draw the popup
         *
         * @param   parent  The parent upon which to draw this element
         * ...........................................................................
         */
        InvolvementPopup.prototype.draw = function (parent) {
            _super.prototype.draw.call(this, parent);
            document.body.style.overflow = "hidden";
        };
        /**...........................................................................
         * erase
         * ...........................................................................
         * Erase the popup
         * ...........................................................................
         */
        InvolvementPopup.prototype.erase = function () {
            _super.prototype.erase.call(this);
            document.body.style.overflow = "auto";
        };
        /** styles to use for involvement popup */
        InvolvementPopup._uncoloredStyles = {
            ".popup": {
                zIndex: "5"
            },
            ".popup .frame": {
                maxWidth: "50%",
                maxHeight: "80%",
                position: "relative"
            },
            ".popup .frame .content": {
                padding: "20px",
                overflowY: "auto",
                maxHeight: (window.innerHeight * 0.8) - 40 + "px"
            },
            ".popup .frame .content .bstContent": {
                overflowY: "auto",
                display: "flex",
                flexDirection: "column"
            },
            ".popupTitle": {
                fontSize: "2em",
                fontFamily: "OpenSansBold"
            },
            ".popupContent": {
                marginTop: "10px"
            },
            ".contactLbl": {
                color: "#555",
                marginTop: "15px",
                fontSize: "0.9em"
            },
            ".contactInfo": {
                display: "flex",
                color: "#555",
                fontSize: "0.9em",
                alignItems: "center"
            },
            ".contactInfo > div": {
                marginLeft: "10px",
                marginRight: "10px"
            },
            ".contactInfo > div > a": {
                color: "#555"
            },
            ".contactName": {
                fontSize: "1em",
                fontFamily: "OpenSansBold"
            },
            ".popup .image": {
                width: "50px",
                height: "50px",
                borderRadius: "50px",
                boxShadow: "1px 1px 4px 2px rgba(0,0,0,.1)",
                overflow: "hidden"
            },
            ".popup .image.noIcn": {
                display: "none"
            },
            ".popup .image img": {
                width: "100%"
            },
            ".mobile.popup .frame": {
                width: "95%",
                fontSize: "2em",
                maxWidth: "95%",
                maxHeight: "95%"
            },
            ".mobile.popup .frame .closeBtn": {
                width: "5vw",
                height: "5vw",
                left: "calc(100% - 4vw)",
                top: "-2vw",
                borderRadius: "100%"
            },
            ".mobile.popup .image": {
                width: "10vw",
                height: "10vw"
            }
        };
        return InvolvementPopup;
    }(KIP.Popup));
    BST.InvolvementPopup = InvolvementPopup;
    /**...........................................................................
     * @class InvolvementSubSection
     * ...........................................................................
     * Display ways a person could get involved with the theater
     * @version 1.0
     * @author  Kip Price
     * ...........................................................................
     */
    var InvolvementSubsection = /** @class */ (function (_super) {
        __extends(InvolvementSubsection, _super);
        function InvolvementSubsection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InvolvementSubsection.prototype._getUncoloredStyles = function () {
            return this._mergeThemes(InvolvementSubsection._uncoloredStyles, BST.SubSection._uncoloredStyles);
        };
        //#endregion
        /**...........................................................................
         * _createContent
         * ...........................................................................
         * Create the details that will fill this subsection
         * ...........................................................................
         */
        InvolvementSubsection.prototype._createContent = function () {
            this._elems.content = KIP.createElement({
                cls: "involvementSubsection"
            });
            // loop trhough the involvement opportunities and create the UI for each
            var idx = 0;
            for (idx; idx < this._data.length; idx += 1) {
                var involvedItem = this._createGetInvolvedItem(this._data[idx]);
                this._elems.content.appendChild(involvedItem);
            }
            if (this._data.length === 0) {
                this._elems.content.appendChild(KIP.createElement({
                    cls: "noData",
                    content: "Nothing right now; check back later."
                }));
            }
        };
        /**...........................................................................
         * _createGetInvolvedItem
         * ...........................................................................
         * create an individual way to get involved
         *
         * @param   involvedItem    The item the user could get involved with
         *
         * @returns The created element
         * ...........................................................................
         */
        InvolvementSubsection.prototype._createGetInvolvedItem = function (involvedItem) {
            var _this = this;
            var involvedIcon = KIP.createElement({
                type: 'img',
                attr: {
                    src: involvedItem.icon || ""
                },
                cls: "icn " + (involvedItem.icon ? "" : "noIcn")
            });
            var involvedText = KIP.createSimpleElement("", "involved", involvedItem.text);
            var elem = KIP.createElement({
                cls: "involvementWrapper", children: [
                    { cls: "imageContainer", children: [involvedIcon] },
                    involvedText
                ]
            });
            elem.addEventListener("click", function () {
                _this._showInvolvementPopup(involvedItem);
            });
            return elem;
        };
        /**...........................................................................
        * _showInvolvementPopup
        * ...........................................................................
        *  Show the get involved item specifically
        *
        * @param   involvedItem    The element we are currently drawing
        * ...........................................................................
        */
        InvolvementSubsection.prototype._showInvolvementPopup = function (involvedItem) {
            var popup = new InvolvementPopup(involvedItem, this._isMobile);
            popup.draw(document.body);
        };
        //#region PROPERTIES
        /** styles to use for the subsection */
        InvolvementSubsection._uncoloredStyles = {
            ".getInvolved .involvementSubsection .involvementWrapper": {
                marginBottom: "7px",
                marginTop: "7px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center"
            },
            ".getInvolved .involvementSubsection .involvementWrapper:hover": {
                textDecoration: "underline"
            },
            ".getInvolved .involvementSubsection .imageContainer": {
                borderRadius: "20px",
                padding: "3px",
                borderStyle: "none",
                border: "0",
                width: "20px",
                height: "20px",
                overflow: "hidden"
            },
            ".getInvolved .involvementSubsection .icn.noIcn": {
                display: "none"
            },
            ".getInvolved .involvementSubsection .icn": {
                width: "100%"
            },
            ".getInvolved.mobile .involvementSubsection .imageContainer": {
                width: "5vw",
                height: "5vw",
                marginRight: "0.5vw"
            },
            ".getInvolved.mobile .involvementSubsection .involvementWrapper": {
                height: "10vw"
            },
            ".getInvolved .noData": {
                color: "rgba(0,0,0,.5)",
                fontSize: "0.9em"
            }
        };
        return InvolvementSubsection;
    }(BST.SubSection));
    BST.InvolvementSubsection = InvolvementSubsection;
})(BST || (BST = {}));
var BST;
(function (BST) {
    /**...........................................................................
     * @class NewsSection
     * Contains recent news + information
     * @version 1.0
     * ...........................................................................
     */
    var NewsSection = /** @class */ (function (_super) {
        __extends(NewsSection, _super);
        function NewsSection() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._NEWS_ITEMS = 3;
            return _this;
        }
        /**...........................................................................
         * _createSectionElements
         * ...........................................................................
         *
         * ...........................................................................
         */
        NewsSection.prototype._createSectionElements = function () {
            this._elems.base.style.marginTop = window.innerHeight + "px";
            // make sure the all of the sections are sorted for display
            this._data = this._data.sort(function (a, b) {
                // check for importance first
                if (a.isImportant && !b.isImportant) {
                    return -1;
                }
                else if (!a.isImportant && b.isImportant) {
                    return 1;
                }
                // if the importance level is the same, just compare dates
                if (a.date > b.date) {
                    return -1;
                }
                if (b.date > a.date) {
                    return 1;
                }
                return 0;
            });
            // loop through our news & use it to create the individual items
            for (var i = 0; i < this._data.length; i += this._NEWS_ITEMS) {
                var lastIdx = Math.min(this._NEWS_ITEMS + i, this._data.length);
                this._createNewsSection(this._data.slice(i, lastIdx), i !== 0);
            }
        };
        NewsSection.prototype._createNewsSection = function (newsItems, isCollapsed) {
            var _this = this;
            // create the section that can expand collapse
            var section = KIP.createElement({
                cls: "newsSection" + (isCollapsed ? " collapsed" : "")
            });
            // add the individual news elements
            var newsItem;
            for (var _i = 0, newsItems_1 = newsItems; _i < newsItems_1.length; _i++) {
                newsItem = newsItems_1[_i];
                var newsElem = this._createNewsItem(newsItem);
                section.appendChild(newsElem);
            }
            // add an expand section if we need it
            if (isCollapsed) {
                var expandLink_1 = KIP.createElement({
                    cls: "expandNews",
                    content: "SEE MORE",
                    parent: this._elems.content
                });
                var collapseLink_1 = KIP.createElement({
                    cls: "collapseNews hidden",
                    content: "SEE LESS",
                    parent: this._elems.content
                });
                expandLink_1.addEventListener("click", function () {
                    _this._expand(section, expandLink_1, collapseLink_1);
                });
                collapseLink_1.addEventListener("click", function () {
                    _this._collapse(section, expandLink_1, collapseLink_1);
                });
            }
            // actually add the section to the content
            this._elems.content.appendChild(section);
        };
        /**...........................................................................
         * _createNewItem
         * ...........................................................................
         * create an individual news item
         *
         * @param   newsItem
         * ...........................................................................
         */
        NewsSection.prototype._createNewsItem = function (newsItem) {
            // Create the main text of the news item
            var title = KIP.createSimpleElement("", "newsTitle", newsItem.title);
            var content = KIP.createSimpleElement("", "newsContent", newsItem.content);
            // Create the meta details
            var author = KIP.createSimpleElement("", "newsAuthor", newsItem.author);
            var date = KIP.createSimpleElement("", "newsDate", KIP.Dates.shortDate(newsItem.date));
            var authorDateWrapper = KIP.createSimpleElement("", "authorDateWrapper", "", null, [author, date]);
            // Add all to a single element
            var elem = KIP.createSimpleElement("", "newsItem", "", null, [title, content, authorDateWrapper]);
            return elem;
        };
        NewsSection.prototype._expand = function (section, expandLink, collapseLink) {
            KIP.removeClass(section, "collapsed");
            KIP.transition(section, { height: "0", maxHeight: "auto" }, { height: "<height>" }, 500).then(function () {
                KIP.removeClass(collapseLink, "hidden");
                KIP.addClass(expandLink, "hidden");
            });
        };
        NewsSection.prototype._collapse = function (section, expandLink, collapseLink) {
            KIP.transition(section, { height: "<height>" }, { height: "0" }, 500).then(function () {
                KIP.addClass(section, "collapsed");
                KIP.addClass(collapseLink, "hidden");
                KIP.removeClass(expandLink, "hidden");
            });
        };
        NewsSection.prototype._onResize = function () {
            _super.prototype._onResize.call(this);
            var marginTop = window.innerHeight;
            if (this._isMobile) {
                marginTop *= 0.9;
            }
            this._elems.base.style.marginTop = (marginTop + "px");
        };
        NewsSection._uncoloredStyles = {
            ".newsItem .newsTitle": {
                fontSize: "1.2em",
                color: "#555",
                fontFamily: "OpenSansBold"
            },
            ".authorDateWrapper": {
                fontSize: "0.8em",
                color: "#777",
                display: "flex",
                marginTop: "10px",
                marginBottom: "20px"
            },
            ".authorDateWrapper .newsAuthor": {
                marginRight: "10px"
            },
            ".newsSection": {
                overflow: "hidden"
            },
            ".newsSection.collapsed": {
                height: "0",
            },
            ".expandNews, .collapseNews": {
                marginTop: "10px",
                marginBottom: "10px",
                cursor: "pointer",
                fontSize: "0.8em",
                fontFamily: "OpenSansBold",
                textAlign: "right"
            },
            ".expandNews:hover, .collapseNews:hover": {
                textDecoration: "underline"
            },
            ".expandNews + .collapseNews + .newsSection.collapsed + .expandNews": {
                display: "none"
            },
            ".newsSection a": {
                color: "#36A",
                margin: "0"
            }
        };
        return NewsSection;
    }(BST.SectionView));
    BST.NewsSection = NewsSection;
})(BST || (BST = {}));
var BST;
(function (BST) {
    var HomeView = /** @class */ (function (_super) {
        __extends(HomeView, _super);
        /** initialize the view */
        function HomeView(data, header) {
            var _this = _super.call(this) || this;
            _this._header = header;
            _this._data = data;
            _this._createElements();
            return _this;
        }
        ;
        /**...........................................................................
         * _createElements
         * ...........................................................................
         * Create all elements needed for the home view
         * ...........................................................................
         */
        HomeView.prototype._createElements = function () {
            if (!this._data) {
                return;
            }
            // TOP SECTION: CURRENT SHOW AND OLD SHOWS
            var sidebar = new BST.SeasonsSidelineView(this._header);
            // SECTIONS
            var sections = this._determineSections();
            sections.splice(0, 0, sidebar.base);
            // CREATE THE PAGE
            var page = KIP.createElement({
                id: "home",
                cls: "home",
                children: sections
            });
            this._elems.base = page;
            // update the bg image of the page
            document.body.style.backgroundImage = "url(" + this._data.bgURL + ")";
        };
        /**
         * _determineSections
         *
         * Figure out which sections should be displayed
         * @returns The array of sections to display
         *
         */
        HomeView.prototype._determineSections = function () {
            var sections = [];
            for (var _i = 0, _a = this._data.menuItems; _i < _a.length; _i++) {
                var menuItem = _a[_i];
                var section = this._determineSection(menuItem.link);
                if (!section) {
                    continue;
                }
                sections.push(section.base);
            }
            return sections;
        };
        /**
         * _determineSection
         *
         * Figure out which section should be created
         * @param   key     The key for this section
         * @returns The created section
         */
        HomeView.prototype._determineSection = function (key) {
            switch (key) {
                case "news":
                    return this._createNewsSection();
                case "getInvolved":
                    return this._createGetInvolvedSection();
                case "about":
                    return this._createAboutSection();
                case "resources":
                    return this._createResourcesSection();
                case "donate":
                    return this._createDonateSection();
                case "seasonsSection":
                    return this._createSeasonsSection();
                default:
                    return null;
            }
        };
        /**...........................................................................
         * _createAboutSection
         * ...........................................................................
         *  create the section about BST
         * ...........................................................................
         */
        HomeView.prototype._createAboutSection = function () {
            var section = new BST.AboutSection("about", "ABOUT BROOM STREET", "about");
            section.data = this._data.about;
            return section;
        };
        /**...........................................................................
         * _createGetInvolvedSection
         * ...........................................................................
         * create the section of ways people can get involved
         * ...........................................................................
         */
        HomeView.prototype._createGetInvolvedSection = function () {
            var section = new BST.GetInvolvedSection("getInvolved", "GET INVOLVED", "getInvolved");
            section.data = this._data.getInvolved;
            return section;
        };
        /**...........................................................................
         * _createNewsSection
         * ...........................................................................
         * create the section containing news items
         * ...........................................................................
         */
        HomeView.prototype._createNewsSection = function () {
            var section = new BST.NewsSection("news", "NEWS", "news");
            section.data = this._data.news;
            return section;
        };
        /**...........................................................................
         * _createResourcesSection
         * ...........................................................................
         * Create section holding resources for interested parties
         *
         * @returns The created resources section
         * ...........................................................................
         */
        HomeView.prototype._createResourcesSection = function () {
            var section = new BST.ResourcesSection("resources", "RESOURCES", "resources");
            section.data = this._data.resources;
            return section;
        };
        /**...........................................................................
         * _createDonateSection
         * ...........................................................................
         * Create section where patrons can add donations
         *
         * @returns The created donate section
         * ...........................................................................
         */
        HomeView.prototype._createDonateSection = function () {
            var section = new BST.DonateSection("donate", "DONATE", "donate");
            section.data = this._data.donateInfo;
            return section;
        };
        /**...........................................................................
         * _createSeasonsSection
         * ...........................................................................
         * Create a section for the seasons
         * ...........................................................................
         */
        HomeView.prototype._createSeasonsSection = function () {
            var section = new BST.SeasonsSection("seasonsSection", "SEASON", "seasonsSection");
            section.onlyCurrent = true;
            return section;
        };
        /** styles for the home view */
        HomeView._uncoloredStyles = {
            "body": {
                backgroundColor: "#000",
                fontFamily: "OpenSans"
            },
            ".hidden": {
                display: "none"
            }
        };
        return HomeView;
    }(BST.View));
    BST.HomeView = HomeView;
})(BST || (BST = {}));
var BST;
(function (BST) {
    /**...........................................................................
     * @class CurrentShowView
     * View to display for the upcoming show display
     * @version 1.0
     * ...........................................................................
     */
    var CurrentShowView = /** @class */ (function (_super) {
        __extends(CurrentShowView, _super);
        /**...........................................................................
         * Create the view that displays the current show
         *
         * @param	showId	The show that we are creating
         * ...........................................................................
         */
        function CurrentShowView(header, showId) {
            var _this = _super.call(this) || this;
            _this._header = header;
            //this._header.registerListener(()=> { this._onResize(); });
            if (showId) {
                _this._loadShowData(showId);
            }
            return _this;
        }
        Object.defineProperty(CurrentShowView.prototype, "bubbleReference", {
            set: function (bbl) {
                this._bubbleReference = bbl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CurrentShowView.prototype, "sidebar", {
            set: function (elem) { this._elems.sidebar = elem; this._onResize(); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CurrentShowView.prototype, "showID", {
            /** set the appropriate ID for this show */
            set: function (showID) {
                this._loadShowData(showID);
            },
            enumerable: true,
            configurable: true
        });
        /**...........................................................................
         * _createElements
         * ...........................................................................
         * Create the elements for
         * ...........................................................................
         */
        CurrentShowView.prototype._createElements = function () {
            this._elems.base = KIP.createSimpleElement("", "currentShow");
        };
        /**...........................................................................
         * _shouldSkipCreateElements
         * ...........................................................................
         * Make sure we can cretae elements
         * ...........................................................................
         */
        CurrentShowView.prototype._shouldSkipCreateElements = function () { return false; };
        /**...........................................................................
         * _loadShowData
         * ...........................................................................
         * Call to the server to show the actual show data
         *
         * @param	showId	The ID that represents the show
         * ...........................................................................
         */
        CurrentShowView.prototype._loadShowData = function (showId) {
            var _this = this;
            BST.Server.loadShow(showId, function (data) {
                _this._createShowUI(data);
            }, function (data) {
                _this._onError();
            });
        };
        /**...........................................................................
         * _onError
         * ...........................................................................
         * Handle the case where we can't actually get the show data loaded
         * ...........................................................................
         */
        CurrentShowView.prototype._onError = function () {
            this._elems.base.innerHTML = ""; // TODO: make a ?? screen
            // err form
            var errForm = new KIP.ErrorPopup("The details about this show couldn't be found");
            errForm.draw(document.body);
        };
        /**...........................................................................
         * _createshowUI
         * ...........................................................................
         * Create the UI needed for the current show
         *
         * @param 	show 	The show that should be displayed
         * ...........................................................................
         */
        CurrentShowView.prototype._createShowUI = function (show) {
            if (!this._elems.base) {
                this._createElements();
            }
            this._elems.base.innerHTML = "";
            var photoElem = this._createShowPhoto(show);
            var info = this._createShowDetails(show);
            this._elems.base.appendChild(photoElem);
            this._elems.base.appendChild(info);
        };
        ;
        /**...........................................................................
         * _createShowPhoto
         * ...........................................................................
         * Create the main photo display for the loaded show
         *
         * @param 	show 	The show to create photos for
         *
         * @returns	The created photo element
         * ...........................................................................
         */
        CurrentShowView.prototype._createShowPhoto = function (show) {
            var _this = this;
            var cls = "wrapper";
            // find the appropriate URL
            var photoURL = this._getPhotoURL(show);
            if (!photoURL) {
                photoURL = "./img/home/broomstreetname.noisy.white.png";
                cls += " placeholder";
            }
            // create the 
            var photoView = KIP.createElement({
                type: "img",
                attr: {
                    "src": photoURL
                }
            });
            var wrapper = KIP.createElement({ cls: cls, children: [photoView] });
            window.setTimeout(function () {
                _this._resizePhotoIfNeeded();
            });
            this._elems.photo = photoView;
            return wrapper;
        };
        CurrentShowView.prototype._resizePhotoIfNeeded = function () {
            var _this = this;
            if (this._elems.photo.offsetHeight <= 1) {
                window.setTimeout(function () { _this._resizePhotoIfNeeded(); });
                return;
            }
            if ((this._elems.photo.offsetHeight + this._elems.photo.offsetTop) < window.innerHeight) {
                var ratio = this._elems.photo.offsetWidth / this._elems.photo.offsetHeight;
                this._elems.photo.style.width = "auto";
                var dy = (window.innerHeight - this._elems.photo.offsetTop);
                this._elems.photo.style.height = dy + "px";
                var adjustX = ((dy * ratio) - window.innerWidth) / 2;
                console.log(KIP.format("dy: {0}, ratio: {1}, innerWidth: {2}, adjustX: {3}", dy, ratio, window.innerWidth, adjustX));
                this._elems.photo.style.marginLeft = (-1 * adjustX) + "px";
            }
        };
        /**...........................................................................
         * _getPhotoURL
         * ...........................................................................
         * The URL for photos for the show
         *
         * @param 	show 	The show to load photos for
         *
         * @returns	The URL for the photos
         * ...........................................................................
         */
        CurrentShowView.prototype._getPhotoURL = function (show) {
            var photoURL;
            var photo;
            for (var _i = 0, _a = show.photos; _i < _a.length; _i++) {
                photo = _a[_i];
                if (photo.isHilite) {
                    photoURL = photo.url;
                    break;
                }
            }
            return photoURL;
        };
        /**...........................................................................
         * _createShowDetails
         * ...........................................................................
         * Create details for the particular show we are showing
         *
         * @param	show	The show to create details for
         *
         * @returns	The created element with all of the show details
         * ...........................................................................
         */
        CurrentShowView.prototype._createShowDetails = function (show) {
            var _this = this;
            var showTitle = KIP.createSimpleElement("", "infoTitle", show.showTitle.title);
            var showSubTitle = KIP.createSimpleElement("", "infoSubtitle", show.showTitle.subtitle);
            var run = show.run;
            var showDates = KIP.createSimpleElement("", "dates", KIP.Dates.shortDate(run.start) + " - " + KIP.Dates.shortDate(run.end));
            var showAuthor = this._createWriterAndDirectorDetails(show.showTitle);
            var buttons = this._createButtons(show);
            this._elems.details = KIP.createSimpleElement("", "currentShowDetails hidden", "", null, [showTitle, showSubTitle, showDates, showAuthor, buttons]);
            if (this._bubbleReference) {
                window.setTimeout(function () {
                    _this._onResize();
                }, 0);
            }
            if (!this._isMobile) {
                window.setTimeout(function () {
                    KIP.removeClass(_this._elems.details, "hidden");
                    KIP.transition(_this._elems.details, { opacity: "0" }, { opacity: "1" }, 500);
                }, 10);
            }
            return this._elems.details;
        };
        /**...........................................................................
         * _createWriterAndDirectorDetails
         * ...........................................................................
         * Create details about who wrote / is directing the show
         *
         * @param 	showTitle 	The title of the show details
         *
         * @returns	The created details
         * ...........................................................................
         */
        CurrentShowView.prototype._createWriterAndDirectorDetails = function (showTitle) {
            var writerDirectorBox = KIP.createSimpleElement("", "writerDirector");
            if (showTitle.writer !== showTitle.director) {
                this._createWriterOrDirectorDetailElem("Written by", showTitle.writer, writerDirectorBox);
                this._createWriterOrDirectorDetailElem("Directed by", showTitle.director, writerDirectorBox);
            }
            else {
                this._createWriterOrDirectorDetailElem("Written and Directed by", showTitle.writer, writerDirectorBox);
            }
            return writerDirectorBox;
        };
        /**...........................................................................
         * _createWriterOrDirectorDetailElem
         * ...........................................................................
         * @param lbl
         * @param data
         * @param parent
         * ...........................................................................
         */
        CurrentShowView.prototype._createWriterOrDirectorDetailElem = function (lbl, data, parent) {
            var wrapper = KIP.createElement({ cls: "writerDirectorWrapper", parent: parent });
            if (!data) {
                return wrapper;
            }
            var lblElem = KIP.createElement({ cls: "lbl", content: lbl + ": ", parent: wrapper });
            var dataElem = KIP.createElement({ cls: "data", content: data, parent: wrapper });
            return wrapper;
        };
        /**...........................................................................
         * _createButtons
         * ...........................................................................
         * Create the buttons that allow the user to hop into the detailed show view
         *
         * @param 	show	The show that the buttons that should be created for
         *
         * @returns	The element containing the created buttons
         * ...........................................................................
         */
        CurrentShowView.prototype._createButtons = function (show) {
            var buttons = KIP.createSimpleElement("", "buttons");
            var detailsBtn = KIP.createSimpleElement("", "btn details", "DETAILS", null, null, buttons);
            detailsBtn.addEventListener("click", function () {
                BST.navigate(show.showTitle.id, BST.NavigationType.SHOW);
            });
            var today = KIP.Dates.getToday();
            var run = BST.Helpers.getShowStartAndEndDates(show);
            if (today <= run.end) {
                var tixBtn = KIP.createSimpleElement("", "btn tix", "GET TICKETS", null, null, buttons);
                tixBtn.addEventListener("click", function () {
                    BST.navigate(show.showTitle.id, BST.NavigationType.SHOW);
                });
            }
            return buttons;
        };
        /**...........................................................................
         * _createErrorMessage
         * ...........................................................................
         * Show an error if there is no show data to load
         *
         * @returns	The element that created
         * ...........................................................................
         */
        CurrentShowView.prototype._createErrorMessage = function () {
            var errorTitle = KIP.createSimpleElement("", "errTitle", "Uh-oh...something happened");
            var errorDetails = KIP.createSimpleElement("", "errDetails", "Looks like we haven't yet added details about this show.");
            var errorMsg = KIP.createSimpleElement("", "error", "", null, [errorTitle, errorDetails]);
            return errorMsg;
        };
        CurrentShowView.prototype._onResize = function () {
            var _this = this;
            if (!this._bubbleReference) {
                return;
            }
            if (this._isMobile) {
                window.setTimeout(function () {
                    //this._elems.details.style.top = (this._elems.sidebar.offsetTop + this._elems.sidebar.offsetHeight) + "px";
                    _this._elems.sidebar.style.paddingTop = (_this._header.base.offsetHeight - 4) + "px";
                    _this._elems.details.style.top = (_this._elems.sidebar.offsetTop + _this._elems.sidebar.offsetHeight) + "px";
                    _this._elems.photo.style.marginTop = (_this._elems.details.offsetTop + _this._elems.details.offsetHeight) + "px";
                }, 100);
            }
            else {
                var top_1 = (this._bubbleReference - (this._elems.details.offsetHeight / 2));
                var diff = (window.innerHeight - (top_1 + this._elems.details.offsetHeight) - 10);
                if (diff < 0) {
                    top_1 += diff;
                }
                if (top_1 < this._header.base.offsetHeight) {
                    top_1 = this._header.base.offsetHeight;
                }
                this._elems.details.style.top = top_1 + "px";
            }
            this._resizePhotoIfNeeded();
        };
        CurrentShowView._uncoloredStyles = {
            ".currentShow": {
                width: "100%",
                height: "100%",
                position: "absolute",
                left: "0",
                top: "0",
                maxHeight: "100%",
                overflow: "hidden",
                pointerEvents: "none"
            },
            ".currentShow.mobile": {
                paddingTop: "0"
            },
            ".seasons": {
                width: "100%",
                height: "100%",
                position: "fixed",
                left: "0",
                top: "0",
                marginTop: "0"
            },
            ".seasons + div": {
                marginTop: "100%"
            },
            ".currentShow .wrapper": {
                width: "100%",
                nested: {
                    "&.placeholder": {
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        nested: {
                            "img": {
                                width: "50% !important",
                                height: "auto !important",
                                marginLeft: "0 !important",
                                marginTop: "0 !important",
                            },
                            "&:after": {
                                content: "'Image Coming Soon'",
                                fontFamily: "OpenSansLight",
                                color: "rgba(255,255,255,.5)",
                                fontSize: "2em"
                            }
                        }
                    },
                    "img": {
                        width: "100%",
                        height: "auto"
                    }
                }
            },
            ".currentShow .currentShowDetails": {
                backgroundColor: "#FFF",
                borderRadius: "4px",
                boxShadow: "1px 1px 8px 4px rgba(0,0,0,.2)",
                position: "absolute",
                top: "178px",
                left: "42px",
                padding: "6px",
                paddingLeft: "20px",
                paddingRight: "10px",
                boxSizing: "border-box",
                fontFamily: "OpenSansLight"
            },
            ".mobile .currentShow .currentShowDetails": {
                width: "100%",
                fontSize: "2em",
                left: "0",
                textAlign: "center",
                top: "calc(8vw - 20px)"
            },
            ".currentShow .currentShowDetails.hidden": {
                opacity: "0",
                display: "block"
            },
            ".mobile .currentShow .currentShowDetails.hidden": {
                opacity: "1",
                display: "block"
            },
            ".currentShowDetails .infoTitle": {
                fontSize: "2em",
                fontFamily: "OpenSansBold"
            },
            ".currentShowDetails .infoSubtitle": {
                fontSize: "1em",
                fontFamily: "OpenSans",
                lineHeight: "0.8",
                marginBottom: "10px",
                opacity: "0.65"
            },
            ".currentShowDetails .dates": {
                fontSize: "1.2em"
            },
            ".currentShowDetails .writerDirector": {
                marginTop: "0.5em"
            },
            ".currentShowDetails .buttons": {
                display: "flex",
                width: "100%",
                marginTop: "1.5em",
                pointerEvents: "all"
            },
            ".mobile .currentShowDetails .buttons": {
                marginTop: "1em",
            },
            ".currentShowDetails .buttons .btn": {
                backgroundColor: "#FC0",
                color: "#000",
                padding: "8px 5px",
                borderRadius: "2px",
                cursor: "pointer",
                marginRight: "8px",
                width: "50%",
                textAlign: "center",
                fontFamily: "OpenSansBold",
                whiteSpace: "nowrap"
            },
            ".mobile .currentShowDetails .buttons .tix, .mobile .currentShowDetails .writerDirector, .mobile .currentShowDetails .dates": {
                display: "none"
            },
            ".mobile .currentShowDetails .buttons .details": {
                width: "100%",
                fontSize: "1.2em"
            },
            ".writerDirectorWrapper": {
                display: "flex",
                alignItems: "center",
                nested: {
                    ".lbl": {
                        fontSize: "0.8em",
                        color: "rgba(0,0,0,.8)",
                        paddingRight: "5px"
                    }
                }
            }
        };
        return CurrentShowView;
    }(BST.View));
    BST.CurrentShowView = CurrentShowView;
})(BST || (BST = {}));
var BST;
(function (BST) {
    /**...........................................................................
     * @class SeasonsSidelineView
     * handle showing seasons in the side of the home page
     * @version 1.0
     * ...........................................................................
     */
    var SeasonsSidelineView = /** @class */ (function (_super) {
        __extends(SeasonsSidelineView, _super);
        /**...........................................................................
         * construct the view for the seasons on the side of the home page
         * ...........................................................................
         */
        function SeasonsSidelineView(header) {
            var _this = _super.call(this) || this;
            _this._currentShowView = new BST.CurrentShowView(header);
            _this._createElements();
            _this._loadSeasons();
            return _this;
        }
        /**...........................................................................
         * _createElements
         * ...........................................................................
         * create the elements that make up the seasons view
         * ...........................................................................
         */
        SeasonsSidelineView.prototype._createElements = function () {
            if (!this._currentShowView) {
                return;
            }
            this._elems.base = KIP.createSimpleElement("", "seasons", "", null, [this._currentShowView.base]);
            this._elems.base.style.top = "0";
            this._elems.base.style.left = "0";
            BST.slowScroll(this.base);
        };
        /**...........................................................................
         * _createSectionElements
         * ...........................................................................
         * create the elements for the shows
         * ...........................................................................
         */
        SeasonsSidelineView.prototype._createSectionElements = function () {
            if (!this._seasons) {
                return;
            }
            this._elements = {
                sidelineElem: KIP.createSimpleElement("", "sideline"),
                showsElem: this._createShows()
            };
            this._currentShowView.sidebar = this._elements.sidelineElem;
            this._elements.sidelineElem.appendChild(this._elements.showsElem);
            this.base.appendChild(this._elements.sidelineElem);
        };
        //#region NEW UI FUNCTIONS
        /**...........................................................................
         * _createShows
         * ...........................................................................
         *
         * ...........................................................................
         */
        SeasonsSidelineView.prototype._createShows = function () {
            var _this = this;
            var showsElem = KIP.createSimpleElement("", "shows");
            // find the right shows
            var shows = BST.Helpers.findImmediateShow(this._seasons);
            shows.map(function (show) {
                var showElem = _this._createShow(show);
                showsElem.appendChild(showElem);
                if (show.selected) {
                    _this._selectCurShowAfterTimeout(showElem, show.id);
                }
            });
            return showsElem;
        };
        /**...........................................................................
         * _createShow
         * ...........................................................................
         * create the HTMl element for a particular show
         * @param miniShow - the show to create an icon for
         * @returns
         * ...........................................................................
         */
        SeasonsSidelineView.prototype._createShow = function (miniShow) {
            var _this = this;
            var showElem = KIP.createSimpleElement("", "show");
            var showIcon = KIP.createElement({
                cls: "icon",
                type: "img",
                attr: {
                    src: miniShow.icon
                },
                parent: showElem
            });
            // add the event listener
            showElem.addEventListener("click", function () {
                _this._selectShow(showElem, miniShow.id);
            });
            return showElem;
        };
        //#endregion
        //#region LOAD SEASONS
        /**
         * load the data from the seasons file
         */
        SeasonsSidelineView.prototype._loadSeasons = function () {
            var _this = this;
            BST.Server.loadSeasons(function (seasons) {
                _this._seasons = seasons;
                _this._createSectionElements();
            });
        };
        //#endregion
        /**  */
        SeasonsSidelineView.prototype._selectCurShowAfterTimeout = function (showElem, showID) {
            var _this = this;
            window.setTimeout(function () {
                _this._selectShow(showElem, showID);
            });
        };
        /** handle loading a particular show */
        SeasonsSidelineView.prototype._loadShow = function (showID, showElem) {
            this._currentShowView.showID = showID;
            this._currentShowView.bubbleReference = showElem.offsetTop;
        };
        /** handle selecting a particular element */
        SeasonsSidelineView.prototype._selectShow = function (elem, showID) {
            if (!this._selectElem(elem, this._selectedShow)) {
                return;
            }
            this._selectedShow = elem;
            this._loadShow(showID, elem);
        };
        SeasonsSidelineView.prototype._selectElem = function (elem, selectedElem) {
            if (selectedElem === elem) {
                return false;
            } // Quit if this elem is already selected
            if (selectedElem) {
                KIP.removeClass(selectedElem, "selected");
            }
            KIP.addClass(elem, "selected"); // Add the new selected class
            return true; // Return that selecting was a success
        };
        SeasonsSidelineView._uncoloredStyles = {
            ".shows .show img.icon": {
                width: "32px",
                height: "32px",
                borderRadius: "100%",
                backgroundColor: "rgba(255,255,255,.5)"
            },
            ".mobile .shows img.icon": {
                width: "8vw",
                height: "8vw"
            },
            ".seasons .sideline": {
                display: "flex",
                flexDirection: "row-reverse",
                maxHeight: "100%",
                height: "100%",
                position: "absolute",
                top: "0"
            },
            ".mobile.seasons .sideline": {
                width: "100%",
                height: "auto",
            },
            ".mobile.seasons .sideline .shows": {
                flexDirection: "row",
                width: "100%",
                paddingBottom: "1vh",
                backgroundColor: "#242424"
            },
            ".seasons .sideline .shows": {
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                color: "#FFF",
                textShadow: "1px 1px 3px rgba(0,0,0,.2)",
                paddingLeft: "8px",
                paddingRight: "8px",
                height: "100%",
                backgroundColor: "#242423",
                boxShadow: "1px 0px 5px 3px rgba(0,0,0,.3)",
                alignItems: "center",
                paddingTop: "100px",
                boxSizing: "border-box"
            },
            ".seasons.mobile .sideline .shows": {
                paddingTop: "10px"
            },
            ".seasons .sideline .shows .show": {
                transition: "all ease-in-out 0.08s",
                cursor: "pointer",
                opacity: "0.2",
                height: "8.333%",
                alignSelf: "middle",
                margin: "auto"
            },
            ".seasons .sideline .years .yearLabel:hover, .seasons .sideline .years .yearLabel.selected, .seasons .sideline .shows .show:hover, .seasons .sideline .shows .show.selected": {
                transform: "scale(1.1)",
                textDecoration: "underline",
                opacity: "1"
            }
        };
        return SeasonsSidelineView;
    }(BST.View));
    BST.SeasonsSidelineView = SeasonsSidelineView;
})(BST || (BST = {}));
var BST;
(function (BST) {
    /**...........................................................................
     * @class ResourcesSection
     * ...........................................................................
     * Keep track of the resources offered by Broom Street
     * @version 1.0
     * ...........................................................................
     */
    var ResourcesSection = /** @class */ (function (_super) {
        __extends(ResourcesSection, _super);
        function ResourcesSection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**...........................................................................
         * _createSectionElements
         * ...........................................................................
         * Create the section elements for resources
         * ...........................................................................
         */
        ResourcesSection.prototype._createSectionElements = function () {
            var resource;
            for (var _i = 0, _a = this._data; _i < _a.length; _i++) {
                resource = _a[_i];
                this._createResource(resource);
            }
        };
        /**...........................................................................
         * _createResource
         * ...........................................................................
         * Create an individual resource
         *
         * @param   data    The resource we're creating
         * ...........................................................................
         */
        ResourcesSection.prototype._createResource = function (data) {
            var resourceConatiner = KIP.createElement({
                cls: "resource",
                parent: this._elems.content,
                children: [
                    {
                        cls: "resourceTitle",
                        type: "a",
                        attr: {
                            href: data.link,
                            target: "_blank"
                        },
                        content: data.name
                    },
                    {
                        cls: "resourceContent",
                        content: data.content
                    }
                ]
            });
        };
        /** styles for the resources section */
        ResourcesSection._uncoloredStyles = {
            ".resources .sectionContent": {
                display: "flex",
                flexWrap: "wrap"
            },
            ".resource": {
                width: "33%",
                marginTop: "10px",
                paddingLeft: "10px",
                paddingRight: "10px",
                boxSizing: "border-box"
            },
            ".resource .resourceTitle": {
                fontSize: "1.1em",
            },
            ".resources .resource a.resourceTitle": {
                color: "#333",
                marginLeft: "0",
                marginRight: "0",
                fontFamily: "OpenSans"
            },
            ".resource .resourceContent": {
                fontSize: "0.9em",
                marginTop: "5px",
                color: "#555"
            },
            ".mobile .resource": {
                paddingBottom: "2vh",
                width: "50%"
            }
        };
        return ResourcesSection;
    }(BST.SectionView));
    BST.ResourcesSection = ResourcesSection;
})(BST || (BST = {}));
var BST;
(function (BST) {
    /**...........................................................................
     * @class   SeasonsSection
     * ...........................................................................
     * @version 1.0
     * @author  Kip Price
     * ...........................................................................
    */
    var SeasonsSection = /** @class */ (function (_super) {
        __extends(SeasonsSection, _super);
        /**...........................................................................
         * Create the section that will hold our seasons
         * @param id
         * @param title
         * @param addlCls
         * ...........................................................................
         */
        function SeasonsSection(id, title, addlCls) {
            var _this = _super.call(this, id, title, addlCls) || this;
            _this._loadSeasons();
            _this._createElements();
            return _this;
        }
        Object.defineProperty(SeasonsSection.prototype, "onlyCurrent", {
            set: function (onlyCurrent) {
                this._onlyCurrent = onlyCurrent;
                KIP.addClass(this._elems.base, "onlyCurrent");
            },
            enumerable: true,
            configurable: true
        });
        /**...........................................................................
         * _loadSeasons
         * ...........................................................................
         * handle loading the servers
         * ...........................................................................
         */
        SeasonsSection.prototype._loadSeasons = function () {
            var _this = this;
            BST.Server.loadSeasons(function (data) {
                _this._data = data;
                _this._createSectionElements();
            });
        };
        /**...........................................................................
         * _createSectionElements
         * ...........................................................................
         *
         * ...........................................................................
         */
        SeasonsSection.prototype._createSectionElements = function () {
            var _this = this;
            if (!this._data) {
                return;
            }
            this._processData();
            this._sectionContent = new BST.SubSections();
            this._dataByYear.map(function (shows, key) {
                var subsection = new SeasonShowSubsection(shows, key);
                _this._sectionContent.addSubSection(subsection);
            });
            this._sectionContent.draw(this._elems.content);
        };
        /**...........................................................................
         * _processData
         * ...........................................................................
         *
         * ...........................................................................
         */
        SeasonsSection.prototype._processData = function () {
            if (this._dataByYear) {
                return;
            }
            this._dataByYear = new KIP.Collection(KIP.CollectionTypeEnum.ReplaceDuplicateKeys);
            // sort the shows by year
            var sortedData = this._data.slice();
            sortedData.sort(function (a, b) {
                var dateA = new Date(a.endDate);
                var dateB = new Date(b.endDate);
                if (dateA < dateB) {
                    return -1;
                }
                else if (dateA > dateB) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
            // add all the shows to the appropriate year
            var miniShow;
            for (var _i = 0, sortedData_1 = sortedData; _i < sortedData_1.length; _i++) {
                miniShow = sortedData_1[_i];
                var year = new Date(miniShow.endDate).getFullYear();
                if (isNaN(year)) {
                    continue;
                }
                var yearArr = this._dataByYear.getValue(year.toString());
                if (!yearArr) {
                    yearArr = [];
                }
                yearArr.push(miniShow);
                this._dataByYear.addElement(year.toString(), yearArr);
            }
            this._dataByYear.sort(function (a, b) {
                if (a.key > b.key) {
                    return -1;
                }
                else if (a.key < b.key) {
                    return 1;
                }
                return 0;
            });
        };
        /** styles for the section */
        SeasonsSection._uncoloredStyles = {
            ".seasonsSection .tabContainer": {
                justifyContent: "flex-start",
                nested: {
                    ".tab": {
                        paddingRight: "15px"
                    },
                }
            },
            ".seasonsSection.onlyCurrent .tabContainer": {
                display: "none"
            }
        };
        return SeasonsSection;
    }(BST.SectionView));
    BST.SeasonsSection = SeasonsSection;
    /**...........................................................................
     * @class   SeasonShowSubsection
     * ...........................................................................
     * @version 1.0
     * @author  Kip Price
     * ...........................................................................
     */
    var SeasonShowSubsection = /** @class */ (function (_super) {
        __extends(SeasonShowSubsection, _super);
        function SeasonShowSubsection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**...........................................................................
         * _createContent
         * ...........................................................................
         *
         * ...........................................................................
         */
        SeasonShowSubsection.prototype._createContent = function () {
            this._createSeasonContainer();
        };
        /**...........................................................................
         * _createSeasonContainer
         * ...........................................................................
         * Create the container for all of the shows
         * ...........................................................................
         */
        SeasonShowSubsection.prototype._createSeasonContainer = function () {
            this._elems.content = KIP.createElement({
                cls: "seasonContainer",
                parent: this._elems.base
            });
            for (var _i = 0, _a = this._data; _i < _a.length; _i++) {
                var show = _a[_i];
                this._createShowInSeason(show);
            }
        };
        /**...........................................................................
         * _createShowInSeason
         * ...........................................................................
         * Create a show in our season display
         * @param   show    Create a show
         * ...........................................................................
         */
        SeasonShowSubsection.prototype._createShowInSeason = function (show) {
            var imgCls = "showIcon";
            if (!show.icon) {
                imgCls += " noIcon";
            }
            // create the actual show element
            var showElem = KIP.createElement({
                cls: "show",
                parent: this._elems.content,
                children: [
                    { cls: imgCls, children: [
                            { type: "img", attr: { src: show.icon } }
                        ] },
                    { cls: "showName", content: show.name },
                    { cls: "subtitle", content: (show.subtitle ? ": " + show.subtitle : "") }
                ],
                eventListeners: {
                    click: function () {
                        BST.navigate(show.id, BST.NavigationType.SHOW);
                    }
                }
            });
        };
        SeasonShowSubsection._uncoloredStyles = {
            ".mobile .seasonContainer": {
                maxHeight: "unset",
                nested: {
                    ".show": {
                        height: "auto",
                        width: "100%",
                        paddingTop: "15px",
                        paddingBottom: "15px"
                    }
                }
            },
            ".seasonContainer": {
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                overflow: "hidden",
                maxHeight: "250px",
                nested: {
                    ".show": {
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        paddingTop: "5px",
                        paddingBottom: "5px",
                        width: "50%",
                        height: "50px",
                        nested: {
                            "&:hover": {
                                textDecoration: "underline"
                            },
                            ".showIcon": {
                                width: "30px",
                                height: "30px",
                                flexShrink: "0",
                                borderRadius: "100%",
                                overflow: "hidden",
                                backgroundColor: "#FFF",
                                border: "1px solid rgba(0,0,0,.1)",
                                nested: {
                                    "&.noIcon": {
                                        border: "1px solid transparent"
                                    },
                                    "img": {
                                        width: "100%",
                                    }
                                }
                            },
                            ".showName": {
                                paddingLeft: "10px"
                            }
                        }
                    }
                }
            }
        };
        return SeasonShowSubsection;
    }(BST.SubSection));
    BST.SeasonShowSubsection = SeasonShowSubsection;
})(BST || (BST = {}));
var BST;
(function (BST) {
    /**...........................................................................
     * @class DonateSection
     * ...........................................................................
     * Create the section to collect donations for BST
     * @version 1.0
     * ...........................................................................
     */
    var DonateSection = /** @class */ (function (_super) {
        __extends(DonateSection, _super);
        function DonateSection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**...........................................................................
         * _createSectionElements
         * ...........................................................................
         * Create the elements for the section
         * ...........................................................................
         */
        DonateSection.prototype._createSectionElements = function () {
            var blurb = KIP.createElement({
                cls: "donateBlurb",
                content: this._data.blurb,
                parent: this._elems.content
            });
            this._createPaypalElement();
        };
        /**...........................................................................
         * _createPayPalElement
         * ...........................................................................
         * Create the link to Paypal so people can in fact donate
         * ...........................................................................
         */
        DonateSection.prototype._createPaypalElement = function () {
            var paypalLink = KIP.createElement({
                type: "form",
                cls: "paypalInner",
                attr: {
                    action: "https://www.paypal.com/cgi-bin/webscr",
                    method: "post",
                    target: "_top"
                },
                children: [
                    {
                        type: "input",
                        attr: {
                            type: "hidden",
                            name: "cmd",
                            value: "_s-xclick"
                        }
                    },
                    {
                        type: "input",
                        attr: {
                            type: "hidden",
                            name: "hosted_button_id",
                            value: this._data.paypalAccount
                        }
                    },
                    {
                        type: "input",
                        attr: {
                            type: "image",
                            src: "https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif",
                            border: "0",
                            name: "submit",
                            alt: "PayPal - The safer, easier way to pay online!"
                        }
                    },
                    {
                        type: "img",
                        attr: {
                            alt: "",
                            border: "0",
                            src: "https://www.paypalobjects.com/en-US/i/scr/pixel.gif",
                            width: "1",
                            height: "1"
                        }
                    }
                ]
            });
            var paypalWrapper = KIP.createElement({
                cls: "paypal",
                parent: this._elems.content,
                children: [paypalLink]
            });
        };
        /** styles to use for this section  */
        DonateSection._uncoloredStyles = {
            ".donate .donateBlurb a": {
                color: "#333",
                marginLeft: "0",
                marginRight: "0"
            },
            ".donate .paypal": {
                marginTop: "5%",
                display: "flex",
                justifyContent: "center"
            },
            ".donate.mobile .paypal .paypalInner": {
                transform: "scale(2.5)",
                marginTop: "4vh",
                marginBottom: "3vh"
            }
        };
        return DonateSection;
    }(BST.SectionView));
    BST.DonateSection = DonateSection;
})(BST || (BST = {}));
var BST;
(function (BST) {
    /*...........................................................................
     * @class TicketSection
     * ...........................................................................
     * section keeping track of available tickets for a show
     * @version 1.0
     * ...........................................................................
     */
    var TicketSection = /** @class */ (function (_super) {
        __extends(TicketSection, _super);
        function TicketSection() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._weekNum = 0;
            return _this;
        }
        /** create the appropriate elements for the ticket section */
        TicketSection.prototype._createSectionElements = function () {
            var tbl = this._createDateGrid();
            var tix = this._createTicketButtons();
            this._elems.content.appendChild(tbl);
            this._elems.content.appendChild(tix);
        };
        /**...........................................................................
         * _createDateGrid
         * ...........................................................................
         *  create the ticket date grid
         * ...........................................................................
         */
        TicketSection.prototype._createDateGrid = function () {
            var cells = [];
            // create the day headers
            cells[0] = this._createDayHeaders();
            // loop through the dates themselves
            var date;
            for (var _i = 0, _a = this._data.runDates; _i < _a.length; _i++) {
                date = _a[_i];
                // Create the cell to store here
                var dayCell = this._createDayCell(date);
                this._addDayToCellArray(dayCell, date, cells);
            }
            // actually construct the table with each of the cells
            try {
                var finalTable = KIP.createTable(this._id + "|grid", "ticketDates", cells);
                return finalTable;
            }
            catch (e) {
                return KIP.createSimpleElement();
            }
        };
        /**...........................................................................
         * _createDayHeaders
         * ...........................................................................
         * create headers for each of the show days
         * ...........................................................................
         */
        TicketSection.prototype._createDayHeaders = function () {
            var out = [];
            // Loop through the headers
            var header;
            for (var _i = 0, _a = TicketSection._HEADERS; _i < _a.length; _i++) {
                header = _a[_i];
                // create the header and add to the array
                var headerElem = KIP.createSimpleElement("", "dateHeader", header);
                out.push(headerElem);
            }
            return out;
        };
        /**...........................................................................
         * _addDayToCellArray
         * ...........................................................................
         * add a day to the cell array
         * ...........................................................................
         */
        TicketSection.prototype._addDayToCellArray = function (dayCell, date, cells) {
            var run = BST.Helpers.getShowStartAndEndDates(this._data);
            // Calculate the week position
            var diff = KIP.Dates.dateDiff(run.end, date, false);
            if (!cells[this._weekNum]) {
                cells[this._weekNum] = [];
            }
            // Calculate the day position
            var day = date.getDay();
            if (day < 5) {
                this._weekNum += 1;
                cells[this._weekNum] = [];
            }
            // Add the cell to the array at the correct spot
            cells[this._weekNum][day - 4] = dayCell;
        };
        /** create a cell for a particular day */
        TicketSection.prototype._createDayCell = function (date) {
            var _this = this;
            var dayCell = KIP.createSimpleElement("", "date", date.getDate().toString());
            dayCell.addEventListener("click", function () {
                // Track whether this is the selected element
                var isThisSelected = (_this._selectedElement === dayCell);
                // Unselect the selected element
                _this._unselectCell();
                // Disable the ticket button if we're deselecting
                if (isThisSelected) {
                    _this._disableTicketButtons();
                    // otherwise, make sure the ticket button is enabled
                }
                else {
                    _this._selectCell(dayCell);
                    _this._enableTicketButtons();
                }
            });
            this._setDayColor(date, dayCell);
            return dayCell;
        };
        /** select a particular day in our date grid */
        TicketSection.prototype._selectCell = function (cell) {
            KIP.addClass(cell, "selected");
            this._selectedElement = cell;
        };
        /** unselect a particular day in our date grid */
        TicketSection.prototype._unselectCell = function () {
            if (!this._selectedElement) {
                return;
            }
            KIP.removeClass(this._selectedElement, "selected");
            this._selectedElement = null;
        };
        TicketSection.prototype._setDayColor = function (date, dayCell) {
            // TODO: make a real function
            var colorNum = Math.floor(Math.random() * 4);
            KIP.addClass(dayCell, TicketSection._COLORS[colorNum]);
        };
        /** create the buttons that allow someone to buy and / or reserve a ticket */
        TicketSection.prototype._createTicketButtons = function () {
            var reserveBtn = this._createTicketButton("RESERVE", "reserve");
            var buyBtn = this._createTicketButton("BUY", "buy", 1.38);
            var wrapperElem = KIP.createSimpleElement("ticketBtns", "buttons", "", null, [reserveBtn, buyBtn]);
            this._ticketBtns = wrapperElem;
            return wrapperElem;
        };
        /** create an individual ticket button */
        TicketSection.prototype._createTicketButton = function (txt, cls, addlFee, warning) {
            var _this = this;
            if (!warning) {
                warning = "If you do not arrive by 7:55pm, your tickets may be forfeit!";
            }
            var btn = KIP.createSimpleElement("", "btn " + cls, txt);
            var price = KIP.createSimpleElement("", "price", "$11.00" + (addlFee ? " + $" + addlFee + " convenience fee" : ""));
            var numLbl = KIP.createSimpleElement("", "lbl", " x ");
            var numSelect = KIP.createElement({
                type: "input",
                attr: {
                    "type": "number",
                    "min": "0",
                    "value": "0"
                },
                cls: "numOfTix",
            });
            numSelect.addEventListener("change", function () {
                _this._updateCalculation(+numSelect.value, 11 + (addlFee ? addlFee : 0), calculation);
            });
            numSelect.addEventListener("keyup", function () {
                _this._updateCalculation(+numSelect.value, 11 + (addlFee ? addlFee : 0), calculation);
            });
            var calculationLbl = KIP.createSimpleElement("", "lbl", " = ");
            var calculation = KIP.createSimpleElement("", "calculation", "$0.00");
            var warningElem = KIP.createSimpleElement("", "warning", warning);
            var wrapper = KIP.createSimpleElement("", "ticketBtn", "", null, [btn, price, numLbl, numSelect, calculationLbl, calculation, warningElem]);
            return wrapper;
        };
        TicketSection.prototype._updateCalculation = function (tixNum, cost, calculationElem) {
            var dollarAmt = KIP.roundToPlace(cost * tixNum, 100);
            var cents = KIP.piece(dollarAmt.toString(), ".", 1);
            calculationElem.innerHTML = "$" + dollarAmt;
            if (cents.length === 1) {
                calculationElem.innerHTML += "0";
            }
            else if (cents.length === 0) {
                calculationElem.innerHTML += ".00";
            }
        };
        TicketSection.prototype._enableTicketButtons = function () {
            KIP.addClass(this._ticketBtns, "enabled");
        };
        TicketSection.prototype._disableTicketButtons = function () {
            KIP.removeClass(this._ticketBtns, "enabled");
        };
        TicketSection._COLORS = ["closed", "booked", "semi", "free"];
        TicketSection._HEADERS = ["Thurs.", "Fri.", "Sat."];
        return TicketSection;
    }(BST.SectionView));
    BST.TicketSection = TicketSection;
})(BST || (BST = {}));
var BST;
(function (BST) {
    /**
     * Section for reviews
     * @version 1.0
     */
    var BuzzSection = /** @class */ (function (_super) {
        __extends(BuzzSection, _super);
        function BuzzSection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BuzzSection.prototype._setData = function (data) {
            _super.prototype._setData.call(this, data);
            if (!this._data || (this._data.length === 0)) {
                KIP.addClass(this._elems.base, "hidden");
            }
        };
        /** create the elements needed by review sections */
        BuzzSection.prototype._createSectionElements = function () {
            var review;
            for (var _i = 0, _a = this._data; _i < _a.length; _i++) {
                review = _a[_i];
                var miniReview = this._createReview(review);
                this._elems.content.appendChild(miniReview);
            }
        };
        /** create a review for a show */
        BuzzSection.prototype._createReview = function (review) {
            var metaDetails = this._createMetaDetails(review); // create the meta label
            var reviewElem = KIP.createSimpleElement(this._id + "what", "what", review.review); // create the actual review
            var blurb = KIP.createSimpleElement(this._id + "|blurb", "blurb", "", null, [metaDetails, reviewElem]); // create the base element
            // return the elements that callers will need
            return blurb;
        };
        /** create the label on the side of a review, detailing where / when the review came from */
        BuzzSection.prototype._createMetaDetails = function (review) {
            var whoElem = KIP.createSimpleElement(this._id + "|who", "who", review.reviewer);
            var whenElem = KIP.createSimpleElement(this._id + "|when", "when", KIP.Dates.shortDate(review.date));
            var linkElem = KIP.createElement({
                type: "a",
                attr: {
                    href: review.link
                },
                cls: "link",
                content: "Full Review"
            });
            var linkWrapper = KIP.createSimpleElement(this._id + "|link", "link", "", null, [linkElem]);
            var whoWhenElem = KIP.createSimpleElement(this._id + "|whoWhen", "whoWhen", "", null, [whoElem, whenElem, linkWrapper]);
            var whoWhenWrapper = KIP.createSimpleElement("", "whoWhenWrapper", "", null, [whoWhenElem]);
            return whoWhenWrapper;
        };
        return BuzzSection;
    }(BST.SectionView));
    BST.BuzzSection = BuzzSection;
})(BST || (BST = {}));
var BST;
(function (BST) {
    var BioSection = /** @class */ (function (_super) {
        __extends(BioSection, _super);
        function BioSection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**...........................................................................
         * _createElements (protected)
         * ...........................................................................
         * Creates all elements needed in the bio section
         * ...........................................................................
         */
        BioSection.prototype._createSectionElements = function () {
            var bio;
            var content = new BST.SubSections();
            // sort the bios by type
            var castBios = [];
            var crewBios = [];
            var specialBios = [];
            // split out each of the bio lists
            for (var _i = 0, _a = this._data; _i < _a.length; _i++) {
                bio = _a[_i];
                switch (bio.type) {
                    case BST.CastOrCrew.CREW:
                        crewBios.push(bio);
                        break;
                    case BST.CastOrCrew.SPECIAL_MENTION:
                        specialBios.push(bio);
                        break;
                    default:
                        castBios.push(bio);
                        break;
                }
            }
            if (castBios.length > 0) {
                var castSubsection = new BioSubsection(castBios, "CAST");
                content.addSubSection(castSubsection);
            }
            if (crewBios.length > 0) {
                var crewSubsection = new BioSubsection(crewBios, "CREW");
                content.addSubSection(crewSubsection);
            }
            if (specialBios.length > 0) {
                var specialSubsection = new BioSubsection(specialBios, "SPECIAL MENTIONS");
                content.addSubSection(specialSubsection);
            }
            this._elems.content.appendChild(content.base);
        };
        /** keep track of styles for the section */
        BioSection._uncoloredStyles = {
            ".section.bios:not(.mobile)": {
                paddingLeft: "25%",
                paddingRight: "20%"
            },
            ".section.bios .sectionContent .bioSubsection": {
                display: "flex",
                flexWrap: "wrap",
                marginLeft: "-120px"
            },
            ".section.bios .tabContainer": {
                justifyContent: "flex-start"
            },
            ".section.bios .tabContainer .tab": {
                paddingRight: "5%",
                boxSizing: "border-box"
            }
        };
        return BioSection;
    }(BST.SectionView));
    BST.BioSection = BioSection;
    var BioSubsection = /** @class */ (function (_super) {
        __extends(BioSubsection, _super);
        function BioSubsection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BioSubsection.prototype._getUncoloredStyles = function () { return this._mergeThemes(BioSubsection._uncoloredStyles, BST.SubSection._uncoloredStyles); };
        BioSubsection.prototype._createContent = function () {
            this._elems.content = KIP.createElement({
                cls: "bioSubsection"
            });
            var bio;
            for (var _i = 0, _a = this._data; _i < _a.length; _i++) {
                bio = _a[_i];
                var miniBio = this._createBio(bio);
                this._elems.content.appendChild(miniBio);
            }
        };
        /**...........................................................................
         * _afterDraw
         * ...........................................................................
         * Handle adjusting the height after the elements have actually been rendered
         * ...........................................................................
         */
        BioSubsection.prototype._afterDraw = function () {
            var maxHeight = 0;
            var bio;
            var bioCollection = this._elems.content.childNodes;
            // loop through the bio elements we need
            for (var idx = 0; idx < bioCollection.length; idx += 1) {
                var miniBio = bioCollection[idx];
                if (miniBio.offsetHeight > maxHeight) {
                    maxHeight = miniBio.offsetHeight;
                }
            }
            // adjust the height of the bios to at least be as large as the largest among them
            console.log("maxHeight: " + maxHeight);
            KIP.setProperty(".bio", "min-height", maxHeight + "px", true);
        };
        /**...........................................................................
         * _createBio (protected)
         * ...........................................................................
         * create a bio for a member of the show
         *
         * @param   bio     The bio to create HTML elements for
         *
         * @returns HTML Element containing the elements needed for the bio
         * ...........................................................................
        */
        BioSubsection.prototype._createBio = function (bio) {
            var bioWrapper = this._createBioContent(bio); // content + name
            var imageWrapper = this._createBioImage(bio); // image
            var bioElem = KIP.createSimpleElement(this._id + "|bio", "bio", "", null, [imageWrapper, bioWrapper]); // overall element
            return bioElem;
        };
        /**...........................................................................
         * _createBioNames (protected)
         * ...........................................................................
         * create just the name elements of the bio
         *
         * @param   bio     The bio to create names for
         *
         * @returns The name elements for the bio
         * ...........................................................................
         */
        BioSubsection.prototype._createBioNames = function (bio) {
            var actorNameElem = KIP.createSimpleElement(this._id + "|actor", "actor");
            var linkText;
            if (bio.website) {
                linkText = KIP.createElement({
                    type: "a",
                    attr: {
                        href: bio.website
                    },
                    content: bio.actorName,
                    cls: "link"
                });
            }
            else {
                linkText = KIP.createElement({
                    cls: "nolink",
                    content: bio.actorName
                });
            }
            actorNameElem.appendChild(linkText);
            var roleNameElem = KIP.createSimpleElement(this._id + "|role", "role", bio.roleName);
            var namesWrapper = KIP.createSimpleElement(this._id + "|names", "names", "", null, [actorNameElem, roleNameElem]);
            return namesWrapper;
        };
        /**...........................................................................
         * _createBioContent (protected)
         * ...........................................................................
         *  Create the content of the bio
         *
         * @param   bio     The bio to create content for
         *
         * @returns The content elements for the bio
         * ...........................................................................
         */
        BioSubsection.prototype._createBioContent = function (bio) {
            var namesWrapper = this._createBioNames(bio);
            var bioText = KIP.createSimpleElement(this._id + "|bioText", "bioText", bio.bio);
            var bioWrapper = KIP.createSimpleElement(this._id + "|bioData", "bioData", "", null, [namesWrapper, bioText]);
            return bioWrapper;
        };
        /**...........................................................................
         * _createBioImage (protected)
         * ...........................................................................
         * create the image associated with the bio
         *
         * @param   bio     The bio to create an image for
         *
         * @returns The created image element for the bio
         * ...........................................................................
         */
        BioSubsection.prototype._createBioImage = function (bio) {
            var imageWrapper = KIP.createSimpleElement(this._id + "|bioImage", "bioImage");
            var imageElem = KIP.createElement({
                type: "img",
                attr: {
                    src: bio.imageURL
                },
                parent: imageWrapper
            });
            return imageWrapper;
        };
        BioSubsection._uncoloredStyles = {
            ".bio": {
                display: "flex",
                width: "calc(50% - 10px)",
                boxSizing: "border-box",
                marginBottom: "20px",
                marginRight: "10px",
                minHeight: "0px"
            },
            ".mobile .bio": {
                width: "calc(100% - 10px)",
                paddingLeft: "100px"
            },
            ".mobile.bios .subsectionContent": {
                borderLeft: "none"
            },
            ".bio .bioImage": {
                borderRadius: "100px",
                width: "100px",
                minWidth: "100px",
                height: "100px",
                minHeight: "100px",
                overflow: "hidden",
                marginRight: "20px",
                backgroundColor: "#FFF"
            },
            ".bio .bioImage > img": {
                width: "100%",
                height: "auto"
            },
            ".bio .bioData .names": {
                display: "flex",
                fontSize: "1.4em",
                alignItems: "baseline"
            },
            ".mobile .bio .bioData .names": {
                flexWrap: "wrap"
            },
            ".bio .bioData .names .actor": {
                fontFamily: "OpenSans",
                marginRight: "20px"
            },
            ".mobile .bio .bioData .names .actor": {},
            ".bio .bioData .names .actor a": {
                margin: "0",
                padding: "0",
                display: "inline-block"
            },
            ".bio .bioData .names .actor .link:after": {
                backgroundImage: "url('http://icons.veryicon.com/ico/System/iOS7%20Minimal/Debug%20External%20link.ico')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "18px 18px",
                content: "''",
                width: "18px",
                height: "18px",
                marginLeft: "6px",
                display: "inline-block",
                opacity: "0.5"
            },
            ".bio .bioData .names:hover .actor:after": {
                opacity: "1"
            },
            ".bio .bioData .names .role": {
                fontFamily: "OpenSansLight",
                fontStyle: "italic"
            },
            ".mobile .bio .bioData .names .role": {
                fontSize: "0.8em"
            },
            ".bio .bioData .bioText": {
                fontSize: "0.9em"
            },
            ".bio a": {
                color: "#333",
                fontSize: "0.9em",
                padding: "0",
                margin: "0",
                marginTop: "10px",
                display: "block"
            }
        };
        return BioSubsection;
    }(BST.SubSection));
    BST.BioSubsection = BioSubsection;
})(BST || (BST = {}));
var BST;
(function (BST) {
    /**...........................................................................
     * @class SynopsisSection
     * ...........................................................................
     * Synopsis section for a particular show
     * @version 1.0
     * ...........................................................................
     */
    var SynopsisSection = /** @class */ (function (_super) {
        __extends(SynopsisSection, _super);
        function SynopsisSection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SynopsisSection.prototype._setData = function (data) {
            _super.prototype._setData.call(this, data);
            // update the css
            this._elems.base.style.marginTop = window.innerHeight + "px";
        };
        /**...........................................................................
         * _createSectionElements
         * ...........................................................................
         * create all elements needed by the synopsis section
         * ...........................................................................
         */
        SynopsisSection.prototype._createSectionElements = function () {
            var synopsisContent = this._createSynopsisContent();
            this._elems.content.appendChild(synopsisContent);
        };
        /**...........................................................................
         * _createSynopsisSection
         * ...........................................................................
         * create the synopsis section
         * @returns
         * ...........................................................................
         */
        SynopsisSection.prototype._createSynopsisContent = function () {
            var hasSynopsis = (!!this._data.showDetails.synopsis);
            // create the two columns of info
            var mainContent = KIP.createSimpleElement("", "synopsisContainer");
            var synopsisContent = KIP.createElement({ cls: "synopsis", content: this._data.showDetails.synopsis || "(Coming soon)", parent: mainContent });
            if (this._data.trailer) {
                var trailerURL = KIP.createElement({
                    cls: "trailer",
                    content: "<div class='videoIcn'></div><a target='_blank' href='" + this._data.trailer.link + "'>Trailer</a>",
                    parent: mainContent
                });
            }
            var sidebar = this._createSynopsisSidebar(hasSynopsis);
            // return the wrapping element that contains both of the columns
            var base = KIP.createSimpleElement("", "overview", "", null, [mainContent, sidebar]);
            return base;
        };
        SynopsisSection.prototype._createQuickStats = function () {
            var run = BST.Helpers.getShowStartAndEndDates(this._data);
            var children = [];
            // add the name of the writer
            if (this._data.showTitle.writer) {
                children.push(this._createSidebarElement("Author", this._data.showTitle.writer));
            }
            // add the name of the director
            if (this._data.showTitle.director) {
                children.push(this._createSidebarElement("Director", this._data.showTitle.director));
            }
            // add the run stats
            if (run.start && run.end) {
                children.push(this._createSidebarElement("Run Dates", KIP.Dates.shortDate(run.start) + " - " + KIP.Dates.shortDate(run.end)));
            }
            var quickElems = KIP.createElement({
                cls: "showStatsAlt",
                children: children
            });
            return quickElems;
        };
        SynopsisSection.prototype._createOtherStats = function (hasSynopsis) {
            var details = this._data.showDetails;
            var children = [];
            var showLength = KIP.Dates.getDisplayDuration({ minutes: details.showLength });
            // only show show details if we have a synopsis
            if (hasSynopsis) {
                children = [
                    this._createSidebarElement("Show Length:", showLength),
                    this._createSidebarElement("Has Intermission? ", details.hasIntermission ? "Yes" : "No"),
                    this._createSidebarElement("Family Friendly?", details.isKidFriendly ? "Yes" : "No"),
                    this._createSidebarElement("Warnings: ", details.warnings)
                ];
            }
            var wrapper = KIP.createElement({
                cls: "otherShowStats",
                children: children
            });
            return wrapper;
        };
        /**...........................................................................
         * _createSynopsisSidebar
         * ...........................................................................
         * create the sidebar of quick facts about a show
         * @returns
         * ...........................................................................
         */
        SynopsisSection.prototype._createSynopsisSidebar = function (hasSynopsis) {
            var quickElems = this._createQuickStats();
            var otherStats = this._createOtherStats(hasSynopsis);
            var sidebar = KIP.createSimpleElement("", "sidebar", "", null, [quickElems, otherStats]);
            return sidebar;
        };
        /**...........................................................................
         * _createSidebarElement
         * ...........................................................................
         * sidebar element for the synopsis section
         * @param  lbl
         * @param  content
         * @returns
         * ...........................................................................
         */
        SynopsisSection.prototype._createSidebarElement = function (lbl, content) {
            if (!content) {
                return KIP.createElement({ cls: "sidebarElem" });
            }
            var sidebarLbl = KIP.createSimpleElement("", "lbl", lbl);
            var sidebarData = KIP.createSimpleElement("", "data", content);
            var sidebarElem = KIP.createSimpleElement("", "sidebarElem", "", null, [sidebarLbl, sidebarData]);
            return sidebarElem;
        };
        SynopsisSection.prototype._onResize = function () {
            _super.prototype._onResize.call(this);
            var marginTop;
            if (this._data && this._data.photos.length > 0) {
                marginTop = window.innerHeight;
            }
            else if (this._isMobile) {
                marginTop = 215;
            }
            else {
                marginTop = 100;
            }
            this._elems.base.style.marginTop = (marginTop + "px");
        };
        SynopsisSection._uncoloredStyles = {
            ".synopsis.section:not(.mobile)": {
                paddingLeft: "25%",
                paddingRight: "20%"
            },
            ".synopsis.section": {},
            ".synopsis.section .overview": {
                display: "flex",
                width: "100%"
            },
            ".synopsis.section.mobile .overview": {
                flexWrap: "wrap"
            },
            ".synopsis.section:not(.mobile) .overview .synopsisContainer": {
                width: "60%",
                display: "flex",
                flexDirection: "column",
                nested: {
                    ".trailer": {
                        paddingTop: "20px",
                        display: "flex",
                        alignItems: "center",
                        nested: {
                            "a": {
                                color: "#333",
                                fontSize: "1.3em",
                                margin: "0",
                                textTransform: "uppercase",
                                fontFamily: "OpenSansBold"
                            },
                            ".videoIcn": {
                                background: "transparent url('res/vid.png')",
                                backgroundRepeat: "no-repeat",
                                width: "25px",
                                height: "25px",
                                flexShrink: "0",
                                paddingRight: "10px"
                            }
                        }
                    }
                }
            },
            ".synopsis.section .overview .sidebar": {
                width: "35%",
                marginLeft: " 5%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start"
            },
            ".synopsis.section.mobile .overview .sidebar": {
                width: "100%",
                flexDirection: "row",
                flexWrap: "wrap"
            },
            ".synopsis.section .sidebar .sidebarElem": {
                display: "flex",
                flexWrap: "wrap",
                fontSize: "0.9em",
                marginBottom: "6px",
                alignItems: "center",
                paddingTop: "1vh",
                paddingBottom: "1vh"
            },
            ".synopsis.section .sidebar .sidebarElem .lbl": {
                marginRight: "4px",
                fontFamily: "OpenSansBold",
                fontSize: "0.8em"
            },
            ".synopsis.section .showStatsAlt, .synopsis.section .otherShowStats": {
                display: "flex",
                flexDirection: "column"
            },
            ".synopsis.section:not(.mobile) .showStatsAlt": {
                display: "none"
            },
            ".synopsis.section.mobile": {
                nested: {
                    ".showStatsAlt": { width: "50%" },
                    ".otherShowStats": { width: "50%" }
                }
            }
        };
        return SynopsisSection;
    }(BST.SectionView));
    BST.SynopsisSection = SynopsisSection;
})(BST || (BST = {}));
var BST;
(function (BST) {
    var VIMEO_FMT = "<iframe src='{0}?autoplay=0&loop=1&autopause=1' width='100%' frameborder='0' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";
    var YOUTUBE_FMT = "<iframe id='ytplayer' type='text/html' width='100%' src='{0}?autoplay=0&origin=http://bstonline.org' frameborder='0'></iframe>";
    var YOUTUBE_SAMPLE = "https://www.youtube.com/watch?v=dilZpMFsohE";
    var VIMEO_SAMPLE = "https://vimeo.com/65107797";
    var TrailerView = /** @class */ (function (_super) {
        __extends(TrailerView, _super);
        function TrailerView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(TrailerView.prototype, "data", {
            set: function (trailerInfo) {
                this._data = trailerInfo;
                this._pauseListeners = [];
                this._playListeners = [];
                this._createElements();
            },
            enumerable: true,
            configurable: true
        });
        TrailerView.prototype._createElements = function () {
            var _this = this;
            if (!this._data) {
                return;
            }
            this._elems = {};
            this._elems.base = KIP.createElement({ cls: "trailer" });
            this._elems.videoHost = KIP.createElement({ cls: "videoContainer", parent: this._elems.base });
            this._elems.iframe = KIP.createElement({
                type: "iframe",
                cls: "video",
                attr: {
                    frameborder: "0",
                    width: "100%",
                    allowfullscreen: "0"
                }
            });
            var innerIFrame;
            switch (this._data.type) {
                case BST.TrailerType.YOUTUBE:
                    innerIFrame = KIP.format(YOUTUBE_FMT, this._data.link);
                    break;
                case BST.TrailerType.VIMEO:
                    innerIFrame = KIP.format(VIMEO_FMT, this._data.link);
                    break;
                case BST.TrailerType.OTHER:
                    break;
            }
            this._elems.videoHost.innerHTML = innerIFrame;
            this._elems.iframe = this._elems.videoHost.children[0];
            this._elems.videoHost.addEventListener("click", function () {
                var listeners;
                if (_this._isPaused) {
                    _this._isPaused = false;
                    listeners = _this._playListeners;
                }
                else {
                    _this._isPaused = true;
                    listeners = _this._pauseListeners;
                }
                for (var _i = 0, listeners_1 = listeners; _i < listeners_1.length; _i++) {
                    var listener = listeners_1[_i];
                    if (!listener) {
                        continue;
                    }
                    listener();
                }
            });
        };
        TrailerView.prototype.addPlayListener = function (listener) {
            this._playListeners.push(listener);
        };
        TrailerView.prototype.addPauseListeners = function (listener) {
            this._pauseListeners.push(listener);
        };
        TrailerView._uncoloredStyles = {
            ".trailer": {
                nested: {
                    ".videoContainer": {
                        nested: {
                            "iframe": {}
                        }
                    }
                }
            }
        };
        return TrailerView;
    }(BST.View));
    BST.TrailerView = TrailerView;
})(BST || (BST = {}));
var BST;
(function (BST) {
    /** how quickly we should scroll between photos */
    var SCROLL_SPEED = 5000;
    /** handle transitioning */
    var TRANSITION_SPEED = 1000;
    /** the opacity to use when an image isn't centered */
    var UNCENTERED_OPACITY = "0.2";
    /**...........................................................................
     * @class PhotoLoopView
     * ...........................................................................
     * Allow show photos to loop through
     * @version 1.0
     * @author  Kip Price
     * ...........................................................................
     */
    var PhotoLoopView = /** @class */ (function (_super) {
        __extends(PhotoLoopView, _super);
        /**...........................................................................
         * Create the element that can scroll through show photos
         * @param   show
         * ...........................................................................
         */
        function PhotoLoopView(show) {
            var _this = _super.call(this) || this;
            _this._data = show;
            _this._center = null;
            _this._createElements();
            return _this;
        }
        /**...........................................................................
         * _createPhotos
         * ...........................................................................
         * Create the photo elements we will be scrolling through
         * ...........................................................................
         */
        PhotoLoopView.prototype._createElements = function () {
            var _this = this;
            // grab the appropriate view
            this._elems.base = KIP.createSimpleElement(this._data.showTitle.id + "|showPhotos", "showPhotos");
            // quit if there is not enough data
            if (!this._data) {
                return;
            }
            if ((this._data.photos.length === 0) && (!this._data.trailer)) {
                return;
            }
            // if we have a trailer, create a trailer photo
            if (this._data.trailer) {
                this._createTrailer(this._data.trailer, true);
            }
            // loop through all photos and create the elements
            var photo;
            for (var i = 0; i < this._data.photos.length; i += 1) {
                photo = this._data.photos[i];
                this._createPhoto(photo, ((i === 1) && (!this._data.trailer)));
            }
            if (this._data.photos.length > 1) {
                // if we only have two photos, do some duplication so it still scrolls nicely
                if (this._data.photos.length < 4) {
                    for (var _i = 0, _a = this._data.photos; _i < _a.length; _i++) {
                        photo = _a[_i];
                        this._createPhoto(photo);
                    }
                }
                if (this._data.photos.length < 3) {
                    for (var _b = 0, _c = this._data.photos; _b < _c.length; _b++) {
                        photo = _c[_b];
                        this._createPhoto(photo);
                    }
                }
            }
            // finish the loop
            this._finalizeLoop();
            // actually center the appropriate photo
            window.setTimeout(function () { _this._tryInitialize(); }, 10);
        };
        PhotoLoopView.prototype._tryInitialize = function () {
            var _this = this;
            if (this._center.displayElem.offsetHeight <= 1) {
                window.setTimeout(function () { _this._tryInitialize(); }, 10);
                return;
            }
            else {
                window.setTimeout(function () {
                    _this._center.center();
                    window.setTimeout(function () { _this._rotate(); }, SCROLL_SPEED);
                    BST.slowScroll(_this.base);
                }, 200);
            }
        };
        /**...........................................................................
         * _createPhoto
         * ...........................................................................
         * create an individual photo for the show
         * ...........................................................................
         */
        PhotoLoopView.prototype._createPhoto = function (photo, shouldBeCenter) {
            // create element
            var photoElem = new Image();
            photoElem.src = photo.url;
            KIP.createElement({
                type: "img",
                attr: {
                    "src": photo.url,
                },
                cls: "showPhoto"
            });
            var wrapper = KIP.createSimpleElement("", "showPhotoWrapper", "", null, [photoElem]);
            wrapper.style.left = window.innerWidth + "px";
            // create the linked piece of the photo & add it
            var linkedPhoto = new LinkedPhoto(wrapper);
            this._insertNode(linkedPhoto);
            // add the element to the view
            this.base.appendChild(wrapper);
        };
        PhotoLoopView.prototype._createTrailer = function (trailerData, shouldBeCenter) {
            var linkedTrailer = new LinkedTrailer(trailerData);
            this._insertNode(linkedTrailer);
            this.base.appendChild(linkedTrailer.trailerView.base);
        };
        /**...........................................................................
         * _insertNode
         * ...........................................................................
         * add a node into the list
         * @param   node    The node to add
         * ...........................................................................
         */
        PhotoLoopView.prototype._insertNode = function (node) {
            var curNode = this._center;
            // set the center if it is unset
            if (curNode === null) {
                this._center = node;
                return;
            }
            while (curNode.next !== null) {
                curNode = curNode.next;
            }
            // Hook up the two elements
            curNode.next = node;
            node.previous = curNode;
        };
        /**...........................................................................
         * _finalizeLoop
         * ...........................................................................
         *  link the first and last nodes together
         * ...........................................................................
         */
        PhotoLoopView.prototype._finalizeLoop = function () {
            if (this._looped) {
                return;
            }
            if (!this._center) {
                return;
            }
            var firstNode = this._center;
            if (!firstNode) {
                return;
            }
            while (firstNode.previous !== null) {
                firstNode = firstNode.previous;
            }
            var lastNode = this._center;
            while (lastNode.next !== null) {
                lastNode = lastNode.next;
            }
            if (firstNode === lastNode) {
                return;
            }
            firstNode.previous = lastNode;
            lastNode.next = firstNode;
            this._looped = true;
        };
        /**...........................................................................
         * _rotate
         * ...........................................................................
         * Rotate to the next photo
         * ...........................................................................
         */
        PhotoLoopView.prototype._rotate = function () {
            var _this = this;
            if (!this._center.next) {
                return;
            }
            if (!this._center.isPlaying) {
                return;
            }
            this._center = this._center.next;
            this._center.center();
            window.setTimeout(function () {
                _this._rotate();
            }, SCROLL_SPEED);
        };
        /** styles to use for the photo element */
        PhotoLoopView._uncoloredStyles = {
            ".showPhotos": {
                display: "flex",
                justifyContent: "space-around",
                position: "fixed",
                left: "0",
                top: "85px",
                width: "100%",
                zIndex: "-1",
                overflow: "hidden",
                height: "calc(100% - 85px)"
            },
            ".showPhotos.mobile": {
                top: "200px",
                height: "calc(100% - 200px)"
            },
            ".showPhotos > div > img": {
                height: "100%",
                width: "auto"
            },
            ".showPhotoWrapper": {
                height: "100%",
                position: "absolute",
                transition: "1s ease-in-out all",
                display: "flex",
                justifyContent: "center",
                opacity: "0.2"
            },
            ".showPhotoWrapper.center": {
                opacity: "1",
                boxShadow: "1px 1px 15px 7px rgba(0,0,0,.3)"
            }
        };
        return PhotoLoopView;
    }(BST.View));
    BST.PhotoLoopView = PhotoLoopView;
    /**...........................................................................
     * @class LinkedPhoto
     * ...........................................................................
     * Keep track of a photo that displays in the scrolling display
     * @version 1.0
     * @author  Kip Price
     * ...........................................................................
     */
    var LinkedPhoto = /** @class */ (function () {
        //#endregion
        /**...........................................................................
         * Create the linked photo object
         * @param   photo   The photo to display for this node
         * ...........................................................................
         */
        function LinkedPhoto(photo) {
            this._id = LinkedPhoto._count;
            LinkedPhoto._count += 1;
            this._displayElem = photo;
            this._next = null;
            this._previous = null;
            this._shiftedCount = 0;
        }
        Object.defineProperty(LinkedPhoto.prototype, "displayElem", {
            get: function () { return this._displayElem; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LinkedPhoto.prototype, "next", {
            get: function () { return this._next; },
            set: function (next) { this._next = next; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LinkedPhoto.prototype, "previous", {
            get: function () { return this._previous; },
            set: function (previous) { this._previous = previous; },
            enumerable: true,
            configurable: true
        });
        //#region MOTION CONTROLS
        /**...........................................................................
         * center
         * ...........................................................................
         * Recenter the photo while additionally adjusting which photo is in the middle
         * ...........................................................................
         */
        LinkedPhoto.prototype.center = function () {
            var left = ((window.innerWidth - this._displayElem.offsetWidth) / 2);
            // first set my position
            this._displayElem.style.left = left + "px";
            this._displayElem.style.opacity = "1";
            KIP.addClass(this._displayElem, "center");
            this._shiftedCount += 1;
            // adjust my partners
            if (this._previous) {
                this._previous.moveLeft();
            }
            if (this._next) {
                this._next.moveLeft(true);
            }
        };
        /**...........................................................................
         * moveLeft
         * ...........................................................................
         * Move this photo to the left
         * @param   lookToPrevious  If true, figure out how far our previous node is
         *                          before moving
         * ...........................................................................
         */
        LinkedPhoto.prototype.moveLeft = function (lookToPrevious) {
            var _this = this;
            this._shiftedCount += 1;
            var left;
            // determine whether our left value should be based on our next or previous node
            if (lookToPrevious) {
                if (!this._previous) {
                    return;
                }
                left = parseInt(this._previous.displayElem.style.left) + this._previous.displayElem.offsetWidth;
            }
            else {
                if (!this.next) {
                    return;
                }
                left = parseInt(this._next.displayElem.style.left) - this._displayElem.offsetWidth;
            }
            // move this particular element
            this._displayElem.style.left = left + "px";
            this._displayElem.style.opacity = UNCENTERED_OPACITY;
            KIP.removeClass(this._displayElem, "center");
            // if we are completely offscreen, we should adjust it to the other side
            if (left + this._displayElem.offsetWidth <= 0) {
                this.moveRight();
            }
            // if we are the right hand side, adjust our next element
            if (left > (window.innerWidth / 2)) {
                //console.log("next: " + this.next._id + " (" + this.next._shiftedCount + " < " + this._shiftedCount + ")");
                window.setTimeout(function () { if (_this.next._shiftedCount < _this._shiftedCount) {
                    _this.next.moveLeft(true);
                } }, 0);
                // if we are the left hand side, adjust our previous element
            }
            else if (left < (window.innerWidth / 2)) {
                //console.log("previous: "  + this.previous._id + " (" + this.previous._shiftedCount + " < " + this._shiftedCount + ")");
                window.setTimeout(function () { if (_this.previous._shiftedCount < _this._shiftedCount) {
                    _this.previous.moveLeft();
                } }, 0);
            }
        };
        /**...........................................................................
         * moveRight
         * ...........................................................................
         * Move this node to the right
         * ...........................................................................
         */
        LinkedPhoto.prototype.moveRight = function () {
            var _this = this;
            if (!this._previous) {
                return;
            }
            // hide the element for the transition
            window.setTimeout(function () {
                _this._displayElem.style.opacity = "0";
                // move and unhide the element
                window.setTimeout(function () {
                    // actually move the element
                    var position = parseInt(_this._previous.displayElem.style.left) + _this._previous.displayElem.offsetWidth;
                    _this._displayElem.style.left = position + "px";
                    window.setTimeout(function () {
                        _this._displayElem.style.opacity = UNCENTERED_OPACITY;
                    }, TRANSITION_SPEED);
                }, TRANSITION_SPEED);
            }, TRANSITION_SPEED);
        };
        //#region PROPERTIES
        LinkedPhoto._count = 0;
        return LinkedPhoto;
    }());
    BST.LinkedPhoto = LinkedPhoto;
    /**
     * @class   LinkedTrailer
     *
     * Create the linked photo display of a trailer
     * @version 1.0.0
     * @author  Kip Price
     */
    var LinkedTrailer = /** @class */ (function (_super) {
        __extends(LinkedTrailer, _super);
        function LinkedTrailer(trailerInfo) {
            var _this = this;
            var trailerView = new BST.TrailerView();
            trailerView.data = trailerInfo;
            _this = _super.call(this, trailerView.base) || this;
            _this._trailerView = trailerView;
            _this._trailerView.addPauseListeners(function () {
                _this._isPlaying = false;
            });
            _this._trailerView.addPlayListener(function () {
                _this._isPlaying = true;
            });
            return _this;
        }
        Object.defineProperty(LinkedTrailer.prototype, "trailerView", {
            get: function () { return this._trailerView; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LinkedTrailer.prototype, "isPlaying", {
            get: function () { return this._isPlaying; },
            enumerable: true,
            configurable: true
        });
        return LinkedTrailer;
    }(LinkedPhoto));
    BST.LinkedTrailer = LinkedTrailer;
})(BST || (BST = {}));
var BST;
(function (BST) {
    var ScrollableShowPhotos = /** @class */ (function (_super) {
        __extends(ScrollableShowPhotos, _super);
        function ScrollableShowPhotos(data) {
            var _this = _super.call(this) || this;
            _this._data = data;
            _this._createElements();
            return _this;
        }
        ScrollableShowPhotos.prototype._shouldSkipCreateElements = function () { return true; };
        ScrollableShowPhotos.prototype._createElements = function () {
            this._elems.base = KIP.createElement({
                cls: "scrollablePhotoBase"
            });
            var layer = KIP.createElement({
                cls: "scrollablePhotos",
                parent: this._elems.base
            });
            // loop through each of the photos
            var photo;
            var cnt = 0;
            for (var _i = 0, _a = this._data; _i < _a.length; _i++) {
                photo = _a[_i];
                cnt += 1;
                var photoElem = this._createPhoto(photo, cnt);
                layer.appendChild(photoElem);
            }
            BST.slowScroll(this._elems.base);
        };
        ScrollableShowPhotos.prototype._createPhoto = function (photo, cnt) {
            var photoWrapper = KIP.createElement({
                cls: "photoWrapper",
            });
            var photoElem = KIP.createElement({
                type: "img",
                attr: {
                    src: photo.url
                },
                parent: photoWrapper
            });
            var credits = KIP.createElement({
                content: photo.photographer,
                cls: "photoCreds",
                parent: photoWrapper
            });
            return photoWrapper;
        };
        ScrollableShowPhotos._uncoloredStyles = {
            ".scrollablePhotoBase": {
                position: "fixed",
                zIndex: "-1"
            }
        };
        return ScrollableShowPhotos;
    }(BST.View));
    BST.ScrollableShowPhotos = ScrollableShowPhotos;
})(BST || (BST = {}));
var BST;
(function (BST) {
    var AuditionsSection = /** @class */ (function (_super) {
        __extends(AuditionsSection, _super);
        function AuditionsSection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AuditionsSection.prototype._createSectionElements = function () { };
        return AuditionsSection;
    }(BST.SectionView));
    BST.AuditionsSection = AuditionsSection;
})(BST || (BST = {}));
var BST;
(function (BST) {
    var CODE = '<DIV ID="bpt_eventbody"><CENTER><BR><BR>Brown Paper Tickets Ticket Widget Loading...<BR><BR>' +
        '<A HREF="https://www.brownpapertickets.com/event/{{EVENT_ID}}">Click Here</A> to visit the Brown Paper' +
        ' Tickets event page.</CENTER><BR><BR></DIV>';
    var SimpleTicketSection = /** @class */ (function (_super) {
        __extends(SimpleTicketSection, _super);
        function SimpleTicketSection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SimpleTicketSection.prototype._shouldSkipCreateElements = function () { return true; };
        SimpleTicketSection.prototype._createSectionElements = function () {
            var htmlString = CODE.replace(/\{\{EVENT_ID\}\}/g, this._data);
            var stylesheet = KIP.createElement({
                type: "link",
                attr: {
                    rel: "stylesheet",
                    type: "text/css",
                    href: "https://www.brownpapertickets.com/widget_v651.css"
                }
            });
            var scriptTag = KIP.createElement({
                type: "script",
                attr: {
                    src: "https://www.brownpapertickets.com/eventwidget.js?event=" + this._data + "&nodescription=1",
                    type: "text/javascript",
                    language: "javascript"
                }
            });
            var otherScriptTag = KIP.createElement({
                type: "script",
                attr: {
                    src: "https://www.brownpapertickets.com/widget_v651.js?event=" + this._data,
                    type: "text/javascript",
                    language: "javascript"
                }
            });
            var elem = KIP.createElement({
                cls: "bptHolder",
                before_content: htmlString,
                children: [stylesheet, scriptTag],
                parent: this._elems.content
            });
        };
        SimpleTicketSection._uncoloredStyles = {};
        return SimpleTicketSection;
    }(BST.SectionView));
    BST.SimpleTicketSection = SimpleTicketSection;
})(BST || (BST = {}));
var BST;
(function (BST) {
    /**...........................................................................
     * @class ShowView
     *
     * @version 1.0
     * ...........................................................................
     */
    var ShowView = /** @class */ (function (_super) {
        __extends(ShowView, _super);
        /**...........................................................................
         * Create the view particular for a show
         * @param show
         * ...........................................................................
         */
        function ShowView(show) {
            var _this = _super.call(this) || this;
            _this._data = show;
            _this._createElements();
            return _this;
        }
        /** ...........................................................................
         * _createElements
         * ...........................................................................
         * create all of the elements needed for a show page
         * ...........................................................................
         */
        ShowView.prototype._createElements = function () {
            if (!this._data) {
                return;
            }
            // BUILD NAVBARS AND PHOTO DISPLAY
            //let header: HeaderView = this._createShowHeader();
            // BUILD SHOW SECTIONS
            var synopsisSection = this._createSynopsisSection();
            var bioSection = this._createBioSection();
            var buzzSection = this._createBuzzSection();
            //let ticketSection: TicketSection = this._createTicketSection();
            var ticketSection = this._createSimpleTicketSection();
            // BUILD THE PHOTOS
            var photos = this._createPhotos();
            //let photos: ScrollableShowPhotos = this._createScrollablePhotos();
            var children = [];
            //children.push(header.base);
            children.push(photos.base);
            children.push(synopsisSection.base);
            if (this._data.shouldShowBioSection()) {
                children.push(bioSection.base);
            }
            if (this._data.shouldShowBuzzSection()) {
                children.push(buzzSection.base);
            }
            if (this._data.shouldShowTicketSection()) {
                children.push(ticketSection.base);
            }
            // CREATE THE SHOW PAGE
            this._elems.base = KIP.createSimpleElement(this._data.showTitle.id + "|show", "show", "", null, children);
            //setupPhotoScrolling (photos.photos, [subNavBar.base, synopsisSection.base, bioSection.base, reviewSection.base, ticketSection.base]);
            //     let sections: HTMLElement[] = [];
            //    // sections = sections.concat(photos.photos);
            //     sections.splice(1,0,synopsisSection.view);
            //     sections.splice(3,0,bioSection.view);
            //     sections.splice(5,0,buzzSection.view);
            //     sections.splice(7,0,ticketSection.view)
            //     sectionScroll(sections);
        };
        ShowView.prototype._createPhotos = function () {
            var photos = new BST.PhotoLoopView(this._data);
            return photos;
        };
        ShowView.prototype._createScrollablePhotos = function () {
            var photos = new BST.ScrollableShowPhotos(this._data.photos);
            return photos;
        };
        // private _createShowHeader(): HeaderView {
        //     let header: HeaderView = new HeaderView(this._data);
        //     return header;
        // }
        ShowView.prototype._createSynopsisSection = function () {
            var synopsisSection = new BST.SynopsisSection(this._data.showTitle.id + "|synopsis", "SYNOPSIS", "synopsis");
            synopsisSection.data = this._data;
            return synopsisSection;
        };
        ShowView.prototype._createBioSection = function () {
            var bioSection = new BST.BioSection(this._data.showTitle.id + "|bios", "BIOS", "bios");
            bioSection.data = this._data.bios;
            return bioSection;
        };
        ShowView.prototype._createBuzzSection = function () {
            var buzzSection = new BST.BuzzSection(this._data.showTitle.id + "|buzz", "BUZZ", "buzz");
            buzzSection.data = this._data.reviews;
            return buzzSection;
        };
        ShowView.prototype._createTicketSection = function () {
            var section = new BST.TicketSection(this._data.showTitle.id + "|tix", "GET TICKETS", "tix");
            section.data = this._data;
            return section;
        };
        ShowView.prototype._createSimpleTicketSection = function () {
            var section = new BST.SimpleTicketSection(this._data.showTitle.id + "|tix", "GET TICKETS", "tix");
            section.data = this._data.showTitle.bptLink;
            return section;
        };
        ShowView._uncoloredStyles = {};
        return ShowView;
    }(BST.View));
    BST.ShowView = ShowView;
})(BST || (BST = {}));
//# sourceMappingURL=bst.js.map
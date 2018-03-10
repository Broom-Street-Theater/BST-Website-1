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
    var DateSelector = (function (_super) {
        __extends(DateSelector, _super);
        function DateSelector() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(DateSelector.prototype, "_defaultValue", {
            /** figure out what the default value should be */
            get: function () {
                var dt;
                if (DateSelector._lastDate) {
                    dt = new Date(DateSelector._lastDate);
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
    var seasons;
    function loadAdminSeasons() {
        BST.loadSeasons(function (data) {
            seasons = data;
        });
    }
    ;
    function loadShowData(showID, form) {
        BST.loadShow(showID, function (show) {
            form.clear();
            form.update(show);
        });
    }
    function turnDatesToShowID(dates) {
        var minDate;
        dates.sort();
        minDate = dates[0];
        return minDate.getFullYear().toString();
    }
    function turnNameToShowID(name) {
        var safeStr = name.replace(/[^a-zA-Z0-9]/g, "");
        return safeStr;
    }
    function adminInitialize() {
        loadAdminSeasons();
        var showForm = new KIP.Forms.Form("showForm", {
            colors: ["#EA0", "#555"],
            label: "Show Details"
        }, {
            showTitle: new KIP.Forms.SectionElement("showTitle", { label: "High-level show details" }, {
                id: new KIP.Forms.HiddenElement("id", {
                    onOtherChange: function (key, val, ctx) {
                        //console.log("Event: " + key + "    val: " + val.toString());
                        if ((key !== "title") && (key !== "runDates")) {
                            return;
                        }
                        var str;
                        // Grab the appropriate sub string to change
                        if (key === "title") {
                            str = turnNameToShowID(val);
                            this._data = str + "_" + KIP.piece(this._data || "", "_", 1);
                        }
                        else {
                            str = turnDatesToShowID(val);
                            this._data = KIP.piece(this._data || "", "_", 0) + "_" + str;
                        }
                        ctx.data = this._data;
                        console.log("show ID: " + this._data);
                        console.log("ctx equals this? " + (ctx === this));
                    }
                }),
                title: new KIP.Forms.TextElement("title", { label: "Title of the show" }),
                writer: new KIP.Forms.TextElement("writer", { label: "Writer of the show" }),
                director: new KIP.Forms.TextElement("director", { label: "Director of the show" }),
                bptLink: new KIP.Forms.HiddenElement("link")
            }),
            showDetails: new KIP.Forms.SectionElement("showDetails", { label: "Deeper show details" }, {
                synopsis: new KIP.Forms.TextAreaElement("synopsis", { label: "Show synopsis" }),
                warnings: new KIP.Forms.TextElement("warnings", { label: "What warnings should be displayed for the show?" }),
                showLength: new KIP.Forms.NumberElement("showLength", { label: "Length of show" }),
                hasIntermission: new KIP.Forms.CheckElement("hasIntermission", { label: "Does the show have an intermission?" }),
                isKidFriendly: new KIP.Forms.CheckElement("isKidFriendly", { label: "Is the show kid friendly?" })
            }),
            runDates: new KIP.Forms.ArrayElement("runDates", { label: "Dates", newLabel: "+ New Date" }, new DateSelector("showdate", { label: "Run date" })),
            bios: new KIP.Forms.ArrayElement("bios", { label: "Actor Bios", newLabel: "+ New Bio" }, {
                imageURL: new KIP.Forms.PhotoPathElement("imageURL", {
                    label: "Photo of actor",
                    onChange: function (files) {
                        var _this = this;
                        var filePath = "../Real/img/actors/tmp/" + files[0].name;
                        BST.saveTmpActorPhoto(files[0], function (success) {
                            if (success !== "1") {
                                return;
                            }
                            _this.update(filePath);
                        });
                        return filePath;
                    },
                    onSave: function (files) {
                        // do the saving code here
                        return;
                    }
                }),
                actorName: new KIP.Forms.TextElement("actorName", { label: "Actor Name" }),
                roleName: new KIP.Forms.TextElement("roleName", { label: "Role Name" }),
                bio: new KIP.Forms.TextAreaElement("bio", { label: "Bio" }),
                website: new KIP.Forms.TextElement("website", { label: "Actor's website" })
            }),
            reviews: new KIP.Forms.ArrayElement("reviews", { label: "Reviews", newLabel: "+ New Review" }, {
                reviewer: new KIP.Forms.TextElement("reviewer", { label: "Reviewer" }),
                date: new KIP.Forms.DateElement("reviewDate", { label: "Date of review" }),
                link: new KIP.Forms.TextElement("link", { label: "Link to review" }),
                review: new KIP.Forms.TextAreaElement("review", { label: "Review Text" })
            }),
            photos: new KIP.Forms.ArrayElement("photos", { label: "Photos", newLabel: "+ New Photo" }, {
                url: new KIP.Forms.PhotoPathElement("photoURL", {
                    label: "URL",
                    onChange: function (files) {
                        var _this = this;
                        var filePath = "../Real/img/shows/tmp/" + files[0].name;
                        BST.saveTmpShowPhoto(files[0], function (success) {
                            if (success !== "1") {
                                return;
                            }
                            _this.update(filePath);
                        });
                        return filePath;
                    },
                    onSave: function (files) {
                        // TODO: finish
                        return;
                    }
                }),
                photographer: new KIP.Forms.TextElement("photographer", { label: "Photographer / Artist" }),
                copyrightText: new KIP.Forms.TextElement("copyright", { label: "Copyright info" }),
                isPoster: new KIP.Forms.CheckElement("isPoster", { label: "Is this a poster for the show?" }),
                isHilite: new KIP.Forms.CheckElement("isHilite", { label: "Is this the photo that should show for the show on the homepage?" })
            }),
            auditions: new KIP.Forms.SectionElement("auditions", { label: "Audition Info" }, {
                dates: new KIP.Forms.ArrayElement("auditionDates", { label: "Audition Dates" }, {
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
                            { label: "Male", value: BST.IGenderEnum.MALE }
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
        showForm.registerListener(function (data) {
            adminSaveShow(data);
        });
        // show the form
        showForm.show();
        var showSelector = document.getElementById("showSelector");
        showSelector.addEventListener("change", function () {
            loadShowData(showSelector.value, showForm);
        });
    }
    BST.adminInitialize = adminInitialize;
    function adminSaveShow(show) {
        var run = BST.getShowStartAndEndDates(show);
        // save the show
        BST.saveShow(show, function (data) {
            console.log("from php: " + data);
            var miniShow = {
                endDate: KIP.Dates.shortDate(run.end),
                id: show.showTitle.id,
                name: show.showTitle.title
            };
            addShowToSeason(miniShow, run.start.getFullYear().toString());
            //console.log(seasons);
            BST.saveSeasons(seasons, function (savedSeasons) {
            });
        });
    }
    BST.adminSaveShow = adminSaveShow;
    function addShowToSeason(showDeets, year) {
        var shows = seasons[year];
        if (!shows) {
            shows = seasons[year] = [];
        }
        var idx = 0;
        for (idx; idx < shows.length; idx += 1) {
            var elem = shows[idx];
            if ((elem.id === showDeets.id) || (elem.name === showDeets.name)) {
                seasons[year][idx] = showDeets;
                return true;
            }
        }
        ;
        seasons[year].push(showDeets);
        return true;
    }
})(BST || (BST = {}));
///<reference path="../../../../toolkip.ts/typescript/compiled_js/kip.d.ts" />
var BST;
(function (BST) {
    var TRANSITION_SPEED = 1000;
    BST.DEBUG = true;
    var NavigationType;
    (function (NavigationType) {
        NavigationType[NavigationType["HOME"] = 0] = "HOME";
        NavigationType[NavigationType["SHOW"] = 1] = "SHOW";
    })(NavigationType = BST.NavigationType || (BST.NavigationType = {}));
    function initiate() {
        if (window.location.href.indexOf("admin") === -1) {
            //navigate("dumpflo", NavigationType.SHOW);
            navigate("home", NavigationType.HOME);
        }
        else {
            BST.adminInitialize();
        }
        BST.testBptAPI();
    }
    function navigate(navigateTo, navigateType) {
        // the idea here is that we would swap out the content of the page
        // dynamically
        if (navigateType === NavigationType.SHOW) {
            navigateToShow(navigateTo);
        }
        else if (navigateType === NavigationType.HOME) {
            navigateHome();
        }
    }
    BST.navigate = navigate;
    function navigateToShow(navigateTo) {
        var hState = {
            url: "./?showID=" + navigateTo,
            type: NavigationType.SHOW,
            title: navigateTo,
            showID: navigateTo
        };
        pushHistoryState(hState);
        var onLoaded = function (show) {
            displayShow(show);
        };
        BST.loadShow(navigateTo, onLoaded);
    }
    function pushHistoryState(history) {
        window.history.pushState(history, history.title, history.url);
    }
    function displayShow(show) {
        var showPage = new BST.ShowView(show);
        var elem = showPage.view;
        var home = document.getElementById("homeElements");
        if (home) {
            window.setTimeout(function () {
                KIP.addClass(home, "offscreen");
            }, TRANSITION_SPEED);
        }
        var host = document.getElementById("mainShow");
        host.innerHTML = "";
        host.appendChild(elem);
        KIP.addClass(host, "moving");
        KIP.removeClass(host, "offscreen");
        window.setTimeout(function () {
            KIP.removeClass(host, "moving");
        }, TRANSITION_SPEED);
    }
    function navigateHome() {
        var hState = {
            url: "./",
            type: NavigationType.HOME,
            title: "home",
            showID: ""
        };
        pushHistoryState(hState);
        var onLoaded = function (home) {
            displayHome(home);
        };
        BST.loadHome(onLoaded);
    }
    function displayHome(home) {
        var homeView = new BST.HomeView(home);
        var elem = homeView.view;
        var show = document.getElementById("mainShow");
        if (show) {
            KIP.addClass(show, "offscreen");
        }
        var host = document.getElementById("homeElements");
        host.innerHTML = "";
        host.appendChild(elem);
        KIP.removeClass(host, "offscreen");
    }
    function enableTicketButtons() {
        var elem = document.getElementById("ticketBtns");
        KIP.addClass(elem, "enabled");
    }
    BST.enableTicketButtons = enableTicketButtons;
    function disableTicketButtons() {
        var elem = document.getElementById("ticketBtns");
        KIP.removeClass(elem, "enabled");
    }
    BST.disableTicketButtons = disableTicketButtons;
    function keyNameToDisplayName(keyName) {
        var chrs = keyName.split("");
        var outStr = "";
        for (var idx = 0; idx < chrs.length; idx += 1) {
            var chr = chrs[idx];
            // Add a space before new words
            if (chr === chr.toUpperCase()) {
                outStr += " ";
            }
            // if this is the first character, capitalize it
            if (idx === 0) {
                chr = chr.toUpperCase();
            }
            if (chr !== "_") {
                outStr += chr;
            }
        }
        return outStr;
    }
    BST.keyNameToDisplayName = keyNameToDisplayName;
    function handleState() {
        var state = window.history.state;
        if (!state) {
            return;
        }
        navigate(state.showID, state.type);
    }
    window.addEventListener("load", function () { initiate(); });
    window.addEventListener("popstate", function () {
        handleState();
    });
})(BST || (BST = {}));
var BST;
(function (BST) {
    ;
    ;
    var IGenderEnum;
    (function (IGenderEnum) {
        IGenderEnum[IGenderEnum["NO_PREFERENCE"] = 0] = "NO_PREFERENCE";
        IGenderEnum[IGenderEnum["FEMALE"] = 1] = "FEMALE";
        IGenderEnum[IGenderEnum["MALE"] = 2] = "MALE";
    })(IGenderEnum = BST.IGenderEnum || (BST.IGenderEnum = {}));
    var AuditionExpectationType;
    (function (AuditionExpectationType) {
        AuditionExpectationType[AuditionExpectationType["MONOLOGUE"] = 1] = "MONOLOGUE";
        AuditionExpectationType[AuditionExpectationType["COLD_READ"] = 2] = "COLD_READ";
        AuditionExpectationType[AuditionExpectationType["DANCE_CALL"] = 3] = "DANCE_CALL";
        AuditionExpectationType[AuditionExpectationType["SINGING"] = 4] = "SINGING";
        AuditionExpectationType[AuditionExpectationType["IMPROV"] = 5] = "IMPROV";
    })(AuditionExpectationType = BST.AuditionExpectationType || (BST.AuditionExpectationType = {}));
    var MenuTypeEnum;
    (function (MenuTypeEnum) {
        MenuTypeEnum[MenuTypeEnum["SECTION"] = 1] = "SECTION";
        MenuTypeEnum[MenuTypeEnum["EXTERNAL"] = 2] = "EXTERNAL";
    })(MenuTypeEnum = BST.MenuTypeEnum || (BST.MenuTypeEnum = {}));
    ;
})(BST || (BST = {}));
var BST;
(function (BST) {
    var scrollDistance = 0;
    var SLOW_SCROLL = -0.4; // Slow scroll is half the pace of the rest
    var FAST_SCROLL = -1.5;
    var OFFSET_TOP = 150;
    var TRANSPARENCY_SCALE = .01;
    var TRANSFORM_SCALE = .001;
    function scrollTo(elemID) {
        var elem = document.getElementById(elemID);
        if (!elem) {
            return;
        }
        KIP.Helpers.scrollTo(elem, true);
    }
    BST.scrollTo = scrollTo;
    /** let an element scroll slower than the rest of the page */
    function slowScroll(elem) {
        var origPt = {
            x: 0,
            y: parseInt(elem.style.top) || elem.offsetTop
        };
        window.addEventListener("scroll", function (e) {
            onSlowScroll(e, elem, origPt);
        });
    }
    BST.slowScroll = slowScroll;
    /** allow an element to scroll slower than the rest - assigns negative values */
    function slowReverseScroll(elem) {
        var origPt = {
            x: 0,
            y: parseInt(elem.style.top) || elem.offsetTop
        };
        window.addEventListener("scroll", function (e) {
            onSlowScroll(e, elem, origPt, true);
        });
    }
    BST.slowReverseScroll = slowReverseScroll;
    /** handles the slow scrolling */
    function onSlowScroll(e, elem, originalPosition, reverse) {
        var scrollPosition = KIP.getScrollPosition();
        var deltaDistance = scrollPosition.y;
        var tmp = deltaDistance * (reverse ? -1 * SLOW_SCROLL : SLOW_SCROLL);
        elem.style.top = (originalPosition.y + tmp) + "px";
    }
    /** scroll an element faster than the rest of the screen */
    function fastScroll(elem) {
        window.addEventListener("scroll", function (e) {
            onFastScroll(e, elem);
        });
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
})(BST || (BST = {}));
var BST;
(function (BST) {
    /** load data for a particular show */
    function loadShow(showID, onLoaded, onError) {
        var path = getPath();
        // TODO : set a real URL for this request
        KIP.ajaxRequest(KIP.AjaxTypeEnum.POST, path, function (data) {
            var show;
            if (data) {
                // try to parse the show
                try {
                    show = JSON.parse(data);
                }
                catch (e) {
                    console.log("Err: JSON couldn't be parsed");
                    console.log(data);
                    if (onError) {
                        onError(data);
                    }
                    return;
                }
                // map the appropriate dates
                var i = void 0;
                if (!show.runDates) {
                    show.runDates = [];
                }
                for (i = 0; i < show.runDates.length; i += 1) {
                    show.runDates[i] = new Date(show.runDates[i]);
                }
                // handle review dates
                if (!show.reviews) {
                    show.reviews = [];
                }
                for (i = 0; i < show.reviews.length; i += 1) {
                    if (!show.reviews[i]) {
                        continue;
                    }
                    show.reviews[i].date = new Date(show.reviews[i].date);
                }
                // handle audition dates
                if (show.auditions && show.auditions.dates) {
                    for (i = 0; i < show.auditions.dates.length; i += 1) {
                        var auditionDate = show.auditions.dates[i];
                        auditionDate.start = new Date(auditionDate.start);
                        auditionDate.end = new Date(auditionDate.end);
                        show.auditions.dates[i] = auditionDate;
                    }
                }
            }
            // actually run the logic to load the show
            onLoaded(show);
        }, function (data) { }, { type: "loadShow", showID: showID });
    }
    BST.loadShow = loadShow;
    /** load the data for the home page */
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
            // actually run the logic to load the show
            onLoaded(home);
        }, function (data) { }, { type: "loadHome" });
    }
    BST.loadHome = loadHome;
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
    BST.loadSeasons = loadSeasons;
    function saveSeasons(data, onLoaded) {
        var path = getPath();
        KIP.ajaxRequest(KIP.AjaxTypeEnum.POST, path, function (data) {
            var seasons;
            try {
                seasons = JSON.parse(data);
            }
            catch (e) {
                console.warn("saveSeasons - JSON couldn't be parsed: " + data);
                return;
            }
        }, function () { }, { type: "saveSeasons", seasons: JSON.stringify(data) });
    }
    BST.saveSeasons = saveSeasons;
    /** helper to grab the path the the right file */
    function getPath() {
        var path;
        if (BST.DEBUG) {
            path = "../php/bst.php";
        }
        else {
            path = "../../../php/bst/bst.php";
        }
        return path;
    }
    function testBptAPI() {
        KIP.ajaxRequest(KIP.AjaxTypeEnum.GET, "https://www.brownpapertickets.com/api2/datesales?id=ZW4qCFW4AQ&account=bstvoicemail&event_id=3002810", function (data) { console.log("success!"); }, function () { console.log("failure!"); }, {});
    }
    BST.testBptAPI = testBptAPI;
    function saveShow(showData, onComplete) {
        var data = convertDatesToStrings(showData);
        // handle photos moving
        var photosToMove = [];
        var path = getPath();
        KIP.ajaxRequest(KIP.AjaxTypeEnum.POST, path, function (data) {
            if (onComplete) {
                onComplete(data);
            }
        }, function () { }, { type: "showEdited", showID: data.showTitle.id, showData: JSON.stringify(data) });
    }
    BST.saveShow = saveShow;
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
    function saveTmpActorPhoto(file, successCb) {
        var form = new FormData();
        form.append("actorPicture", file, file.name);
        form.append("type", "saveTmpActorPhoto");
        var path = getPath();
        KIP.ajaxRequest(KIP.AjaxTypeEnum.POST, path, function (data) {
            if (successCb) {
                successCb(data);
            }
        }, function () { }, form);
    }
    BST.saveTmpActorPhoto = saveTmpActorPhoto;
    function saveTmpShowPhoto(file, successCb) {
        var form = new FormData();
        form.append("showPicture", file, file.name);
        form.append("type", "saveTmpShowPhoto");
        var path = getPath();
        KIP.ajaxRequest(KIP.AjaxTypeEnum.POST, path, function (data) {
            if (successCb) {
                successCb(data);
            }
        }, function () { }, form);
    }
    BST.saveTmpShowPhoto = saveTmpShowPhoto;
})(BST || (BST = {}));
var BST;
(function (BST) {
    function getShowStartAndEndDates(show) {
        var dates = show.runDates;
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
        return out;
    }
    BST.getShowStartAndEndDates = getShowStartAndEndDates;
})(BST || (BST = {}));
var BST;
(function (BST) {
    /** shared class for handling all view types */
    var View = (function () {
        function View() {
        }
        Object.defineProperty(View.prototype, "view", {
            get: function () { return this._view; },
            enumerable: true,
            configurable: true
        });
        return View;
    }());
    BST.View = View;
})(BST || (BST = {}));
var BST;
(function (BST) {
    var SectionView = (function (_super) {
        __extends(SectionView, _super);
        /** create a section */
        function SectionView(id, title, addlClass) {
            var _this = _super.call(this) || this;
            _this._id = id;
            _this._title = title;
            _this._class = addlClass;
            _this._createSectionElements();
            return _this;
        }
        Object.defineProperty(SectionView.prototype, "data", {
            set: function (data) {
                this._data = data;
                this._createElements();
            },
            enumerable: true,
            configurable: true
        });
        /** handle the creation of the base section elements */
        SectionView.prototype._createSectionElements = function () {
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
            this._view = elem;
            this._elements = {
                base: elem,
                title: titleElem,
                content: contentElem
            };
        };
        return SectionView;
    }(BST.View));
    BST.SectionView = SectionView;
})(BST || (BST = {}));
var BST;
(function (BST) {
    var ErrorPopupView = (function (_super) {
        __extends(ErrorPopupView, _super);
        function ErrorPopupView(details) {
            var _this = _super.call(this) || this;
            _this._details = details;
            _this._createElements();
            return _this;
        }
        Object.defineProperty(ErrorPopupView.prototype, "details", {
            set: function (deets) {
                this._details = deets;
                this._detailsElem.innerHTML = deets;
            },
            enumerable: true,
            configurable: true
        });
        ErrorPopupView.prototype._createElements = function () {
            var overlay = this._createOverlay();
            var form = this._createForm();
            this._view = KIP.createSimpleElement("", "error", "", null, [overlay, form]);
        };
        ErrorPopupView.prototype._createOverlay = function () {
            var _this = this;
            var overlay = KIP.createSimpleElement("", "overlay");
            overlay.addEventListener("click", function () {
                _this._closeAlert();
            });
            return overlay;
        };
        ErrorPopupView.prototype._createForm = function () {
            var _this = this;
            var title = KIP.createSimpleElement("", "errTitle", "Uh-oh...that wasn't supposed to happen");
            var details = KIP.createSimpleElement("", "errDetails", this._details);
            var btn = KIP.createSimpleElement("", "btn okay", "OK");
            btn.addEventListener("click", function () {
                _this._closeAlert();
            });
            var btns = KIP.createSimpleElement("", "btns", "", null, [btn]);
            var form = KIP.createSimpleElement("", "errPopup", "", null, [title, details, btns]);
            return form;
        };
        ErrorPopupView.prototype._closeAlert = function () {
            if (!this._view.parentNode) {
                return;
            }
            this._view.parentNode.removeChild(this._view);
        };
        return ErrorPopupView;
    }(BST.View));
    BST.ErrorPopupView = ErrorPopupView;
})(BST || (BST = {}));
var BST;
(function (BST) {
    var SubSection = (function (_super) {
        __extends(SubSection, _super);
        function SubSection(data, name) {
            var _this = _super.call(this) || this;
            _this._data = data;
            _this._name = name;
            _this._createContent();
            _this._createSharedElements();
            return _this;
        }
        Object.defineProperty(SubSection.prototype, "tab", {
            get: function () { return this._tab; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubSection.prototype, "content", {
            get: function () { return this._content; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubSection.prototype, "index", {
            get: function () { return this._index; },
            set: function (idx) { this._index = idx; },
            enumerable: true,
            configurable: true
        });
        SubSection.prototype._createSharedElements = function () {
            this._tab = KIP.createSimpleElement("", "tab", this._name);
            this._view = KIP.createSimpleElement("", "subsectionView hidden", "", null, [this._content]);
        };
        /** show a particular section */
        SubSection.prototype.select = function () {
            KIP.removeClass(this._view, "hidden");
            KIP.addClass(this._tab, "selected");
        };
        /** hide a particular subsection */
        SubSection.prototype.deselect = function () {
            KIP.addClass(this._view, "hidden");
            KIP.removeClass(this._tab, "selected");
        };
        return SubSection;
    }(BST.View));
    BST.SubSection = SubSection;
})(BST || (BST = {}));
var BST;
(function (BST) {
    var SubSections = (function (_super) {
        __extends(SubSections, _super);
        function SubSections() {
            var _this = _super.call(this) || this;
            _this._subsections = [];
            _this._currentSelection = null;
            _this._createElements();
            return _this;
        }
        SubSections.prototype._createElements = function () {
            this._tabs = KIP.createSimpleElement("", "tabContainer");
            this._contentPane = KIP.createSimpleElement("", "subsectionContent");
            this._view = KIP.createSimpleElement("", "subsectionContainer", "", null, [this._tabs, this._contentPane]);
        };
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
        /** add a subsection to our collection */
        SubSections.prototype.addSubSection = function (subsection) {
            var _this = this;
            subsection.index = this._subsections.length;
            this._subsections.push(subsection);
            subsection.tab.addEventListener("click", function () {
                _this.selectTab(subsection.index);
            });
            // if this is the first subsection, select it
            if (this._subsections.length === 1) {
                this.selectTab(0);
            }
            // add to our view
            this._contentPane.appendChild(subsection.view);
            this._tabs.appendChild(subsection.tab);
        };
        /** selects the appropriate tab */
        SubSections.prototype.selectTab = function (index) {
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
        return SubSections;
    }(BST.View));
    BST.SubSections = SubSections;
})(BST || (BST = {}));
var BST;
(function (BST) {
    var AboutSubsectionType;
    (function (AboutSubsectionType) {
        AboutSubsectionType[AboutSubsectionType["GENERAL"] = 1] = "GENERAL";
        AboutSubsectionType[AboutSubsectionType["HISTORY"] = 2] = "HISTORY";
        AboutSubsectionType[AboutSubsectionType["BOARD"] = 3] = "BOARD";
        AboutSubsectionType[AboutSubsectionType["BYLAWS"] = 4] = "BYLAWS";
    })(AboutSubsectionType || (AboutSubsectionType = {}));
    ;
    /** handles the about section of the BST homepage */
    var AboutSectionView = (function (_super) {
        __extends(AboutSectionView, _super);
        function AboutSectionView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AboutSectionView.prototype._createElements = function () {
            this._sectionContent = new BST.SubSections();
            var mission = new MissionSubsection(this._data.general, "MISSION");
            var history = new HistorySubsection(this._data.history, "HISTORY");
            var boardStaff = new BoardStaffSubsection(this._data, "BOARD + STAFF");
            var bylaws = new BylawsSubsection(this._data.bylaws, "BYLAWS + POLICIES");
            this._sectionContent.addSubSections(mission, history, boardStaff, bylaws);
            this._elements.content.appendChild(this._sectionContent.view);
        };
        return AboutSectionView;
    }(BST.SectionView));
    BST.AboutSectionView = AboutSectionView;
    /** sub class for the mission subsection */
    var MissionSubsection = (function (_super) {
        __extends(MissionSubsection, _super);
        function MissionSubsection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MissionSubsection.prototype._createContent = function () {
            this._content = KIP.createSimpleElement("", "general aboutSection", this._data);
        };
        return MissionSubsection;
    }(BST.SubSection));
    /** sub class for the display of board and staff members */
    var BoardStaffSubsection = (function (_super) {
        __extends(BoardStaffSubsection, _super);
        function BoardStaffSubsection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BoardStaffSubsection.prototype._createContent = function () {
            var board = this._createBoardSection();
            var staff = this._createStaffSection();
            this._content = KIP.createSimpleElement("", "staffBoard aboutSection hidden", "", null, [staff, board]);
        };
        BoardStaffSubsection.prototype._createBoardSection = function () {
            return this._createLeadersSection("BROOM STREET BOARD", this._data.board, "board");
        };
        BoardStaffSubsection.prototype._createStaffSection = function () {
            return this._createLeadersSection("BROOM STREET STAFF", this._data.staff, "staff");
        };
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
        /** create a line for a leader */
        BoardStaffSubsection.prototype._createLeaderElem = function (member) {
            var leaderLbl = KIP.createSimpleElement("", "leader lbl", member.position);
            var leaderName = KIP.createSimpleElement("", "leader name", member.name);
            var leaderElem = KIP.createSimpleElement("", "leader", "", null, [leaderLbl, leaderName]);
            return leaderElem;
        };
        return BoardStaffSubsection;
    }(BST.SubSection));
    /** subclass for displaying the history of the theater */
    var HistorySubsection = (function (_super) {
        __extends(HistorySubsection, _super);
        function HistorySubsection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HistorySubsection.prototype._createContent = function () {
            this._content = KIP.createSimpleElement("", "history aboutSection hidden", this._data);
        };
        return HistorySubsection;
    }(BST.SubSection));
    /** subclass for displaying bylaws & policies */
    var BylawsSubsection = (function (_super) {
        __extends(BylawsSubsection, _super);
        function BylawsSubsection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BylawsSubsection.prototype._createContent = function () {
            var lbl = KIP.createSimpleElement("", "bylaws lbl", "View current bylaws");
            var link = KIP.createElement({
                type: "a",
                cls: "bylaws link",
                content: "here",
                attr: {
                    href: this._data
                }
            });
            this._content = KIP.createSimpleElement("", "bylaws aboutSection hidden", "", null, [lbl, link]);
        };
        return BylawsSubsection;
    }(BST.SubSection));
})(BST || (BST = {}));
var BST;
(function (BST) {
    var GetInvolvedSection = (function (_super) {
        __extends(GetInvolvedSection, _super);
        function GetInvolvedSection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /** create elements specific to the get involved section */
        GetInvolvedSection.prototype._createElements = function () {
            // loop through each of the "get involved" types
            var key;
            for (key in this._data) {
                if (this._data.hasOwnProperty(key)) {
                    // Create the element for this type & add to our content
                    var getInvolvedType = this._createGetInvolvedType(key, this._data[key]);
                    this._elements.content.appendChild(getInvolvedType);
                }
            }
        };
        /** determine what type of involvement we are displaying */
        GetInvolvedSection.prototype._createGetInvolvedType = function (title, involvedDetails) {
            var wrapper = KIP.createSimpleElement("", "involvedRole");
            var titleElem = KIP.createSimpleElement("", "involvedTitle", BST.keyNameToDisplayName(title), null, null, wrapper);
            var idx = 0;
            for (idx; idx < involvedDetails.length; idx += 1) {
                var involvedItem = this._createGetInvolvedItem(involvedDetails[idx]);
                wrapper.appendChild(involvedItem);
            }
            return wrapper;
        };
        /** create an individual way to get involved */
        GetInvolvedSection.prototype._createGetInvolvedItem = function (involvedItem) {
            var involvedIcon = KIP.createElement({
                type: 'img',
                attr: {
                    src: involvedItem.icon
                },
                cls: "icn"
            });
            var involvedText = KIP.createSimpleElement("", "involved", involvedItem.text);
            var elem = KIP.createSimpleElement("", "involvementWrapper", "", null, [involvedIcon, involvedText]);
            return elem;
        };
        return GetInvolvedSection;
    }(BST.SectionView));
    BST.GetInvolvedSection = GetInvolvedSection;
})(BST || (BST = {}));
var BST;
(function (BST) {
    var NewsSection = (function (_super) {
        __extends(NewsSection, _super);
        function NewsSection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NewsSection.prototype._createElements = function () {
            // loop through our news & use it to create the individual items
            var newsItem;
            for (var _i = 0, _a = this._data; _i < _a.length; _i++) {
                newsItem = _a[_i];
                var newsElem = this._createNewsItem(newsItem);
                this._elements.content.appendChild(newsElem);
            }
        };
        /** create an individual news item */
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
        return NewsSection;
    }(BST.SectionView));
    BST.NewsSection = NewsSection;
})(BST || (BST = {}));
var BST;
(function (BST) {
    var HomeView = (function (_super) {
        __extends(HomeView, _super);
        function HomeView(data) {
            var _this = _super.call(this) || this;
            _this._data = data;
            _this._view = _this._createMainPage();
            return _this;
        }
        ;
        HomeView.prototype._createMainPage = function () {
            // TOP SECTION: CURRENT SHOW AND OLD SHOWS
            // TODO: fill the top section
            var menu = new BST.MainMenu(this._data);
            //let currentShow: CurrentShowView = new CurrentShowView("dumpflo"); // TODO: make real
            var seasonsView = new BST.SeasonsSidelineView();
            // SECTIONS
            var newsSection = this._createNewsSection();
            var involvedSection = this._createGetInvolvedSection();
            var aboutSection = this._createAboutSection();
            // CREATE THE PAGE
            var page = KIP.createSimpleElement("home", "home", "", null, [
                menu.view,
                seasonsView.view,
                newsSection.view,
                involvedSection.view,
                aboutSection.view
            ]);
            return page;
        };
        /** create the section about BST */
        HomeView.prototype._createAboutSection = function () {
            var section = new BST.AboutSectionView("about", "ABOUT BROOM STREET", "about");
            section.data = this._data.about;
            return section;
        };
        /** create the section of ways people can get involved */
        HomeView.prototype._createGetInvolvedSection = function () {
            var section = new BST.GetInvolvedSection("getInvolved", "GET INVOLVED", "getInvolved");
            section.data = this._data.getInvolved;
            return section;
        };
        /** create the section containing news items */
        HomeView.prototype._createNewsSection = function () {
            var section = new BST.NewsSection("news", "NEWS", "news");
            section.data = this._data.news;
            return section;
        };
        return HomeView;
    }(BST.View));
    BST.HomeView = HomeView;
})(BST || (BST = {}));
var BST;
(function (BST) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        /** create the main menu for BST */
        function MainMenu(home) {
            var _this = _super.call(this) || this;
            _this._createMenuItems(home);
            return _this;
        }
        MainMenu.prototype._createMenuItems = function (home) {
            // make all of the indivdual menu items
            var menuItems = KIP.createSimpleElement("", "menuItems");
            var item;
            for (var _i = 0, _a = home.menuItems; _i < _a.length; _i++) {
                item = _a[_i];
                var menuItemElem = this._createMenuItem(item);
                menuItems.appendChild(menuItemElem);
            }
            // make the bst name and logo
            var menuHeader = this._createNameAndLogo(home.logoURL);
            // Set our view to be the menu as a whole
            var menu = KIP.createSimpleElement("", "mainMenu", "", null, [menuHeader, menuItems]);
            var menuWrapper = KIP.createSimpleElement("", "mainMenuWrapper", "", null, [menu]);
            this._view = menuWrapper;
        };
        /** create the BST name and logo */
        MainMenu.prototype._createNameAndLogo = function (logoURL) {
            var nameElem = KIP.createSimpleElement("", "bstName", "Broom Street Theater");
            var logoElem = KIP.createElement({
                cls: "bstLogo",
                type: "img",
                attr: {
                    "src": logoURL
                }
            });
            var wrapper = KIP.createSimpleElement("", "menuName", "", null, [nameElem, logoElem]);
            return wrapper;
        };
        /** create an item in the menu */
        MainMenu.prototype._createMenuItem = function (menuItem) {
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
            if (menuItem.type === BST.MenuTypeEnum.SECTION) {
                linkElem.addEventListener("click", function () {
                    BST.scrollTo(menuItem.link);
                });
            }
            // Create the containing element
            var itemElem = KIP.createSimpleElement("", "menuItem", "", null, [linkElem]);
            return itemElem;
        };
        return MainMenu;
    }(BST.View));
    BST.MainMenu = MainMenu;
})(BST || (BST = {}));
var BST;
(function (BST) {
    var CurrentShowView = (function (_super) {
        __extends(CurrentShowView, _super);
        function CurrentShowView(showID) {
            var _this = _super.call(this) || this;
            _this._createView();
            if (showID) {
                _this._loadShowData(showID);
            }
            return _this;
        }
        Object.defineProperty(CurrentShowView.prototype, "showID", {
            set: function (showID) {
                this._loadShowData(showID);
            },
            enumerable: true,
            configurable: true
        });
        CurrentShowView.prototype._createView = function () {
            this._view = KIP.createSimpleElement("", "currentShow");
        };
        CurrentShowView.prototype._loadShowData = function (showID) {
            var _this = this;
            BST.loadShow(showID, function (data) {
                _this._createShowUI(data);
            }, function (data) {
                _this._onError();
            });
        };
        CurrentShowView.prototype._onError = function () {
            this._view.innerHTML = ""; // TODO: make a ?? screen
            // err form
            var errForm = new BST.ErrorPopupView("The details about this show couldn't be found");
            document.body.appendChild(errForm.view);
        };
        CurrentShowView.prototype._createShowUI = function (show) {
            this._view.innerHTML = "";
            var photoView = this._createShowPhoto(show);
            var info = this._createShowDetails(show);
            this._view.appendChild(photoView);
            this._view.appendChild(info);
        };
        ;
        CurrentShowView.prototype._createShowPhoto = function (show) {
            // find the appropriate URL
            var photoURL = this._getPhotoURL(show);
            // create the 
            var photoView = KIP.createElement({
                type: "img",
                attr: {
                    "src": photoURL
                }
            });
            return photoView;
        };
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
        CurrentShowView.prototype._createShowDetails = function (show) {
            var showTitle = KIP.createSimpleElement("", "infoTitle", show.showTitle.title);
            var run = BST.getShowStartAndEndDates(show);
            var showDates = KIP.createSimpleElement("", "dates", KIP.Dates.shortDate(run.start) + " - " + KIP.Dates.shortDate(run.end));
            var showAuthor = this._createWriterAndDirectorDetails(show.showTitle);
            var buttons = this._createButtons(show);
            var infoBox = KIP.createSimpleElement("", "currentShowDetails", "", null, [showTitle, showDates, showAuthor, buttons]);
            return infoBox;
        };
        CurrentShowView.prototype._createWriterAndDirectorDetails = function (showTitle) {
            var writerDirectorBox = KIP.createSimpleElement("", "writerDirector");
            if (showTitle.writer !== showTitle.director) {
                var writer = KIP.createSimpleElement("", "writer", "Written by: " + showTitle.writer, null, null, writerDirectorBox);
                var director = KIP.createSimpleElement("", "director", "Directed by: " + showTitle.director, null, null, writerDirectorBox);
            }
            else {
                writerDirectorBox.innerHTML = "Written and Directed by: " + showTitle.writer;
            }
            return writerDirectorBox;
        };
        CurrentShowView.prototype._createButtons = function (show) {
            var buttons = KIP.createSimpleElement("", "buttons");
            var detailsBtn = KIP.createSimpleElement("", "btn details", "DETAILS", null, null, buttons);
            detailsBtn.addEventListener("click", function () {
                BST.navigate(show.showTitle.id, BST.NavigationType.SHOW);
            });
            var today = KIP.Dates.getToday();
            var run = BST.getShowStartAndEndDates(show);
            if (today <= run.end) {
                var tixBtn = KIP.createSimpleElement("", "btn tix", "GET TICKETS", null, null, buttons);
                tixBtn.addEventListener("click", function () {
                    BST.navigate(show.showTitle.id, BST.NavigationType.SHOW);
                });
            }
            return buttons;
        };
        /** show an error if there is no show data to load */
        CurrentShowView.prototype._createErrorMessage = function () {
            var errorTitle = KIP.createSimpleElement("", "errTitle", "Uh-oh...something happened");
            var errorDetails = KIP.createSimpleElement("", "errDetails", "Looks like we haven't yet added details about this show.");
            var errorMsg = KIP.createSimpleElement("", "error", "", null, [errorTitle, errorDetails]);
            return errorMsg;
        };
        return CurrentShowView;
    }(BST.View));
    BST.CurrentShowView = CurrentShowView;
})(BST || (BST = {}));
var BST;
(function (BST) {
    var SeasonsSidelineView = (function (_super) {
        __extends(SeasonsSidelineView, _super);
        function SeasonsSidelineView() {
            var _this = _super.call(this) || this;
            _this._currentShowView = new BST.CurrentShowView();
            _this._createView();
            _this._loadSeasons();
            return _this;
        }
        SeasonsSidelineView.prototype._createView = function () {
            this._view = KIP.createSimpleElement("", "seasons", "", null, [this._currentShowView.view]);
            this._view.style.top = "0";
            this._view.style.left = "0";
            BST.slowScroll(this._view);
            KIP.setProperty(".seasons + div", "margin-top", window.innerHeight + "px");
        };
        SeasonsSidelineView.prototype._createElements = function () {
            this._elements = {
                sidelineElem: KIP.createSimpleElement("", "sideline"),
                yearsElem: this._createYears(),
                showsElem: this._createShows()
            };
            this._elements.sidelineElem.appendChild(this._elements.showsElem);
            this._elements.sidelineElem.appendChild(this._elements.yearsElem);
            this._view.appendChild(this._elements.sidelineElem);
        };
        /** create the container of all appropriate years */
        SeasonsSidelineView.prototype._createYears = function () {
            var _this = this;
            var yearsElem = KIP.createSimpleElement("", "years");
            var moreElem = KIP.createSimpleElement("", "yearLabel more", "MORE", null, null, yearsElem);
            // loop through all of the years and create em'
            var year;
            var today = new Date();
            var thisYear = today.getFullYear();
            var yearElem;
            for (year = thisYear - 9; year <= thisYear; year += 1) {
                yearElem = this._createYear(year);
                yearsElem.appendChild(yearElem);
            }
            // select the last year we created, since that's going to be our current season
            window.setTimeout(function () {
                _this._selectYear(yearElem, thisYear);
            }, 0);
            return yearsElem;
        };
        /** create a particular year */
        SeasonsSidelineView.prototype._createYear = function (year) {
            var _this = this;
            var yearElem = KIP.createSimpleElement("", "yearLabel", year.toString());
            yearElem.addEventListener("click", function () {
                _this._selectYear(yearElem, year);
            });
            return yearElem;
        };
        SeasonsSidelineView.prototype._createShows = function () {
            var showsElem = KIP.createSimpleElement("", "shows");
            // initially just create the wrapper
            return showsElem;
        };
        SeasonsSidelineView.prototype._createShow = function (miniShow) {
            var _this = this;
            var date = new Date(miniShow.endDate);
            var showElem = KIP.createSimpleElement("", "show", KIP.Dates.getMonthName(date, true));
            showElem.addEventListener("click", function () {
                _this._selectShow(showElem, miniShow.id);
            });
            return showElem;
        };
        SeasonsSidelineView.prototype._loadSeasons = function () {
            var _this = this;
            BST.loadSeasons(function (seasons) {
                _this._seasons = seasons;
                _this._createElements();
            });
        };
        SeasonsSidelineView.prototype._loadSeason = function (year) {
            // grab the season from our collection
            var shows = this._seasons[year.toString()];
            if (!shows) {
                return;
            }
            // grab the element to contain the shows & quit if it doesn't exist
            if (!this._elements.showsElem) {
                return;
            }
            this._elements.showsElem.innerHTML = "";
            var today = KIP.Dates.getToday();
            // loop through all the shows
            var miniShow;
            var showElem;
            var foundCurrent = false;
            for (var _i = 0, shows_1 = shows; _i < shows_1.length; _i++) {
                miniShow = shows_1[_i];
                var showID = miniShow.id;
                // create the element
                showElem = this._createShow(miniShow);
                var realDate = new Date(miniShow.endDate);
                this._elements.showsElem.appendChild(showElem);
                // figure out if this one should be selected
                if (!foundCurrent && (realDate > today)) {
                    this._selectCurShowAfterTimeout(showElem, miniShow.id);
                    foundCurrent = true;
                }
            }
        };
        SeasonsSidelineView.prototype._selectCurShowAfterTimeout = function (showElem, showID) {
            var _this = this;
            window.setTimeout(function () {
                _this._selectShow(showElem, showID);
            });
        };
        SeasonsSidelineView.prototype._loadShow = function (showID) {
            this._currentShowView.showID = showID;
        };
        SeasonsSidelineView.prototype._selectYear = function (elem, year) {
            if (!this._selectElem(elem, this._selectedYear)) {
                return;
            }
            ;
            this._selectedYear = elem;
            this._loadSeason(year); // Load data for the new year
        };
        SeasonsSidelineView.prototype._selectShow = function (elem, showID) {
            if (!this._selectElem(elem, this._selectedShow)) {
                return;
            }
            this._selectedShow = elem;
            this._loadShow(showID);
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
        return SeasonsSidelineView;
    }(BST.View));
    BST.SeasonsSidelineView = SeasonsSidelineView;
})(BST || (BST = {}));
var BST;
(function (BST) {
    var ResourcesSection = (function (_super) {
        __extends(ResourcesSection, _super);
        function ResourcesSection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ResourcesSection.prototype._createElements = function () {
        };
        return ResourcesSection;
    }(BST.SectionView));
    BST.ResourcesSection = ResourcesSection;
})(BST || (BST = {}));
var BST;
(function (BST) {
    var HeaderView = (function (_super) {
        __extends(HeaderView, _super);
        function HeaderView(show) {
            var _this = _super.call(this) || this;
            _this._data = show;
            _this._createShowHeader();
            return _this;
        }
        Object.defineProperty(HeaderView.prototype, "data", {
            set: function (data) { this._data = data; },
            enumerable: true,
            configurable: true
        });
        HeaderView.prototype._createShowHeader = function () {
            var mainNavBar = this._createShowMenu();
            this._view = KIP.createSimpleElement("", "mainMenuWrapper", "", null, [mainNavBar]);
        };
        /** create the main nav bar for the show */
        HeaderView.prototype._createShowMenu = function () {
            var bstPresents = this._createBSTHeader();
            var showTitle = this._createShowTitle();
            var showNavbar = this._createShowSubNavbar();
            var menu = KIP.createSimpleElement("", "mainMenu", "", null, [bstPresents, showTitle, showNavbar]);
            return menu;
        };
        /** create the BST name and logo */
        HeaderView.prototype._createBSTHeader = function () {
            var logoURL = "../php/bstHome/logo.4.png";
            var nameElem = KIP.createSimpleElement("", "bstName subdued", "Broom Street Theater presents: ");
            var logoElem = KIP.createElement({
                cls: "bstLogo",
                type: "img",
                attr: {
                    "src": logoURL
                }
            });
            logoElem.addEventListener("click", function () {
                BST.navigate("", BST.NavigationType.HOME);
            });
            var wrapper = KIP.createSimpleElement("", "menuName reverse", "", null, [nameElem, logoElem]);
            return wrapper;
        };
        /** create the main navigation bar */
        HeaderView.prototype._createNavbar = function (title) {
            var id = this._data.showTitle.id;
            var backBtn = KIP.createSimpleElement(id + "|backBtn", "back btn", "< BACK");
            var nextBtn = KIP.createSimpleElement(id + "|nextBtn", "next btn", "NEXT >");
            var content = KIP.createSimpleElement(id + "|content", "content", "", null, [title]);
            var base = KIP.createSimpleElement(id + "|navBar", "navBar", "", null, [backBtn, content, nextBtn]);
            return base;
        };
        /** create navigation buttons for the show details */
        HeaderView.prototype._createShowSubNavbar = function () {
            var homeBtn = KIP.createSimpleElement("", "subnavbar btn", "< HOME");
            homeBtn.addEventListener("click", function () {
                BST.navigate("", BST.NavigationType.HOME);
            });
            var synopsisBtn = this._createSubNavBarButton("SYNOPSIS", "|synopsis");
            var biosBtn = this._createSubNavBarButton("BIOS", "|bios");
            var reviewBtn = this._createSubNavBarButton("BUZZ", "|buzz");
            var tixBtn = this._createSubNavBarButton("GET TICKETS", "|tix");
            var base = KIP.createSimpleElement("", "subNavBar", "", null, [homeBtn, synopsisBtn, biosBtn, reviewBtn, tixBtn]);
            return base;
        };
        /** helper to create a button in the show nav bar */
        HeaderView.prototype._createSubNavBarButton = function (lbl, sectionID) {
            var _this = this;
            var btn = KIP.createSimpleElement("", "subnavbar btn", lbl);
            btn.addEventListener("click", function () {
                BST.scrollTo(_this._data.showTitle.id + sectionID);
            });
            return btn;
        };
        /** creates the show details to show at the top */
        HeaderView.prototype._createShowTitle = function () {
            var name = KIP.createSimpleElement(this._data.showTitle.id + "|showName", "showName", this._data.showTitle.title); // name of the show
            var writerDirectorWrapper = this._createWriterDirectorElement(); // the writer + director
            var datesWrapper = this._createShowDatesElement();
            var base = KIP.createSimpleElement(this._data.showTitle.id + "|showHeader", "showHeader", "", null, [name, writerDirectorWrapper, datesWrapper]); // the base element
            return base;
        };
        /** create the writer - director pair */
        HeaderView.prototype._createWriterDirectorElement = function () {
            var children = [];
            // are the writer + director the same? Show one element then
            if (this._data.showTitle.writer === this._data.showTitle.director) {
                var comboElem = this._createComboElement();
                children.push(comboElem);
                // otherwise create 2 elements, one for each person    
            }
            else {
                var writerElem = this._createWriterElement();
                var directorElem = this._createDirectorElement();
                children.push(writerElem);
                children.push(directorElem);
            }
            // create the wrapping element to return
            var directorWriterWrapper = KIP.createSimpleElement(this._data.showTitle.id + "|details", "details", "", null, children);
            return directorWriterWrapper;
        };
        HeaderView.prototype._createShowDatesElement = function () {
            var run = BST.getShowStartAndEndDates(this._data);
            var dateStr = KIP.Dates.shortDate(run.start) + " - " + KIP.Dates.shortDate(run.end);
            var dateLbl = KIP.createSimpleElement("", "lbl", "Running: ");
            var dates = KIP.createSimpleElement("", "content", dateStr);
            var dateWrapper = KIP.createSimpleElement("", "dates", "", null, [dateLbl, dates]);
            return dateWrapper;
        };
        /** create the writer element */
        HeaderView.prototype._createWriterElement = function () {
            var writerLbl = KIP.createSimpleElement("", "lbl", "Written by: ");
            var writerData = KIP.createSimpleElement("", "writer", this._data.showTitle.writer);
            var writerElem = KIP.createSimpleElement(this._data.showTitle.id + "|writer", "writer", "", null, [writerLbl, writerData]);
            return writerElem;
        };
        /** create the director element */
        HeaderView.prototype._createDirectorElement = function () {
            var directorLbl = KIP.createSimpleElement("", "lbl", "Directed by: ");
            var directorData = KIP.createSimpleElement("", "director", this._data.showTitle.director);
            var directorElem = KIP.createSimpleElement(this._data.showTitle.id + "|director", "director", "", null, [directorLbl, directorData]);
            return directorElem;
        };
        /** if the writer and director are the same, show them as a combo */
        HeaderView.prototype._createComboElement = function () {
            var comboLbl = KIP.createSimpleElement("", "lbl", "Written and Directed by: ");
            var comboData = KIP.createSimpleElement("", "writer", this._data.showTitle.writer);
            var comboElem = KIP.createSimpleElement(this._data.showTitle.id + "|combo", "combo", "", null, [comboLbl, comboData]);
            return comboElem;
        };
        return HeaderView;
    }(BST.View));
    BST.HeaderView = HeaderView;
})(BST || (BST = {}));
var BST;
(function (BST) {
    var TicketSection = (function (_super) {
        __extends(TicketSection, _super);
        function TicketSection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(TicketSection.prototype, "data", {
            set: function (data) {
                this._data = data;
                this._createElements();
            },
            enumerable: true,
            configurable: true
        });
        /** create the appropriate elements for the ticket section */
        TicketSection.prototype._createElements = function () {
            var tbl = this._createDateGrid();
            var tix = this._createTicketButtons();
            this._elements.content.appendChild(tbl);
            this._elements.content.appendChild(tix);
        };
        /** create the ticket date grid */
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
            var finalTable = KIP.createTable(this._id + "|grid", "ticketDates", cells);
            return finalTable;
        };
        /** create headers for each of the show days */
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
        /** add a day to the cell array */
        TicketSection.prototype._addDayToCellArray = function (dayCell, date, cells) {
            var run = BST.getShowStartAndEndDates(this._data);
            // Calculate the week position
            var diff = KIP.Dates.dateDiff(run.end, date, false);
            var weekNum = 4 - Math.floor(diff / 7);
            if (!cells[weekNum]) {
                cells[weekNum] = [];
            }
            // Calculate the day position
            var day = date.getDay();
            // Add the cell to the array at the correct spot
            cells[weekNum][day - 4] = dayCell;
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
                    BST.disableTicketButtons();
                    // otherwise, make sure the ticket button is enabled
                }
                else {
                    _this._selectCell(dayCell);
                    BST.enableTicketButtons();
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
            var buyBtn = this._createTicketButton("BUY", "buy", "$1.38 convenience fee");
            var wrapperElem = KIP.createSimpleElement("ticketBtns", "buttons", "", null, [reserveBtn, buyBtn]);
            return wrapperElem;
        };
        /** create an individual ticket button */
        TicketSection.prototype._createTicketButton = function (txt, cls, addlFee, warning) {
            if (!warning) {
                warning = "If you do not arrive by 7:55pm, your tickets may be forfeit!";
            }
            var btn = KIP.createSimpleElement("", "btn " + cls, txt);
            var price = KIP.createSimpleElement("", "price", "$11.00" + (addlFee ? " + " + addlFee : ""));
            var numLbl = KIP.createSimpleElement("", "lbl", " x ");
            var numSelect = KIP.createElement({
                type: "input",
                attr: {
                    "type": "number",
                    "min": "1"
                },
                cls: "numOfTix",
            });
            var warningElem = KIP.createSimpleElement("", "warning", warning);
            var wrapper = KIP.createSimpleElement("", "ticketBtn", "", null, [btn, price, numLbl, numSelect, warningElem]);
            return wrapper;
        };
        TicketSection._COLORS = ["closed", "booked", "semi", "free"];
        TicketSection._HEADERS = ["Thurs.", "Fri.", "Sat."];
        return TicketSection;
    }(BST.SectionView));
    BST.TicketSection = TicketSection;
})(BST || (BST = {}));
var BST;
(function (BST) {
    var BuzzSection = (function (_super) {
        __extends(BuzzSection, _super);
        function BuzzSection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(BuzzSection.prototype, "data", {
            set: function (data) {
                this._data = data;
                this._createElements();
            },
            enumerable: true,
            configurable: true
        });
        /** create the elements needed by review sections */
        BuzzSection.prototype._createElements = function () {
            var review;
            for (var _i = 0, _a = this._data; _i < _a.length; _i++) {
                review = _a[_i];
                var miniReview = this._createReview(review);
                this._elements.content.appendChild(miniReview);
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
    var BioSection = (function (_super) {
        __extends(BioSection, _super);
        function BioSection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(BioSection.prototype, "data", {
            set: function (data) {
                this._data = data;
                this._createElements();
            },
            enumerable: true,
            configurable: true
        });
        BioSection.prototype._createElements = function () {
            var bio;
            for (var _i = 0, _a = this._data; _i < _a.length; _i++) {
                bio = _a[_i];
                var miniBio = this._createBio(bio);
                this._elements.content.appendChild(miniBio);
            }
        };
        /** create a bio for a member of the show */
        BioSection.prototype._createBio = function (bio) {
            var bioWrapper = this._createBioContent(bio); // content + name
            var imageWrapper = this._createBioImage(bio); // image
            var bioElem = KIP.createSimpleElement(this._id + "|bio", "bio", "", null, [imageWrapper, bioWrapper]); // overall element
            return bioElem;
        };
        /** create just the name elements of the bio */
        BioSection.prototype._createBioNames = function (bio) {
            var actorNameElem = KIP.createSimpleElement(this._id + "|actor", "actor");
            var linkText = KIP.createElement({
                type: "a",
                attr: {
                    href: bio.website
                },
                content: bio.actorName,
                cls: "link"
            });
            actorNameElem.appendChild(linkText);
            var roleNameElem = KIP.createSimpleElement(this._id + "|role", "role", bio.roleName);
            var namesWrapper = KIP.createSimpleElement(this._id + "|names", "names", "", null, [actorNameElem, roleNameElem]);
            return namesWrapper;
        };
        /** create the content of the bio */
        BioSection.prototype._createBioContent = function (bio) {
            var namesWrapper = this._createBioNames(bio);
            var bioText = KIP.createSimpleElement(this._id + "|bioText", "bioText", bio.bio);
            var bioWrapper = KIP.createSimpleElement(this._id + "|bioData", "bioData", "", null, [namesWrapper, bioText]);
            return bioWrapper;
        };
        /** create the image associated with the bio */
        BioSection.prototype._createBioImage = function (bio) {
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
        return BioSection;
    }(BST.SectionView));
    BST.BioSection = BioSection;
})(BST || (BST = {}));
var BST;
(function (BST) {
    var SynopsisSection = (function (_super) {
        __extends(SynopsisSection, _super);
        function SynopsisSection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(SynopsisSection.prototype, "data", {
            set: function (data) {
                this._data = data;
                this._createElements();
                // update the css
                KIP.setProperty(".synopsis.section", "margin-top", window.innerHeight + "px");
            },
            enumerable: true,
            configurable: true
        });
        /** create all elements needed by the synopsis section */
        SynopsisSection.prototype._createElements = function () {
            var synopsisContent = this._createSynopsisContent();
            this._elements.content.appendChild(synopsisContent);
        };
        /** create the synopsis section */
        SynopsisSection.prototype._createSynopsisContent = function () {
            // create the two columns of info
            var mainContent = KIP.createSimpleElement("", "synopsis", this._data.showDetails.synopsis);
            var sidebar = this._createSynopsisSidebar();
            // return the wrapping element that contains both of the columns
            var base = KIP.createSimpleElement("", "overview", "", null, [mainContent, sidebar]);
            return base;
        };
        /** create the sidebar of quick facts about a show */
        SynopsisSection.prototype._createSynopsisSidebar = function () {
            var details = this._data.showDetails;
            var showLengthElem = this._createSidebarElement("Show Length:", details.showLength.toString());
            var hasIntermissionElem = this._createSidebarElement("Has Intermission? ", details.hasIntermission ? "Yes" : "No");
            var isKidFriendlyElem = this._createSidebarElement("Family Friendly?", details.isKidFriendly ? "Yes" : "No");
            var warningsElem = this._createSidebarElement("Warnings: ", details.warnings);
            var sidebar = KIP.createSimpleElement("", "sidebar", "", null, [showLengthElem, hasIntermissionElem, isKidFriendlyElem, warningsElem]);
            return sidebar;
        };
        /** sidebar element for the synopsis section */
        SynopsisSection.prototype._createSidebarElement = function (lbl, content) {
            var sidebarLbl = KIP.createSimpleElement("", "lbl", lbl);
            var sidebarData = KIP.createSimpleElement("", "data", content);
            var sidebarElem = KIP.createSimpleElement("", "sidebarElem", "", null, [sidebarLbl, sidebarData]);
            return sidebarElem;
        };
        return SynopsisSection;
    }(BST.SectionView));
    BST.SynopsisSection = SynopsisSection;
})(BST || (BST = {}));
var BST;
(function (BST) {
    var SCROLL_SPEED = 5000;
    var TRANSITION_SPEED = 1000;
    var UNCENTERED_OPACITY = "0.2";
    var PhotoLoopView = (function (_super) {
        __extends(PhotoLoopView, _super);
        function PhotoLoopView(show) {
            var _this = _super.call(this) || this;
            _this._data = show;
            _this._center = null;
            _this._createPhotos();
            return _this;
        }
        PhotoLoopView.prototype._createPhotos = function () {
            var _this = this;
            // grab the appropriate view
            this._view = KIP.createSimpleElement(this._data.showTitle.id + "|showPhotos", "showPhotos");
            // loop through all photos and create the elements
            var photo;
            for (var _i = 0, _a = this._data.photos; _i < _a.length; _i++) {
                photo = _a[_i];
                this._createPhoto(photo);
            }
            // finish the loop
            this._finalizeLoop();
            // actually center the appropriate photo
            window.setTimeout(function () {
                _this._center.center();
                window.setTimeout(function () { _this._rotate(); }, SCROLL_SPEED);
                BST.slowReverseScroll(_this._view);
            }, 10);
        };
        /** create an individual photo for the show */
        PhotoLoopView.prototype._createPhoto = function (photo) {
            // create element
            var photoElem = KIP.createElement({
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
            this._view.appendChild(wrapper);
        };
        /** add a node into the list */
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
        /** link the first and last nodes together */
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
        PhotoLoopView.prototype._rotate = function () {
            var _this = this;
            if (!this._center.next) {
                return;
            }
            this._center = this._center.next;
            this._center.center();
            window.setTimeout(function () {
                _this._rotate();
            }, SCROLL_SPEED);
        };
        return PhotoLoopView;
    }(BST.View));
    BST.PhotoLoopView = PhotoLoopView;
    var LinkedPhoto = (function () {
        function LinkedPhoto(photo) {
            this._photoElem = photo;
            this._next = null;
            this._previous = null;
        }
        Object.defineProperty(LinkedPhoto.prototype, "photoElem", {
            get: function () { return this._photoElem; },
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
        LinkedPhoto.prototype.center = function () {
            var left = ((window.innerWidth - this._photoElem.offsetWidth) / 2);
            var right = ((window.innerWidth + this.photoElem.offsetWidth) / 2);
            // first set my position
            this._photoElem.style.left = left + "px";
            this._photoElem.style.opacity = "1";
            KIP.addClass(this._photoElem, "center");
            // adjust my partners
            if (this._previous) {
                this._previous.moveLeft();
            }
            if (this._next) {
                this._next.moveLeft(true);
            }
        };
        LinkedPhoto.prototype.moveLeft = function (lookToPrevious) {
            var _this = this;
            var left;
            if (lookToPrevious) {
                if (!this._previous) {
                    return;
                }
                left = parseInt(this._previous.photoElem.style.left) + this._previous.photoElem.offsetWidth;
            }
            else {
                if (!this.next) {
                    return;
                }
                left = parseInt(this._next.photoElem.style.left) - this._photoElem.offsetWidth;
            }
            // move this particular element
            this._photoElem.style.left = left + "px";
            this._photoElem.style.opacity = UNCENTERED_OPACITY;
            KIP.removeClass(this._photoElem, "center");
            // if we are completely offscreen, we should adjust it to the other side
            if (left + this._photoElem.offsetWidth <= 0) {
                window.setTimeout(function () {
                    _this.moveRight();
                }, TRANSITION_SPEED);
                // if we are the right hand side, adjust our next element
            }
            else if ((left < window.innerWidth) && (left + this._photoElem.offsetWidth > window.innerWidth)) {
                if (this.next) {
                    this.next.moveLeft();
                }
                // if we are the left hand side, adjust our previous element
            }
            else if (left < 0) {
                if (this.previous) {
                    this.previous.moveLeft();
                }
            }
        };
        LinkedPhoto.prototype.moveRight = function () {
            var _this = this;
            if (!this._previous) {
                return;
            }
            var position = this._previous.photoElem.offsetLeft + this._previous.photoElem.offsetWidth;
            this._photoElem.style.opacity = "0";
            window.setTimeout(function () {
                _this._photoElem.style.left = position + "px";
                window.setTimeout(function () {
                    _this._photoElem.style.opacity = UNCENTERED_OPACITY;
                }, TRANSITION_SPEED);
            }, TRANSITION_SPEED);
        };
        return LinkedPhoto;
    }());
    BST.LinkedPhoto = LinkedPhoto;
})(BST || (BST = {}));
var BST;
(function (BST) {
    var ShowView = (function (_super) {
        __extends(ShowView, _super);
        function ShowView(show) {
            var _this = _super.call(this) || this;
            _this._data = show;
            _this._createShowPage();
            return _this;
        }
        /** create all of the elements needed for a show page */
        ShowView.prototype._createShowPage = function () {
            // BUILD NAVBARS AND PHOTO DISPLAY
            var header = this._createShowHeader();
            // BUILD SHOW SECTIONS
            var synopsisSection = this._createSynopsisSection();
            var bioSection = this._createBioSection();
            var buzzSection = this._createBuzzSection();
            var ticketSection = this._createTicketSection();
            // BUILD THE PHOTOS
            var photos = this._createPhotos();
            // CREATE THE SHOW PAGE
            this._view = KIP.createSimpleElement(this._data.showTitle.id + "|show", "show", "", null, [
                header.view,
                photos.view,
                synopsisSection.view,
                bioSection.view,
                buzzSection.view,
                ticketSection.view
            ]);
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
        ShowView.prototype._createShowHeader = function () {
            var header = new BST.HeaderView(this._data);
            return header;
        };
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
        return ShowView;
    }(BST.View));
    BST.ShowView = ShowView;
})(BST || (BST = {}));
//# sourceMappingURL=bst.js.map
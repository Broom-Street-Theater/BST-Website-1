/// <reference path="../../../../toolkip.ts/typescript/compiled_js/kip.d.ts" />
declare namespace BST {
    enum NavigationType {
        HOME = 0,
        SHOW = 1,
        ADMIN = 2,
        TICKETS = 3,
    }
    /**...........................................................................
     * navigate
     * ...........................................................................
     * Navigate to a page in the BST site
     *
     * @param   navigateTo      the id to navigate to
     * @param   navigateType    whether we're navigating to a show or the home page
     * ...........................................................................
     */
    function navigate(navigateTo: string, navigateType: NavigationType): void;
}
declare namespace BST {
    /**...........................................................................
     * pushHistoryState
     * ...........................................................................
     * make sure we can return to the right page
     *
     * @param   history     The page to return to when hitting the back button
     * ...........................................................................
     */
    function pushHistoryState(history: IHistoryData): void;
}
declare namespace BST {
    /**...........................................................................
     * isAdmin
     * ...........................................................................
     * Checks if we are currently in an administrative workflow
     *
     * @returns True if we are an admin section of the site
     * ...........................................................................
     */
    function isAdmin(): boolean;
    function isTicketSales(): boolean;
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
    function keyNameToDisplayName(keyName: string): string;
}
declare namespace BST {
    /**
    * create a date selector specific to BST shows with a default time & date
    * @version 1.0
    */
    class DateSelector extends KIP.Forms.DateTimeElement {
        protected static _lastDate: Date;
        /** figure out what the default value should be */
        protected readonly _defaultValue: Date;
        protected _parseElemTemplate(template: KIP.Forms.IFormElemTemplate<Date>): void;
        render(parent: HTMLElement): void;
        protected _onChange(): boolean;
        update(data: Date): void;
        protected _createClonedElement(appendToID?: string): DateSelector;
    }
}
declare namespace BST {
    /**
     * ...........................................................................
     * ISeasons
     * ...........................................................................
     * Collection of IMiniShows that represent the current season
     * ...........................................................................
     */
    type ISeasons = IMiniShow[];
    /**...........................................................................
     * IMiniShow
     * ...........................................................................
     * Keep track of an abbreviated set of details about a show
     * ...........................................................................
     */
    interface IMiniShow {
        /** The display name of the show */
        name: string;
        /** the subtitle for the show, if available */
        subtitle?: string;
        /** the ID of the show */
        id: string;
        /** when the show's last performance is */
        endDate: string;
        /** what icon to use for the show */
        icon: string;
        /** true if this show should be auto-selected when the page is loaded */
        selected?: boolean;
    }
    interface IOnShowLoaded {
        (show: Show): void;
    }
    interface IOnHomeLoaded {
        (home: IHomeData): void;
    }
    interface IOnSeasonsLoaded {
        (seasons: ISeasons): void;
    }
    /** send back element data for a section */
    interface ISectionElems extends KIP.IDrawableElements {
        base: HTMLElement;
        title: HTMLElement;
        content: HTMLElement;
    }
    interface INavbarElems {
        base: HTMLElement;
        backBtn: HTMLElement;
        content: HTMLElement;
        nextBtn: HTMLElement;
    }
    interface IShowHeader {
        base: HTMLElement;
    }
    interface IShowNavbarElems {
        base: HTMLElement;
    }
    interface IElementDict {
        [key: string]: HTMLElement;
    }
    /**...........................................................................
     * MenuTypeEnum
     * ...........................................................................
     * Types of buttons that can be in a menu
     * ...........................................................................
     */
    enum MenuTypeEnum {
        /** link to a section */
        SECTION = 1,
        /** link to an external page */
        EXTERNAL = 2,
    }
    /**...........................................................................
     * IHistoryData
     * ...........................................................................
     * Keep track of where we've navigated
     * @version 1.0
     * ...........................................................................
     */
    interface IHistoryData {
        /** whether we went to the home page or a show page */
        type: NavigationType;
        /** if it was a show page, which show page */
        showID?: string;
        /** the URL to use to load the same page */
        url?: string;
        /** what the title of the site should be in the history */
        title?: string;
    }
}
declare namespace BST {
    interface IShowData {
        /** high level details about the show */
        showTitle: IShowTitleDetails;
        /** more granular details */
        showDetails: IShowDetails;
        /** the dates of the run */
        runDates: Date[];
        /** actor bios */
        bios: IBioData[];
        /** any associated reviews */
        reviews: IReviewData[];
        /** photos for the show */
        photos: IPhoto[];
        /** auditions for the show */
        auditions: IAuditionInfo;
    }
    interface IShowTitleDetails {
        /** unique Id for the show. Auto generated */
        id: string;
        /** the link to the brown paper ticket event */
        bptLink: string;
        /** the title of the show */
        title: string;
        /** the subtitle of the show (if available) */
        subtitle?: string;
        /** the writer of the show */
        writer: string;
        /** the director of the show */
        director: string;
        /** the icon to use in the sidebar for the show */
        icon: string;
    }
    interface IShowDetails {
        /** true if the show will have an intermission */
        hasIntermission: boolean;
        /** the length of the show in minutes */
        showLength: number;
        /** if true, the show is approproate for young audiences  */
        isKidFriendly: boolean;
        /** any warnings that an audience member should be aware of  */
        warnings: string;
        /** synopsis of the show */
        synopsis: string;
    }
    interface IAuditionInfo {
        /** when auditions are being held */
        dates: IAuditionDate[];
        /** what characters will have auditions */
        characters: ICharacter[];
        /** what the audition will expect */
        expectations: AuditionExpectationType[];
        /** who to contact with questions */
        contactInfo: string;
        /** if available, the link at which auditioners can book a spot */
        reservationLink: string;
    }
    interface ICharacter {
        description: string;
        name: string;
        gender: IGenderEnum;
        minAge: number;
        maxAge: number;
    }
    enum IGenderEnum {
        NO_PREFERENCE = 0,
        FEMALE = 1,
        MALE = 2,
        NON_BINARY = 3,
    }
    enum AuditionExpectationType {
        MONOLOGUE = 1,
        COLD_READ = 2,
        DANCE_CALL = 3,
        SINGING = 4,
        IMPROV = 5,
    }
    interface IAuditionDate {
        start: Date;
        end: Date;
        location: IAddress;
    }
    interface IAddress {
        name: string;
        addressLines: string;
        city: string;
        state: string;
        zip: number;
    }
    interface IPhoto {
        url: string;
        photographer?: string;
        copyrightText?: string;
        isPoster: boolean;
        isHilite: boolean;
    }
    /** store data about a review */
    interface IReviewData {
        reviewer: string;
        date: Date;
        link: string;
        review: string;
    }
    enum CastOrCrew {
        CAST = 1,
        CREW = 2,
        SPECIAL_MENTION = 3,
    }
    /** store data about a bio */
    interface IBioData {
        actorName: string;
        roleName: string;
        bio: string;
        imageURL: string;
        website: string;
        type: CastOrCrew;
    }
    interface IRun {
        start: Date;
        end: Date;
    }
    /**...........................................................................
     * @class Show
     * Keep track of the show object
     * @version 1.0
     * ...........................................................................
     */
    class Show implements IShowData {
        /** basic details about the show */
        protected _showTitle: IShowTitleDetails;
        readonly showTitle: IShowTitleDetails;
        /** details about the show */
        protected _showDetails: IShowDetails;
        readonly showDetails: IShowDetails;
        /** the dates of the run */
        protected _runDates: Date[];
        readonly runDates: Date[];
        /** actor bios */
        protected _bios: IBioData[];
        readonly bios: IBioData[];
        /** any associated reviews */
        protected _reviews: IReviewData[];
        readonly reviews: IReviewData[];
        /** photos for the show */
        protected _photos: IPhoto[];
        readonly photos: IPhoto[];
        /** auditions for the show */
        protected _auditions: IAuditionInfo;
        readonly auditions: IAuditionInfo;
        /** what the run of the show will be */
        protected _run: IRun;
        readonly run: IRun;
        /**...........................................................................
         * create a show class
         *
         * @param   showData    Content of this show
         * ...........................................................................
         */
        constructor(showData: IShowData);
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
        protected _parseDates(showData: IShowData): IShowData;
        /**...........................................................................
         * getStartAndEndDates
         * ...........................................................................
         * Figure out when the show is actually running
         *
         * @returns Run dates of the show
         * ...........................................................................
         */
        getStartAndEndDates(): IRun;
        /**...........................................................................
         * shouldShowBioSection
         * ...........................................................................
         * determine whether there are bios to show
         *
         * @returns True if this show has bios
         * ...........................................................................
         */
        shouldShowBioSection(): boolean;
        /**...........................................................................
         * shouldShowBuzzSection
         * ...........................................................................
         * determine whether there are reviews to show
         *
         * @returns True if this show has any reviews
         * ...........................................................................
         */
        shouldShowBuzzSection(): boolean;
        /**...........................................................................
         * shouldShowAuditionsSection
         * ...........................................................................
         * determine whether there are auditions
         *
         * @returns True if this show has any auditions
         * ...........................................................................
         */
        shouldShowAuditionsSection(): boolean;
        /**...........................................................................
         * shouldShowTicketSection
         * ...........................................................................
         * determine whether we should be showing the ticket section
         *
         * @returns True if this show has tickets available
         * ...........................................................................
         */
        shouldShowTicketSection(): boolean;
        /**...........................................................................
         * hasShowEnded
         * ...........................................................................
         * Determine if this show is already over
         *
         * @returns True if the show has ended
         * ...........................................................................
         */
        hasShowEnded(): boolean;
    }
}
declare namespace BST {
    interface IHomeData {
        about: IAboutData;
        news: INews[];
        getInvolved: IGetInvolved;
        menuItems: IMenuItem[];
        logoURL: string;
        bgURL: string;
        resources?: IResource[];
        donateInfo?: IDonateInfo;
    }
    interface IGetInvolved {
        technicians: IInvolvement[];
        actors: IInvolvement[];
        writers: IInvolvement[];
        directors: IInvolvement[];
        general: IInvolvement[];
    }
    interface IAboutData {
        general: string;
        board: ILeaderData[];
        staff: ILeaderData[];
        bylaws: string;
        history: string;
        detailedHistory?: IEvent[];
    }
    interface ILeaderData {
        name: string;
        position: string;
    }
    interface IInvolvement {
        icon?: string;
        text: string;
        content: string;
        contactInfo: IContactInfo;
    }
    interface IContactInfo {
        email: string;
        phone: string;
        name: string;
    }
    interface INews {
        title: string;
        content: string;
        author: string;
        date: Date;
        isImportant?: boolean;
    }
    interface IMenuItem {
        name: string;
        type: MenuTypeEnum;
        link: string;
    }
    interface IResource {
        name: string;
        content: string;
        link: string;
    }
    interface IEvent {
        date: Date;
        header?: string;
        details: string;
    }
    interface IDonateInfo {
        blurb: string;
        paypalAccount: string;
    }
}
declare namespace BST {
    enum SCROLL_TYPE {
        SLOW_SCROLL = 1,
        REVERSE_SLOW_SCROLL = 2,
        FAST_SCROLL = 3,
    }
    interface IScrollableElem {
        type: SCROLL_TYPE;
        elem: HTMLElement;
        origPt: KIP.IPoint;
    }
    var scrollers: IScrollableElem[];
    function scrollTo(elemID: string, target?: number, forceTarget?: boolean): void;
    /** let an element scroll slower than the rest of the page */
    function slowScroll(elem: HTMLElement): void;
    /** allow an element to scroll slower than the rest - assigns negative values */
    function slowReverseScroll(elem: HTMLElement): void;
    /** scroll an element faster than the rest of the screen */
    function fastScroll(elem: HTMLElement): void;
}
declare namespace BST.Server {
    const DEBUG: boolean;
    /**...........................................................................
     * getPath
     * ...........................................................................
     * helper to grab the path the the right file
     *
     * @returns the appropriate path the relevant files
     * ...........................................................................
     */
    function getPath(): string;
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
    function loadShow(showId: string, onLoaded: IOnShowLoaded, onError?: KIP.IAjaxErrorFunction): void;
    /**...........................................................................
     * loadHome
     * ...........................................................................
     * load the data for the home page
     *
     * @param   onLoaded
     * ...........................................................................
     */
    function loadHome(onLoaded: IOnHomeLoaded): void;
    /**...........................................................................
     * loadSeasons
     * ...........................................................................
     * Loads the seasons of BST
     *
     * @param onLoaded
     * ...........................................................................
     */
    function loadSeasons(onLoaded: IOnSeasonsLoaded): void;
    function testBptAPI(eventID: string, success: KIP.IAjaxSuccessFunction): void;
    function testIsAdmin(): void;
}
declare namespace BST.Helpers {
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
    function getShowStartAndEndDates(showData: IShowData): IRun;
}
declare namespace BST.Helpers {
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
    function sortSeasons(seasons: ISeasons): ISeasons;
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
    function findImmediateShow(seasons: ISeasons): IMiniShow[];
}
declare namespace BST.Server {
    /**...........................................................................
     * saveSeasons (public)
     * ...........................................................................
     * Save an updated season list
     *
     * @param   data        The new seasons list
     * @param   onLoaded    What to do when the seasons have been saved
     * ...........................................................................
     */
    function saveSeasons(data: ISeasons, onLoaded?: IOnSeasonsLoaded): void;
    function saveHome(data: IHomeData, onLoaded?: IOnHomeLoaded): void;
    /**...........................................................................
     * saveShow
     * ...........................................................................
     * Saves a particular show to the server. Requires admin access
     *
     * @param   showData    The data to save
     * @param   onComplete  What to do when the show has been saved
     * ...........................................................................
     */
    function saveShow(showData: IShowData, onComplete: KIP.IAjaxSuccessFunction): void;
    /**...........................................................................
     * saveActorPhoto
     * ...........................................................................
     * Save a photo associated with an actor's photo
     *
     * @param file
     * @param successCb
     * ...........................................................................
     */
    function saveActorPhoto(file: File, successCb: KIP.IAjaxSuccessFunction): void;
    /**...........................................................................
     * saveShowPhoto
     * ...........................................................................
     * Save a show photo
     *
     * @param file
     * @param showID
     * @param successCb
     */
    function saveShowPhoto(file: File, showID: string, successCb: KIP.IAjaxSuccessFunction): void;
    /**...........................................................................
     * saveIconPhoto
     * ...........................................................................
     *
     * @param file
     * @param showID
     * @param successCb
     * ...........................................................................
     */
    function saveIconPhoto(file: File, showID: string, successCb: KIP.IAjaxSuccessFunction): void;
    function saveGetInvolvedPhoto(file: File, successCb: KIP.IAjaxSuccessFunction): void;
    function saveLogoPhoto(file: File, successCb: KIP.IAjaxSuccessFunction): void;
    function saveBgPhoto(file: File, successCb: KIP.IAjaxSuccessFunction): void;
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
    function login(token: string, success: KIP.IAjaxSuccessFunction, failure: KIP.IAjaxErrorFunction): void;
    /**...........................................................................
     * logout
     * ...........................................................................
     * Handle the user logging out of a google account
     * ...........................................................................
     */
    function logout(): void;
}
declare namespace BST {
    /**...........................................................................
     * IViewElements
     * ...........................................................................
     * Elements to display for the view. Overriding to specify that the base is an
     * HTML Element rather than another element
     * ...........................................................................
     */
    interface IViewElements extends KIP.IDrawableElements {
        /** base element for the View */
        base: HTMLElement;
    }
    /**...........................................................................
     * @class View
     * Shared class for handling all view types
     * @version 1.0
     * ...........................................................................
     */
    abstract class View extends KIP.Drawable {
        /** the data element that backs this View */
        protected _data: any;
        /** the appropriate elements for this view */
        protected _elems: IViewElements;
        /** keep track of whether we're on a screen that should be considered mobile */
        protected _isMobile: boolean;
        /** the base element for this View */
        readonly base: HTMLElement;
        constructor(objElem?: KIP.IElemDefinition);
        /**...........................................................................
         * _registerResizeListener
         * ...........................................................................
         * Handle resizing
         * ...........................................................................
         */
        protected _registerResizeListener(): void;
        protected _updateMobileClasses(): void;
        /**...........................................................................
         * _shouldSkipCreateElements
         * ...........................................................................
         * Checks if we should prevent creating elements
         *
         * @returns True if we should not create the elements
         * ...........................................................................
         */
        protected _shouldSkipCreateElements(): boolean;
    }
}
declare namespace BST {
    abstract class SectionView extends View {
        /** ID for the section */
        protected _id: string;
        /** title of the section */
        protected _title: string;
        /** CSS class to use for the section (in addition to standard classes) */
        protected _class: string;
        /** Background image for  */
        protected _bgImage: string;
        /** content contained within the section */
        protected _data: any;
        data: any;
        protected _setData(data: any): void;
        protected _elems: ISectionElems;
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles;
        /**
         * create a section
         *
         * @param   id
         * @param   title
         * @param   addlClass
         */
        constructor(id: string, title: string, addlClass: string);
        /**
         * handle the creation of the base section elements
         */
        protected _createElements(): void;
        protected abstract _createSectionElements(): void;
    }
}
declare namespace BST {
    /**...........................................................................
     * ISubSectionElems
     * ...........................................................................
     * Keep track of elements for the subsection
     * ...........................................................................
     */
    interface ISubSectionElems extends ISectionElems {
        /** the tab element to show for the subsection */
        tab: HTMLElement;
    }
    /**...........................................................................
     * @class SubSection
     * ...........................................................................
     * Creates a subsection for display
     * @version 1.1
     * ...........................................................................
     */
    abstract class SubSection<T> extends View {
        /** styles specific to subsections */
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles;
        /** grab the tab for this particular element */
        readonly tab: HTMLElement;
        /** grab the content element */
        readonly content: HTMLElement;
        /** keep track of the data for this particular subsection */
        protected _data: T;
        /** keep a hold of the name of the tab */
        private _name;
        /** keep track of the elements for this drawable */
        protected _elems: ISubSectionElems;
        /** keep track of this individual  */
        protected _index: number;
        index: number;
        /**...........................................................................
         * Creates a subsection element
         *
         * @param   data    Data to shows as a part of this subsection
         * @param   name    The name of the subsection tab
         * ...........................................................................
         */
        constructor(data: T, name: string);
        /**...........................................................................
         * _createElements
         * ...........................................................................
         * Create the elements for the subsection
         * ...........................................................................
         */
        protected _createElements(): void;
        /**...........................................................................
         * _createContent
         * ...........................................................................
         * Abstract function for all subsections to implement for particular
         * ...........................................................................
         */
        protected abstract _createContent(): void;
        /**...........................................................................
         * select
         * ...........................................................................
         * show a particular section
         * ...........................................................................
         */
        select(): void;
        /**...........................................................................
         * deselect
         * ...........................................................................
         * hide a particular subsection
         * ...........................................................................
         */
        deselect(): void;
    }
}
declare namespace BST {
    /**...........................................................................
     * ISubSectionElems
     * ...........................................................................
     * Elements that will be displayed for this set of subsections
     * ...........................................................................
     */
    interface ISubSectionsElems extends IViewElements {
        /** tabs for all of the subsections */
        tabs: HTMLElement;
        /** content for the currently selected sub section */
        contentPane: HTMLElement;
    }
    /**...........................................................................
     * @class SubSections
     * Keep track of several subsection elements
     * @version 1.0
     * ...........................................................................
     */
    class SubSections extends View {
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles;
        protected _elems: ISubSectionsElems;
        private _subsections;
        private _currentSelection;
        constructor();
        /**...........................................................................
         * _createElements
         * ...........................................................................
         * Create elements for the subsections
         * ...........................................................................
         */
        protected _createElements(): void;
        /**...........................................................................
         * addSubSections
         * ...........................................................................
         * Add a set of subsections to this element
         *
         * @param   subsections     Any number of subsections that should be added
         * ...........................................................................
         */
        addSubSections(...subsections: SubSection<any>[]): void;
        /**...........................................................................
         * addSubSection
         * ...........................................................................
         * add a subsection to our collection
         * @param   subsection  The subsection to add
         * ...........................................................................
         */
        addSubSection(subsection: SubSection<any>): void;
        /**...........................................................................
         * selectTab
         * ...........................................................................
         * selects the appropriate tab
         * @param   index   The index of the subsection to select
         * ...........................................................................
         */
        selectTab(index: number): void;
    }
}
declare namespace BST {
    /**...........................................................................
     * IHeaderElems
     * ...........................................................................
     * Keep track of all elements in the shared header
     *
     * @version 1.0
     * ...........................................................................
     */
    interface IHeaderElems extends IViewElements {
        /** overall header for all elements */
        wrapper: HTMLElement;
        /** home specific elements */
        home: HTMLElement;
        homeTitle: HTMLElement;
        homeLogo: HTMLElement;
        /** shared menu space */
        menuElems: HTMLElement;
        homeMenuElems: HTMLElement;
        showMenuElems: HTMLElement;
        /** show specific elements */
        show: HTMLElement;
        showTitle: HTMLElement;
        showSubtitle: HTMLElement;
        showStats: HTMLElement;
    }
    /**...........................................................................
     * @class BSTHeader
     * ...........................................................................
     * Create the shared header
     * @version 1.0
     * ...........................................................................
     */
    class BSTHeader extends View {
        /** keep track of the data that applies to the home screen */
        protected _homeData: IHomeData;
        homeData: IHomeData;
        /** keep track of the show specific data, when in the show view */
        protected _showData: Show;
        showData: Show;
        /** elements that make up the header */
        protected _elems: IHeaderElems;
        protected _resizeListeners: Function[];
        /** styles specific for this header */
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles;
        /**...........................................................................
         * Creates a shared header view
         *
         * @param   home    The data that will be displayed as the home
         * ...........................................................................
         */
        constructor(home: IHomeData);
        /**...........................................................................
         * _createElements
         * ...........................................................................
         * Create all of the elements needed for the header
         * ...........................................................................
         */
        protected _createElements(): void;
        /**...........................................................................
         * _createHomeElements
         * ...........................................................................
         * create the elements that are specific to the home side of the header
         * ...........................................................................
         */
        protected _createHomeElements(): void;
        /**...........................................................................
         * _createBSTNameAndLogo
         * ...........................................................................
         * create the elements to show the BST logo and name
         * ...........................................................................
         */
        protected _createBSTNameAndLogo(): void;
        /**...........................................................................
         * _createShowMenuElements
         * ...........................................................................
         * create the menu elements relevant for shows
         * ...........................................................................
         */
        protected _createShowMenuElements(): void;
        /**...........................................................................
         * _createSubNavBarButton
         * ...........................................................................
         * helper to create a button in the show nav bar
         * @param   lbl         The label to use for this button
         * @param   sectionID   The section
         * @returns The created navigation element
         * ...........................................................................
         */
        private _createShowNavButton(lbl, sectionID);
        /**...........................................................................
         * _createHomeMenuElements
         * ...........................................................................
         * create the elements that make up the home menu
         * ...........................................................................
         */
        protected _createHomeMenuElements(): void;
        protected _addMenuLink(elem: HTMLElement, link: string): void;
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
        private _createHomeMenuItem(menuItem);
        /**...........................................................................
         * _createShowElements
         * ...........................................................................
         * create the elements needed for a specific show
         * ...........................................................................
         */
        protected _createShowElements(): void;
        /**...........................................................................
         * _createShowTitle
         * ...........................................................................
         * Create the title for the show that is currently showing
         * ...........................................................................
         */
        protected _createShowTitle(): void;
        /**...........................................................................
         * _createShowStatistics
         * ...........................................................................
         * create the statistics about the show (writer, director, run dates)
         * ...........................................................................
         */
        protected _createShowStatistics(): void;
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
        protected _createShowStatistic(lbl: string, data: string): HTMLElement;
        /**...........................................................................
         * displayAsShow
         * ...........................................................................
         * Switches to the show specific version of the header
         *
         * @param   show    The show to display
         * ...........................................................................
         */
        displayAsShow(show: Show): void;
        /**...........................................................................
         * displayAsHome
         * ...........................................................................
         * Switches to the home specific version of the header
         * ...........................................................................
         */
        displayAsHome(): void;
        /**...........................................................................
         * _updateShowElements
         * ...........................................................................
         * Make sure the show side of the header reflects the new data
         * ...........................................................................
         */
        protected _updateShowElements(): void;
        /**...........................................................................
         * _swapMenu
         * ...........................................................................
         * Swap to the appropriate menu, based on whether we have show data
         * ...........................................................................
         */
        protected _swapMenu(): void;
        /**...........................................................................
         * _changeShowVisibility
         * ...........................................................................
         * Hide or show the regular show element
         * ...........................................................................
         */
        protected _changeShowVisibility(): void;
        /**
         * allow other classes to ask for updates when the size of the header changes
         * @param listener
         */
        registerListener(listener: any): void;
        /**
         * notify when a resize happened
         */
        protected _notifyListeners(): void;
    }
}
declare namespace BST.Admin {
    class HomeForm extends View {
        protected _data: IHomeData;
        protected _form: KIP.Forms.Form<IHomeData>;
        readonly form: KIP.Forms.Form<IHomeData>;
        constructor(homeData?: IHomeData);
        /**...........................................................................
         * _updateTitle
         * ...........................................................................
         * change the title of the header
         * ...........................................................................
         */
        protected _createTitle(): void;
        /**...........................................................................
         * initializeHomeForm
         * ...........................................................................
         * Create the form that an editor will use to edit the home details of the
         * BST website
         * ...........................................................................
         */
        protected _createElements(): void;
        /**...........................................................................
         * _createForm
         * ...........................................................................
         * Create the form to change data about the home screen
         * ...........................................................................
         */
        protected _createForm(): void;
        /**...........................................................................
         * _saveData
         * ...........................................................................
         * Make sure that we can actually save our data
         *
         * @param   home    The data to actually save
         * ...........................................................................
         */
        protected _saveData(home: IHomeData): void;
        /**...........................................................................
         * update
         * ...........................................................................
         * Update the form
         *
         * @param   home    the data to show in the form
         * ...........................................................................
         */
        update(home: IHomeData): void;
    }
}
declare namespace BST.Admin {
    interface IShowFormElems extends IViewElements {
        base: HTMLElement;
        title: HTMLElement;
        select: HTMLSelectElement;
    }
    /**...........................................................................
     * @class ShowForm
     * ...........................................................................
     * Allows details about a show to be added or edited
     * @version 1.0
     * @author  Kip Price
     * ...........................................................................
     */
    class ShowForm extends View {
        /** the elements for this form */
        protected _elems: IShowFormElems;
        /** backing data of seasons info */
        protected _seasons: ISeasons;
        /** keep track of what show we have currently loaded */
        protected _loadedShowID: string;
        /** keep track of whether we can make updates to the show's ID */
        protected _unsavedID: boolean;
        /** create the actual form that will collect data */
        protected _form: KIP.Forms.Form<IShowData>;
        readonly form: KIP.Forms.Form<IShowData>;
        /** style some elements for this form */
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles;
        protected _shouldSkipCreateElements(): boolean;
        /**...........................................................................
         * Creates a show form
         * @param   seasons     The current backing data for this form
         * ...........................................................................
         */
        constructor(seasons: ISeasons);
        /**...........................................................................
         * _createTitle
         * ...........................................................................
         * Create the title element for the form
         * ...........................................................................
         */
        protected _createTitle(): void;
        /**...........................................................................
         * _createSelectElement
         * ...........................................................................
         * create the element to select
         * @returns The created select element
         * ...........................................................................
         */
        protected _createSelectElement(): HTMLSelectElement;
        /**...........................................................................
         * _updateSelectForSeasons
         * ...........................................................................
         * Update our select field when the seasons data changes
         * ...........................................................................
         */
        protected _updateSelectForSeasons(): void;
        /**...........................................................................
         * _loadShowData
         * ...........................................................................
         * Load data about the show
         * @param   showID  The show to load data for
         * ...........................................................................
         */
        protected _loadShowData(showID: string): void;
        /**...........................................................................
         * _adminSaveShow
         * ...........................................................................
         * Make sure we can save our show
         *
         * @param   show    The show to save
         * ...........................................................................
         */
        protected _adminSaveShow(show: IShowData): void;
        /**...........................................................................
         * _turnDatesToShowID
         * ...........................................................................
         * Create a show ID from the run dates
         *
         * @param   dates   The dates to turn into an ID
         * ...........................................................................
         */
        protected _turnDatesToShowID(dates: Date[]): string;
        /**...........................................................................
         * _turnNameToShowID
         * ...........................................................................
         * Create a show ID from the show name / subtitle
         *
         * @param   name    The show name to turn into an ID
         * ...........................................................................
         */
        protected _turnNameToShowID(name: string): string;
        /**...........................................................................
         * _addShowToSeason
         * ...........................................................................
         * Make sure to update our seasons with this new show
         *
         * @param   showDeets   Details about the show to add
         * ...........................................................................
         */
        protected _addShowToSeason(showDeets: IMiniShow): boolean;
        /**...........................................................................
         * _createElements
         * ...........................................................................
         * create all of the elements we need for this show form
         * ...........................................................................
         */
        protected _createElements(): void;
        /**...........................................................................
         * _createForm
         * ...........................................................................
         * create the show editing form
         * ...........................................................................
         */
        protected _createForm(): void;
        update(seasons: ISeasons): void;
    }
    class BSTPhotoPathElement extends KIP.Forms.PhotoPathElement {
        update(data: string): void;
        protected _createClonedElement(appendToID: string): BSTPhotoPathElement;
    }
}
declare namespace BST.Admin {
    interface IAdminViewElems extends IViewElements {
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
    /**...........................................................................
     * @class AdminView
     * ...........................................................................
     * Create the controller for all of the admin screens
     * @version 1.0
     * ...........................................................................
     */
    class AdminView extends View {
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
        private _isLoggedIn;
        private _googleProfile;
        /** styles to use for the admin view */
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles;
        /** create the admin page */
        constructor();
        /**...........................................................................
         * _shouldSkipCreateElements
         * ...........................................................................
         *
         * @returns False
         * ...........................................................................
         */
        protected _shouldSkipCreateElements(): boolean;
        /**...........................................................................
         * _createElements
         * ...........................................................................
         * create elements for the admin page
         * ...........................................................................
         */
        protected _createElements(): void;
        protected _createLoginElements(): HTMLElement;
        protected _createGoogleButton(): HTMLElement;
        /**...........................................................................
         * _createTopMenu
         * ...........................................................................
         * create the top menu for the admin page
         * ...........................................................................
         */
        protected _createTopMenu(): void;
        /**...........................................................................
         * _createContent
         * ...........................................................................
         * create the content needed for the admin page
         * ...........................................................................
         */
        protected _createContent(): void;
        /**...........................................................................
         * _createMenu
         * ...........................................................................
         * Show the main menu for the admin page
         * ...........................................................................
         */
        protected _createMenu(): void;
        /**...........................................................................
         * _showHomeForm
         * ...........................................................................
         * Create the view for the home form
         * ...........................................................................
         */
        protected _showHomeForm(): void;
        /**...........................................................................
         * _showShowForm
         * ...........................................................................
         * Create the view for the show editor form
         * ...........................................................................
         */
        protected _showShowForm(): void;
        private _showDeleteForm();
        protected _canReturnToMenu(): boolean;
        /**...........................................................................
         * returnToMenu
         * ...........................................................................
         * Handle going back to the main menu
         * ...........................................................................
         */
        returnToMenu(): void;
        /**
         * _onSignIn
         *
         * Handle when we've attempted to log in through google's api
         * @param googleUser
         */
        private _onSignIn(googleUser);
        /**
         * _onSignedIn
         *
         * Handle when the user has successfully authenticated with Google and us
         */
        private _onSignedIn();
        /**
         * _onSignInFailure
         *
         * Handle when we couldn't log in appropriately
         */
        private _onSignInFailure();
        /**
         * _signOut
         *
         * Tell Google and our server that we are logging out
         */
        private _signOut();
    }
}
declare namespace BST.Admin {
    interface IDeleteShowElements extends IViewElements {
        base: HTMLElement;
        shows: HTMLElement;
    }
    class DeleteShowForm extends View {
        /** elements used for displaying the delete form */
        protected _elems: IDeleteShowElements;
        /** data about the seasons from which we will actually do our deleting */
        protected _seasons: ISeasons;
        /** styles for the delete show page */
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles;
        /**
         * Create the view for deleting shows
         * @param seasons
         */
        constructor(seasons: ISeasons);
        protected _createElements(): void;
        protected _createShows(): void;
        protected _createShowLine(show: IMiniShow): HTMLElement;
        private _confirmDeletion(show);
        update(seasons: ISeasons): void;
    }
}
declare namespace BST {
    /**...........................................................................
     * @class AboutSectionView
     * handles the about section of the BST homepage
     * @version 1.0
     * ...........................................................................
     */
    class AboutSection extends SectionView {
        /** contains the subsections of this section */
        protected _sectionContent: SubSections;
        /** contains additional details about  */
        protected _data: IAboutData;
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles;
        protected _getUncoloredStyles(): KIP.Styles.IStandardStyles;
        /**...........................................................................
         * _createSectionElements
         * ...........................................................................
         * Creates all of the elements needed for this section
         * ...........................................................................
         */
        _createSectionElements(): void;
    }
}
declare namespace BST {
    /**...........................................................................
     * @class GetInvolvedSection
     * ...........................................................................
     * Create the section that details how people can get involved with the
     * theater.
     * @version 1.0
     * ...........................................................................
     */
    class GetInvolvedSection extends SectionView {
        /** keep track of the data backing this section */
        protected _data: IGetInvolved;
        /** keep track of the sub sections */
        protected _sectionContent: SubSections;
        /** keep track of the styles used by this section */
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles;
        /**...........................................................................
         * _createSectionElements
         * ...........................................................................
         *  create elements specific to the get involved section
         * ...........................................................................
         */
        protected _createSectionElements(): void;
    }
    /**...........................................................................
     * @class InvolvementPopup
     * ...........................................................................
     * Creates a popup for a way for someone to get involved
     * @version 1.0
     * ...........................................................................
     */
    class InvolvementPopup extends KIP.Popup {
        /** data to show for the involvement popup */
        protected _data: IInvolvement;
        /** styles to use for involvement popup */
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles;
        /** return the styles for this element */
        protected _getUncoloredStyles(): KIP.Styles.IStandardStyles;
        /** determines whether we need additional data in order to call the "createElements" function */
        protected _shouldSkipCreateElements(): boolean;
        /**...........................................................................
         * Creates the Get Involved popup
         * @param   data    Data contained within the section
         * ...........................................................................
         */
        constructor(data: IInvolvement, isMobile?: boolean);
        /**...........................................................................
         * _createElements
         * ...........................................................................
         * Creates the elements needed for a "Getting Involved" popup
         * ...........................................................................
         */
        protected _createElements(): void;
        /**...........................................................................
         * draw
         * ...........................................................................
         * Draw the popup
         *
         * @param   parent  The parent upon which to draw this element
         * ...........................................................................
         */
        draw(parent: HTMLElement): void;
        /**...........................................................................
         * erase
         * ...........................................................................
         * Erase the popup
         * ...........................................................................
         */
        erase(): void;
    }
    /**...........................................................................
     * @class InvolvementSubSection
     * ...........................................................................
     * Display ways a person could get involved with the theater
     * @version 1.0
     * @author  Kip Price
     * ...........................................................................
     */
    class InvolvementSubsection extends SubSection<IInvolvement[]> {
        /** styles to use for the subsection */
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles;
        protected _getUncoloredStyles(): KIP.Styles.IStandardStyles;
        /**...........................................................................
         * _createContent
         * ...........................................................................
         * Create the details that will fill this subsection
         * ...........................................................................
         */
        protected _createContent(): void;
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
        private _createGetInvolvedItem(involvedItem);
        /**...........................................................................
        * _showInvolvementPopup
        * ...........................................................................
        *  Show the get involved item specifically
        *
        * @param   involvedItem    The element we are currently drawing
        * ...........................................................................
        */
        protected _showInvolvementPopup(involvedItem: IInvolvement): void;
    }
}
declare namespace BST {
    /**...........................................................................
     * @class NewsSection
     * Contains recent news + information
     * @version 1.0
     * ...........................................................................
     */
    class NewsSection extends SectionView {
        /** the data containing information about upcoming events */
        protected _data: INews[];
        protected readonly _NEWS_ITEMS: number;
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles;
        /**...........................................................................
         * _createSectionElements
         * ...........................................................................
         *
         * ...........................................................................
         */
        protected _createSectionElements(): void;
        protected _createNewsSection(newsItems: INews[], isCollapsed?: boolean): void;
        /**...........................................................................
         * _createNewItem
         * ...........................................................................
         * create an individual news item
         *
         * @param   newsItem
         * ...........................................................................
         */
        private _createNewsItem(newsItem);
        protected _expand(section: HTMLElement, expandLink: HTMLElement, collapseLink: HTMLElement): void;
        protected _collapse(section: HTMLElement, expandLink: HTMLElement, collapseLink: HTMLElement): void;
        protected _onResize(): void;
    }
}
declare namespace BST {
    class HomeView extends View {
        /** styles for the home view */
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles;
        /** data for the home screen */
        protected _data: IHomeData;
        protected _header: BSTHeader;
        /** initialize the view */
        constructor(data: IHomeData, header: BSTHeader);
        /**...........................................................................
         * _createElements
         * ...........................................................................
         * Create all elements needed for the home view
         * ...........................................................................
         */
        protected _createElements(): void;
        /**...........................................................................
         * _createAboutSection
         * ...........................................................................
         *  create the section about BST
         * ...........................................................................
         */
        private _createAboutSection();
        /**...........................................................................
         * _createGetInvolvedSection
         * ...........................................................................
         * create the section of ways people can get involved
         * ...........................................................................
         */
        private _createGetInvolvedSection();
        /**...........................................................................
         * _createNewsSection
         * ...........................................................................
         * create the section containing news items
         * ...........................................................................
         */
        private _createNewsSection();
        /**...........................................................................
         * _createResourcesSection
         * ...........................................................................
         * Create section holding resources for interested parties
         *
         * @returns The created resources section
         * ...........................................................................
         */
        private _createResourcesSection();
        /**...........................................................................
         * _createDonateSection
         * ...........................................................................
         * Create section where patrons can add donations
         *
         * @returns The created donate section
         * ...........................................................................
         */
        private _createDonateSection();
    }
}
declare namespace BST {
    interface ICurrentShowElems extends IViewElements {
        base: HTMLElement;
        details: HTMLElement;
        sidebar: HTMLElement;
        photo: HTMLElement;
    }
    /**...........................................................................
     * @class CurrentShowView
     * View to display for the upcoming show display
     * @version 1.0
     * ...........................................................................
     */
    class CurrentShowView extends View {
        protected _bubbleReference: number;
        bubbleReference: number;
        protected _header: BSTHeader;
        protected _elems: ICurrentShowElems;
        sidebar: HTMLElement;
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles;
        /** set the appropriate ID for this show */
        showID: string;
        /**...........................................................................
         * Create the view that displays the current show
         *
         * @param	showId	The show that we are creating
         * ...........................................................................
         */
        constructor(header: BSTHeader, showId?: string);
        /**...........................................................................
         * _createElements
         * ...........................................................................
         * Create the elements for
         * ...........................................................................
         */
        protected _createElements(): void;
        /**...........................................................................
         * _shouldSkipCreateElements
         * ...........................................................................
         * Make sure we can cretae elements
         * ...........................................................................
         */
        protected _shouldSkipCreateElements(): boolean;
        /**...........................................................................
         * _loadShowData
         * ...........................................................................
         * Call to the server to show the actual show data
         *
         * @param	showId	The ID that represents the show
         * ...........................................................................
         */
        private _loadShowData(showId);
        /**...........................................................................
         * _onError
         * ...........................................................................
         * Handle the case where we can't actually get the show data loaded
         * ...........................................................................
         */
        private _onError();
        /**...........................................................................
         * _createshowUI
         * ...........................................................................
         * Create the UI needed for the current show
         *
         * @param 	show 	The show that should be displayed
         * ...........................................................................
         */
        private _createShowUI(show);
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
        private _createShowPhoto(show);
        private _resizePhotoIfNeeded();
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
        private _getPhotoURL(show);
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
        private _createShowDetails(show);
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
        private _createWriterAndDirectorDetails(showTitle);
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
        private _createButtons(show);
        /**...........................................................................
         * _createErrorMessage
         * ...........................................................................
         * Show an error if there is no show data to load
         *
         * @returns	The element that created
         * ...........................................................................
         */
        private _createErrorMessage();
        protected _onResize(): void;
    }
}
declare namespace BST {
    /**...........................................................................
     * @class SeasonsSidelineView
     * handle showing seasons in the side of the home page
     * @version 1.0
     * ...........................................................................
     */
    class SeasonsSidelineView extends View {
        private _selectedShow;
        private _currentShowView;
        private _seasons;
        private _elements;
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles;
        /**...........................................................................
         * construct the view for the seasons on the side of the home page
         * ...........................................................................
         */
        constructor(header: BSTHeader);
        /**...........................................................................
         * _createElements
         * ...........................................................................
         * create the elements that make up the seasons view
         * ...........................................................................
         */
        protected _createElements(): void;
        /**...........................................................................
         * _createSectionElements
         * ...........................................................................
         * create the elements for the shows
         * ...........................................................................
         */
        protected _createSectionElements(): void;
        /**...........................................................................
         * _createShows
         * ...........................................................................
         *
         * ...........................................................................
         */
        private _createShows();
        /**...........................................................................
         * _createShow
         * ...........................................................................
         * create the HTMl element for a particular show
         * @param miniShow - the show to create an icon for
         * @returns
         * ...........................................................................
         */
        private _createShow(miniShow);
        /**
         * load the data from the seasons file
         */
        private _loadSeasons();
        /**  */
        private _selectCurShowAfterTimeout(showElem, showID);
        /** handle loading a particular show */
        private _loadShow(showID, showElem);
        /** handle selecting a particular element */
        private _selectShow(elem, showID);
        private _selectElem(elem, selectedElem);
    }
}
declare namespace BST {
    /**...........................................................................
     * @class ResourcesSection
     * ...........................................................................
     * Keep track of the resources offered by Broom Street
     * @version 1.0
     * ...........................................................................
     */
    class ResourcesSection extends SectionView {
        /** resources to show in this section */
        protected _data: IResource[];
        /** styles for the resources section */
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles;
        /**...........................................................................
         * _createSectionElements
         * ...........................................................................
         * Create the section elements for resources
         * ...........................................................................
         */
        protected _createSectionElements(): void;
        /**...........................................................................
         * _createResource
         * ...........................................................................
         * Create an individual resource
         *
         * @param   data    The resource we're creating
         * ...........................................................................
         */
        protected _createResource(data: IResource): void;
    }
}
declare namespace BST {
    /**...........................................................................
     * ISeasonsElems
     * ...........................................................................
     * Keeps track of elements needed for displaying seasons data
     * ...........................................................................
     */
    interface ISeasonElems extends ISectionElems {
        /** left hand pane */
        leftPane: HTMLElement;
        /** right hand pane */
        rightPane: HTMLElement;
        /** collect the various elements */
        wrapper: HTMLElement;
        /** allow the user to change the selected season */
        seasonSelector: HTMLElement;
    }
    class SeasonsSection extends SectionView {
        /** elements for the section */
        protected _elems: ISeasonElems;
        /** keep track of the season the user selected */
        protected _selectedSeason: number;
        /** data about all seasons */
        protected _data: ISeasons;
        /** style the seasons section */
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles;
        /**...........................................................................
         * _createSectionElements
         * ...........................................................................
         * Create the elements needed for the section
         * ...........................................................................
         */
        protected _createSectionElements(): void;
        /**...........................................................................
         * _createSeasonSelector
         * ...........................................................................
         * Create the season selector menu
         * ...........................................................................
         */
        protected _createSeasonSelector(): void;
        /**...........................................................................
         * _getSeasonElement
         * ...........................................................................
         * Get the element to select a particular season
         *
         * @param   season  The season year to select
         *
         * @returns The element for this particular element
         * ...........................................................................
         */
        protected _getSeasonElement(season: number): HTMLElement;
    }
}
declare namespace BST {
    /**...........................................................................
     * @class DonateSection
     * ...........................................................................
     * Create the section to collect donations for BST
     * @version 1.0
     * ...........................................................................
     */
    class DonateSection extends SectionView {
        /** the data contained for the donation section */
        protected _data: IDonateInfo;
        /** styles to use for this section  */
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles;
        /**...........................................................................
         * _createSectionElements
         * ...........................................................................
         * Create the elements for the section
         * ...........................................................................
         */
        protected _createSectionElements(): void;
        /**...........................................................................
         * _createPayPalElement
         * ...........................................................................
         * Create the link to Paypal so people can in fact donate
         * ...........................................................................
         */
        protected _createPaypalElement(): void;
    }
}
declare namespace BST {
    class TicketSection extends SectionView {
        protected _data: IShowData;
        protected _weekNum: number;
        protected _ticketBtns: HTMLElement;
        private _selectedElement;
        private static _COLORS;
        private static _HEADERS;
        /** create the appropriate elements for the ticket section */
        protected _createSectionElements(): void;
        /**...........................................................................
         * _createDateGrid
         * ...........................................................................
         *  create the ticket date grid
         * ...........................................................................
         */
        private _createDateGrid();
        /**...........................................................................
         * _createDayHeaders
         * ...........................................................................
         * create headers for each of the show days
         * ...........................................................................
         */
        private _createDayHeaders();
        /**...........................................................................
         * _addDayToCellArray
         * ...........................................................................
         * add a day to the cell array
         * ...........................................................................
         */
        private _addDayToCellArray(dayCell, date, cells);
        /** create a cell for a particular day */
        private _createDayCell(date);
        /** select a particular day in our date grid */
        private _selectCell(cell);
        /** unselect a particular day in our date grid */
        private _unselectCell();
        private _setDayColor(date, dayCell);
        /** create the buttons that allow someone to buy and / or reserve a ticket */
        private _createTicketButtons();
        /** create an individual ticket button */
        private _createTicketButton(txt, cls, addlFee?, warning?);
        private _updateCalculation(tixNum, cost, calculationElem);
        private _enableTicketButtons();
        private _disableTicketButtons();
    }
}
declare namespace BST {
    /**
     * Section for reviews
     * @version 1.0
     */
    class BuzzSection extends SectionView {
        /** the actual reviews */
        protected _data: IReviewData[];
        protected _setData(data: IReviewData[]): void;
        /** create the elements needed by review sections */
        protected _createSectionElements(): void;
        /** create a review for a show */
        private _createReview(review);
        /** create the label on the side of a review, detailing where / when the review came from */
        private _createMetaDetails(review);
    }
}
declare namespace BST {
    class BioSection extends SectionView {
        /** keep track of the bio data for this section */
        protected _data: IBioData[];
        /** keep track of styles for the section */
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles;
        /**...........................................................................
         * _createElements (protected)
         * ...........................................................................
         * Creates all elements needed in the bio section
         * ...........................................................................
         */
        protected _createSectionElements(): void;
    }
    class BioSubsection extends SubSection<IBioData[]> {
        protected _data: IBioData[];
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles;
        protected _getUncoloredStyles(): KIP.Styles.IStandardStyles;
        protected _createContent(): void;
        /**...........................................................................
         * _afterDraw
         * ...........................................................................
         * Handle adjusting the height after the elements have actually been rendered
         * ...........................................................................
         */
        protected _afterDraw(): void;
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
        private _createBio(bio);
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
        private _createBioNames(bio);
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
        private _createBioContent(bio);
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
        private _createBioImage(bio);
    }
}
declare namespace BST {
    /**...........................................................................
     * @class SynopsisSection
     * Synopsis section for a particular show
     * @version 1.0
     * ...........................................................................
     */
    class SynopsisSection extends SectionView {
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles;
        protected _data: IShowData;
        protected _setData(data: IShowData): void;
        /**...........................................................................
         * _createSectionElements
         * ...........................................................................
         * create all elements needed by the synopsis section
         * ...........................................................................
         */
        protected _createSectionElements(): void;
        /**...........................................................................
         * _createSynopsisSection
         * ...........................................................................
         * create the synopsis section
         * @returns
         * ...........................................................................
         */
        private _createSynopsisContent();
        private _createQuickStats();
        private _createOtherStats(hasSynopsis);
        /**...........................................................................
         * _createSynopsisSidebar
         * ...........................................................................
         * create the sidebar of quick facts about a show
         * @returns
         * ...........................................................................
         */
        private _createSynopsisSidebar(hasSynopsis);
        /**...........................................................................
         * _createSidebarElement
         * ...........................................................................
         * sidebar element for the synopsis section
         * @param  lbl
         * @param  content
         * @returns
         * ...........................................................................
         */
        private _createSidebarElement(lbl, content);
        protected _onResize(): void;
    }
}
declare namespace BST {
    /**...........................................................................
     * @class PhotoLoopView
     * ...........................................................................
     * Allow show photos to loop through
     * @version 1.0
     * @author  Kip Price
     * ...........................................................................
     */
    class PhotoLoopView extends View {
        /** keep track of the cental photo */
        private _center;
        /** keep track of the photos we should be showing */
        protected _data: IShowData;
        /** if true, loop through the photos */
        private _looped;
        /** styles to use for the photo element */
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles;
        /**...........................................................................
         * Create the element that can scroll through show photos
         * @param   show
         * ...........................................................................
         */
        constructor(show: IShowData);
        /**...........................................................................
         * _createPhotos
         * ...........................................................................
         * Create the photo elements we will be scrolling through
         * ...........................................................................
         */
        protected _createElements(): void;
        private _tryInitialize();
        /**...........................................................................
         * _createPhoto
         * ...........................................................................
         * create an individual photo for the show
         * ...........................................................................
         */
        private _createPhoto(photo, shouldBeCenter?);
        /**...........................................................................
         * _insertNode
         * ...........................................................................
         * add a node into the list
         * @param   node    The node to add
         * ...........................................................................
         */
        private _insertNode(node);
        /**...........................................................................
         * _finalizeLoop
         * ...........................................................................
         *  link the first and last nodes together
         * ...........................................................................
         */
        private _finalizeLoop();
        /**...........................................................................
         * _rotate
         * ...........................................................................
         * Rotate to the next photo
         * ...........................................................................
         */
        private _rotate();
    }
    /**...........................................................................
     * @class LinkedPhoto
     * ...........................................................................
     * Keep track of a photo that displays in the scrolling display
     * @version 1.0
     * @author  Kip Price
     * ...........................................................................
     */
    class LinkedPhoto {
        protected static _count: number;
        /** element for the photo itself */
        private _photoElem;
        readonly photoElem: HTMLElement;
        /** keep track of the photo that should come next */
        private _next;
        next: LinkedPhoto;
        /** keep track of the photo that came before */
        private _previous;
        previous: LinkedPhoto;
        protected _shiftedCount: number;
        protected _id: number;
        /**...........................................................................
         * Create the linked photo object
         * @param   photo   The photo to display for this node
         * ...........................................................................
         */
        constructor(photo: HTMLElement);
        /**...........................................................................
         * center
         * ...........................................................................
         * Recenter the photo while additionally adjusting which photo is in the middle
         * ...........................................................................
         */
        center(): void;
        /**...........................................................................
         * moveLeft
         * ...........................................................................
         * Move this photo to the left
         * @param   lookToPrevious  If true, figure out how far our previous node is
         *                          before moving
         * ...........................................................................
         */
        moveLeft(lookToPrevious?: boolean): void;
        /**...........................................................................
         * moveRight
         * ...........................................................................
         * Move this node to the right
         * ...........................................................................
         */
        moveRight(): void;
    }
}
declare namespace BST {
    class ScrollableShowPhotos extends View {
        protected _data: IPhoto[];
        protected _shouldSkipCreateElements(): boolean;
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles;
        constructor(data: IPhoto[]);
        protected _createElements(): void;
        protected _createPhoto(photo: IPhoto, cnt: number): HTMLElement;
    }
}
declare namespace BST {
    class AuditionsSection extends SectionView {
        protected _data: IAuditionInfo;
        protected _createSectionElements(): void;
    }
}
declare namespace BST {
    class SimpleTicketSection extends SectionView {
        protected _data: string;
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles;
        protected _shouldSkipCreateElements(): boolean;
        protected _createSectionElements(): void;
    }
}
declare namespace BST {
    /**...........................................................................
     * @class ShowView
     *
     * @version 1.0
     * ...........................................................................
     */
    class ShowView extends View {
        protected _data: Show;
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles;
        /**...........................................................................
         * Create the view particular for a show
         * @param show
         * ...........................................................................
         */
        constructor(show: Show);
        /** ...........................................................................
         * _createElements
         * ...........................................................................
         * create all of the elements needed for a show page
         * ...........................................................................
         */
        protected _createElements(): void;
        private _createPhotos();
        private _createScrollablePhotos();
        private _createSynopsisSection();
        private _createBioSection();
        private _createBuzzSection();
        private _createTicketSection();
        private _createSimpleTicketSection();
    }
}

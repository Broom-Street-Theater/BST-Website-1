/// <reference path="../../../toolkip.ts/typescript/compiled_js/kip.d.ts" />
declare namespace BST {
    interface IDateSelectorTemplate extends KIP.Forms.IFormMultiSelectButtonTemplate<Date> {
        startDate?: Date;
    }
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
    function adminInitialize(): void;
    function adminSaveShow(show: IShowData): void;
}
declare namespace BST {
    const DEBUG: boolean;
    enum NavigationType {
        HOME = 0,
        SHOW = 1,
    }
    function navigate(navigateTo: string, navigateType: NavigationType): void;
    function enableTicketButtons(): void;
    function disableTicketButtons(): void;
    function keyNameToDisplayName(keyName: string): string;
}
declare namespace BST {
    interface IShowData {
        showTitle: IShowTitleDetails;
        showDetails: IShowDetails;
        runDates: Date[];
        bios: IBioData[];
        reviews: IReviewData[];
        photos: IPhoto[];
        auditions: IAuditionInfo;
    }
    interface IShowTitleDetails {
        id: string;
        bptLink: string;
        title: string;
        writer: string;
        director: string;
    }
    interface IShowDetails {
        hasIntermission: boolean;
        showLength: number;
        isKidFriendly: boolean;
        warnings: string;
        synopsis: string;
    }
    interface IAuditionInfo {
        dates: IAuditionDate[];
        characters: ICharacter[];
        expectations: AuditionExpectationType[];
        contactInfo: string;
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
    /** store data about a bio */
    interface IBioData {
        actorName: string;
        roleName: string;
        bio: string;
        imageURL: string;
        website: string;
    }
    interface IHomeData {
        about: IAboutData;
        news: INews[];
        getInvolved: {
            technicians: IInvolvement[];
            actors: IInvolvement[];
            writers: IInvolvement[];
            directors: IInvolvement[];
            general: IInvolvement[];
        };
        menuItems: IMenuItem[];
        logoURL: string;
        bgURL: string;
    }
    interface IAboutData {
        general: string;
        board: ILeaderData[];
        staff: ILeaderData[];
        bylaws: string;
        history: string;
    }
    interface ILeaderData {
        name: string;
        position: string;
    }
    interface IInvolvement {
        icon?: string;
        text: string;
    }
    interface INews {
        title: string;
        content: string;
        author: string;
        date: Date;
    }
    interface IMenuItem {
        name: string;
        type: MenuTypeEnum;
        link: string;
    }
    interface ISeasons {
        [year: string]: IMiniShow[];
    }
    interface IMiniShow {
        name: string;
        id: string;
        endDate: string;
    }
    interface IOnShowLoaded {
        (show: IShowData): void;
    }
    interface IOnHomeLoaded {
        (home: IHomeData): void;
    }
    interface IOnSeasonsLoaded {
        (seasons: ISeasons): void;
    }
    /** send back element data for a section */
    interface ISectionElems {
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
    enum MenuTypeEnum {
        SECTION = 1,
        EXTERNAL = 2,
    }
    interface IHistoryData {
        type: NavigationType;
        showID?: string;
        url?: string;
        title?: string;
    }
}
declare namespace BST {
    function scrollTo(elemID: string): void;
    /** let an element scroll slower than the rest of the page */
    function slowScroll(elem: HTMLElement): void;
    /** allow an element to scroll slower than the rest - assigns negative values */
    function slowReverseScroll(elem: HTMLElement): void;
    /** scroll an element faster than the rest of the screen */
    function fastScroll(elem: HTMLElement): void;
}
declare namespace BST {
    /** load data for a particular show */
    function loadShow(showID: string, onLoaded: IOnShowLoaded, onError?: KIP.IAjaxErrorFunction): void;
    /** load the data for the home page */
    function loadHome(onLoaded: IOnHomeLoaded): void;
    function loadSeasons(onLoaded: IOnSeasonsLoaded): void;
    function saveSeasons(data: ISeasons, onLoaded: IOnSeasonsLoaded): void;
    function testBptAPI(): void;
    function saveShow(showData: IShowData, onComplete: KIP.IAjaxSuccessFunction): void;
    function saveTmpActorPhoto(file: File, successCb: (data: string) => void): void;
    function saveTmpShowPhoto(file: File, successCb: (data: string) => void): void;
}
declare namespace BST {
    interface IRun {
        start: Date;
        end: Date;
    }
    function getShowStartAndEndDates(show: IShowData): IRun;
}
declare namespace BST {
    /** shared class for handling all view types */
    abstract class View {
        protected _data: any;
        protected _view: HTMLElement;
        readonly view: HTMLElement;
    }
}
declare namespace BST {
    abstract class SectionView extends View {
        protected _id: string;
        protected _title: string;
        protected _class: string;
        protected _bgImage: string;
        protected _data: any;
        data: any;
        protected _elements: ISectionElems;
        /** create a section */
        constructor(id: string, title: string, addlClass: string);
        /** handle the creation of the base section elements */
        protected _createSectionElements(): void;
        protected abstract _createElements(): void;
    }
}
declare namespace BST {
    class ErrorPopupView extends View {
        private _detailsElem;
        private _details;
        details: string;
        constructor(details: string);
        private _createElements();
        private _createOverlay();
        private _createForm();
        private _closeAlert();
    }
}
declare namespace BST {
    abstract class SubSection<T> extends View {
        private _tab;
        readonly tab: HTMLElement;
        protected _content: HTMLElement;
        readonly content: HTMLElement;
        protected _data: T;
        private _name;
        protected _view: HTMLElement;
        protected _index: number;
        index: number;
        constructor(data: T, name: string);
        private _createSharedElements();
        protected abstract _createContent(): void;
        /** show a particular section */
        select(): void;
        /** hide a particular subsection */
        deselect(): void;
    }
}
declare namespace BST {
    class SubSections extends View {
        private _subsections;
        private _currentSelection;
        protected _view: HTMLElement;
        private _tabs;
        private _contentPane;
        constructor();
        private _createElements();
        addSubSections(...subsections: SubSection<any>[]): void;
        /** add a subsection to our collection */
        addSubSection(subsection: SubSection<any>): void;
        /** selects the appropriate tab */
        selectTab(index: number): void;
    }
}
declare namespace BST {
    /** handles the about section of the BST homepage */
    class AboutSectionView extends SectionView {
        protected _sectionContent: SubSections;
        protected _data: IAboutData;
        _createElements(): void;
    }
}
declare namespace BST {
    class GetInvolvedSection extends SectionView {
        protected _data: IInvolvement;
        /** create elements specific to the get involved section */
        protected _createElements(): void;
        /** determine what type of involvement we are displaying */
        private _createGetInvolvedType(title, involvedDetails);
        /** create an individual way to get involved */
        private _createGetInvolvedItem(involvedItem);
    }
}
declare namespace BST {
    class NewsSection extends SectionView {
        protected _data: INews[];
        protected _createElements(): void;
        /** create an individual news item */
        private _createNewsItem(newsItem);
    }
}
declare namespace BST {
    class HomeView extends View {
        protected _data: IHomeData;
        constructor(data: IHomeData);
        private _createMainPage();
        /** create the section about BST */
        private _createAboutSection();
        /** create the section of ways people can get involved */
        private _createGetInvolvedSection();
        /** create the section containing news items */
        private _createNewsSection();
    }
}
declare namespace BST {
    class MainMenu extends View {
        /** create the main menu for BST */
        constructor(home: IHomeData);
        private _createMenuItems(home);
        /** create the BST name and logo */
        private _createNameAndLogo(logoURL);
        /** create an item in the menu */
        private _createMenuItem(menuItem);
    }
}
declare namespace BST {
    class CurrentShowView extends View {
        showID: string;
        constructor(showID?: string);
        private _createView();
        private _loadShowData(showID);
        private _onError();
        private _createShowUI(show);
        private _createShowPhoto(show);
        private _getPhotoURL(show);
        private _createShowDetails(show);
        private _createWriterAndDirectorDetails(showTitle);
        private _createButtons(show);
        /** show an error if there is no show data to load */
        private _createErrorMessage();
    }
}
declare namespace BST {
    class SeasonsSidelineView extends View {
        private _selectedYear;
        private _selectedShow;
        private _currentShowView;
        private _seasons;
        private _elements;
        constructor();
        private _createView();
        private _createElements();
        /** create the container of all appropriate years */
        private _createYears();
        /** create a particular year */
        private _createYear(year);
        private _createShows();
        private _createShow(miniShow);
        private _loadSeasons();
        private _loadSeason(year);
        private _selectCurShowAfterTimeout(showElem, showID);
        private _loadShow(showID);
        private _selectYear(elem, year);
        private _selectShow(elem, showID);
        private _selectElem(elem, selectedElem);
    }
}
declare namespace BST {
    class ResourcesSection extends SectionView {
        protected _createElements(): void;
    }
}
declare namespace BST {
    class HeaderView extends View {
        protected _data: IShowData;
        data: IShowData;
        constructor(show: IShowData);
        private _createShowHeader();
        /** create the main nav bar for the show */
        private _createShowMenu();
        /** create the BST name and logo */
        private _createBSTHeader();
        /** create the main navigation bar */
        private _createNavbar(title);
        /** create navigation buttons for the show details */
        private _createShowSubNavbar();
        /** helper to create a button in the show nav bar */
        private _createSubNavBarButton(lbl, sectionID);
        /** creates the show details to show at the top */
        private _createShowTitle();
        /** create the writer - director pair */
        private _createWriterDirectorElement();
        private _createShowDatesElement();
        /** create the writer element */
        private _createWriterElement();
        /** create the director element */
        private _createDirectorElement();
        /** if the writer and director are the same, show them as a combo */
        private _createComboElement();
    }
}
declare namespace BST {
    class TicketSection extends SectionView {
        protected _data: IShowData;
        data: IShowData;
        private _selectedElement;
        private static _COLORS;
        private static _HEADERS;
        /** create the appropriate elements for the ticket section */
        protected _createElements(): void;
        /** create the ticket date grid */
        private _createDateGrid();
        /** create headers for each of the show days */
        private _createDayHeaders();
        /** add a day to the cell array */
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
    }
}
declare namespace BST {
    class BuzzSection extends SectionView {
        protected _data: IReviewData[];
        data: IReviewData[];
        /** create the elements needed by review sections */
        protected _createElements(): void;
        /** create a review for a show */
        private _createReview(review);
        /** create the label on the side of a review, detailing where / when the review came from */
        private _createMetaDetails(review);
    }
}
declare namespace BST {
    class BioSection extends SectionView {
        protected _data: IBioData[];
        data: IBioData[];
        protected _createElements(): void;
        /** create a bio for a member of the show */
        private _createBio(bio);
        /** create just the name elements of the bio */
        private _createBioNames(bio);
        /** create the content of the bio */
        private _createBioContent(bio);
        /** create the image associated with the bio */
        private _createBioImage(bio);
    }
}
declare namespace BST {
    class SynopsisSection extends SectionView {
        protected _data: IShowData;
        data: IShowData;
        /** create all elements needed by the synopsis section */
        protected _createElements(): void;
        /** create the synopsis section */
        private _createSynopsisContent();
        /** create the sidebar of quick facts about a show */
        private _createSynopsisSidebar();
        /** sidebar element for the synopsis section */
        private _createSidebarElement(lbl, content);
    }
}
declare namespace BST {
    class PhotoLoopView extends View {
        private _center;
        protected _data: IShowData;
        private _looped;
        constructor(show: IShowData);
        private _createPhotos();
        /** create an individual photo for the show */
        private _createPhoto(photo);
        /** add a node into the list */
        private _insertNode(node);
        /** link the first and last nodes together */
        private _finalizeLoop();
        private _rotate();
    }
    class LinkedPhoto {
        private _photoElem;
        readonly photoElem: HTMLElement;
        private _next;
        next: LinkedPhoto;
        private _previous;
        previous: LinkedPhoto;
        constructor(photo: HTMLElement);
        center(): void;
        moveLeft(lookToPrevious?: boolean): void;
        moveRight(): void;
    }
}
declare namespace BST {
    class ShowView extends View {
        protected _data: IShowData;
        constructor(show: IShowData);
        /** create all of the elements needed for a show page */
        private _createShowPage();
        private _createPhotos();
        private _createShowHeader();
        private _createSynopsisSection();
        private _createBioSection();
        private _createBuzzSection();
        private _createTicketSection();
    }
}

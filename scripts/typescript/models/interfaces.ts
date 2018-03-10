namespace BST {

    //#region SEASON LOADING

    /**
     * ...........................................................................
     * ISeasons
     * ...........................................................................
     * Collection of IMiniShows that represent the current season
     * ...........................................................................
     */
    export type ISeasons = IMiniShow[];

    /**...........................................................................
     * IMiniShow
     * ...........................................................................
     * Keep track of an abbreviated set of details about a show
     * ...........................................................................
     */
    export interface IMiniShow {

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
    //#endregion

    //#region SERVER LOADING FUNCTIONS
    export interface IOnShowLoaded {
        (show: Show) : void;
    }

    export interface IOnHomeLoaded {
        (home: IHomeData) : void;
    }

    export interface IOnSeasonsLoaded {
        (seasons: ISeasons): void;
    }
    //#endregion

    //#region UI + MISC INTERFACES

    /** send back element data for a section */
    export interface ISectionElems extends KIP.IDrawableElements{
        base: HTMLElement;
        title: HTMLElement;
        content: HTMLElement;
    }

    export interface INavbarElems {
        base: HTMLElement;
        backBtn: HTMLElement;
        content: HTMLElement;
        nextBtn: HTMLElement;
    }

    export interface IShowHeader {
        base: HTMLElement;
    }

    interface IShowPhotos {
        base: HTMLElement;
        photos: HTMLElement[];
    }

    export interface IShowNavbarElems {
        base: HTMLElement;
    }

    export interface IElementDict {
        [key: string] : HTMLElement;
    }

    /**...........................................................................
     * MenuTypeEnum
     * ...........................................................................
     * Types of buttons that can be in a menu
     * ...........................................................................
     */
    export enum MenuTypeEnum {

        /** link to a section */
        SECTION = 1,

        /** link to an external page */
        EXTERNAL = 2
    };

    //#endregion

    //#region INTERFACE FOR NAVIGATION

    /**...........................................................................
     * IHistoryData
     * ...........................................................................
     * Keep track of where we've navigated
     * @version 1.0
     * ...........................................................................
     */
    export interface IHistoryData {

        /** whether we went to the home page or a show page */
        type: NavigationType;

        /** if it was a show page, which show page */
        showID?: string;

        /** the URL to use to load the same page */
        url?: string;

        /** what the title of the site should be in the history */
        title?: string;
    }
    //#endregion

}
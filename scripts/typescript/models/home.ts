namespace BST {
    
    export interface IHomeData {
        about: IAboutData;
        news: INews[];
        getInvolved: IGetInvolved;
        menuItems: IMenuItem[];
        logoURL: string;
        bgURL: string;
        resources?: IResource[];
        donateInfo?: IDonateInfo;
    }

    export interface IGetInvolved {
        technicians: IInvolvement[];
        actors: IInvolvement[];
        writers: IInvolvement[];
        directors: IInvolvement[];
        general: IInvolvement[];
    }

    export interface IAboutData {
        general: string;
        board: ILeaderData[];
        staff: ILeaderData[];
        bylaws: string;
        history: string;
        detailedHistory?: IEvent[];
    }

    export interface ILeaderData {
        name: string;
        position: string;
    }

    export interface IInvolvement {
        icon?: string;
        text: string;
        content: string;
        contactInfo: IContactInfo;
    }

    export interface IContactInfo {
        email: string;
        phone: string;
        name: string;
    }

    export interface INews {
        title: string;
        content: string;
        author: string;
        date: Date;
        isImportant?: boolean;
    }

    export interface IMenuItem {
        name: string;
        type: MenuTypeEnum;
        link: string;
    }

    export interface IResource {
        name: string;
        content: string;
        link: string;
    }

    export interface IEvent {
        date: Date;
        header?: string;
        details: string;
    }

    export interface IDonateInfo {
        blurb: string;
        paypalAccount: string;
    }
}
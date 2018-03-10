namespace BST {


    export interface IShowData {

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

    export interface IShowTitleDetails {

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
    };

    export interface IShowDetails {

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
    };

    export interface IAuditionInfo {

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

    export interface ICharacter {
        description: string;
        name: string;
        gender: IGenderEnum;
        minAge: number;
        maxAge: number;
    }

    export enum IGenderEnum {
        NO_PREFERENCE = 0,
        FEMALE = 1,
        MALE = 2,
        NON_BINARY = 3
    }

    export enum AuditionExpectationType {
        MONOLOGUE = 1,
        COLD_READ = 2,
        DANCE_CALL = 3,
        SINGING = 4,
        IMPROV = 5
    }

    export interface IAuditionDate {
        start: Date;
        end: Date;
        location: IAddress;
    }

    export interface IAddress {
        name: string;
        addressLines: string;
        city: string;
        state: string;
        zip: number;
    }

    export interface IPhoto {
        url: string;
        photographer?: string;
        copyrightText?: string;
        isPoster: boolean;
        isHilite: boolean;
    }

    /** store data about a review */
    export interface IReviewData {
        reviewer: string;
        date: Date;
        link: string;
        review: string;
    }

    export enum CastOrCrew {
        CAST = 1,
        CREW = 2,
        SPECIAL_MENTION = 3
    }
    
    /** store data about a bio */
    export interface IBioData {
        actorName: string;
        roleName: string;
        bio: string;
        imageURL: string;
        website: string;
        type: CastOrCrew;
    }

    export interface IRun {
        start: Date;
        end: Date;
    }

    /**...........................................................................
     * @class Show
     * Keep track of the show object
     * @version 1.0
     * ...........................................................................
     */
    export class Show implements IShowData {

        /** basic details about the show */
        protected _showTitle: IShowTitleDetails;
        public get showTitle(): IShowTitleDetails { return this._showTitle; }
        
        /** details about the show */
        protected _showDetails: IShowDetails;
        public get showDetails(): IShowDetails { return this._showDetails; };

        /** the dates of the run */
        protected _runDates: Date[];
        public get runDates(): Date[] { return this._runDates; }

        /** actor bios */
        protected _bios: IBioData[];
        public get bios(): IBioData[] { return this._bios; }

        /** any associated reviews */
        protected _reviews: IReviewData[];
        public get reviews(): IReviewData[] { return this._reviews; }

        /** photos for the show */
        protected _photos: IPhoto[];
        public get photos(): IPhoto[] { return this._photos; }

        /** auditions for the show */
        protected _auditions: IAuditionInfo;
        public get auditions(): IAuditionInfo { return this._auditions; }

        /** what the run of the show will be */
        protected _run: IRun;
        public get run(): IRun { return this.getStartAndEndDates(); }

        /**...........................................................................
         * create a show class
         * 
         * @param   showData    Content of this show
         * ...........................................................................
         */
        constructor(showData: IShowData) {
            showData = this._parseDates(showData);

            this._showTitle = showData.showTitle;
            this._showDetails = showData.showDetails;
            this._runDates = showData.runDates;
            this._bios = showData.bios;
            this._reviews = showData.reviews;
            this._photos = showData.photos;
            this._auditions = showData.auditions;
        }

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
        protected _parseDates(showData: IShowData): IShowData {
            
            // map the appropriate dates
            let i: number;
            if (!showData.runDates) { showData.runDates = []; }
            for (i = 0; i < showData.runDates.length; i += 1) {
                showData.runDates[i] = new Date(showData.runDates[i] as any);
            }

            // handle review dates
            if (!showData.reviews) { showData.reviews = []; }
            for (i = 0; i < showData.reviews.length; i += 1) {
                if (!showData.reviews[i]) { continue; }
                showData.reviews[i].date = new Date(showData.reviews[i].date as any);
            }

            // handle audition dates
            if (showData.auditions && showData.auditions.dates) {
                for (i = 0; i < showData.auditions.dates.length; i += 1) {
                    let auditionDate: IAuditionDate = showData.auditions.dates[i];
                    auditionDate.start = new Date(auditionDate.start as any);
                    auditionDate.end = new Date(auditionDate.end as any);

                    showData.auditions.dates[i] = auditionDate;
                }
            }

            return showData;
        }

        /**...........................................................................
         * getStartAndEndDates
         * ...........................................................................
         * Figure out when the show is actually running
         * 
         * @returns Run dates of the show
         * ...........................................................................
         */
        public getStartAndEndDates(): IRun {

            // return the already calculated run if we have it
            if (this._run) { return this._run; }

            // otherwise, loop through 
            let dates: Date[] = this._runDates;

            dates = dates.sort((a: Date, b: Date) => {
                if (a < b) { return -1; }
                if (a > b) { return 1; }
                return 0;
            });
            
            let out: IRun = {
                start: dates[0],
                end: dates[dates.length - 1]
            }
    
            this._run = out; 

            return out;
        }
    
        /**...........................................................................
         * shouldShowBioSection
         * ...........................................................................
         * determine whether there are bios to show
         * 
         * @returns True if this show has bios
         * ...........................................................................
         */
        public shouldShowBioSection () : boolean {
            if (!this.bios) { return false; }
            if (this.bios.length === 0) { return false; }
            return true;
        }
    
        /**...........................................................................
         * shouldShowBuzzSection
         * ...........................................................................
         * determine whether there are reviews to show
         * 
         * @returns True if this show has any reviews
         * ...........................................................................
         */
        public shouldShowBuzzSection () : boolean {
            if (!this.reviews) { return false; }
            if (this.reviews.length === 0) { return false; }
            return true;
        }
    
        /**...........................................................................
         * shouldShowAuditionsSection
         * ...........................................................................
         * determine whether there are auditions
         * 
         * @returns True if this show has any auditions
         * ...........................................................................
         */
        public shouldShowAuditionsSection () : boolean {
            if (!this.auditions) { return false; }
            if (this.auditions.dates.length === 0) { return false; }

            let run: IRun = this.run;
            let today: Date = KIP.Dates.getToday();

            if (run.start < today) { return false; }
            return true;
        }
    
        /**...........................................................................
         * shouldShowTicketSection
         * ...........................................................................
         * determine whether we should be showing the ticket section
         * 
         * @returns True if this show has tickets available
         * ...........................................................................
         */
        public shouldShowTicketSection () : boolean {
            if (!this.runDates) { return false; }
            if (this.runDates.length === 0) { return false; }
            if (!this.showTitle.bptLink ) { return false; } 

            return this.hasShowEnded();
        }

        /**...........................................................................
         * hasShowEnded
         * ...........................................................................
         * Determine if this show is already over
         * 
         * @returns True if the show has ended
         * ...........................................................................
         */
        public hasShowEnded(): boolean {
            let run: IRun = this.run;
            let today: Date = KIP.Dates.getToday();

            if (run.end < today) { return false; }
            return true;
        }
    }
}
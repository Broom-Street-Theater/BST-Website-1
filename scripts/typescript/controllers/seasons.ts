namespace BST.Helpers {

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
    export function sortSeasons(seasons: ISeasons): ISeasons {
         let newArr = seasons.sort((a: IMiniShow, b: IMiniShow) => {
            let dateA: Date = new Date(a.endDate);
            let dateB: Date = new Date(b.endDate);

            if (dateA < dateB) { return -1; }
            if (dateB < dateA) { return 1; }
            return 0;
        }); 
        return seasons;
    }

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
    export function findImmediateShow(seasons: ISeasons): IMiniShow[] {
        let out: IMiniShow[] = [];

        seasons = sortSeasons(seasons);
        let today: Date = KIP.Dates.getToday();

        let idx: number = seasons.length - 1;
        let foundCenter: number = seasons.length - 1;
        for (idx; idx >= 0; idx -= 1) {
            let show: IMiniShow = seasons[idx];
            
            let curEndDate: Date = new Date(show.endDate);

            // this is the first out of bounds show
            if (today > curEndDate) { break; }

            foundCenter = idx;
        }

        seasons[foundCenter].selected = true;

        // now that we have found an index, get the things around it
        let startIdx: number = foundCenter - 2;
        let endIdx: number = foundCenter + 2;

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
}
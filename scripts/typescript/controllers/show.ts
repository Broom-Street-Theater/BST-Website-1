namespace BST.Helpers {
    
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
    export function getShowStartAndEndDates(showData: IShowData): IRun {
        let show: Show = new Show(showData);
        return show.getStartAndEndDates();
    }
}
namespace BST {

    /**...........................................................................
     * pushHistoryState
     * ...........................................................................
     * make sure we can return to the right page
     * 
     * @param   history     The page to return to when hitting the back button
     * ...........................................................................
     */
    export function pushHistoryState(history: IHistoryData): void {
        window.history.pushState(
            history,
            history.title,
            history.url
        );
    }

    /**...........................................................................
     * _handleState
     * ...........................................................................
     * Override the back button to go to the right page
     * ...........................................................................
     */

    function _handleState(): void {
        let state: IHistoryData = window.history.state;
        if (!state) { return; }
        navigate(state.showID, state.type);
    }

    window.addEventListener("popstate", () => {
        _handleState();
    });

}
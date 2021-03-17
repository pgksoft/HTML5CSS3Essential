export class DOMViewItems {
    constructor(showFindParms, dicFiles, dicSelectFiles, dicToWatch, dicToState, dicRemove, dicSearch, dicClearSearch, showLoader, dicTHeder, dicRowHeader, markAllRows, imgMarkAllRows, dicTBody, dicContextMenu, cmItemSelectFiles, cmToWatch, cmToState, cmItemDel, cmItemFind, cmItemClearFind) {
        this._showFindParms = showFindParms;
        this._dicFiles = dicFiles;
        this._dicSelectFiles = dicSelectFiles;
        this._dicToWatch = dicToWatch;
        this._dicToState = dicToState;
        this._dicRemove = dicRemove;
        this._dicSearch = dicSearch;
        this._dicClearSearch = dicClearSearch;
        this._showLoader = showLoader;
        this._dicTHeder = dicTHeder;
        this._dicRowHeader = dicRowHeader;
        this._markAllRows = markAllRows;
        this._imgMarkAllRows = imgMarkAllRows;
        this._dicTBody = dicTBody;
        this._dicContextMenu = dicContextMenu;
        this._cmItemSelectFiles = cmItemSelectFiles;
        this._cmToWatch = cmToWatch;
        this._cmToState = cmToState;
        this._cmItemDel = cmItemDel;
        this._cmItemFind = cmItemFind;
        this._cmItemClearFind = cmItemClearFind;
    }
    static get instance() {
        if (!DOMViewItems._instance) {
            throw new Error('Instance of ../model/modelViewItems.ts was not created.');
        }
        return DOMViewItems._instance;
    }
    get showFindParms() { return this._showFindParms; }
    get dicFiles() { return this._dicFiles; }
    get dicSelectFiles() { return this._dicSelectFiles; }
    get dicToWatch() { return this._dicToWatch; }
    get dicToState() { return this._dicToState; }
    get dicRemove() { return this._dicRemove; }
    get dicSearch() { return this._dicSearch; }
    get dicClearSearch() { return this._dicClearSearch; }
    get showLoader() { return this._showLoader; }
    get dicTHeder() { return this._dicTHeder; }
    get dicRowHeader() { return this._dicRowHeader; }
    get markAllRows() { return this._markAllRows; }
    get imgMarkAllRows() { return this._imgMarkAllRows; }
    get dicTBody() { return this._dicTBody; }
    get dicContextMenu() { return this._dicContextMenu; }
    get cmItemSelectFiles() { return this._cmItemSelectFiles; }
    get cmToWatch() { return this._cmToWatch; }
    get cmToState() { return this._cmToState; }
    get cmItemDel() { return this._cmItemDel; }
    get cmItemFind() { return this._cmItemFind; }
    get cmItemClearFind() { return this._cmItemClearFind; }
    static Create(showFindParms, dicFiles, dicSelectFiles, dicToWatch, dicToState, dicRemove, dicSearch, dicSearchClear, showLoader, dicTHeder, dicRowHeader, markAllRows, imgMarkAllRows, dicTBody, dicContextMenu, cmItemSelectFiles, cmToWatch, cmToState, cmItemDel, cmItemFind, cmItemClearFind) {
        if (!DOMViewItems._instance) {
            this._instance = new DOMViewItems(showFindParms, dicFiles, dicSelectFiles, dicToWatch, dicToState, dicRemove, dicSearch, dicSearchClear, showLoader, dicTHeder, dicRowHeader, markAllRows, imgMarkAllRows, dicTBody, dicContextMenu, cmItemSelectFiles, cmToWatch, cmToState, cmItemDel, cmItemFind, cmItemClearFind);
        }
        return DOMViewItems._instance;
    }
}
DOMViewItems._instance = undefined;
//# sourceMappingURL=modelViewItems.js.map
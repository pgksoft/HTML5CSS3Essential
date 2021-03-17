export class DOMViewItems {
    private constructor(
        showFindParms: HTMLElement,
        //
        dicFiles: HTMLInputElement,
        dicSelectFiles: HTMLElement,
        dicToWatch: HTMLElement,
        dicToState: HTMLElement,
        dicRemove: HTMLElement,
        dicSearch: HTMLElement,
        dicClearSearch: HTMLElement,
        showLoader: HTMLElement,
        //
        dicTHeder: HTMLElement,
        dicRowHeader: HTMLElement,
        markAllRows: HTMLInputElement,
        imgMarkAllRows: HTMLImageElement,
        dicTBody: HTMLElement,
        //
        dicContextMenu: HTMLElement,
        cmItemSelectFiles: HTMLElement,
        cmToWatch: HTMLElement,
        cmToState: HTMLElement,
        cmItemDel: HTMLElement,
        cmItemFind: HTMLElement,
        cmItemClearFind: HTMLElement
    ) {
        this._showFindParms = showFindParms;
        //
        this._dicFiles = dicFiles;
        this._dicSelectFiles = dicSelectFiles;
        this._dicToWatch = dicToWatch;
        this._dicToState = dicToState;
        this._dicRemove = dicRemove;
        this._dicSearch = dicSearch;
        this._dicClearSearch = dicClearSearch;
        this._showLoader = showLoader;
        //
        this._dicTHeder = dicTHeder;
        this._dicRowHeader = dicRowHeader;
        this._markAllRows = markAllRows;
        this._imgMarkAllRows = imgMarkAllRows;
        this._dicTBody = dicTBody;
        //
        this._dicContextMenu = dicContextMenu;
        this._cmItemSelectFiles = cmItemSelectFiles;
        this._cmToWatch = cmToWatch;
        this._cmToState = cmToState;
        this._cmItemDel = cmItemDel;
        this._cmItemFind = cmItemFind;
        this._cmItemClearFind = cmItemClearFind;
    }

    // Fields
    private static _instance: DOMViewItems = undefined;
    //
    private _showFindParms: HTMLElement;
    //
    private _dicFiles: HTMLInputElement;
    private _dicSelectFiles: HTMLElement;
    private _dicToWatch: HTMLElement;
    private _dicToState: HTMLElement;
    private _dicRemove: HTMLElement;
    private _dicSearch: HTMLElement;
    private _dicClearSearch: HTMLElement;
    private _showLoader: HTMLElement;
    //
    private _dicTHeder: HTMLElement;
    private _dicRowHeader: HTMLElement;
    private _markAllRows: HTMLInputElement;
    private _imgMarkAllRows: HTMLImageElement;
    private _dicTBody: HTMLElement;
    //
    private _dicContextMenu: HTMLElement;
    private _cmItemSelectFiles: HTMLElement;
    private _cmToWatch: HTMLElement;
    private _cmToState: HTMLElement;
    private _cmItemDel: HTMLElement;
    private _cmItemFind: HTMLElement;
    private _cmItemClearFind: HTMLElement;

    // Properties
    static get instance(): DOMViewItems {
        if (!DOMViewItems._instance) {
            throw new Error('Instance of ../model/modelViewItems.ts was not created.');
        }
        return DOMViewItems._instance;
    }
    //
    get showFindParms(): HTMLElement { return this._showFindParms; }
    //
    get dicFiles(): HTMLInputElement { return this._dicFiles; }
    get dicSelectFiles(): HTMLElement { return this._dicSelectFiles; }
    get dicToWatch(): HTMLElement { return this._dicToWatch; }
    get dicToState(): HTMLElement { return this._dicToState; }
    get dicRemove(): HTMLElement { return this._dicRemove; }
    get dicSearch(): HTMLElement { return this._dicSearch; }
    get dicClearSearch(): HTMLElement { return this._dicClearSearch; }
    get showLoader(): HTMLElement { return this._showLoader; }
    //
    get dicTHeder(): HTMLElement { return this._dicTHeder; }
    get dicRowHeader(): HTMLElement { return this._dicRowHeader; }
    get markAllRows(): HTMLInputElement { return this._markAllRows; }
    get imgMarkAllRows(): HTMLImageElement { return this._imgMarkAllRows; }
    get dicTBody(): HTMLElement { return this._dicTBody; }
    //
    get dicContextMenu(): HTMLElement { return this._dicContextMenu; }
    get cmItemSelectFiles(): HTMLElement { return this._cmItemSelectFiles; }
    get cmToWatch(): HTMLElement { return this._cmToWatch; }
    get cmToState(): HTMLElement { return this._cmToState; }
    get cmItemDel(): HTMLElement { return this._cmItemDel; }
    get cmItemFind(): HTMLElement { return this._cmItemFind; }
    get cmItemClearFind(): HTMLElement { return this._cmItemClearFind; }

    // Methods
    static Create(
        showFindParms: HTMLElement,
        //
        dicFiles: HTMLInputElement,
        dicSelectFiles: HTMLElement,
        dicToWatch: HTMLElement,
        dicToState: HTMLElement,
        dicRemove: HTMLElement,
        dicSearch: HTMLElement,
        dicSearchClear: HTMLElement,
        showLoader: HTMLElement,
        //
        dicTHeder: HTMLElement,
        dicRowHeader: HTMLElement,
        markAllRows: HTMLInputElement,
        imgMarkAllRows: HTMLImageElement,
        dicTBody: HTMLElement,
        //
        dicContextMenu: HTMLElement,
        cmItemSelectFiles: HTMLElement,
        cmToWatch: HTMLElement,
        cmToState: HTMLElement,
        cmItemDel: HTMLElement,
        cmItemFind: HTMLElement,
        cmItemClearFind: HTMLElement
    ): DOMViewItems {
        if (!DOMViewItems._instance) {
            this._instance = new DOMViewItems(
                showFindParms,
                //
                dicFiles,
                dicSelectFiles,
                dicToWatch,
                dicToState,
                dicRemove,
                dicSearch,
                dicSearchClear,
                showLoader,
                //
                dicTHeder,
                dicRowHeader,
                markAllRows,
                imgMarkAllRows,
                dicTBody,
                //
                dicContextMenu,
                cmItemSelectFiles,
                cmToWatch,
                cmToState,
                cmItemDel,
                cmItemFind,
                cmItemClearFind
            );
        }
        return DOMViewItems._instance;
    }
}
import { VGaDomItems } from '../model/vgaItems.js'
import { DOMViewItems } from '../model/modelViewItems.js'
import {
    Command,
    CommandState,
    Control,
    ContextMenu,
    MarkRow,
    MarkAllRows,
    CustomEventchangeMarkRow,
    CustomEventChangeMarkAllRows,
    TypeAction,
    requestFrame,
    Confirm,
    isDisplayBlock
} from '../../../../js-advanced/_pgkUtils.js'
import {
    Params,
    CustomEventWorkViewCloseEscKey,
    CustomEventUpLoad,
    CustomEventContentsChange,
    secondUploader
} from '../model/vgaParams.js'
import {
    DBContent,
    DBContentSortable
} from '../model/modelView.js'
import {
    VideoContent,
    TypeLocation
} from '../model/vgaContent.js'
import { ConfirmItems } from '../../../../model/confirmItems.js'

export const CustomEventToWatch: string = 'vga-view-to watch';

const classCell: string = `cell clip cell-vertical-center cell-horizontal-center`;
enum KindLoad { All, AddedRecord, UpdatedRecord };

type Test = {
    valueTest: string,
    idTest: string
}

export class ViewContents {
    private constructor(
        domItems: VGaDomItems,
        domViewItems: DOMViewItems
    ) {
        this._domItems = domItems;
        this._domViewItems = domViewItems;
        //
        MarkRow.imgCheckBlankOutlineBlack = '../../img/checkbox-blank-outline-black.png';
        MarkRow.imgCheckBoxOutline = '../../img/check-box-outline.png';
        this._markAllRows = new MarkAllRows(this.domViewItems.markAllRows, this.domViewItems.imgMarkAllRows);
        //
        this.DefineCommans();
        this.DefineEvents();
        this.DependencyResolutions();
        //
        this.ShowGets();
        //
        this._tests = [
            { idTest: '1', valueTest: '111-111' },
            { idTest: '2', valueTest: '222-222' },
            { idTest: '3', valueTest: '333-333' }
        ];
        console.log(this._tests);
    }

    // Fields
    static _instance: ViewContents = undefined;
    private _domItems: VGaDomItems;
    private _domViewItems: DOMViewItems;
    //
    private _collection: DBContentSortable<DBContent> = new DBContentSortable();
    private _markRows: MarkRow<DBContent>[] = [];
    private _markAllRows: MarkAllRows<DBContent>;
    private _cmdSelectFiles: Command;
    private _cmdToWatch: Command;
    private _cmdToState: Command;
    private _cmdFind: Command;
    private _cmdClearFind: Command;
    private _cmdRemove: Command;
    private _controls: Control[] = [];
    private _cm: ContextMenu;
    //
    private _selected: HTMLElement = undefined;
    private _tests: Test[];

    // Properties
    static get instance(): ViewContents {
        if (!this._instance) {
            throw new Error('Instance of ../view/viewContents.ts was not created.');
        }
        return this._instance;
    }
    get domItems(): VGaDomItems { return this._domItems; }
    get domViewItems(): DOMViewItems { return this._domViewItems; }

    // Properties to help
    private get countSelected(): number { return this._markRows.reduce((prev, current) => prev + (current.checked ? 1 : 0), 0); }
    private get isSelected(): boolean { return this.countSelected > 0; }

    // Methods
    static Create(
        domItems: VGaDomItems,
        domViewItems: DOMViewItems
    ): ViewContents {
        if (!this._instance) {
            this._instance = new ViewContents(
                domItems,
                domViewItems
            );
        }
        return this._instance;
    }

    Open(): void {
        // Setting actual values
        this.Load(KindLoad.All);
        // To Active
        this.domItems.closeView.onclick = () => { this.Close(); };
        this.domItems.workView.style.display = 'block';
        this.AlignWidthTables();
        this.OnChangeMarkAllRows();
    }

    // Helpers
    private DependencyResolutions(): void {
        Confirm.Create(
            ConfirmItems.instance.confirm,
            ConfirmItems.instance.header,
            ConfirmItems.instance.about,
            ConfirmItems.instance.yes,
            ConfirmItems.instance.no
        );
    }

    private ShowGets(): void {
        //
        if (this._collection.length > 0) {
            this._markAllRows.isDisable = false;
        } else {
            this._markAllRows.isDisable = true;
        }
        //
        if (this.isSelected) {
            this._cmdRemove.state = CommandState.Enable;
        } else {
            this._cmdRemove.state = CommandState.Disable;
        }
        //
        if (this._selected) {
            this._cmdToWatch.state = CommandState.Enable;
        } else {
            this._cmdToWatch.state = CommandState.Disable;
        }
        //
        if (this._selected && Params.instance.currentIndexContent >= 0) {
            if (this.IsSelectEqualToWatch()) {
                this._cmdToState.state = CommandState.Enable;
                let content: VideoContent = this.GetSelectedContent();
                if (content) {
                    if (content.isPlay) {
                        this.SetToPause();
                    } else {
                        this.SetToPlay();
                    }
                } else {
                    this._cmdToState.state = CommandState.Disable;
                }
            } else {
                this._cmdToState.state = CommandState.Disable;
            }
        } else {
            this._cmdToState.state = CommandState.Disable;
        }
    }

    private DefineCommans(): void {
        this._cm = new ContextMenu(this.domViewItems.dicContextMenu);
        //
        this._cmdSelectFiles = new Command(
            'select-files',
            TypeAction.SelectLocalFiles,
            CommandState.Enable,
            this.OnSelectFiles,
            this
        );
        //
        this._cmdToWatch = new Command(
            'to-watch',
            TypeAction.IsSelected,
            CommandState.Disable,
            this.OnToWatch,
            this
        );
        //
        this._cmdToState = new Command(
            'to-state',
            TypeAction.ToState,
            CommandState.Disable,
            this.OnToState,
            this
        );
        //
        this._cmdRemove = new Command(
            'remove',
            TypeAction.Remove,
            CommandState.Disable,
            this.Remove,
            this
        );
        //
        this._controls.push(new Control(this.domViewItems.dicSelectFiles, this._cmdSelectFiles));
        this._controls.push(new Control(this.domViewItems.cmItemSelectFiles, this._cmdSelectFiles));
        this._controls.push(new Control(this.domViewItems.dicToWatch, this._cmdToWatch));
        this._controls.push(new Control(this.domViewItems.cmToWatch, this._cmdToWatch));
        this._controls.push(new Control(this.domViewItems.dicToState, this._cmdToState));
        this._controls.push(new Control(this.domViewItems.cmToState, this._cmdToState));
        this._controls.push(new Control(this.domViewItems.dicRemove, this._cmdRemove));
        this._controls.push(new Control(this.domViewItems.cmItemDel, this._cmdRemove));
    }

    private DefineEvents(): void {
        window.addEventListener('resize', () => { this.AlignWidthTables(); }, false);
        document.addEventListener(CustomEventWorkViewCloseEscKey, () => { this.OnEscKey(); }, false);
        //
        this.domViewItems.dicFiles.addEventListener('change', () => { this.OnFilesChange(); }, false);
        //
        this.domViewItems.dicRowHeader.addEventListener('contextmenu', (e) => { this.OnRowContextmenu(e); }, false);
        this.domViewItems.dicRowHeader.addEventListener('click', (e: MouseEvent) => { this.OnColumnSorted(e); }, false);
        //
        document.addEventListener(CustomEventChangeMarkAllRows, (e: CustomEvent) => { this.OnChangeMarkAllRows(); }, false);
        document.addEventListener(CustomEventchangeMarkRow, (e: CustomEvent) => { this.OnChangeMarkRow(); }, false);
        //
    }

    private OnSelectFiles(): void {
        this.domViewItems.dicFiles.click();
    }

    private OnToWatch(): void {
        if (this._selected) {
            let content: VideoContent = this.GetSelectedContent();
            if (content) {
                document.dispatchEvent(new CustomEvent(CustomEventToWatch, { bubbles: true, detail: { name: content.name, location: content.typeLocation } }));
                this.ShowGets();
            }
        }
    }

    private OnToState(): void {
        let content: VideoContent = this.GetSelectedContent();
        if (content) {
            if (content.isPlay) {
                this.domItems.video.pause();
            } else {
                this.domItems.video.play();
            }
            window.setTimeout(() => { this.ShowGets(); }, 100);
        }
    }

    private OnFilesChange(): void {
        if (this.domViewItems.dicFiles.files.length) {
            this.domViewItems.showLoader.dataset.enabled = 'true';
            this.WaitingDownload(Array.from(this.domViewItems.dicFiles.files));
            this.domItems.files.files = this.domViewItems.dicFiles.files;
            document.dispatchEvent(new CustomEvent(CustomEventUpLoad, { bubbles: true, detail: { who: secondUploader } }));
        }
    }

    private WaitingDownload(files: File[]) {
        let amountUpLoaded: number = files.reduce((prev, item) => {
            if (Params.instance.contents.some(
                content =>
                    content.name == item.name
                    && content.typeLocation == TypeLocation.Local
                    && content.isLoaded
                    && content.posterSrc.length > 0
            )
            ) {
                return prev + 1;
            } else {
                return prev;
            }
        }, 0)
        if (amountUpLoaded == files.length) {
            // is-uploaded
            this.domViewItems.showLoader.dataset.enabled = 'false';
            this.Load(KindLoad.All);
            this.AlignWidthTables();
        } else {
            requestFrame(() => this.WaitingDownload(files));
        }
    }

    private OnEscKey(): void {
        if (isDisplayBlock(ConfirmItems.instance.confirm)) {
            ConfirmItems.instance.confirm.style.display = 'none';
        } else {
            this.Close();
        }
    }

    private Close(): void {
        this.domItems.workView.style.display = 'none';
        this._collection.clear();
        this.domViewItems.dicTBody.innerHTML = '';
    }

    private OnRowContextmenu(e): void {
        e.preventDefault();
        this._cm.On(<MouseEvent>e);
    }

    private AlignWidthTables(): void {
        if (this.domViewItems.dicTBody.offsetWidth == this.domViewItems.dicTBody.clientWidth) {
            this.domViewItems.dicTHeder.style.width = `${this.domViewItems.dicTBody.clientWidth}px`;
        }
    }

    private OnColumnSorted(e: MouseEvent) {
        let column = <HTMLElement>(<HTMLElement>e.target).closest('.cell');
        if (column.dataset.sort) {
            this._collection.NextSortStep(Number(column.dataset.sort))
            this.Load(KindLoad.All);
        }
    }

    private OnChangeMarkAllRows() {
        for (let mark of this._markRows) {
            mark.checked = this._markAllRows.checked;
            mark.OnChange();
        }
    }

    private OnChangeMarkRow(): void {
        this.ShowGets();
    }

    private Remove(): void {
        new Promise((resolve) => {
            Confirm.instance.OpenConfirmDelete(`Удалить ${this.countSelected} из ${this._markRows.length}`, resolve);
        }).then((value) => {
            if (value == 'yes') {
                this._markRows.forEach(mark => {
                    if (mark.checked) {
                        let content: VideoContent = this._collection.find(mark.valueRow.primaryKey).content;
                        if (content) {
                            Params.instance.contents = Params.instance.contents.filter(item => !(item.name == content.name && item.typeLocation == content.typeLocation));
                        }
                    }
                });
                document.dispatchEvent(new CustomEvent(CustomEventContentsChange, { bubbles: true }));
                this.Load(KindLoad.All);
                this.AlignWidthTables();
            } else if (value == 'no') {
                ConfirmItems.instance.confirm.style.display = 'none';
            }
        });
    }

    private Load(kind: KindLoad, primaryKey: number = 0): void {
        let records: VideoContent[] = [...Params.instance.contents];
        // let's fulfill the search conditions

        // 
        switch (kind) {
            case KindLoad.All:
                this.domViewItems.dicTBody.innerHTML = '';
                this._collection.clear();
                this.LoadedToShow(records);
                break;
        }
        this.ShowGets();
    }

    private LoadedToShow(records: VideoContent[]): void {
        for (let rec of records) {
            this._collection.add(new DBContent(0, rec));
        }
        for (let rec of this._collection.sorted) {
            this.ShowBody(rec);
        }
    }

    private ShowBody(item: DBContent): void {
        let row = document.createElement('div');
        row.className = 'row';
        row.dataset.primaryKey = item.primaryKey.toString();
        row.addEventListener('click', (e) => { this.OnClickRow(e); }, false);
        row.addEventListener('contextmenu', (e) => { this.OnClickRow(e); }, false);
        row.addEventListener('contextmenu', (e) => { this.OnRowContextmenu(e); }, false);
        // check
        let cell = document.createElement('div');
        cell.className = 'cell w3prc cell-horizontal-center cell-vertical-center';
        if (item.content.typeLocation == TypeLocation.Local) {
            let check = document.createElement('input');
            check.type = 'checkbox';
            check.id = item.primaryKey.toString();
            cell.appendChild(check);
            let lbl = document.createElement('label');
            lbl.htmlFor = check.id;
            let img = document.createElement('img');
            lbl.appendChild(img);
            cell.appendChild(lbl);
            let markRow = new MarkRow<DBContent>(check, img);
            markRow.valueRow = item;
            markRow.row = row;
            this._markRows.push(markRow);
        }
        row.appendChild(cell);
        // Poster
        cell = document.createElement('div');
        cell.className = 'cell w4prc cell-vertical-center cell-horizontal-center';
        cell.dataset.nameField = 'Poster';
        if (item.content.posterSrc.length > 0) {
            let img = document.createElement('img');
            img.src = item.content.posterSrc;
            cell.appendChild(img);
        }
        row.appendChild(cell);
        // Name
        cell = document.createElement('div');
        cell.className = 'cell w40prc cell-vertical-center p-l-0-2prc';
        cell.textContent = item.content.name;
        cell.dataset.nameField = 'Name';
        row.appendChild(cell);
        // location
        cell = document.createElement('div');
        cell.className = `${classCell} w7prc`;
        cell.textContent = TypeLocation[item.content.typeLocation];
        cell.dataset.nameField = 'Location';
        row.appendChild(cell);
        // Duration
        cell = document.createElement('div');
        cell.className = `${classCell} w10prc`;
        cell.textContent = new Date(item.content.duration * 1000).toISOString().slice(11, -1);
        cell.dataset.nameField = 'Duration';
        row.appendChild(cell);
        // Poster time
        cell = document.createElement('div');
        cell.className = `${classCell} w10prc`;
        cell.textContent = new Date(item.content.posterTime * 1000).toISOString().slice(11, -1);;
        cell.dataset.nameField = 'PosterTime';
        row.appendChild(cell);
        // Volume
        cell = document.createElement('div');
        cell.className = `${classCell} w5prc`;
        cell.textContent = item.content.volume.toFixed(2);
        cell.dataset.nameField = 'Volume';
        row.appendChild(cell);
        // Muted
        cell = document.createElement('div');
        cell.className = `${classCell} w5prc`;
        cell.textContent = item.content.isMuted.toString();
        cell.dataset.nameField = 'Muted';
        row.appendChild(cell);
        // Playback rate
        cell = document.createElement('div');
        cell.className = `${classCell} w7prc`;
        cell.textContent = item.content.playbackRate.toFixed(2);
        cell.dataset.nameField = 'PlaybackRate';
        row.appendChild(cell);
        //
        //this._tBody.insertBefore(row, this._tBody.firstChild);
        this.domViewItems.dicTBody.appendChild(row);
    }

    private OnClickRow(e) {
        if (e.target.parentElement.dataset.primaryKey) {
            if (this._selected === e.target.parentElement) {
                if (e.type === 'click') {
                    this._selected.dataset.selected = 'false';
                    this._selected = undefined;
                }
            } else if (this._selected) {
                this._selected.dataset.selected = 'false';
                this._selected = e.target.parentElement;
                this._selected.dataset.selected = 'true';
            } else {
                this._selected = e.target.parentElement;
                this._selected.dataset.selected = 'true';
            }
            this.ShowGets();
        }
    }

    private IsSelectEqualToWatch(): boolean {
        let isEqual: boolean = false;
        if (this._selected && Params.instance.currentIndexContent >= 0) {
            let content: VideoContent = this.GetSelectedContent();
            if (content == Params.instance.contents[Params.instance.currentIndexContent]) {
                isEqual = true;
            }
        }
        return isEqual;
    }

    private GetSelectedContent(): VideoContent {
        if (this._selected) {
            let primaryKey: number = Number(this._selected.dataset.primaryKey);
            if (this._collection.isIt(primaryKey)) {
                return this._collection.find(primaryKey).content;
            }
        } else {
            return undefined;
        }
    }

    private SetToPlay(): void {
        this.domViewItems.dicToState.dataset.state = 'to-play';
        this.domViewItems.dicToState.title = 'play';
        this.domViewItems.cmToState.dataset.state = 'to-play'
    }

    private SetToPause(): void {
        this.domViewItems.dicToState.dataset.state = 'to-pause';
        this.domViewItems.dicToState.title = 'pause';
        this.domViewItems.cmToState.dataset.state = 'to-pause'
    }



}
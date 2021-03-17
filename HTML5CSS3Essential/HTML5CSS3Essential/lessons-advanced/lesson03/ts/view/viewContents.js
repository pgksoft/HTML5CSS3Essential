import { Command, CommandState, Control, ContextMenu, MarkRow, MarkAllRows, CustomEventchangeMarkRow, CustomEventChangeMarkAllRows, TypeAction, requestFrame, Confirm, isDisplayBlock } from '../../../../js-advanced/_pgkUtils.js';
import { Params, CustomEventWorkViewCloseEscKey, CustomEventUpLoad, CustomEventContentsChange, secondUploader } from '../model/vgaParams.js';
import { DBContent, DBContentSortable } from '../model/modelView.js';
import { TypeLocation } from '../model/vgaContent.js';
import { ConfirmItems } from '../../../../model/confirmItems.js';
export const CustomEventToWatch = 'vga-view-to watch';
const classCell = `cell clip cell-vertical-center cell-horizontal-center`;
var KindLoad;
(function (KindLoad) {
    KindLoad[KindLoad["All"] = 0] = "All";
    KindLoad[KindLoad["AddedRecord"] = 1] = "AddedRecord";
    KindLoad[KindLoad["UpdatedRecord"] = 2] = "UpdatedRecord";
})(KindLoad || (KindLoad = {}));
;
export class ViewContents {
    constructor(domItems, domViewItems) {
        this._collection = new DBContentSortable();
        this._markRows = [];
        this._controls = [];
        this._selected = undefined;
        this._domItems = domItems;
        this._domViewItems = domViewItems;
        MarkRow.imgCheckBlankOutlineBlack = '../../img/checkbox-blank-outline-black.png';
        MarkRow.imgCheckBoxOutline = '../../img/check-box-outline.png';
        this._markAllRows = new MarkAllRows(this.domViewItems.markAllRows, this.domViewItems.imgMarkAllRows);
        this.DefineCommans();
        this.DefineEvents();
        this.DependencyResolutions();
        this.ShowGets();
    }
    static get instance() {
        if (!this._instance) {
            throw new Error('Instance of ../view/viewContents.ts was not created.');
        }
        return this._instance;
    }
    get domItems() { return this._domItems; }
    get domViewItems() { return this._domViewItems; }
    get countSelected() { return this._markRows.reduce((prev, current) => prev + (current.checked ? 1 : 0), 0); }
    get isSelected() { return this.countSelected > 0; }
    static Create(domItems, domViewItems) {
        if (!this._instance) {
            this._instance = new ViewContents(domItems, domViewItems);
        }
        return this._instance;
    }
    Open() {
        this.Load(KindLoad.All);
        this.domItems.closeView.onclick = () => { this.Close(); };
        this.domItems.workView.style.display = 'block';
        this.AlignWidthTables();
        this.OnChangeMarkAllRows();
    }
    DependencyResolutions() {
        Confirm.Create(ConfirmItems.instance.confirm, ConfirmItems.instance.header, ConfirmItems.instance.about, ConfirmItems.instance.yes, ConfirmItems.instance.no);
    }
    ShowGets() {
        if (this._collection.length > 0) {
            this._markAllRows.isDisable = false;
        }
        else {
            this._markAllRows.isDisable = true;
        }
        if (this.isSelected) {
            this._cmdRemove.state = CommandState.Enable;
        }
        else {
            this._cmdRemove.state = CommandState.Disable;
        }
        if (this._selected) {
            this._cmdToWatch.state = CommandState.Enable;
        }
        else {
            this._cmdToWatch.state = CommandState.Disable;
        }
        if (this._selected && Params.instance.currentIndexContent >= 0) {
            if (this.IsSelectEqualToWatch()) {
                this._cmdToState.state = CommandState.Enable;
                let content = this.GetSelectedContent();
                if (content) {
                    if (content.isPlay) {
                        this.SetToPause();
                    }
                    else {
                        this.SetToPlay();
                    }
                }
                else {
                    this._cmdToState.state = CommandState.Disable;
                }
            }
            else {
                this._cmdToState.state = CommandState.Disable;
            }
        }
        else {
            this._cmdToState.state = CommandState.Disable;
        }
    }
    DefineCommans() {
        this._cm = new ContextMenu(this.domViewItems.dicContextMenu);
        this._cmdSelectFiles = new Command('select-files', TypeAction.SelectLocalFiles, CommandState.Enable, this.OnSelectFiles, this);
        this._cmdToWatch = new Command('to-watch', TypeAction.IsSelected, CommandState.Disable, this.OnToWatch, this);
        this._cmdToState = new Command('to-state', TypeAction.ToState, CommandState.Disable, this.OnToState, this);
        this._cmdRemove = new Command('remove', TypeAction.Remove, CommandState.Disable, this.Remove, this);
        this._controls.push(new Control(this.domViewItems.dicSelectFiles, this._cmdSelectFiles));
        this._controls.push(new Control(this.domViewItems.cmItemSelectFiles, this._cmdSelectFiles));
        this._controls.push(new Control(this.domViewItems.dicToWatch, this._cmdToWatch));
        this._controls.push(new Control(this.domViewItems.cmToWatch, this._cmdToWatch));
        this._controls.push(new Control(this.domViewItems.dicToState, this._cmdToState));
        this._controls.push(new Control(this.domViewItems.cmToState, this._cmdToState));
        this._controls.push(new Control(this.domViewItems.dicRemove, this._cmdRemove));
        this._controls.push(new Control(this.domViewItems.cmItemDel, this._cmdRemove));
    }
    DefineEvents() {
        window.addEventListener('resize', () => { this.AlignWidthTables(); }, false);
        document.addEventListener(CustomEventWorkViewCloseEscKey, () => { this.OnEscKey(); }, false);
        this.domViewItems.dicFiles.addEventListener('change', () => { this.OnFilesChange(); }, false);
        this.domViewItems.dicRowHeader.addEventListener('contextmenu', (e) => { this.OnRowContextmenu(e); }, false);
        this.domViewItems.dicRowHeader.addEventListener('click', (e) => { this.OnColumnSorted(e); }, false);
        document.addEventListener(CustomEventChangeMarkAllRows, (e) => { this.OnChangeMarkAllRows(); }, false);
        document.addEventListener(CustomEventchangeMarkRow, (e) => { this.OnChangeMarkRow(); }, false);
    }
    OnSelectFiles() {
        this.domViewItems.dicFiles.click();
    }
    OnToWatch() {
        if (this._selected) {
            let content = this.GetSelectedContent();
            if (content) {
                document.dispatchEvent(new CustomEvent(CustomEventToWatch, { bubbles: true, detail: { name: content.name, location: content.typeLocation } }));
                this.ShowGets();
            }
        }
    }
    OnToState() {
        let content = this.GetSelectedContent();
        if (content) {
            if (content.isPlay) {
                this.domItems.video.pause();
            }
            else {
                this.domItems.video.play();
            }
            window.setTimeout(() => { this.ShowGets(); }, 100);
        }
    }
    OnFilesChange() {
        if (this.domViewItems.dicFiles.files.length) {
            this.domViewItems.showLoader.dataset.enabled = 'true';
            this.WaitingDownload(Array.from(this.domViewItems.dicFiles.files));
            this.domItems.files.files = this.domViewItems.dicFiles.files;
            document.dispatchEvent(new CustomEvent(CustomEventUpLoad, { bubbles: true, detail: { who: secondUploader } }));
        }
    }
    WaitingDownload(files) {
        let amountUpLoaded = files.reduce((prev, item) => {
            if (Params.instance.contents.some(content => content.name == item.name
                && content.typeLocation == TypeLocation.Local
                && content.isLoaded
                && content.posterSrc.length > 0)) {
                return prev + 1;
            }
            else {
                return prev;
            }
        }, 0);
        if (amountUpLoaded == files.length) {
            this.domViewItems.showLoader.dataset.enabled = 'false';
            this.Load(KindLoad.All);
            this.AlignWidthTables();
        }
        else {
            requestFrame(() => this.WaitingDownload(files));
        }
    }
    OnEscKey() {
        if (isDisplayBlock(ConfirmItems.instance.confirm)) {
            ConfirmItems.instance.confirm.style.display = 'none';
        }
        else {
            this.Close();
        }
    }
    Close() {
        this.domItems.workView.style.display = 'none';
        this._collection.clear();
        this.domViewItems.dicTBody.innerHTML = '';
    }
    OnRowContextmenu(e) {
        e.preventDefault();
        this._cm.On(e);
    }
    AlignWidthTables() {
        if (this.domViewItems.dicTBody.offsetWidth == this.domViewItems.dicTBody.clientWidth) {
            this.domViewItems.dicTHeder.style.width = `${this.domViewItems.dicTBody.clientWidth}px`;
        }
    }
    OnColumnSorted(e) {
        let column = e.target.closest('.cell');
        if (column.dataset.sort) {
            this._collection.NextSortStep(Number(column.dataset.sort));
            this.Load(KindLoad.All);
        }
    }
    OnChangeMarkAllRows() {
        for (let mark of this._markRows) {
            mark.checked = this._markAllRows.checked;
            mark.OnChange();
        }
    }
    OnChangeMarkRow() {
        this.ShowGets();
    }
    Remove() {
        new Promise((resolve) => {
            Confirm.instance.OpenConfirmDelete(`Удалить ${this.countSelected} из ${this._markRows.length}`, resolve);
        }).then((value) => {
            if (value == 'yes') {
                this._markRows.forEach(mark => {
                    if (mark.checked) {
                        let content = this._collection.find(mark.valueRow.primaryKey).content;
                        if (content) {
                            Params.instance.contents = Params.instance.contents.filter(item => !(item.name == content.name && item.typeLocation == content.typeLocation));
                        }
                    }
                });
                document.dispatchEvent(new CustomEvent(CustomEventContentsChange, { bubbles: true }));
                this.Load(KindLoad.All);
                this.AlignWidthTables();
            }
            else if (value == 'no') {
                ConfirmItems.instance.confirm.style.display = 'none';
            }
        });
    }
    Load(kind, primaryKey = 0) {
        let records = [...Params.instance.contents];
        switch (kind) {
            case KindLoad.All:
                this.domViewItems.dicTBody.innerHTML = '';
                this._collection.clear();
                this.LoadedToShow(records);
                break;
        }
        this.ShowGets();
    }
    LoadedToShow(records) {
        for (let rec of records) {
            this._collection.add(new DBContent(0, rec));
        }
        for (let rec of this._collection.sorted) {
            this.ShowBody(rec);
        }
    }
    ShowBody(item) {
        let row = document.createElement('div');
        row.className = 'row';
        row.dataset.primaryKey = item.primaryKey.toString();
        row.addEventListener('click', (e) => { this.OnClickRow(e); }, false);
        row.addEventListener('contextmenu', (e) => { this.OnClickRow(e); }, false);
        row.addEventListener('contextmenu', (e) => { this.OnRowContextmenu(e); }, false);
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
            let markRow = new MarkRow(check, img);
            markRow.valueRow = item;
            markRow.row = row;
            this._markRows.push(markRow);
        }
        row.appendChild(cell);
        cell = document.createElement('div');
        cell.className = 'cell w4prc cell-vertical-center cell-horizontal-center';
        cell.dataset.nameField = 'Poster';
        if (item.content.posterSrc.length > 0) {
            let img = document.createElement('img');
            img.src = item.content.posterSrc;
            cell.appendChild(img);
        }
        row.appendChild(cell);
        cell = document.createElement('div');
        cell.className = 'cell w40prc cell-vertical-center p-l-0-2prc';
        cell.textContent = item.content.name;
        cell.dataset.nameField = 'Name';
        row.appendChild(cell);
        cell = document.createElement('div');
        cell.className = `${classCell} w7prc`;
        cell.textContent = TypeLocation[item.content.typeLocation];
        cell.dataset.nameField = 'Location';
        row.appendChild(cell);
        cell = document.createElement('div');
        cell.className = `${classCell} w10prc`;
        cell.textContent = new Date(item.content.duration * 1000).toISOString().slice(11, -1);
        cell.dataset.nameField = 'Duration';
        row.appendChild(cell);
        cell = document.createElement('div');
        cell.className = `${classCell} w10prc`;
        cell.textContent = new Date(item.content.posterTime * 1000).toISOString().slice(11, -1);
        ;
        cell.dataset.nameField = 'PosterTime';
        row.appendChild(cell);
        cell = document.createElement('div');
        cell.className = `${classCell} w5prc`;
        cell.textContent = item.content.volume.toFixed(2);
        cell.dataset.nameField = 'Volume';
        row.appendChild(cell);
        cell = document.createElement('div');
        cell.className = `${classCell} w5prc`;
        cell.textContent = item.content.isMuted.toString();
        cell.dataset.nameField = 'Muted';
        row.appendChild(cell);
        cell = document.createElement('div');
        cell.className = `${classCell} w7prc`;
        cell.textContent = item.content.playbackRate.toFixed(2);
        cell.dataset.nameField = 'PlaybackRate';
        row.appendChild(cell);
        this.domViewItems.dicTBody.appendChild(row);
    }
    OnClickRow(e) {
        if (e.target.parentElement.dataset.primaryKey) {
            if (this._selected === e.target.parentElement) {
                if (e.type === 'click') {
                    this._selected.dataset.selected = 'false';
                    this._selected = undefined;
                }
            }
            else if (this._selected) {
                this._selected.dataset.selected = 'false';
                this._selected = e.target.parentElement;
                this._selected.dataset.selected = 'true';
            }
            else {
                this._selected = e.target.parentElement;
                this._selected.dataset.selected = 'true';
            }
            this.ShowGets();
        }
    }
    IsSelectEqualToWatch() {
        let isEqual = false;
        if (this._selected && Params.instance.currentIndexContent >= 0) {
            let content = this.GetSelectedContent();
            if (content == Params.instance.contents[Params.instance.currentIndexContent]) {
                isEqual = true;
            }
        }
        return isEqual;
    }
    GetSelectedContent() {
        if (this._selected) {
            let primaryKey = Number(this._selected.dataset.primaryKey);
            if (this._collection.isIt(primaryKey)) {
                return this._collection.find(primaryKey).content;
            }
        }
        else {
            return undefined;
        }
    }
    SetToPlay() {
        this.domViewItems.dicToState.dataset.state = 'to-play';
        this.domViewItems.dicToState.title = 'play';
        this.domViewItems.cmToState.dataset.state = 'to-play';
    }
    SetToPause() {
        this.domViewItems.dicToState.dataset.state = 'to-pause';
        this.domViewItems.dicToState.title = 'pause';
        this.domViewItems.cmToState.dataset.state = 'to-pause';
    }
}
ViewContents._instance = undefined;
//# sourceMappingURL=viewContents.js.map
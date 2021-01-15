import { isDisplayBlock, dateToString, dateToValue, Confirm, MarkRow, MarkAllRows, TypeAction, ContextMenu, CommandState, Command, Control } from "../../../js-advanced/_pgkutils.js";
import { Definition, FindDefinition, EditDefinition, DicDefinitionSortable, FindParms } from "./_dicdefinitioneditmoodalform.js";
import { Source, RecDefinition, EntityOpertion } from "./_firstwebdb.js";

enum LSParms { FindIsCreationDate, FindIsDateOfChange, FindNoDate, FindPeriodFrom, FindPeriodTo, FindCode, FindValue };

class LSKey {
    type: string = 'DicDefinition';
    parameter: LSParms;
    constructor(parameter: LSParms) {
        this.parameter = parameter;
    }
}

class LSValue {
    constructor(public isValue: boolean, public dt: Date, public value: string) { }
}

enum KindLoad { All, AddedRecord, UpdatedRecord };

class DicDefinition {

    // Fields
    private _btnAdd: HTMLButtonElement;
    private _btnReproduce: HTMLButtonElement;
    private _btnEdit: HTMLButtonElement;
    private _btnInfo: HTMLButtonElement;
    private _btnDel: HTMLButtonElement;
    private _btnFind: HTMLButtonElement;
    private _btnClearFind: HTMLButtonElement;
    private _tHeader: HTMLElement;
    private _rowHeader: HTMLElement;
    private _tBody: HTMLElement;
    //
    private _modalConfirm: HTMLElement;
    private _modalConfirmYes: HTMLElement;
    private _modalConfirmNo: HTMLElement;
    private _confirmHeader: HTMLElement;
    private _confirmAbout: HTMLElement;
    //
    private _showFindParams: HTMLElement;
    private _modalFind: HTMLElement;
    private _modalFindIsCreationDate: HTMLInputElement;
    private _modalFindIsDateOfChange: HTMLInputElement;
    private _modalFindnoDate: HTMLInputElement;
    private _modalFindPeriodFrom: HTMLInputElement;
    private _modalFindPeriodTo: HTMLInputElement;
    private _modalFindCode: HTMLInputElement;
    private _modalFindValue: HTMLInputElement;
    private _modalFindYes: HTMLElement;
    private _modalFindNo: HTMLElement;
    //
    private _modalEdit: HTMLElement;
    private _modalEditHeader: HTMLElement;
    private _modalEditImgHeader: HTMLImageElement;
    private _modalEditCode: HTMLInputElement;
    private _modalEditCodeCounter: HTMLElement;
    private _modalEditValue: HTMLInputElement;
    private _modalEditValueCounter: HTMLElement;
    private _modalEditDescription: HTMLTextAreaElement;
    private _modalEditDescriptionCounter: HTMLElement;
    private _modalEditDateCreate: HTMLElement;
    private _modalEditDateUpdate: HTMLElement;
    private _modalEditYes: HTMLButtonElement;
    private _modalEditNo: HTMLButtonElement;
    //
    private _dicContextMenu: HTMLElement;
    private _cmItemAdd: HTMLElement;
    private _cmItemReproduce: HTMLElement;
    private _cmItemEdit: HTMLElement;
    private _cmItemInfo: HTMLElement;
    private _cmItemDel: HTMLElement;
    private _cmItemFind: HTMLElement;
    private _cmItemClearFind: HTMLElement;
    //
    private _collection: DicDefinitionSortable<Definition> = new DicDefinitionSortable();
    private _markRows: MarkRow<Definition>[] = [];
    private _markAllRows: MarkAllRows<Definition>;
    private _cmdAdd: Command;
    private _cmdFind: Command;
    private _cmdClearFind: Command;
    private _cmdRemove: Command;
    private _cmdEdit: Command;
    private _cmdReproduce: Command;
    private _cmdInfo: Command;
    private _controls: Control[] = [];
    private _cm: ContextMenu;
    //
    private _selected: HTMLElement;

    constructor(
        btnAdd: HTMLButtonElement,
        btnReproduce: HTMLButtonElement,
        btnEdit: HTMLButtonElement,
        btnInfo: HTMLButtonElement,
        btnDel: HTMLButtonElement,
        btnFind: HTMLButtonElement,
        btnClearFind: HTMLButtonElement,
        tHeader: HTMLElement,
        rowHeader: HTMLElement,
        tBody: HTMLElement,
        //
        markAllRows: HTMLInputElement,
        imgMarkAllRows: HTMLImageElement,
        //
        modalConfirm: HTMLElement,
        modalConfirmYes: HTMLElement,
        modalConfirmNo: HTMLElement,
        confirmHeader: HTMLElement,
        confirmAbout: HTMLElement,
        //
        showFindParams: HTMLElement,
        modalFind: HTMLElement,
        modalFindIsCreationDate: HTMLInputElement,
        modalFindIsDateOfChange: HTMLInputElement,
        modalFindnoDate: HTMLInputElement,
        modalFindPeriodFrom: HTMLInputElement,
        modalFindPeriodTo: HTMLInputElement,
        modalFindCode: HTMLInputElement,
        modalFindValue: HTMLInputElement,
        modalFindYes: HTMLElement,
        modalFindNo: HTMLElement,
        //
        modalEdit: HTMLElement,
        modalEditHeader: HTMLElement,
        modalEditImgHeader: HTMLImageElement,
        modalEditCode: HTMLInputElement,
        modalEditCodeCounter: HTMLElement,
        modalEditValue: HTMLInputElement,
        modalEditValueCounter: HTMLElement,
        modalEditDescription: HTMLTextAreaElement,
        modalEditDescriptionCounter: HTMLElement,
        modalEditDateCreate: HTMLElement,
        modalEditDateUpdate: HTMLElement,
        modalEditYes: HTMLButtonElement,
        modalEditNo: HTMLButtonElement,
        //
        dicContextMenu: HTMLElement,
        cmItemAdd: HTMLElement,
        cmItemReproduce: HTMLElement,
        cmItemEdit: HTMLElement,
        cmItemInfo: HTMLElement,
        cmItemDel: HTMLElement,
        cmItemFind: HTMLElement,
        cmItemClearFind: HTMLElement
    ) {
        this._btnAdd = btnAdd;
        this._btnReproduce = btnReproduce;
        this._btnEdit = btnEdit;
        this._btnInfo = btnInfo;
        this._btnDel = btnDel;
        this._btnFind = btnFind;
        this._btnClearFind = btnClearFind;
        this._tHeader = tHeader;
        this._rowHeader = rowHeader;
        this._tBody = tBody;
        //
        this._modalConfirm = modalConfirm;
        this._modalConfirmYes = modalConfirmYes;
        this._modalConfirmNo = modalConfirmNo;
        this._confirmHeader = confirmHeader;
        this._confirmAbout = confirmAbout;
        //
        this._showFindParams = showFindParams;
        this._modalFind = modalFind;
        this._modalFindIsCreationDate = modalFindIsCreationDate;
        this._modalFindIsDateOfChange = modalFindIsDateOfChange;
        this._modalFindnoDate = modalFindnoDate;
        this._modalFindPeriodFrom = modalFindPeriodFrom;
        this._modalFindPeriodTo = modalFindPeriodTo;
        this._modalFindCode = modalFindCode;
        this._modalFindValue = modalFindValue;
        this._modalFindYes = modalFindYes;
        this._modalFindNo = modalFindNo;
        //
        this._modalEdit = modalEdit;
        this._modalEditHeader = modalEditHeader;
        this._modalEditImgHeader = modalEditImgHeader;
        this._modalEditCode = modalEditCode;
        this._modalEditCodeCounter = modalEditCodeCounter;
        this._modalEditValue = modalEditValue;
        this._modalEditValueCounter = modalEditValueCounter;
        this._modalEditDescription = modalEditDescription;
        this._modalEditDescriptionCounter = modalEditDescriptionCounter;
        this._modalEditDateCreate = modalEditDateCreate;
        this._modalEditDateUpdate = modalEditDateUpdate;
        this._modalEditYes = modalEditYes;
        this._modalEditNo = modalEditNo;
        //
        this._dicContextMenu = dicContextMenu;
        this._cmItemAdd = cmItemAdd;
        this._cmItemReproduce = cmItemReproduce;
        this._cmItemEdit = cmItemEdit;
        this._cmItemInfo = cmItemInfo;
        this._cmItemDel = cmItemDel;
        this._cmItemFind = cmItemFind;
        this._cmItemClearFind = cmItemClearFind;
        //
        MarkRow.imgCheckBlankOutlineBlack = '../../img/checkbox-blank-outline-black.png';
        MarkRow.imgCheckBoxOutline = '../../img/check-box-outline.png';
        this._markAllRows = new MarkAllRows(markAllRows, imgMarkAllRows);
        this.SetEvents();
        this.AlignWidthTables();
        this.ShowGets();
    }

    // Properties to help
    private get countSelected(): number {
        return this._markRows.reduce((prev, current) => prev + (current.checked ? 1 : 0), 0);
    }

    private get isSelected(): boolean {
        return this.countSelected > 0;
    }

    // Helpers
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
            this._cmdEdit.state = CommandState.Enable;
            this._cmdReproduce.state = CommandState.Enable;
            this._cmdInfo.state = CommandState.Enable;
        } else {
            this._cmdEdit.state = CommandState.Disable;
            this._cmdReproduce.state = CommandState.Disable;
            this._cmdInfo.state = CommandState.Disable;
        }
        //
        FindDefinition.instance.Show(this._showFindParams);
        if (FindDefinition.instance.isFind()) {
            this._cmdClearFind.state = CommandState.Enable;
        } else {
            this._cmdClearFind.state = CommandState.Disable;
        }
    }

    private AlignWidthTables(): void {
        if (this._tBody.offsetWidth == this._tBody.clientWidth) {
            this._tHeader.style.width = `${this._tBody.offsetWidth}px`;
        }
    }

    private SetEvents(): void {
        Confirm.Create(
            this._modalConfirm,
            this._confirmHeader,
            this._confirmAbout,
            this._modalConfirmYes,
            this._modalConfirmNo
        );
        FindDefinition.Create(
            this._modalFind,
            this._modalFindIsCreationDate,
            this._modalFindIsDateOfChange,
            this._modalFindnoDate,
            this._modalFindPeriodFrom,
            this._modalFindPeriodTo,
            this._modalFindCode,
            this._modalFindValue,
            this._modalFindYes,
            this._modalFindNo
        );
        EditDefinition.Create(
            this._modalEdit,
            this._modalEditHeader,
            this._modalEditImgHeader,
            this._modalEditCode,
            this._modalEditCodeCounter,
            this._modalEditValue,
            this._modalEditValueCounter,
            this._modalEditDescription,
            this._modalEditDescriptionCounter,
            this._modalEditDateCreate,
            this._modalEditDateUpdate,
            this._modalEditYes,
            this._modalEditNo
        );
        EditDefinition.imgAdd = '../../img/plus.png';
        EditDefinition.imgReproduce = '../../img/content-reproduce.png';
        EditDefinition.imgEdit = '../../img/edit-outline.png';
        EditDefinition.imgInfo = '../../img/information-outline-24.png';
        //
        this.LoadParams();
        //
        this._cm = new ContextMenu(this._dicContextMenu);
        //
        this._cmdAdd = new Command(
            'add',
            TypeAction.Add,
            CommandState.Enable,
            EditDefinition.instance.OpenAdd,
            EditDefinition.instance
        );
        this._cmdFind = new Command(
            'find',
            TypeAction.Find,
            CommandState.Enable,
            FindDefinition.instance.OpenFinder,
            FindDefinition.instance
        );
        this._cmdClearFind = new Command(
            'clearFind',
            TypeAction.ClearFind,
            CommandState.Disable,
            this.ClearFind,
            this
        );
        this._cmdRemove = new Command(
            'remove',
            TypeAction.Remove,
            CommandState.Disable,
            this.Remove,
            this
        );
        this._cmdEdit = new Command(
            'edit',
            TypeAction.Edit,
            CommandState.Disable,
            this.Edit,
            this
        );
        this._cmdReproduce = new Command(
            'reproduce',
            TypeAction.Reproduce,
            CommandState.Disable,
            this.Reproduce,
            this
        );
        this._cmdInfo = new Command(
            'info',
            TypeAction.Info,
            CommandState.Disable,
            this.Info,
            this
        );
        //
        this._controls.push(new Control(this._btnAdd, this._cmdAdd));
        this._controls.push(new Control(this._cmItemAdd, this._cmdAdd));
        this._controls.push(new Control(this._btnFind, this._cmdFind));
        this._controls.push(new Control(this._cmItemFind, this._cmdFind));
        this._controls.push(new Control(this._btnClearFind, this._cmdClearFind));
        this._controls.push(new Control(this._cmItemClearFind, this._cmdClearFind));
        this._controls.push(new Control(this._btnDel, this._cmdRemove));
        this._controls.push(new Control(this._cmItemDel, this._cmdRemove));
        this._controls.push(new Control(this._btnEdit, this._cmdEdit));
        this._controls.push(new Control(this._cmItemEdit, this._cmdEdit));
        this._controls.push(new Control(this._btnReproduce, this._cmdReproduce));
        this._controls.push(new Control(this._cmItemReproduce, this._cmdReproduce));
        this._controls.push(new Control(this._btnInfo, this._cmdInfo));
        this._controls.push(new Control(this._cmItemInfo, this._cmdInfo));
        //
        window.addEventListener('resize', () => { this.AlignWidthTables(); }, false);
        document.body.addEventListener('keydown', (e: KeyboardEvent) => { this.ListeningToKeystrokes(e); }, false);
        //
        document.addEventListener(FindDefinition.instance.nameEventApply, () => { this.OnFindApply(); }, false);
        document.addEventListener(FindDefinition.instance.nameEventRefuse, () => { this._modalFind.style.display = 'none'; }, false);
        document.addEventListener(EditDefinition.instance.nameEventAddApply, () => { this.OnEditAddApply(); }, false);
        document.addEventListener(EditDefinition.instance.nameEventAddRefuse, () => { this._modalEdit.style.display = 'none'; }, false);
        document.addEventListener(EditDefinition.instance.nameEventEditApply, () => { this.OnEditEditApply(); }, false);
        document.addEventListener(EditDefinition.instance.nameEventEditRefuse, () => { this._modalEdit.style.display = 'none'; }, false);
        document.addEventListener(Confirm.instance.nameEventSureConfirm, (e: CustomEvent) => { this.OnConfirm(e); }, false);
        document.addEventListener(Confirm.instance.nameEventSureRefuse, (e: CustomEvent) => { this.OnRefuse(e); }, false);
        document.addEventListener(Confirm.instance.nameEventDeleteConfirm, (e: CustomEvent) => { this.OnConfirm(e); }, false);
        document.addEventListener(Confirm.instance.nameEventDeleteRefuse, (e: CustomEvent) => { this.OnRefuse(e); }, false);
        document.addEventListener(Confirm.instance.nameEventCaution, () => { this._modalConfirm.style.display = 'none'; });
        //
        this._rowHeader.addEventListener('contextmenu', (e) => { this.OnRowContextmenu(e); }, false);
        this._rowHeader.addEventListener('click', (e: MouseEvent) => { this.OnColumnSorted(e); }, false);
        //
        document.addEventListener('changeMarkAllRows', (e: CustomEvent) => { this.OnChangeMarkAllRows(); }, false);
        document.addEventListener('changeMarkRow', (e: CustomEvent) => { this.OnChangeMarkRow(); }, false);
        //
        Source.Create();
        try {
            new Promise((resolve) => {
                Source.instance.Open(resolve);
            }).then(result => {
                if (result) this.Load(KindLoad.All);
            });
        } catch (e) {
            Confirm.instance.OpenCaution(e);
        }
    }

    private OnColumnSorted(e: MouseEvent) {
        let column = <HTMLElement>e.target;
        if (column.dataset.sort) {
            this._collection.NextSortStep(Number(column.dataset.sort))
            this.Load(KindLoad.All);
        }
    }

    private Remove(): void {
        new Promise((resolve) => {
            Confirm.instance.OpenConfirmDelete(`Удалить ${this.countSelected} из ${this._markRows.length}`, resolve);
        }).then(result => {
            if (result) {
                let entities: EntityOpertion[] = [];
                for (let mark of this._markRows.filter(item => item.checked)) {
                    entities.push(new EntityOpertion(mark.valueRow.primaryKey));
                }
                new Promise((resolve, reject) => {
                    Source.instance.RemoveDicDefinition(entities, resolve, reject);
                }).then(
                    (result) => { if (result) { this.RemoveShowResults(entities); } },
                    (error) => {
                        this.RemoveShowResults(entities);
                        Confirm.instance.OpenCaution(error);
                    }
                );
            }
        });
    }

    private RemoveShowResults(entities: EntityOpertion[]): void {
        for (let entity of entities) {
            let mark: MarkRow<Definition> = this._markRows.find(item => entity.isSuccess && item.valueRow.primaryKey == entity.id);
            if (this._selected && this._selected.dataset.primaryKey === mark.row.dataset.primaryKey) {
                this._selected = null;
            }
            if (mark) {
                for (let element of this._tBody.children) {
                    if ((<HTMLElement>element).dataset.primaryKey && (<HTMLElement>element).dataset.primaryKey == mark.row.dataset.primaryKey) {
                        this._tBody.removeChild(element);
                    }
                }
                this._collection.remove(mark.valueRow);
                this._markRows.splice(this._markRows.indexOf(mark), 1);
            }
        }
        if (this._markAllRows.checked) this._markAllRows.checked = false;
        this.ShowGets();
    }

    private Edit(): void {
        EditDefinition.instance.OpenEdit(this._markRows.find(item => item.valueRow.primaryKey.toString() === this._selected.dataset.primaryKey).valueRow);
    }

    private Reproduce(): void {
        EditDefinition.instance.OpenReproduce(this._markRows.find(item => item.valueRow.primaryKey.toString() === this._selected.dataset.primaryKey).valueRow);
    }

    private Info(): void {
        EditDefinition.instance.OpenInfo(this._markRows.find(item => item.valueRow.primaryKey.toString() === this._selected.dataset.primaryKey).valueRow);
    }

    private ClearFind(): void {
        FindDefinition.instance.Clear();
        this.OnFindApply();
    }

    private OnFindApply(): void {
        this.SaveFindParams(FindDefinition.instance.current);
        this._modalFind.style.display = 'none';
        this.Load(KindLoad.All);
        this.ShowGets();
    }

    private OnEditAddApply(): void {
        new Promise((resolve) => {
            Confirm.instance.OpenSure(resolve);
        }).then(result => {
            if (result) {
                try {
                    new Promise((resolve, reject) => {
                        Source.instance.AddDicDefinition(
                            new RecDefinition(
                                0,
                                this._modalEditCode.value,
                                this._modalEditValue.value,
                                this._modalEditDescription.value
                            ),
                            resolve, reject
                        );
                    }).then(
                        result => { try { this.Load(KindLoad.AddedRecord); } catch (e) { Confirm.instance.OpenCaution(e); } },
                        error => Confirm.instance.OpenCaution(error)
                    );
                } catch (e) {
                    Confirm.instance.OpenCaution(e);
                }
                this._modalEdit.style.display = 'none';
            };
        });
    }

    private OnEditEditApply(): void {
        new Promise((resolve) => {
            Confirm.instance.OpenSure(resolve);
        }).then(result => {
            if (result) {
                try {
                    new Promise((resolve, reject) => {
                        let value = this._markRows.find(item => item.valueRow.primaryKey.toString() === this._selected.dataset.primaryKey).valueRow;
                        Source.instance.UpdateDicDefinition(
                            new RecDefinition(
                                value.primaryKey,
                                this._modalEditCode.value,
                                this._modalEditValue.value,
                                this._modalEditDescription.value,
                                value.dateCreate,
                                new Date(Date.now())
                            ),
                            resolve, reject
                        );
                    }).then(
                        result => {
                            try {
                                this.Load(KindLoad.UpdatedRecord, this._markRows.find(item => item.valueRow.primaryKey.toString() === this._selected.dataset.primaryKey).valueRow.primaryKey);
                            }
                            catch (e) { Confirm.instance.OpenCaution(e); }
                        },
                        error => Confirm.instance.OpenCaution(error)
                    );
                } catch (e) {
                    Confirm.instance.OpenCaution(e);
                }
                this._modalEdit.style.display = 'none';
            };
        });
    }

    private Load(kind: KindLoad, primaryKey: number = 0): void {
        let records: RecDefinition[] = [];
        new Promise((resolve) => {
            Source.instance.LoadDicDefinition(records, resolve);
        }).then(result => {
            if (result) {
                // let's fulfill the search conditions
                if (FindDefinition.instance.isFind()) {
                    records = records.filter(item => FindDefinition.instance.isSatisfy(item));
                }
                switch (kind) {
                    case KindLoad.All:
                        this._collection.clear();
                        this._tBody.innerHTML = '';
                        this.LoadedToShow(records);
                        break;
                    case KindLoad.AddedRecord:
                        //let added = records.filter(rec => !this._collection.Includes(new Definition(rec.primaryKey, rec.code, rec.value)));
                        //this.LoadedToShow(added);
                        this._collection.clear();
                        this._tBody.innerHTML = '';
                        this.LoadedToShow(records);
                        break;
                    case KindLoad.UpdatedRecord:
                        let upded = records.find(rec => rec.primaryKey == primaryKey);
                        if (this._collection.updateItem(new Definition(
                            upded.primaryKey,
                            upded.code,
                            upded.value,
                            upded.description,
                            upded.dateCreate,
                            upded.dateUpdate
                        ))) {
                            this.UpdatedToShowBody(this._collection.find(primaryKey));
                        } else {
                            Confirm.instance.OpenCaution('Нарушение целостности данных. Обновите страницу.');
                        }
                        break;
                }
                this.ShowGets();
            }
        });
    }

    private OnConfirm(e: CustomEvent): void {
        if (e.detail.resolve) {
            e.detail.resolve(true);
        }
        this._modalConfirm.style.display = 'none';
    }

    private OnRefuse(e: CustomEvent): void {
        if (e.detail.resolve) {
            e.detail.resolve(false);
        }
        this._modalConfirm.style.display = 'none';
    }

    private ListeningToKeystrokes(e: KeyboardEvent): void {
        if (e.charCode === 0) {
            switch (e.keyCode) {
                case 27:
                    for (let modal of document.getElementsByClassName('w3-modal')) {
                        if (isDisplayBlock(<HTMLElement>modal)) (<HTMLElement>modal).style.display = 'none';
                    };
                    this._cm.Off();
                    break;
                default:
                    break;
            }
        }
    }

    private OnRowContextmenu(e) {
        e.preventDefault();
        this._cm.On(<MouseEvent>e);
    }

    private LoadedToShow(records: RecDefinition[]): void {
        for (let rec of records) {
            this._collection.loadItem(new Definition(
                rec.primaryKey,
                rec.code,
                rec.value,
                rec.description,
                rec.dateCreate,
                rec.dateUpdate
            ))
        };
        for (let rec of this._collection.sorted) {
            this.ShowBody(rec);
        }
    }

    private ShowBody(item: Definition): void {
        let row = document.createElement('div');
        row.className = 'row';
        row.dataset.primaryKey = item.primaryKey.toString();
        row.addEventListener('click', (e) => { this.OnClickRow(e); }, false);
        row.addEventListener('contextmenu', (e) => { this.OnClickRow(e); }, false);
        row.addEventListener('contextmenu', (e) => { this.OnRowContextmenu(e); }, false);
        // check
        let cell = document.createElement('div');
        cell.className = 'cell w3prc cell-horizontal-center cell-vertical-center';
        let check = document.createElement('input');
        check.type = 'checkbox';
        check.id = item.primaryKey.toString();
        cell.appendChild(check);
        let lbl = document.createElement('label');
        lbl.htmlFor = check.id;
        let img = document.createElement('img');
        lbl.appendChild(img);
        cell.appendChild(lbl);
        let markRow = new MarkRow<Definition>(check, img);
        markRow.valueRow = item;
        markRow.row = row;
        this._markRows.push(markRow);
        row.appendChild(cell);
        // code
        cell = document.createElement('div');
        cell.className = 'cell w10prc';
        cell.textContent = item.code;
        cell.dataset.nameField = 'code';
        row.appendChild(cell);
        // value
        cell = document.createElement('div');
        cell.className = 'cell w25prc';
        cell.textContent = item.value;
        cell.dataset.nameField = 'value';
        row.appendChild(cell);
        // description
        cell = document.createElement('div');
        cell.className = 'cell w40prc';
        let showLength = item.value.length > 150 ? 400 : 200;
        cell.textContent = item.description.length < showLength ? item.description : `${item.description.slice(0, showLength)}…`;
        cell.dataset.nameField = 'description';
        row.appendChild(cell);
        // date create
        cell = document.createElement('div');
        cell.className = 'cell w10prc cell-h-right fsize-0x7rem';
        cell.textContent = dateToString(item.dateCreate);
        cell.dataset.nameField = 'dateCreate';
        row.appendChild(cell);
        // date update
        cell = document.createElement('div');
        cell.className = 'cell w10prc cell-h-right fsize-0x7rem';
        cell.textContent = dateToString(item.dateUpdate);
        cell.dataset.nameField = 'dateUpdate';
        row.appendChild(cell);
        //
        //this._tBody.insertBefore(row, this._tBody.firstChild);
        this._tBody.appendChild(row);
    }

    private UpdatedToShowBody(item: Definition) {
        if (this._selected) {
            for (let element of this._selected.children) {
                if ((<HTMLElement>element).dataset.nameField) {
                    switch ((<HTMLElement>element).dataset.nameField) {
                        case 'code':
                            (<HTMLElement>element).textContent = item.code;
                            break;
                        case 'value':
                            (<HTMLElement>element).textContent = item.value;
                            break;
                        case 'description':
                            let showLength = item.value.length > 150 ? 400 : 200;
                            (<HTMLElement>element).textContent = item.description.length < showLength ? item.description : `${item.description.slice(0, showLength)}…`;
                            break;
                        case 'dateUpdate':
                            (<HTMLElement>element).textContent = dateToString(item.dateUpdate);
                            break;
                    }
                }
            }
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

    private OnClickRow(e) {
        if (e.target.parentElement.dataset.primaryKey) {
            if (this._selected === e.target.parentElement) {
                if (e.type === 'click') {
                    this._selected.dataset.selected = 'false';
                    this._selected = null;
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

    private LoadParams(): void {
        let findParms: FindParms = new FindParms();
        for (let i = 0; i < localStorage.length; i++) {
            try {
                let key: LSKey = JSON.parse(localStorage.key(i)) as LSKey;
                let value: LSValue = JSON.parse(localStorage.getItem(JSON.stringify(key))) as LSValue;
                switch (key.parameter) {
                    case LSParms.FindIsCreationDate:
                        findParms.isCreationDate = value.isValue;
                        break;
                    case LSParms.FindIsDateOfChange:
                        findParms.isDateOfChange = value.isValue;
                        break;
                    case LSParms.FindNoDate:
                        findParms.noDate = value.isValue;
                        break;
                    case LSParms.FindPeriodFrom:
                        findParms.periodFrom = new Date(value.dt);
                        break;
                    case LSParms.FindPeriodTo:
                        findParms.periodTo = new Date(value.dt);
                        break;
                    case LSParms.FindCode:
                        findParms.code = value.value;
                        break;
                    case LSParms.FindValue:
                        findParms.value = value.value;
                        break;
                }
            } catch (e) { }
        }
        // Verification of parameters
        let isVerify: boolean = true;
        if (findParms.isCreationDate && findParms.isDateOfChange && findParms.noDate || !findParms.isCreationDate && !findParms.isDateOfChange && !findParms.noDate) {
            findParms.isCreationDate = true;
            findParms.isDateOfChange = false;
            findParms.noDate = false;
            isVerify = false;
        }
        if (findParms.periodFrom == undefined) {
            let dt = new Date(Date.now());
            findParms.periodFrom = new Date(dt.getFullYear(), dt.getMonth());
            isVerify = false;
        }
        if (findParms.periodTo == undefined) {
            let dt = new Date(Date.now());
            findParms.periodTo = new Date(dt.getFullYear(), dt.getMonth() + 1);
            isVerify = false;
        }
        if (findParms.code == undefined) {
            findParms.code = '';
            isVerify = false;
        }
        if (findParms.value == undefined) {
            findParms.value = '';
            isVerify = false;
        }
        if (!isVerify) {
            this.SaveFindParams(findParms);
        }
        this._modalFindIsCreationDate.checked = findParms.isCreationDate;
        this._modalFindIsDateOfChange.checked = findParms.isDateOfChange;
        this._modalFindnoDate.checked = findParms.noDate;
        this._modalFindPeriodFrom.value = dateToValue(findParms.periodFrom);
        this._modalFindPeriodTo.value = dateToValue(findParms.periodTo);
        this._modalFindCode.value = findParms.code;
        this._modalFindValue.value = findParms.value;
        FindDefinition.instance.SetCurrent();
    }

    private SaveFindParams(findParms: FindParms) {
        let val: LSValue = new LSValue(findParms.isCreationDate, null, '');
        localStorage.setItem(JSON.stringify(new LSKey(LSParms.FindIsCreationDate)), JSON.stringify(val));
        val.isValue = findParms.isDateOfChange;
        localStorage.setItem(JSON.stringify(new LSKey(LSParms.FindIsDateOfChange)), JSON.stringify(val));
        val.isValue = findParms.noDate;
        localStorage.setItem(JSON.stringify(new LSKey(LSParms.FindNoDate)), JSON.stringify(val));
        val.dt = findParms.periodFrom;
        localStorage.setItem(JSON.stringify(new LSKey(LSParms.FindPeriodFrom)), JSON.stringify(val));
        val.dt = findParms.periodTo;
        localStorage.setItem(JSON.stringify(new LSKey(LSParms.FindPeriodTo)), JSON.stringify(val));
        val.value = findParms.code;
        localStorage.setItem(JSON.stringify(new LSKey(LSParms.FindCode)), JSON.stringify(val));
        val.value = findParms.value;
        localStorage.setItem(JSON.stringify(new LSKey(LSParms.FindValue)), JSON.stringify(val));
    }

}

let dicDefinition: DicDefinition = new DicDefinition(
    <HTMLButtonElement>document.getElementById('cmdAdd'),
    <HTMLButtonElement>document.getElementById('cmdReproduce'),
    <HTMLButtonElement>document.getElementById('cmdEdit'),
    <HTMLButtonElement>document.getElementById('cmdInfo'),
    <HTMLButtonElement>document.getElementById('cmdDel'),
    <HTMLButtonElement>document.getElementById('cmdFind'),
    <HTMLButtonElement>document.getElementById('cmdClearFind'),
    document.getElementById('dic-t-heder'),
    document.getElementById('dic-row-header'),
    document.getElementById('dic-t-body'),
    //
    <HTMLInputElement>document.getElementById('markAllRows'),
    <HTMLImageElement>document.getElementById('imgMarkAllRows'),
    //
    document.getElementById('confirm-modal'),
    document.getElementById('confirmYes'),
    document.getElementById('confirmNo'),
    document.getElementById('confirm-modal-Header'),
    document.getElementById('confirmAbout'),
    //
    document.getElementById('show-find-parms'),
    document.getElementById('find-modal'),
    <HTMLInputElement>document.getElementById('creation-date'),
    <HTMLInputElement>document.getElementById('date-of-change'),
    <HTMLInputElement>document.getElementById('noDate'),
    <HTMLInputElement>document.getElementById('findPeriodFrom'),
    <HTMLInputElement>document.getElementById('findPeriodTo'),
    <HTMLInputElement>document.getElementById('findCode'),
    <HTMLInputElement>document.getElementById('findValue'),
    document.getElementById('findYes'),
    document.getElementById('findNo'),
    //
    document.getElementById('edit-modal'),
    document.getElementById('edit-modal-Header'),
    <HTMLImageElement>document.getElementById('edit-modal-imgMode'),
    <HTMLInputElement>document.getElementById('editCode'),
    document.getElementById('counterCode'),
    <HTMLInputElement>document.getElementById('editValue'),
    document.getElementById('counterValue'),
    <HTMLTextAreaElement>document.getElementById('editDescription'),
    document.getElementById('counterDescription'),
    document.getElementById('editDateCreate'),
    document.getElementById('editDateUpdate'),
    <HTMLButtonElement>document.getElementById('editYes'),
    <HTMLButtonElement>document.getElementById('editNo'),
    //
    document.getElementById('dicContextMenu'),
    document.getElementById('cm-Add'),
    document.getElementById('cm-reproduce'),
    document.getElementById('cm-edit'),
    document.getElementById('cm-info'),
    document.getElementById('cm-del'),
    document.getElementById('cm-find'),
    document.getElementById('cm-clear-find'),
);


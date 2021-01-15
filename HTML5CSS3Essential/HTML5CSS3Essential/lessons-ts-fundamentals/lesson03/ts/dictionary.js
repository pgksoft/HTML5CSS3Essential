import { isDisplayBlock, dateToString, dateToValue, Confirm, MarkRow, MarkAllRows, TypeAction, ContextMenu, CommandState, Command, Control } from "../../../js-advanced/_pgkutils.js";
import { Definition, FindDefinition, EditDefinition, DicDefinitionSortable, FindParms } from "./_dicdefinitioneditmoodalform.js";
import { Source, RecDefinition, EntityOpertion } from "./_firstwebdb.js";
var LSParms;
(function (LSParms) {
    LSParms[LSParms["FindIsCreationDate"] = 0] = "FindIsCreationDate";
    LSParms[LSParms["FindIsDateOfChange"] = 1] = "FindIsDateOfChange";
    LSParms[LSParms["FindNoDate"] = 2] = "FindNoDate";
    LSParms[LSParms["FindPeriodFrom"] = 3] = "FindPeriodFrom";
    LSParms[LSParms["FindPeriodTo"] = 4] = "FindPeriodTo";
    LSParms[LSParms["FindCode"] = 5] = "FindCode";
    LSParms[LSParms["FindValue"] = 6] = "FindValue";
})(LSParms || (LSParms = {}));
;
class LSKey {
    constructor(parameter) {
        this.type = 'DicDefinition';
        this.parameter = parameter;
    }
}
class LSValue {
    constructor(isValue, dt, value) {
        this.isValue = isValue;
        this.dt = dt;
        this.value = value;
    }
}
var KindLoad;
(function (KindLoad) {
    KindLoad[KindLoad["All"] = 0] = "All";
    KindLoad[KindLoad["AddedRecord"] = 1] = "AddedRecord";
    KindLoad[KindLoad["UpdatedRecord"] = 2] = "UpdatedRecord";
})(KindLoad || (KindLoad = {}));
;
class DicDefinition {
    constructor(btnAdd, btnReproduce, btnEdit, btnInfo, btnDel, btnFind, btnClearFind, tHeader, rowHeader, tBody, markAllRows, imgMarkAllRows, modalConfirm, modalConfirmYes, modalConfirmNo, confirmHeader, confirmAbout, showFindParams, modalFind, modalFindIsCreationDate, modalFindIsDateOfChange, modalFindnoDate, modalFindPeriodFrom, modalFindPeriodTo, modalFindCode, modalFindValue, modalFindYes, modalFindNo, modalEdit, modalEditHeader, modalEditImgHeader, modalEditCode, modalEditCodeCounter, modalEditValue, modalEditValueCounter, modalEditDescription, modalEditDescriptionCounter, modalEditDateCreate, modalEditDateUpdate, modalEditYes, modalEditNo, dicContextMenu, cmItemAdd, cmItemReproduce, cmItemEdit, cmItemInfo, cmItemDel, cmItemFind, cmItemClearFind) {
        this._collection = new DicDefinitionSortable();
        this._markRows = [];
        this._controls = [];
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
        this._modalConfirm = modalConfirm;
        this._modalConfirmYes = modalConfirmYes;
        this._modalConfirmNo = modalConfirmNo;
        this._confirmHeader = confirmHeader;
        this._confirmAbout = confirmAbout;
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
        this._dicContextMenu = dicContextMenu;
        this._cmItemAdd = cmItemAdd;
        this._cmItemReproduce = cmItemReproduce;
        this._cmItemEdit = cmItemEdit;
        this._cmItemInfo = cmItemInfo;
        this._cmItemDel = cmItemDel;
        this._cmItemFind = cmItemFind;
        this._cmItemClearFind = cmItemClearFind;
        MarkRow.imgCheckBlankOutlineBlack = '../../img/checkbox-blank-outline-black.png';
        MarkRow.imgCheckBoxOutline = '../../img/check-box-outline.png';
        this._markAllRows = new MarkAllRows(markAllRows, imgMarkAllRows);
        this.SetEvents();
        this.AlignWidthTables();
        this.ShowGets();
    }
    get countSelected() {
        return this._markRows.reduce((prev, current) => prev + (current.checked ? 1 : 0), 0);
    }
    get isSelected() {
        return this.countSelected > 0;
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
            this._cmdEdit.state = CommandState.Enable;
            this._cmdReproduce.state = CommandState.Enable;
            this._cmdInfo.state = CommandState.Enable;
        }
        else {
            this._cmdEdit.state = CommandState.Disable;
            this._cmdReproduce.state = CommandState.Disable;
            this._cmdInfo.state = CommandState.Disable;
        }
        FindDefinition.instance.Show(this._showFindParams);
        if (FindDefinition.instance.isFind()) {
            this._cmdClearFind.state = CommandState.Enable;
        }
        else {
            this._cmdClearFind.state = CommandState.Disable;
        }
    }
    AlignWidthTables() {
        if (this._tBody.offsetWidth == this._tBody.clientWidth) {
            this._tHeader.style.width = `${this._tBody.offsetWidth}px`;
        }
    }
    SetEvents() {
        Confirm.Create(this._modalConfirm, this._confirmHeader, this._confirmAbout, this._modalConfirmYes, this._modalConfirmNo);
        FindDefinition.Create(this._modalFind, this._modalFindIsCreationDate, this._modalFindIsDateOfChange, this._modalFindnoDate, this._modalFindPeriodFrom, this._modalFindPeriodTo, this._modalFindCode, this._modalFindValue, this._modalFindYes, this._modalFindNo);
        EditDefinition.Create(this._modalEdit, this._modalEditHeader, this._modalEditImgHeader, this._modalEditCode, this._modalEditCodeCounter, this._modalEditValue, this._modalEditValueCounter, this._modalEditDescription, this._modalEditDescriptionCounter, this._modalEditDateCreate, this._modalEditDateUpdate, this._modalEditYes, this._modalEditNo);
        EditDefinition.imgAdd = '../../img/plus.png';
        EditDefinition.imgReproduce = '../../img/content-reproduce.png';
        EditDefinition.imgEdit = '../../img/edit-outline.png';
        EditDefinition.imgInfo = '../../img/information-outline-24.png';
        this.LoadParams();
        this._cm = new ContextMenu(this._dicContextMenu);
        this._cmdAdd = new Command('add', TypeAction.Add, CommandState.Enable, EditDefinition.instance.OpenAdd, EditDefinition.instance);
        this._cmdFind = new Command('find', TypeAction.Find, CommandState.Enable, FindDefinition.instance.OpenFinder, FindDefinition.instance);
        this._cmdClearFind = new Command('clearFind', TypeAction.ClearFind, CommandState.Disable, this.ClearFind, this);
        this._cmdRemove = new Command('remove', TypeAction.Remove, CommandState.Disable, this.Remove, this);
        this._cmdEdit = new Command('edit', TypeAction.Edit, CommandState.Disable, this.Edit, this);
        this._cmdReproduce = new Command('reproduce', TypeAction.Reproduce, CommandState.Disable, this.Reproduce, this);
        this._cmdInfo = new Command('info', TypeAction.Info, CommandState.Disable, this.Info, this);
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
        window.addEventListener('resize', () => { this.AlignWidthTables(); }, false);
        document.body.addEventListener('keydown', (e) => { this.ListeningToKeystrokes(e); }, false);
        document.addEventListener(FindDefinition.instance.nameEventApply, () => { this.OnFindApply(); }, false);
        document.addEventListener(FindDefinition.instance.nameEventRefuse, () => { this._modalFind.style.display = 'none'; }, false);
        document.addEventListener(EditDefinition.instance.nameEventAddApply, () => { this.OnEditAddApply(); }, false);
        document.addEventListener(EditDefinition.instance.nameEventAddRefuse, () => { this._modalEdit.style.display = 'none'; }, false);
        document.addEventListener(EditDefinition.instance.nameEventEditApply, () => { this.OnEditEditApply(); }, false);
        document.addEventListener(EditDefinition.instance.nameEventEditRefuse, () => { this._modalEdit.style.display = 'none'; }, false);
        document.addEventListener(Confirm.instance.nameEventSureConfirm, (e) => { this.OnConfirm(e); }, false);
        document.addEventListener(Confirm.instance.nameEventSureRefuse, (e) => { this.OnRefuse(e); }, false);
        document.addEventListener(Confirm.instance.nameEventDeleteConfirm, (e) => { this.OnConfirm(e); }, false);
        document.addEventListener(Confirm.instance.nameEventDeleteRefuse, (e) => { this.OnRefuse(e); }, false);
        document.addEventListener(Confirm.instance.nameEventCaution, () => { this._modalConfirm.style.display = 'none'; });
        this._rowHeader.addEventListener('contextmenu', (e) => { this.OnRowContextmenu(e); }, false);
        this._rowHeader.addEventListener('click', (e) => { this.OnColumnSorted(e); }, false);
        document.addEventListener('changeMarkAllRows', (e) => { this.OnChangeMarkAllRows(); }, false);
        document.addEventListener('changeMarkRow', (e) => { this.OnChangeMarkRow(); }, false);
        Source.Create();
        try {
            new Promise((resolve) => {
                Source.instance.Open(resolve);
            }).then(result => {
                if (result)
                    this.Load(KindLoad.All);
            });
        }
        catch (e) {
            Confirm.instance.OpenCaution(e);
        }
    }
    OnColumnSorted(e) {
        let column = e.target;
        if (column.dataset.sort) {
            this._collection.NextSortStep(Number(column.dataset.sort));
            this.Load(KindLoad.All);
        }
    }
    Remove() {
        new Promise((resolve) => {
            Confirm.instance.OpenConfirmDelete(`Удалить ${this.countSelected} из ${this._markRows.length}`, resolve);
        }).then(result => {
            if (result) {
                let entities = [];
                for (let mark of this._markRows.filter(item => item.checked)) {
                    entities.push(new EntityOpertion(mark.valueRow.primaryKey));
                }
                new Promise((resolve, reject) => {
                    Source.instance.RemoveDicDefinition(entities, resolve, reject);
                }).then((result) => { if (result) {
                    this.RemoveShowResults(entities);
                } }, (error) => {
                    this.RemoveShowResults(entities);
                    Confirm.instance.OpenCaution(error);
                });
            }
        });
    }
    RemoveShowResults(entities) {
        for (let entity of entities) {
            let mark = this._markRows.find(item => entity.isSuccess && item.valueRow.primaryKey == entity.id);
            if (this._selected && this._selected.dataset.primaryKey === mark.row.dataset.primaryKey) {
                this._selected = null;
            }
            if (mark) {
                for (let element of this._tBody.children) {
                    if (element.dataset.primaryKey && element.dataset.primaryKey == mark.row.dataset.primaryKey) {
                        this._tBody.removeChild(element);
                    }
                }
                this._collection.remove(mark.valueRow);
                this._markRows.splice(this._markRows.indexOf(mark), 1);
            }
        }
        if (this._markAllRows.checked)
            this._markAllRows.checked = false;
        this.ShowGets();
    }
    Edit() {
        EditDefinition.instance.OpenEdit(this._markRows.find(item => item.valueRow.primaryKey.toString() === this._selected.dataset.primaryKey).valueRow);
    }
    Reproduce() {
        EditDefinition.instance.OpenReproduce(this._markRows.find(item => item.valueRow.primaryKey.toString() === this._selected.dataset.primaryKey).valueRow);
    }
    Info() {
        EditDefinition.instance.OpenInfo(this._markRows.find(item => item.valueRow.primaryKey.toString() === this._selected.dataset.primaryKey).valueRow);
    }
    ClearFind() {
        FindDefinition.instance.Clear();
        this.OnFindApply();
    }
    OnFindApply() {
        this.SaveFindParams(FindDefinition.instance.current);
        this._modalFind.style.display = 'none';
        this.Load(KindLoad.All);
        this.ShowGets();
    }
    OnEditAddApply() {
        new Promise((resolve) => {
            Confirm.instance.OpenSure(resolve);
        }).then(result => {
            if (result) {
                try {
                    new Promise((resolve, reject) => {
                        Source.instance.AddDicDefinition(new RecDefinition(0, this._modalEditCode.value, this._modalEditValue.value, this._modalEditDescription.value), resolve, reject);
                    }).then(result => { try {
                        this.Load(KindLoad.AddedRecord);
                    }
                    catch (e) {
                        Confirm.instance.OpenCaution(e);
                    } }, error => Confirm.instance.OpenCaution(error));
                }
                catch (e) {
                    Confirm.instance.OpenCaution(e);
                }
                this._modalEdit.style.display = 'none';
            }
            ;
        });
    }
    OnEditEditApply() {
        new Promise((resolve) => {
            Confirm.instance.OpenSure(resolve);
        }).then(result => {
            if (result) {
                try {
                    new Promise((resolve, reject) => {
                        let value = this._markRows.find(item => item.valueRow.primaryKey.toString() === this._selected.dataset.primaryKey).valueRow;
                        Source.instance.UpdateDicDefinition(new RecDefinition(value.primaryKey, this._modalEditCode.value, this._modalEditValue.value, this._modalEditDescription.value, value.dateCreate, new Date(Date.now())), resolve, reject);
                    }).then(result => {
                        try {
                            this.Load(KindLoad.UpdatedRecord, this._markRows.find(item => item.valueRow.primaryKey.toString() === this._selected.dataset.primaryKey).valueRow.primaryKey);
                        }
                        catch (e) {
                            Confirm.instance.OpenCaution(e);
                        }
                    }, error => Confirm.instance.OpenCaution(error));
                }
                catch (e) {
                    Confirm.instance.OpenCaution(e);
                }
                this._modalEdit.style.display = 'none';
            }
            ;
        });
    }
    Load(kind, primaryKey = 0) {
        let records = [];
        new Promise((resolve) => {
            Source.instance.LoadDicDefinition(records, resolve);
        }).then(result => {
            if (result) {
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
                        this._collection.clear();
                        this._tBody.innerHTML = '';
                        this.LoadedToShow(records);
                        break;
                    case KindLoad.UpdatedRecord:
                        let upded = records.find(rec => rec.primaryKey == primaryKey);
                        if (this._collection.updateItem(new Definition(upded.primaryKey, upded.code, upded.value, upded.description, upded.dateCreate, upded.dateUpdate))) {
                            this.UpdatedToShowBody(this._collection.find(primaryKey));
                        }
                        else {
                            Confirm.instance.OpenCaution('Нарушение целостности данных. Обновите страницу.');
                        }
                        break;
                }
                this.ShowGets();
            }
        });
    }
    OnConfirm(e) {
        if (e.detail.resolve) {
            e.detail.resolve(true);
        }
        this._modalConfirm.style.display = 'none';
    }
    OnRefuse(e) {
        if (e.detail.resolve) {
            e.detail.resolve(false);
        }
        this._modalConfirm.style.display = 'none';
    }
    ListeningToKeystrokes(e) {
        if (e.charCode === 0) {
            switch (e.keyCode) {
                case 27:
                    for (let modal of document.getElementsByClassName('w3-modal')) {
                        if (isDisplayBlock(modal))
                            modal.style.display = 'none';
                    }
                    ;
                    this._cm.Off();
                    break;
                default:
                    break;
            }
        }
    }
    OnRowContextmenu(e) {
        e.preventDefault();
        this._cm.On(e);
    }
    LoadedToShow(records) {
        for (let rec of records) {
            this._collection.loadItem(new Definition(rec.primaryKey, rec.code, rec.value, rec.description, rec.dateCreate, rec.dateUpdate));
        }
        ;
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
        row.appendChild(cell);
        cell = document.createElement('div');
        cell.className = 'cell w10prc';
        cell.textContent = item.code;
        cell.dataset.nameField = 'code';
        row.appendChild(cell);
        cell = document.createElement('div');
        cell.className = 'cell w25prc';
        cell.textContent = item.value;
        cell.dataset.nameField = 'value';
        row.appendChild(cell);
        cell = document.createElement('div');
        cell.className = 'cell w40prc';
        let showLength = item.value.length > 150 ? 400 : 200;
        cell.textContent = item.description.length < showLength ? item.description : `${item.description.slice(0, showLength)}…`;
        cell.dataset.nameField = 'description';
        row.appendChild(cell);
        cell = document.createElement('div');
        cell.className = 'cell w10prc cell-h-right fsize-0x7rem';
        cell.textContent = dateToString(item.dateCreate);
        cell.dataset.nameField = 'dateCreate';
        row.appendChild(cell);
        cell = document.createElement('div');
        cell.className = 'cell w10prc cell-h-right fsize-0x7rem';
        cell.textContent = dateToString(item.dateUpdate);
        cell.dataset.nameField = 'dateUpdate';
        row.appendChild(cell);
        this._tBody.appendChild(row);
    }
    UpdatedToShowBody(item) {
        if (this._selected) {
            for (let element of this._selected.children) {
                if (element.dataset.nameField) {
                    switch (element.dataset.nameField) {
                        case 'code':
                            element.textContent = item.code;
                            break;
                        case 'value':
                            element.textContent = item.value;
                            break;
                        case 'description':
                            let showLength = item.value.length > 150 ? 400 : 200;
                            element.textContent = item.description.length < showLength ? item.description : `${item.description.slice(0, showLength)}…`;
                            break;
                        case 'dateUpdate':
                            element.textContent = dateToString(item.dateUpdate);
                            break;
                    }
                }
            }
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
    OnClickRow(e) {
        if (e.target.parentElement.dataset.primaryKey) {
            if (this._selected === e.target.parentElement) {
                if (e.type === 'click') {
                    this._selected.dataset.selected = 'false';
                    this._selected = null;
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
    LoadParams() {
        let findParms = new FindParms();
        for (let i = 0; i < localStorage.length; i++) {
            try {
                let key = JSON.parse(localStorage.key(i));
                let value = JSON.parse(localStorage.getItem(JSON.stringify(key)));
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
            }
            catch (e) { }
        }
        let isVerify = true;
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
    SaveFindParams(findParms) {
        let val = new LSValue(findParms.isCreationDate, null, '');
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
let dicDefinition = new DicDefinition(document.getElementById('cmdAdd'), document.getElementById('cmdReproduce'), document.getElementById('cmdEdit'), document.getElementById('cmdInfo'), document.getElementById('cmdDel'), document.getElementById('cmdFind'), document.getElementById('cmdClearFind'), document.getElementById('dic-t-heder'), document.getElementById('dic-row-header'), document.getElementById('dic-t-body'), document.getElementById('markAllRows'), document.getElementById('imgMarkAllRows'), document.getElementById('confirm-modal'), document.getElementById('confirmYes'), document.getElementById('confirmNo'), document.getElementById('confirm-modal-Header'), document.getElementById('confirmAbout'), document.getElementById('show-find-parms'), document.getElementById('find-modal'), document.getElementById('creation-date'), document.getElementById('date-of-change'), document.getElementById('noDate'), document.getElementById('findPeriodFrom'), document.getElementById('findPeriodTo'), document.getElementById('findCode'), document.getElementById('findValue'), document.getElementById('findYes'), document.getElementById('findNo'), document.getElementById('edit-modal'), document.getElementById('edit-modal-Header'), document.getElementById('edit-modal-imgMode'), document.getElementById('editCode'), document.getElementById('counterCode'), document.getElementById('editValue'), document.getElementById('counterValue'), document.getElementById('editDescription'), document.getElementById('counterDescription'), document.getElementById('editDateCreate'), document.getElementById('editDateUpdate'), document.getElementById('editYes'), document.getElementById('editNo'), document.getElementById('dicContextMenu'), document.getElementById('cm-Add'), document.getElementById('cm-reproduce'), document.getElementById('cm-edit'), document.getElementById('cm-info'), document.getElementById('cm-del'), document.getElementById('cm-find'), document.getElementById('cm-clear-find'));
//# sourceMappingURL=dictionary.js.map
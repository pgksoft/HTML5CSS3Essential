import { SortableUniqueCollection } from '../../../../js-advanced/_pgkUtils.js';
export var SortKind;
(function (SortKind) {
    SortKind[SortKind["Key"] = 0] = "Key";
    SortKind[SortKind["TypeLocation"] = 1] = "TypeLocation";
    SortKind[SortKind["Name"] = 2] = "Name";
    SortKind[SortKind["Duration"] = 3] = "Duration";
})(SortKind || (SortKind = {}));
;
var SortState;
(function (SortState) {
    SortState[SortState["No"] = 0] = "No";
    SortState[SortState["Ascending"] = 1] = "Ascending";
    SortState[SortState["Descending"] = 2] = "Descending";
})(SortState || (SortState = {}));
;
export class DBContent {
    constructor(primaryKey, content) {
        this._primaryKey = primaryKey;
        this._content = content;
    }
    get primaryKey() { return this._primaryKey; }
    set primaryKey(value) { this._primaryKey = value; }
    get content() { return this._content; }
    Equals(item) {
        return item.primaryKey == this.primaryKey && item.content.name === this.content.name && item.content.typeLocation === this.content.typeLocation;
    }
}
DBContent.maxLengthPriamryKeyToString = 4;
export class DBContentSortable extends SortableUniqueCollection {
    constructor() {
        super(...arguments);
        this._sortKind = SortKind.Key;
        this._sortState = SortState.No;
    }
    get sortKind() { return this._sortKind; }
    set sortKind(value) { this._sortKind = value; }
    get IsMustBeSorted() { return this._sortKind != SortKind.Key; }
    get sorted() {
        if (this._sortState == SortState.Ascending || this._sortState == SortState.No) {
            return this.list;
        }
        else {
            return this.reverseList;
        }
    }
    get sortState() { return this._sortState; }
    set sortState(value) { this._sortState = value; }
    updateItem(rec) {
        if (this.data.some(item => item.primaryKey == rec.primaryKey)) {
            let item = this.data.find(item => item.primaryKey == rec.primaryKey);
            item.content.currentTime = rec.content.currentTime;
            item.content.duration = rec.content.duration;
            item.content.isLoaded = rec.content.isLoaded;
            item.content.isMuted = rec.content.isMuted;
            item.content.isPlay = rec.content.isPlay;
            item.content.name = rec.content.name;
            item.content.playbackRate = rec.content.playbackRate;
            item.content.posterTime = rec.content.posterTime;
            item.content.src = rec.content.src;
            item.content.typeLocation = rec.content.typeLocation;
            item.content.volume = rec.content.volume;
            return true;
        }
        else {
            return false;
        }
    }
    Includes(element) {
        return this.data.some(item => item.Equals(element));
    }
    Sorted() {
        if (!this.isSorted) {
            switch (this.sortKind) {
                case SortKind.Key:
                    this.data = this.data.sort((a, b) => a.primaryKey - b.primaryKey);
                    break;
                case SortKind.Name:
                    this.data = this.data.sort((a, b) => a.content.name.localeCompare(b.content.name));
                    break;
                case SortKind.Duration:
                    this.data = this.data.sort((a, b) => a.content.duration > b.content.duration ? 1 : -1);
                    break;
                case SortKind.TypeLocation:
                    this.data = this.data.sort((a, b) => a.content.typeLocation > b.content.typeLocation ? 1 : -1);
                    break;
            }
            this.isSorted = true;
            this.isReverseSorted = false;
        }
    }
    ReverseSorted() {
        if (!this.isReverseSorted) {
            switch (this.sortKind) {
                case SortKind.Key:
                    this.data = this.data.sort((a, b) => b.primaryKey - a.primaryKey);
                    break;
                case SortKind.Name:
                    this.data = this.data.sort((a, b) => b.content.name.localeCompare(a.content.name));
                    break;
                case SortKind.Duration:
                    this.data = this.data.sort((a, b) => a.content.duration > b.content.duration ? -1 : 1);
                    break;
                case SortKind.TypeLocation:
                    this.data = this.data.sort((a, b) => a.content.typeLocation > b.content.typeLocation ? -1 : 1);
                    break;
            }
            this.isSorted = false;
            this.isReverseSorted = true;
        }
    }
    NextSortStep(kind) {
        if (this._sortKind != SortKind.Key && kind != this._sortKind) {
            this.ClearSort();
        }
        this._sortKind = kind;
        switch (this._sortState) {
            case SortState.No:
                this._sortState = SortState.Ascending;
                document.getElementById(`img-ascending-${kind}`).style.display = 'inline';
                document.getElementById(`img-descending-${kind}`).style.display = 'none';
                break;
            case SortState.Ascending:
                this._sortState = SortState.Descending;
                document.getElementById(`img-ascending-${kind}`).style.display = 'none';
                document.getElementById(`img-descending-${kind}`).style.display = 'inline';
                break;
            case SortState.Descending:
                this.ClearSort();
                break;
        }
    }
    ClearSort() {
        this._sortState = SortState.No;
        document.getElementById(`img-ascending-${this._sortKind}`).style.display = 'none';
        document.getElementById(`img-descending-${this._sortKind}`).style.display = 'none';
        this._sortKind = SortKind.Key;
    }
}
//# sourceMappingURL=modelView.js.map
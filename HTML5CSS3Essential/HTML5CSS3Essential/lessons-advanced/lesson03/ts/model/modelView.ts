import {

    CountableEqualityComparer,
    SortableUniqueCollection
} from '../../../../js-advanced/_pgkUtils.js'
import { VideoContent } from '../model/vgaContent.js'

export enum SortKind { Key, TypeLocation, Name, Duration, };
enum SortState { No, Ascending, Descending };

export interface IDBContent<T> extends CountableEqualityComparer<T> {
    primaryKey: number;
    content: VideoContent,
    Equals(item: T): boolean;
}

export class DBContent implements IDBContent<DBContent>{
    constructor(
        primaryKey: number,
        content: VideoContent
    ) {
        this._primaryKey = primaryKey;
        this._content = content
    }

    // Fields
    private _primaryKey: number;
    private _content: VideoContent;
    //
    static maxLengthPriamryKeyToString: number = 4;

    // Properties
    get primaryKey(): number { return this._primaryKey; }
    set primaryKey(value: number) { this._primaryKey = value; }
    get content(): VideoContent { return this._content; }

    // Methods
    Equals(item: DBContent): boolean {
        return item.primaryKey == this.primaryKey && item.content.name === this.content.name && item.content.typeLocation === this.content.typeLocation;
    }

    //toString(): string {
    //    return ` ${this.primaryKey.toString().padStart(Definition.maxLengthPriamryKeyToString)} |` +
    //        ` ${this.code.padEnd(Definition.maxLengthCode)} |` +
    //        ` ${this.value.padEnd(Definition.maxLengthValueToString)} |` +
    //        ` ${dateToString(this.dateUpdate)} |` +
    //        ` ${dateToString(this.dateCreate)} |` +
    //        ` ${this.description}`;
    //}

}

export class DBContentSortable<T extends IDBContent<T>> extends SortableUniqueCollection<T>{
    // Fields
    private _sortKind: SortKind = SortKind.Key;
    private _sortState: SortState = SortState.No;

    // Properties
    get sortKind(): SortKind { return this._sortKind; }
    set sortKind(value: SortKind) { this._sortKind = value; }
    get IsMustBeSorted(): boolean { return this._sortKind != SortKind.Key; }
    get sorted(): IterableIterator<T> {
        if (this._sortState == SortState.Ascending || this._sortState == SortState.No) {
            return this.list;
        } else {
            return this.reverseList;
        }
    }
    private get sortState(): SortState { return this._sortState; }
    private set sortState(value: SortState) { this._sortState = value; }

    updateItem(rec: T): boolean {
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
        } else {
            return false;
        }
    }

    Includes(element: T): boolean {
        return this.data.some(item => item.Equals(element));
    }

    protected Sorted() {
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

    protected ReverseSorted() {
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

    NextSortStep(kind: SortKind): void {
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


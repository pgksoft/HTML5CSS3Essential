export enum TypeLocation { Empty, Local, Server }

export const posterTimeDefault: number = 12;

export class VideoContent {
    constructor(
        name: string,
        src: string,
        typeLocation: TypeLocation = TypeLocation.Server
    ) {
        this._name = name;
        this._src = src;
        this._typeLocation = typeLocation;
    }

    // Fields
    private _typeLocation: TypeLocation = TypeLocation.Empty;
    private _name: string = '';
    private _src: string = '';
    private _duration: number = 0;
    private _currentTime: number = 0;
    private _posterTime: number = posterTimeDefault;
    private _posterSrc: string = '';
    private _volume: number = 0.5;
    private _playbackRate: number = 1;
    private _isMuted: boolean = false;
    private _isLoaded: boolean = false;
    private _isPlay: boolean = false;

    // Properties
    get typeLocation(): TypeLocation { return this._typeLocation; }
    set typeLocation(value: TypeLocation) { this._typeLocation = value; }
    get name(): string { return this._name; }
    set name(value: string) { this._name = value; }
    get src(): string { return this._src; }
    set src(value: string) { this._src = value; }
    get duration(): number { return this._duration; }
    set duration(value: number) { this._duration = value; }
    get currentTime(): number { return this._currentTime; }
    set currentTime(value: number) { this._currentTime = value; }
    get posterTime(): number { return this._posterTime; }
    set posterTime(value: number) { this._posterTime = value; }
    get posterSrc(): string { return this._posterSrc; }
    set posterSrc(value: string) { this._posterSrc = value; }
    get volume(): number { return this._volume; }
    set volume(value: number) { this._volume = value; }
    get playbackRate(): number { return this._playbackRate; }
    set playbackRate(value: number) { this._playbackRate = value; }
    get isMuted(): boolean { return this._isMuted; }
    set isMuted(value: boolean) { this._isMuted = value; }
    get isLoaded(): boolean { return this._isLoaded; }
    set isLoaded(value: boolean) { this._isLoaded = value; }
    get isPlay(): boolean { return this._isPlay; }
    set isPlay(value: boolean) { this._isPlay = value; }

}
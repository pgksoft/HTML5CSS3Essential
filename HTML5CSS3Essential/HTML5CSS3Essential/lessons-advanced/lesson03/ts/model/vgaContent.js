export var TypeLocation;
(function (TypeLocation) {
    TypeLocation[TypeLocation["Empty"] = 0] = "Empty";
    TypeLocation[TypeLocation["Local"] = 1] = "Local";
    TypeLocation[TypeLocation["Server"] = 2] = "Server";
})(TypeLocation || (TypeLocation = {}));
export const posterTimeDefault = 12;
export class VideoContent {
    constructor(name, src, typeLocation = TypeLocation.Server) {
        this._typeLocation = TypeLocation.Empty;
        this._name = '';
        this._src = '';
        this._duration = 0;
        this._currentTime = 0;
        this._posterTime = posterTimeDefault;
        this._posterSrc = '';
        this._volume = 0.5;
        this._playbackRate = 1;
        this._isMuted = false;
        this._isLoaded = false;
        this._isPlay = false;
        this._name = name;
        this._src = src;
        this._typeLocation = typeLocation;
    }
    get typeLocation() { return this._typeLocation; }
    set typeLocation(value) { this._typeLocation = value; }
    get name() { return this._name; }
    set name(value) { this._name = value; }
    get src() { return this._src; }
    set src(value) { this._src = value; }
    get duration() { return this._duration; }
    set duration(value) { this._duration = value; }
    get currentTime() { return this._currentTime; }
    set currentTime(value) { this._currentTime = value; }
    get posterTime() { return this._posterTime; }
    set posterTime(value) { this._posterTime = value; }
    get posterSrc() { return this._posterSrc; }
    set posterSrc(value) { this._posterSrc = value; }
    get volume() { return this._volume; }
    set volume(value) { this._volume = value; }
    get playbackRate() { return this._playbackRate; }
    set playbackRate(value) { this._playbackRate = value; }
    get isMuted() { return this._isMuted; }
    set isMuted(value) { this._isMuted = value; }
    get isLoaded() { return this._isLoaded; }
    set isLoaded(value) { this._isLoaded = value; }
    get isPlay() { return this._isPlay; }
    set isPlay(value) { this._isPlay = value; }
}
//# sourceMappingURL=vgaContent.js.map
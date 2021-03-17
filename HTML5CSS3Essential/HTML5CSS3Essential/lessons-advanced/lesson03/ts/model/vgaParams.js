import { VideoContent, TypeLocation } from '../model/vgaContent.js';
export const CustomEventContentsChange = 'vga-custom-event-contents-change';
class LSKeyParams {
    constructor() {
        this.app = 'Video-Gallery';
    }
}
class LSContent {
    constructor() {
        this.typeLocation = TypeLocation.Empty;
        this.name = '';
        this.src = '';
        this.duration = 0;
        this.currentTime = 0;
        this.posterTime = 0;
        this.posterSrc = '';
        this.volume = 0;
        this.playbackRate = 0;
        this.isMuted = false;
        this.isPlay = true;
    }
}
class LSValueParams {
    constructor() {
        this.contents = [];
    }
}
export const CustomEventVideoIsLoaded = 'VideoGallery-IsLoaded';
export const CustomEventWorkViewCloseEscKey = 'VideoGallery-WorkViewCloseEscKey';
export const CustomEventUpLoad = 'VideoGallery-Up-Load';
export const mainUploader = 'main-up-loader';
export const secondUploader = 'second-up-loader';
export class Params {
    constructor() {
        this._contents = [];
        this._localContents = [];
        this._localKey = new LSKeyParams();
        this._localParms = new LSValueParams();
        this._currentIndexContent = -1;
        this.InitServerMovies();
        this.DefineEvents();
        this.Load();
    }
    static get instance() {
        if (!Params._instance) {
            Params._instance = new Params();
        }
        return Params._instance;
    }
    get contents() { return this._contents; }
    set contents(value) { this._contents = value; }
    get localContents() { return this._localContents; }
    get localKey() { return this._localKey; }
    get localParms() { return this._localParms; }
    get currentIndexContent() { return this._currentIndexContent; }
    set currentIndexContent(value) { this._currentIndexContent = value; }
    DefineEvents() {
        document.addEventListener(CustomEventVideoIsLoaded, (e) => { this.OnIsLoaded(e); }, false);
        document.addEventListener(CustomEventContentsChange, () => { this.SaveAll(); }, false);
    }
    InitServerMovies() {
        this.AddServerMovies('DieterBohlen-MyBedIsTooBig.mp4');
        this.AddServerMovies('HavanaFeatYaar-ILostYouRemix.mp4');
        this.AddServerMovies('IdaCorr-vsFeddeLeGrand-LetMeThinkAboutIt.mp4');
        this.AddServerMovies('JanelleMonae-MakeMeFeel(DubaiRemix).mp4');
        this.AddServerMovies('NoizBasses-IamTheSexyGirl.mp4');
        this.AddServerMovies('Starkillers-DiscotekaReeceLow.mp4');
    }
    AddServerMovies(name) {
        let content = new VideoContent(name, `movies/${name}`);
        this.contents.push(content);
    }
    Load() {
        if (localStorage.getItem(JSON.stringify(this.localKey))) {
            this._localParms = JSON.parse(localStorage.getItem(JSON.stringify(this.localKey)));
            let index;
            for (let lsItem of this.localParms.contents) {
                index = this.contents.findIndex(item => item.name == lsItem.name);
                if (index == -1) {
                    this.contents.push(this.CreateNewContent(lsItem));
                }
                else {
                    this.contents[index].duration = lsItem.duration;
                    this.contents[index].currentTime = lsItem.currentTime;
                    this.contents[index].posterTime = lsItem.posterTime;
                    this.contents[index].volume = lsItem.volume;
                    this.contents[index].playbackRate = lsItem.playbackRate;
                    this.contents[index].isMuted = lsItem.isMuted;
                }
            }
        }
        else {
            for (let item of this.contents.filter(content => content.typeLocation == TypeLocation.Server)) {
                let video = document.createElement('video');
                video.src = item.src;
                let name = JSON.parse(JSON.stringify(item.name));
                video.addEventListener('loadeddata', (e) => {
                    let temp = e.target;
                    document.dispatchEvent(new CustomEvent(CustomEventVideoIsLoaded, { bubbles: true, detail: { name: name, duration: temp.duration, rate: temp.playbackRate } }));
                }, false);
            }
        }
    }
    CreateNewContent(item) {
        let content = new VideoContent(item.name, item.src, item.typeLocation);
        content.duration = item.duration;
        content.currentTime = item.currentTime;
        content.posterTime = item.posterTime;
        content.volume = item.volume;
        content.playbackRate = item.playbackRate;
        content.isMuted = item.isMuted;
        return content;
    }
    SaveAll() {
        let index;
        let lsContent;
        for (let vContent of this.contents) {
            index = this.localParms.contents.findIndex(item => item.name == vContent.name && item.typeLocation == vContent.typeLocation);
            if (index >= 0) {
                this.localParms.contents[index].typeLocation = vContent.typeLocation;
                this.localParms.contents[index].src = vContent.src;
                this.localParms.contents[index].duration = vContent.duration;
                this.localParms.contents[index].currentTime = vContent.currentTime;
                this.localParms.contents[index].posterTime = vContent.posterTime;
                this.localParms.contents[index].posterSrc = '';
                this.localParms.contents[index].volume = vContent.volume;
                this.localParms.contents[index].playbackRate = vContent.playbackRate;
                this.localParms.contents[index].isMuted = vContent.isMuted;
            }
            else {
                lsContent = new LSContent();
                lsContent.name = vContent.name;
                lsContent.typeLocation = vContent.typeLocation;
                lsContent.src = vContent.src;
                lsContent.duration = vContent.duration;
                lsContent.currentTime = vContent.currentTime;
                lsContent.posterTime = vContent.posterTime;
                lsContent.posterSrc = '';
                lsContent.volume = vContent.volume;
                lsContent.playbackRate = vContent.playbackRate;
                lsContent.isMuted = vContent.isMuted;
                this.localParms.contents.push(lsContent);
            }
        }
        this.Save();
    }
    Save() {
        localStorage.setItem(JSON.stringify(this.localKey), JSON.stringify(this.localParms));
    }
    OnIsLoaded(e) {
        let name = e.detail.name;
        let duration = e.detail.duration;
        let playbackRate = e.detail.rate;
        let index = this.contents.findIndex(content => content.name == name);
        if (index >= 0) {
            this.contents[index].duration = duration;
            this.contents[index].isLoaded = true;
            this.contents[index].playbackRate = playbackRate;
        }
        this.SaveAll();
    }
}
Params._instance = undefined;
//# sourceMappingURL=vgaParams.js.map
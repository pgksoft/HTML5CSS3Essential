import { VideoContent, TypeLocation } from '../model/vgaContent.js'

export const CustomEventContentsChange: string ='vga-custom-event-contents-change'

class LSKeyParams {
    app: string = 'Video-Gallery';
}

class LSContent {
    typeLocation: TypeLocation = TypeLocation.Empty;
    name: string = '';
    src: string = '';
    duration: number = 0;
    currentTime: number = 0;
    posterTime: number = 0;
    posterSrc: string = '';
    volume: number = 0;
    playbackRate: number = 0;
    isMuted: boolean = false;
    isPlay: boolean = true;
}

class LSValueParams {
    contents: LSContent[] = [];
}

export const CustomEventVideoIsLoaded: string = 'VideoGallery-IsLoaded';
export const CustomEventWorkViewCloseEscKey: string = 'VideoGallery-WorkViewCloseEscKey';
export const CustomEventUpLoad: string = 'VideoGallery-Up-Load';
//
export const mainUploader: string = 'main-up-loader';
export const secondUploader: string = 'second-up-loader';

export class Params {
    private constructor() {
        this.InitServerMovies();
        this.DefineEvents();
        this.Load();
    }

    // Fields
    private static _instance: Params = undefined;
    private _contents: VideoContent[] = [];
    private _localContents: VideoContent[] = [];
    private _localKey: LSKeyParams = new LSKeyParams();
    private _localParms: LSValueParams = new LSValueParams();
    private _currentIndexContent: number = -1;

    // Properties
    static get instance(): Params {
        if (!Params._instance) {
            Params._instance = new Params();
        }
        return Params._instance;
    }
    get contents(): VideoContent[] { return this._contents; }
    set contents(value: VideoContent[]) { this._contents = value; }
    get localContents(): VideoContent[] { return this._localContents; }
    get localKey(): LSKeyParams { return this._localKey; }
    get localParms(): LSValueParams { return this._localParms; }
    get currentIndexContent(): number { return this._currentIndexContent; }
    set currentIndexContent(value: number) { this._currentIndexContent = value; }

    // Methods

    // Helpers
    private DefineEvents(): void {
        document.addEventListener(CustomEventVideoIsLoaded, (e: CustomEvent) => { this.OnIsLoaded(e); }, false);
        document.addEventListener(CustomEventContentsChange, () => { this.SaveAll(); }, false);
    }

    private InitServerMovies(): void {
        this.AddServerMovies('DieterBohlen-MyBedIsTooBig.mp4');
        this.AddServerMovies('HavanaFeatYaar-ILostYouRemix.mp4');
        this.AddServerMovies('IdaCorr-vsFeddeLeGrand-LetMeThinkAboutIt.mp4');
        this.AddServerMovies('JanelleMonae-MakeMeFeel(DubaiRemix).mp4');
        this.AddServerMovies('NoizBasses-IamTheSexyGirl.mp4');
        this.AddServerMovies('Starkillers-DiscotekaReeceLow.mp4');
    }

    private AddServerMovies(name: string): void {
        let content: VideoContent = new VideoContent(name, `movies/${name}`);
        this.contents.push(content);
    }

    private Load(): void {
        if (localStorage.getItem(JSON.stringify(this.localKey))) {
            this._localParms = JSON.parse(localStorage.getItem(JSON.stringify(this.localKey)));
            let index: number;
            for (let lsItem of this.localParms.contents) {
                index = this.contents.findIndex(item => item.name == lsItem.name);
                if (index == -1) {
                    this.contents.push(this.CreateNewContent(lsItem));
                } else {
                    this.contents[index].duration = lsItem.duration;
                    this.contents[index].currentTime = lsItem.currentTime;
                    this.contents[index].posterTime = lsItem.posterTime;
                    this.contents[index].volume = lsItem.volume;
                    this.contents[index].playbackRate = lsItem.playbackRate;
                    this.contents[index].isMuted = lsItem.isMuted;
                }
            }
        } else {
            // Server videos only
            for (let item of this.contents.filter(content => content.typeLocation == TypeLocation.Server)) {
                let video: HTMLVideoElement = document.createElement('video');
                video.src = item.src;
                let name = JSON.parse(JSON.stringify(item.name));
                video.addEventListener('loadeddata', (e) => {
                    let temp: HTMLVideoElement = <HTMLVideoElement>e.target;
                    document.dispatchEvent(new CustomEvent(CustomEventVideoIsLoaded, { bubbles: true, detail: { name: name, duration: temp.duration, rate: temp.playbackRate } }));
                }, false);
            }
        }
    }

    private CreateNewContent(item: LSContent): VideoContent {
        let content: VideoContent = new VideoContent(item.name, item.src, item.typeLocation);
        content.duration = item.duration;
        content.currentTime = item.currentTime;
        content.posterTime = item.posterTime;
        content.volume = item.volume;
        content.playbackRate = item.playbackRate;
        content.isMuted = item.isMuted;
        return content;
    }

    private SaveAll(): void {
        let index: number;
        let lsContent: LSContent;
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
            } else {
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

    private Save(): void {
        localStorage.setItem(JSON.stringify(this.localKey), JSON.stringify(this.localParms));
    }

    private OnIsLoaded(e: CustomEvent) {
        let name: string = e.detail.name;
        let duration: number = e.detail.duration;
        let playbackRate: number = e.detail.rate;
        let index = this.contents.findIndex(content => content.name == name);
        if (index >= 0) {
            this.contents[index].duration = duration;
            this.contents[index].isLoaded = true;
            this.contents[index].playbackRate = playbackRate;
        }
        this.SaveAll();
    }

}
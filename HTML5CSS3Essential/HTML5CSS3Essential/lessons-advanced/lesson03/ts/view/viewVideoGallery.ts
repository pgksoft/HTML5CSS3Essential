import {
    dateToString,
    isDisplayBlock,
    requestFrame
} from '../../../../js-advanced/_pgkUtils.js';
import { ConfirmItems } from '../../../../model/confirmItems.js'
import { VGaDomItems } from '../model/vgaItems.js'
import {
    Params,
    CustomEventContentsChange,
    CustomEventWorkViewCloseEscKey,
    CustomEventUpLoad,
    mainUploader
} from '../model/vgaParams.js'
import {
    TypeLocation,
    VideoContent,
    posterTimeDefault
} from '../model/vgaContent.js'
import {
    PosterMenu
} from '../model/vgaPosterMenu.js'
import {
    ViewContents,
    CustomEventToWatch
} from '../view/viewContents.js'

const CustomEventLoaded: string = 'vga-custom-event-loaded';
const CustomEventGetPoster: string = 'vga-custom-event-get-poster';
const CustomEventPlaybackRateChanged: string = 'vga-custom-event-playback-rate-changed';

export class ViewVG {
    private constructor(
        domItems: VGaDomItems,
        params: Params,
        viewContents: ViewContents
    ) {
        this._domItems = domItems;
        this._params = params;
        this._viewContents = viewContents;
        //
        this.DefineEvents();
        //
        this.InitServerVideo();
    }

    // Fields
    private static _instance: ViewVG = undefined;
    private _domItems: VGaDomItems;
    private _params: Params;
    private _viewContents: ViewContents;
    private _posters: PosterMenu[] = [];

    // Properties
    static instance(): ViewVG {
        if (!ViewVG._instance) {
            throw new Error('Instance of ViewVG was not created.');
        };
        return ViewVG._instance
    }
    get domItems(): VGaDomItems { return this._domItems; }
    get params(): Params { return this._params }
    get viewContents(): ViewContents { return this._viewContents; }
    get posters(): PosterMenu[] { return this._posters; }

    // Methods
    static Create(
        domItems: VGaDomItems,
        params: Params,
        viewContents: ViewContents
    ): ViewVG {
        if (!ViewVG._instance) {
            ViewVG._instance = new ViewVG(
                domItems,
                params,
                viewContents
            )
        }
        return ViewVG._instance
    }

    // Helpers
    private DefineEvents(): void {
        PosterMenu.setVideo = this.SetVideo;
        PosterMenu.context = this;
        //
        this.domItems.addFiles.addEventListener('click', () => { this.domItems.files.click(); }, false);
        //
        this.domItems.files.addEventListener('change', () => { this.OnFilesChange(); }, false);
        this.domItems.openView.addEventListener('click', () => { this.viewContents.Open(); }, false);
        //
        this.domItems.video.addEventListener('play', (e) => { this.OnPlay(e); }, false);
        this.domItems.video.addEventListener('pause', (e) => { this.OnPause(e); }, false);
        this.domItems.video.addEventListener('timeupdate', (e) => { this.OnTimeUpdate(e); }, false);
        this.domItems.video.addEventListener('volumechange', (e) => { this.OnVolumeChange(e); }, false);
        //
        this.domItems.posterScreenshot.addEventListener('click', () => { this.OnPosterScreenshot(); }, false);
        this.domItems.rateSlower.addEventListener('click', () => { this.OnRateSlower(); }, false);
        this.domItems.rateMedium.addEventListener('click', () => { this.OnRateMedium(); }, false);
        this.domItems.rateFaster.addEventListener('click', () => { this.OnRateFaster(); }, false);
        //
        document.addEventListener(CustomEventLoaded, (e: CustomEvent) => { this.OnContentLoaded(e); }, false);
        document.addEventListener(CustomEventGetPoster, (e: CustomEvent) => { this.OnGetPoster(e); }, false);
        document.addEventListener(CustomEventPlaybackRateChanged, (e: CustomEvent) => { this.OnPlaybackRateChanged(e); }, false);
        document.addEventListener(CustomEventToWatch, (e: CustomEvent) => { this.OnViewToWatch(e); }, false);
        document.addEventListener(CustomEventUpLoad, (e: CustomEvent) => { this.OnUpLoad(e); }, false)
        //
        document.body.addEventListener('keydown', (e: KeyboardEvent) => { this.ListeningToKeystrokes(e); }, false);
    }

    private OnFilesChange(): void {
        document.dispatchEvent(new CustomEvent(CustomEventUpLoad, { bubbles: true, detail: { who: mainUploader } }));
    }

    private OnUpLoad(e: CustomEvent): void {
        let who: string = e.detail.who;
        if (who == mainUploader) {
            this.domItems.mainShowLoader.dataset.enabled = 'true';
            this.WaitingDownload(Array.from(this.domItems.files.files));
        }
        this.ExecFiles();
    }

    private ExecFiles() {
        if (this.domItems.files.files.length) {
            for (let file of this.domItems.files.files) {
                if (!Params.instance.localContents.some(item => item.name == file.name)) {
                    let indexContent: number = 0;
                    let posterTime = posterTimeDefault;
                    let video: HTMLVideoElement = document.createElement('video');
                    video.src = window.URL.createObjectURL(file);
                    if (!Params.instance.contents.some(item => item.name == file.name && item.typeLocation == TypeLocation.Local)) {
                        Params.instance.contents.push(new VideoContent(file.name, video.src, TypeLocation.Local));
                        indexContent = Params.instance.contents.length - 1;
                    } else {
                        indexContent = Params.instance.contents.findIndex(item => item.name == file.name && item.typeLocation == TypeLocation.Local)
                        posterTime = Params.instance.contents[indexContent].posterTime;
                    }
                    this.InitVideo(video, indexContent, posterTime);
                }
            }
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
            this.domItems.mainShowLoader.dataset.enabled = 'false';
        } else {
            requestFrame(() => this.WaitingDownload(files));
        }
    }

    private InitServerVideo() {
        let serverContents: VideoContent[] = Params.instance.contents.filter(content => content.typeLocation == TypeLocation.Server);
        for (let i = 0; i < serverContents.length; i++) {
            let video: HTMLVideoElement = document.createElement('video');
            video.src = serverContents[i].src;
            this.InitVideo(video, i, serverContents[i].posterTime);
        }
    }

    private InitVideo(video: HTMLVideoElement, indexContent: number, posterTime: number = 12) {
        video.controls = true;
        video.onloadeddata = (e) => {
            let temp: HTMLVideoElement = <HTMLVideoElement>e.target;
            document.dispatchEvent(new CustomEvent(CustomEventLoaded, { bubbles: true, detail: { index: indexContent, duration: temp.duration, src: temp.src, rate: temp.playbackRate } }))
            temp.currentTime = posterTime;
        };
        video.ontimeupdate = (e) => {
            let temp: HTMLVideoElement = <HTMLVideoElement>e.target;
            let img: HTMLImageElement = this.GetPoster(temp);
            this.AddPoster(img, indexContent);
            document.dispatchEvent(new CustomEvent(CustomEventGetPoster, { bubbles: true, detail: { index: indexContent, posterSrc: img.src } }))
        };
    }

    private GetPoster(temp: HTMLVideoElement): HTMLImageElement {
        let canvas = document.createElement('canvas');
        canvas.width = temp.videoWidth;
        canvas.height = temp.videoHeight;
        let context = canvas.getContext('2d');
        context.drawImage(temp, 0, 0, temp.videoWidth, temp.videoHeight);
        let dataURL = canvas.toDataURL();
        let img: HTMLImageElement = document.createElement('img');
        img.src = dataURL;
        return img;
    }

    private AddPoster(img: HTMLImageElement, indexContent: number) {
        let setPoster: HTMLElement = document.createElement('div');
        setPoster.dataset.indexContext = indexContent.toString();
        setPoster.classList.add(PosterMenu.cssSetMenu);
        setPoster.classList.add(PosterMenu.cssDefault);
        let itemPoster: HTMLElement = document.createElement('div');
        itemPoster.classList.add(PosterMenu.cssPosterMenu);
        itemPoster.style.backgroundImage = `url('${img.src}')`;
        setPoster.appendChild(itemPoster);
        this.domItems.posters.appendChild(setPoster);
        //
        this.posters.push(new PosterMenu(setPoster, Params.instance.contents[indexContent]));
    }

    private OnContentLoaded(e: CustomEvent): void {
        let index: number = e.detail.index;
        Params.instance.contents[index].isLoaded = true;
        if (Params.instance.contents[index].typeLocation == TypeLocation.Local) {
            Params.instance.contents[index].duration = e.detail.duration;
            Params.instance.contents[index].src = e.detail.src;
            Params.instance.contents[index].playbackRate = e.detail.rate;
            document.dispatchEvent(new CustomEvent(CustomEventContentsChange, { bubbles: true }));
        }
    }

    private OnGetPoster(e: CustomEvent): void {
        let index: number = e.detail.index;
        Params.instance.contents[index].posterSrc = e.detail.posterSrc;
        if (Params.instance.contents[index].typeLocation == TypeLocation.Server && this.domItems.video.dataset.name.length == 0) {
            this.posters.find(item => item.content.name == Params.instance.contents[index].name).OnClick();
        }
    }

    private SetVideo(content: VideoContent): void {
        // Previously active menu must be inactive
        for (let item of this.posters.filter(item => item.isActive && item.content.name !== content.name)) {
            item.UnActive();
        }
        //
        Params.instance.currentIndexContent = Params.instance.contents.findIndex(item => item.name == content.name && item.typeLocation == content.typeLocation);
        this.domItems.video.dataset.index = Params.instance.currentIndexContent.toString();
        this.domItems.video.dataset.name = content.name;
        this.domItems.video.src = content.src;
        this.domItems.video.playbackRate = content.playbackRate;
        this.domItems.video.currentTime = content.currentTime;
        this.domItems.video.muted = content.isMuted;
        this.domItems.video.volume = content.volume;
        this.domItems.playbackRate.innerHTML = `${this.domItems.video.playbackRate.toFixed(2)}`;
        this.ShowCurrentTime();
        document.dispatchEvent(new CustomEvent(CustomEventContentsChange, { bubbles: true }));
        if (content.isPlay) {
            this.domItems.video.play();
        }
    }

    private OnPlay(e: Event): void {
        let video = <HTMLVideoElement>e.target;
        let index: number = Number(video.dataset.index);
        Params.instance.contents[index].isPlay = true;
    }

    private OnPause(e: Event): void {
        let video = <HTMLVideoElement>e.target;
        let index: number = Number(video.dataset.index);
        Params.instance.contents[index].isPlay = false;
        if (video.currentTime == video.duration) {
            video.currentTime = 0;
            video.play();
        }
    }

    private OnTimeUpdate(e: Event): void {
        let video = <HTMLVideoElement>e.target;
        let index: number = Number(video.dataset.index);
        Params.instance.contents[index].currentTime = video.currentTime;
        this.ShowCurrentTime();
    }

    private OnVolumeChange(e: Event): void {
        let video = <HTMLVideoElement>e.target;
        let index: number = Number(video.dataset.index);
        Params.instance.contents[index].isMuted = video.muted;
        Params.instance.contents[index].volume = video.volume;
        document.dispatchEvent(new CustomEvent(CustomEventContentsChange, { bubbles: true }));
    }

    private OnPosterScreenshot(): void {
        let index: number = Number(this.domItems.video.dataset.index);
        if (index >= 0) {
            let posterTime = this.domItems.video.currentTime;
            let img: HTMLImageElement = this.GetPoster(this.domItems.video);
            let posterMenu: PosterMenu = this.posters.find(menu => menu.content.name == Params.instance.contents[index].name && menu.content.typeLocation == Params.instance.contents[index].typeLocation);
            if (posterMenu) {
                let itemPoster: HTMLElement = <HTMLElement>posterMenu.box.firstElementChild;
                itemPoster.style.backgroundImage = `url('${img.src}')`;
            }
            Params.instance.contents[index].posterTime = posterTime;
            Params.instance.contents[index].posterSrc = img.src;
            document.dispatchEvent(new CustomEvent(CustomEventContentsChange, { bubbles: true }));
        }
    }

    private OnRateSlower(): void {
        let index: number = Number(this.domItems.video.dataset.index);
        if (index >= 0) {
            this.domItems.video.playbackRate -= 0.05;
            Params.instance.contents[index].playbackRate = this.domItems.video.playbackRate;
            document.dispatchEvent(new CustomEvent(CustomEventPlaybackRateChanged, { bubbles: true, detail: { index: index, rate: Params.instance.contents[index].playbackRate } }))
        }
    }

    private OnRateMedium(): void {
        let index: number = Number(this.domItems.video.dataset.index);
        if (index >= 0) {
            this.domItems.video.playbackRate = 1;
            Params.instance.contents[index].playbackRate = this.domItems.video.playbackRate;
            document.dispatchEvent(new CustomEvent(CustomEventPlaybackRateChanged, { bubbles: true, detail: { index: index, rate: Params.instance.contents[index].playbackRate } }))
        }
    }

    private OnRateFaster(): void {
        let index: number = Number(this.domItems.video.dataset.index);
        if (index >= 0) {
            this.domItems.video.playbackRate += 0.05;
            Params.instance.contents[index].playbackRate = this.domItems.video.playbackRate;
            document.dispatchEvent(new CustomEvent(CustomEventPlaybackRateChanged, { bubbles: true, detail: { index: index, rate: Params.instance.contents[index].playbackRate } }))
        }
    }

    private OnPlaybackRateChanged(e: CustomEvent): void {
        this.domItems.playbackRate.innerHTML = `${this.domItems.video.playbackRate.toFixed(2)}`
        document.dispatchEvent(new CustomEvent(CustomEventContentsChange, { bubbles: true }));
    }

    private ShowCurrentTime(): void {
        if (this.domItems.video.duration) {
            this.domItems.currentTime.innerHTML = `${new Date(this.domItems.video.currentTime * 1000).toISOString().slice(11, -1)}`
                + ` / `
                + `${new Date(this.domItems.video.duration * 1000).toISOString().slice(11, -1)}`;
        }
    }

    private ListeningToKeystrokes(e: KeyboardEvent): void {
        if (e.charCode === 0) {
            switch (e.keyCode) {
                case 27:
                    if (!isDisplayBlock(ConfirmItems.instance.confirm)) {
                        this.domItems.workView.style.display = 'none';
                    } else {
                        document.dispatchEvent(new CustomEvent(CustomEventWorkViewCloseEscKey, { bubbles: true }));
                    }
                    break;
                default:
                    break;
            }
        }
    }

    private OnViewToWatch(e: CustomEvent) {
        let name: string = e.detail.name;
        let location: TypeLocation = e.detail.location;
        let content: VideoContent = this.params.contents.find(item => item.name == name && item.typeLocation == location);
        if (content && content.isLoaded) {
            let posterMenu: PosterMenu = this.posters.find(item => item.content == content);
            if (posterMenu) posterMenu.ToActive();
            this.SetVideo(content);
        }
    }

}
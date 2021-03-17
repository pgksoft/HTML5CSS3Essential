import { isDisplayBlock, requestFrame } from '../../../../js-advanced/_pgkUtils.js';
import { ConfirmItems } from '../../../../model/confirmItems.js';
import { Params, CustomEventContentsChange, CustomEventWorkViewCloseEscKey, CustomEventUpLoad, mainUploader } from '../model/vgaParams.js';
import { TypeLocation, VideoContent, posterTimeDefault } from '../model/vgaContent.js';
import { PosterMenu } from '../model/vgaPosterMenu.js';
import { CustomEventToWatch } from '../view/viewContents.js';
const CustomEventLoaded = 'vga-custom-event-loaded';
const CustomEventGetPoster = 'vga-custom-event-get-poster';
const CustomEventPlaybackRateChanged = 'vga-custom-event-playback-rate-changed';
export class ViewVG {
    constructor(domItems, params, viewContents) {
        this._posters = [];
        this._domItems = domItems;
        this._params = params;
        this._viewContents = viewContents;
        this.DefineEvents();
        this.InitServerVideo();
    }
    static instance() {
        if (!ViewVG._instance) {
            throw new Error('Instance of ViewVG was not created.');
        }
        ;
        return ViewVG._instance;
    }
    get domItems() { return this._domItems; }
    get params() { return this._params; }
    get viewContents() { return this._viewContents; }
    get posters() { return this._posters; }
    static Create(domItems, params, viewContents) {
        if (!ViewVG._instance) {
            ViewVG._instance = new ViewVG(domItems, params, viewContents);
        }
        return ViewVG._instance;
    }
    DefineEvents() {
        PosterMenu.setVideo = this.SetVideo;
        PosterMenu.context = this;
        this.domItems.addFiles.addEventListener('click', () => { this.domItems.files.click(); }, false);
        this.domItems.files.addEventListener('change', () => { this.OnFilesChange(); }, false);
        this.domItems.openView.addEventListener('click', () => { this.viewContents.Open(); }, false);
        this.domItems.video.addEventListener('play', (e) => { this.OnPlay(e); }, false);
        this.domItems.video.addEventListener('pause', (e) => { this.OnPause(e); }, false);
        this.domItems.video.addEventListener('timeupdate', (e) => { this.OnTimeUpdate(e); }, false);
        this.domItems.video.addEventListener('volumechange', (e) => { this.OnVolumeChange(e); }, false);
        this.domItems.posterScreenshot.addEventListener('click', () => { this.OnPosterScreenshot(); }, false);
        this.domItems.rateSlower.addEventListener('click', () => { this.OnRateSlower(); }, false);
        this.domItems.rateMedium.addEventListener('click', () => { this.OnRateMedium(); }, false);
        this.domItems.rateFaster.addEventListener('click', () => { this.OnRateFaster(); }, false);
        document.addEventListener(CustomEventLoaded, (e) => { this.OnContentLoaded(e); }, false);
        document.addEventListener(CustomEventGetPoster, (e) => { this.OnGetPoster(e); }, false);
        document.addEventListener(CustomEventPlaybackRateChanged, (e) => { this.OnPlaybackRateChanged(e); }, false);
        document.addEventListener(CustomEventToWatch, (e) => { this.OnViewToWatch(e); }, false);
        document.addEventListener(CustomEventUpLoad, (e) => { this.OnUpLoad(e); }, false);
        document.body.addEventListener('keydown', (e) => { this.ListeningToKeystrokes(e); }, false);
    }
    OnFilesChange() {
        document.dispatchEvent(new CustomEvent(CustomEventUpLoad, { bubbles: true, detail: { who: mainUploader } }));
    }
    OnUpLoad(e) {
        let who = e.detail.who;
        if (who == mainUploader) {
            this.domItems.mainShowLoader.dataset.enabled = 'true';
            this.WaitingDownload(Array.from(this.domItems.files.files));
        }
        this.ExecFiles();
    }
    ExecFiles() {
        if (this.domItems.files.files.length) {
            for (let file of this.domItems.files.files) {
                if (!Params.instance.localContents.some(item => item.name == file.name)) {
                    let indexContent = 0;
                    let posterTime = posterTimeDefault;
                    let video = document.createElement('video');
                    video.src = window.URL.createObjectURL(file);
                    if (!Params.instance.contents.some(item => item.name == file.name && item.typeLocation == TypeLocation.Local)) {
                        Params.instance.contents.push(new VideoContent(file.name, video.src, TypeLocation.Local));
                        indexContent = Params.instance.contents.length - 1;
                    }
                    else {
                        indexContent = Params.instance.contents.findIndex(item => item.name == file.name && item.typeLocation == TypeLocation.Local);
                        posterTime = Params.instance.contents[indexContent].posterTime;
                    }
                    this.InitVideo(video, indexContent, posterTime);
                }
            }
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
            this.domItems.mainShowLoader.dataset.enabled = 'false';
        }
        else {
            requestFrame(() => this.WaitingDownload(files));
        }
    }
    InitServerVideo() {
        let serverContents = Params.instance.contents.filter(content => content.typeLocation == TypeLocation.Server);
        for (let i = 0; i < serverContents.length; i++) {
            let video = document.createElement('video');
            video.src = serverContents[i].src;
            this.InitVideo(video, i, serverContents[i].posterTime);
        }
    }
    InitVideo(video, indexContent, posterTime = 12) {
        video.controls = true;
        video.onloadeddata = (e) => {
            let temp = e.target;
            document.dispatchEvent(new CustomEvent(CustomEventLoaded, { bubbles: true, detail: { index: indexContent, duration: temp.duration, src: temp.src, rate: temp.playbackRate } }));
            temp.currentTime = posterTime;
        };
        video.ontimeupdate = (e) => {
            let temp = e.target;
            let img = this.GetPoster(temp);
            this.AddPoster(img, indexContent);
            document.dispatchEvent(new CustomEvent(CustomEventGetPoster, { bubbles: true, detail: { index: indexContent, posterSrc: img.src } }));
        };
    }
    GetPoster(temp) {
        let canvas = document.createElement('canvas');
        canvas.width = temp.videoWidth;
        canvas.height = temp.videoHeight;
        let context = canvas.getContext('2d');
        context.drawImage(temp, 0, 0, temp.videoWidth, temp.videoHeight);
        let dataURL = canvas.toDataURL();
        let img = document.createElement('img');
        img.src = dataURL;
        return img;
    }
    AddPoster(img, indexContent) {
        let setPoster = document.createElement('div');
        setPoster.dataset.indexContext = indexContent.toString();
        setPoster.classList.add(PosterMenu.cssSetMenu);
        setPoster.classList.add(PosterMenu.cssDefault);
        let itemPoster = document.createElement('div');
        itemPoster.classList.add(PosterMenu.cssPosterMenu);
        itemPoster.style.backgroundImage = `url('${img.src}')`;
        setPoster.appendChild(itemPoster);
        this.domItems.posters.appendChild(setPoster);
        this.posters.push(new PosterMenu(setPoster, Params.instance.contents[indexContent]));
    }
    OnContentLoaded(e) {
        let index = e.detail.index;
        Params.instance.contents[index].isLoaded = true;
        if (Params.instance.contents[index].typeLocation == TypeLocation.Local) {
            Params.instance.contents[index].duration = e.detail.duration;
            Params.instance.contents[index].src = e.detail.src;
            Params.instance.contents[index].playbackRate = e.detail.rate;
            document.dispatchEvent(new CustomEvent(CustomEventContentsChange, { bubbles: true }));
        }
    }
    OnGetPoster(e) {
        let index = e.detail.index;
        Params.instance.contents[index].posterSrc = e.detail.posterSrc;
        if (Params.instance.contents[index].typeLocation == TypeLocation.Server && this.domItems.video.dataset.name.length == 0) {
            this.posters.find(item => item.content.name == Params.instance.contents[index].name).OnClick();
        }
    }
    SetVideo(content) {
        for (let item of this.posters.filter(item => item.isActive && item.content.name !== content.name)) {
            item.UnActive();
        }
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
    OnPlay(e) {
        let video = e.target;
        let index = Number(video.dataset.index);
        Params.instance.contents[index].isPlay = true;
    }
    OnPause(e) {
        let video = e.target;
        let index = Number(video.dataset.index);
        Params.instance.contents[index].isPlay = false;
        if (video.currentTime == video.duration) {
            video.currentTime = 0;
            video.play();
        }
    }
    OnTimeUpdate(e) {
        let video = e.target;
        let index = Number(video.dataset.index);
        Params.instance.contents[index].currentTime = video.currentTime;
        this.ShowCurrentTime();
    }
    OnVolumeChange(e) {
        let video = e.target;
        let index = Number(video.dataset.index);
        Params.instance.contents[index].isMuted = video.muted;
        Params.instance.contents[index].volume = video.volume;
        document.dispatchEvent(new CustomEvent(CustomEventContentsChange, { bubbles: true }));
    }
    OnPosterScreenshot() {
        let index = Number(this.domItems.video.dataset.index);
        if (index >= 0) {
            let posterTime = this.domItems.video.currentTime;
            let img = this.GetPoster(this.domItems.video);
            let posterMenu = this.posters.find(menu => menu.content.name == Params.instance.contents[index].name && menu.content.typeLocation == Params.instance.contents[index].typeLocation);
            if (posterMenu) {
                let itemPoster = posterMenu.box.firstElementChild;
                itemPoster.style.backgroundImage = `url('${img.src}')`;
            }
            Params.instance.contents[index].posterTime = posterTime;
            Params.instance.contents[index].posterSrc = img.src;
            document.dispatchEvent(new CustomEvent(CustomEventContentsChange, { bubbles: true }));
        }
    }
    OnRateSlower() {
        let index = Number(this.domItems.video.dataset.index);
        if (index >= 0) {
            this.domItems.video.playbackRate -= 0.05;
            Params.instance.contents[index].playbackRate = this.domItems.video.playbackRate;
            document.dispatchEvent(new CustomEvent(CustomEventPlaybackRateChanged, { bubbles: true, detail: { index: index, rate: Params.instance.contents[index].playbackRate } }));
        }
    }
    OnRateMedium() {
        let index = Number(this.domItems.video.dataset.index);
        if (index >= 0) {
            this.domItems.video.playbackRate = 1;
            Params.instance.contents[index].playbackRate = this.domItems.video.playbackRate;
            document.dispatchEvent(new CustomEvent(CustomEventPlaybackRateChanged, { bubbles: true, detail: { index: index, rate: Params.instance.contents[index].playbackRate } }));
        }
    }
    OnRateFaster() {
        let index = Number(this.domItems.video.dataset.index);
        if (index >= 0) {
            this.domItems.video.playbackRate += 0.05;
            Params.instance.contents[index].playbackRate = this.domItems.video.playbackRate;
            document.dispatchEvent(new CustomEvent(CustomEventPlaybackRateChanged, { bubbles: true, detail: { index: index, rate: Params.instance.contents[index].playbackRate } }));
        }
    }
    OnPlaybackRateChanged(e) {
        this.domItems.playbackRate.innerHTML = `${this.domItems.video.playbackRate.toFixed(2)}`;
        document.dispatchEvent(new CustomEvent(CustomEventContentsChange, { bubbles: true }));
    }
    ShowCurrentTime() {
        if (this.domItems.video.duration) {
            this.domItems.currentTime.innerHTML = `${new Date(this.domItems.video.currentTime * 1000).toISOString().slice(11, -1)}`
                + ` / `
                + `${new Date(this.domItems.video.duration * 1000).toISOString().slice(11, -1)}`;
        }
    }
    ListeningToKeystrokes(e) {
        if (e.charCode === 0) {
            switch (e.keyCode) {
                case 27:
                    if (!isDisplayBlock(ConfirmItems.instance.confirm)) {
                        this.domItems.workView.style.display = 'none';
                    }
                    else {
                        document.dispatchEvent(new CustomEvent(CustomEventWorkViewCloseEscKey, { bubbles: true }));
                    }
                    break;
                default:
                    break;
            }
        }
    }
    OnViewToWatch(e) {
        let name = e.detail.name;
        let location = e.detail.location;
        let content = this.params.contents.find(item => item.name == name && item.typeLocation == location);
        if (content && content.isLoaded) {
            let posterMenu = this.posters.find(item => item.content == content);
            if (posterMenu)
                posterMenu.ToActive();
            this.SetVideo(content);
        }
    }
}
ViewVG._instance = undefined;
//# sourceMappingURL=viewVideoGallery.js.map
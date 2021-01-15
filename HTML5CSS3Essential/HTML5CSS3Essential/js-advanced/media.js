class Controls {
    constructor(
        video,
        srcImgs
    ) {
        this.isLoadedMetadata = false;
        this._video = video;
        this._srcImgs = srcImgs;
        this._parent = this._video.parentElement;
        this.ManageWaitingForMetadataToLoad();
        this._video.addEventListener('loadedmetadata', () => { this.isLoadedMetadata = true; this.ToVisible(); }, false);
        this._video.addEventListener('play', () => { this.playImg.src = this._srcImgs._srcImgPause; }, false);
        this._video.addEventListener('pause', () => { this.playImg.src = this._srcImgs._srcImgPlay; }, false);
        this._video.addEventListener('timeupdate', () => { this.SetState(this._video.currentTime); }, false);
        this._video.addEventListener('mousemove', (e) => { this.CheckVisibleControlPanel(e); }, false);
        this._video.addEventListener('mouseleave', (e) => { this.CheckVisibleControlPanel(e); }, false);
        document.addEventListener('fullscreenchange', (e) => { this.OnFullScreenChange(); }, false);
        this._controlPanel;
        // Video ToolBar
        this._play;
        this._state;
        this._fullscreen;
        this._duration;
        this._isFullScreen = false;
        // Video Slider
        this._sliderControls;
        this._slider;
        this._timeID;
    }
    set controlPanel(value) {
        this._controlPanel = value;
        this._controlPanel.addEventListener('mouseover', () => { this._controlPanel.dataset.videoControlsVisible = 'true'; }, false);
    }
    get play() {
        return this._play;
    }
    set play(value) {
        this._play = value;
        this.playImg.src = this._srcImgs._srcImgPlay;
        this._play.onclick = () => { this.OnPlay(); };
        this._video.addEventListener('click', () => { this.OnPlay(); }, false);
    }
    get playImg() {
        return this.play.firstElementChild;
    }
    get state() {
        return this._state;
    }
    set state(value) {
        this._state = value;
    }
    get fullscreen() {
        return this._fullscreen;
    }
    set fullscreen(value) {
        this._fullscreen = value;
        this.fullscreenImg.src = this._srcImgs._srcImgFullScreen;
        this._fullscreen.onclick = () => { this.toggleFullscreen(); };
    }
    get fullscreenImg() {
        return this.fullscreen.firstElementChild;
    }
    set isFullScreen(value) {
        this._isFullScreen = value;
        this.fullscreen.dataset.isFullscreen = this._isFullScreen.toString();
    }
    get sliderControls() {
        return this._sliderControls;
    }
    set sliderControls(value) {
        this._sliderControls = value;
    }
    get slider() {
        return this._slider;
    }
    set slider(value) {
        this._slider = value;
        $(this._slider).slider({
            animate: "fast",
            range: "min",
            step: 1,
            value: 0,
            max: this._video.duration,
            slide: (e, ui) => { this._video.currentTime = ui.value; }
        });
    }
    // Methods
    ToVisible() {
        this._play.dataset.transparent = 'false';
        this.SetState();
        this._fullscreen.dataset.transparent = 'false';
        this._sliderControls.dataset.transparent = 'false';
    }
    // Helpers
    ManageWaitingForMetadataToLoad() {
        setTimeout(() => { this.WaitingForMetadataToLoad(); }, 500);
    }
    WaitingForMetadataToLoad() {
        if (this._video.duration) {
            if (!this.isLoadedMetadata) {
                this.ToVisible();
            }
        } else {
            setTimeout(() => { this.WaitingForMetadataToLoad(); }, 500);
        }
    }
    OnPlay() {
        if (this._video.paused) {
            this._video.play();
        } else {
            this._video.pause();
        }
    }
    SetState(currentTime = 0) {
        this.state.innerText = `${this.SecondToTime(currentTime)} / ${this.SecondToTime(this._video.duration)}`;
        $(this._slider).slider("option", "value", currentTime);
    }
    CheckVisibleControlPanel(e) {
        clearTimeout(this._timeID);
        if (e && e.type && e.type === 'mousemove') {
            this.WaitTurnOffVisibleControlPanel();
        } else if (e && e.type && e.type === 'mouseleave') {
            this._controlPanel.dataset.videoControlsVisible = 'false';
        }
    }
    WaitTurnOffVisibleControlPanel() {
        this._controlPanel.dataset.videoControlsVisible = 'true';
        this._timeID = setTimeout(() => { this._controlPanel.dataset.videoControlsVisible = 'false'; }, 3000);
    }
    SecondToTime(time) {
        let h = Math.floor(time / (60 * 60)),
            dm = time % (60 * 60),
            m = Math.floor(dm / 60),
            ds = dm % 60,
            s = Math.ceil(ds);
        if (s === 60) {
            s = 0;
            m = m + 1;
        }
        if (m === 60) {
            m = 0;
            h = h + 1;
        }
        return `${h === 0 ? '' : `${h.toString().padStart(2, '0')}:`}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    toggleFullscreen() {
        if (document.fullscreenEnabled) {
            if (!this._isFullScreen) {
                this.fullscreenImg.src = this._srcImgs._srcImgFullScreenExit;
                this.isFullScreen = !this._isFullScreen;
                this._parent.requestFullscreen().catch(err => {
                    this.fullscreenImg.src = this._srcImgs._srcImgFullScreen;
                    this.isFullScreen = !this._isFullScreen;
                    alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
                });
            } else {
                this.isFullScreen = !this._isFullScreen;
                document.exitFullscreen();
                this.fullscreenImg.src = this._srcImgs._srcImgFullScreen;
            }
        }
    }
    OnFullScreenChange() {
        if (!document.fullscreen && this._isFullScreen) {
            this.isFullScreen = !this._isFullScreen;
            this.fullscreenImg.src = this._srcImgs._srcImgFullScreen;
        }
    }
}

class Video {
    constructor(
        video,
        srcImgs,
    ) {
        this._video = video;
        this._controls = new Controls(
            this._video,
            srcImgs
        );
        if (this._video.nextElementSibling.dataset && this._video.nextElementSibling.dataset.isVideoControls) {
            this._controls.controlPanel = this._video.nextElementSibling;
            // Video Controls
            for (let element of this._video.nextElementSibling.childNodes) {
                if (element.dataset && element.dataset.videoToolbarControls) {
                    // Viseo Toolbar Controls
                    for (let tbControl of element.childNodes) {
                        if (tbControl.dataset && tbControl.dataset.isVideoControlPlay) {
                            this._controls.play = tbControl;
                        }
                        if (tbControl.dataset && tbControl.dataset.isVideoControlState) {
                            this._controls.state = tbControl;
                        }
                        if (tbControl.dataset && tbControl.dataset.isVideoControlFullscreen) {
                            this._controls.fullscreen = tbControl;
                        }
                    }
                }
                if (element.dataset && element.dataset.videoTrackControls) {
                    this._controls.sliderControls = element;
                    for (let slider of this._controls.sliderControls.childNodes) {
                        if (slider.dataset && slider.dataset.isSlider) {
                            this._controls.slider = slider;
                        }
                    }
                }
            }
        }
    }
}

class SrcImgs {
    constructor(
        srcImgPlay,
        srcImgPause,
        srcImgVolumeHight,
        srcImgVolumeMute,
        srcImgFullScreen,
        srcImgFullScreenExit
    ) {
        this._srcImgPlay = srcImgPlay;
        this._srcImgPause = srcImgPause;
        this._srcImgVolumeHight = srcImgVolumeHight;
        this._srcImgVolumeMute = srcImgVolumeMute;
        this._srcImgFullScreen = srcImgFullScreen;
        this._srcImgFullScreenExit = srcImgFullScreenExit;
    }
}

export class VideoGallery {
    constructor(
        srcImgPlay,
        srcImgPause,
        srcImgVolumeHight,
        srcImgVolumeMute,
        srcImgFullScreen,
        srcImgFullScreenExit
    ) {
        this._srcImgs = new SrcImgs(
            srcImgPlay,
            srcImgPause,
            srcImgVolumeHight,
            srcImgVolumeMute,
            srcImgFullScreen,
            srcImgFullScreenExit
        );
        this._videos = new Array();
    }
    add(video) {
        this._videos.push(new Video(video, this._srcImgs));
    }
}

/*
                 <div class="controls" data-is-video-controls="true" data-video-controls-visible="true">
                    <div data-video-toolbar-controls="true">
                        <div data-is-video-control-play="true" data-transparent="true">
                            <img src="" alt="" />
                        </div>
                        <p class="margin0" data-is-video-control-state="true"></p>
                        <div data-is-video-control-fullscreen="true" data-is-fullscreen="false" data-transparent="true">
                            <img src="" alt="" />
                        </div>
                    </div>
                    <div data-video-track-controls="true" data-transparent="true">
                        <div data-is-slider="true"></div>
                    </div>
                </div>

*/
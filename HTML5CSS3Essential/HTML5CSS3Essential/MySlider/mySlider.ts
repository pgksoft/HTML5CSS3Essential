class ListFS {
    constructor(public input: HTMLInputElement, public label: HTMLLabelElement) { }
}

export class Slider {
    static currentNameFullScring: string;
    static fullScreen: HTMLElement;
    static fullScreenImage: HTMLElement;
    static fullScreenClose: HTMLElement;
    static fullScreenImageLeft: HTMLElement;
    static fullScreenImageRight: HTMLElement;
    static fullScreenList: HTMLElement;
    static cssFullScreeListRadio: string = 'radio';
    static cssFullScreeListItem: string = 'item';
    //
    private _name: string;
    private _srcImgs: string[];
    private _imagesOff: HTMLElement;
    private _showLeftOff: HTMLElement;
    private _showRightOff: HTMLElement;
    private _showCollapsOff: HTMLElement;
    private _imageRate: number = 1.5;
    private _clipTimeOut: number;
    private _interval: number = 2100;
    private _indexImg: number = 0;
    private _image: HTMLImageElement = new Image();
    private _isFullScreen: boolean = false;
    private _listFSImages: ListFS[] = new Array();
    constructor(
        name: string,
        srcImgs: string[],
        imagesOff: HTMLElement,
        showLeftOff: HTMLElement,
        showRightOff: HTMLElement,
        showCollapsOff: HTMLElement
    ) {
        this._name = name;
        this._srcImgs = srcImgs;
        this._imagesOff = imagesOff;
        this._showLeftOff = showLeftOff;
        this._showRightOff = showRightOff;
        this._showCollapsOff = showCollapsOff;
        // Set Events
        this.SetOnLoadImage();
        this.SetWindowResize();
        this.SetOnClickOff();
        this.SetOnClickFullScreen();
        this.SetEnableShowLeftRight(this._showLeftOff, this._showRightOff);
        // Launching
        this.OnWindowResize();
        this._image.src = this._srcImgs[this._indexImg];
        this.clipRandomAnimate(this._interval, this._imagesOff);
    }

    // Helpers
    private SetOnLoadImage(): void {
        this._image.addEventListener('load', () => {
            if (!this._isFullScreen) {
                this._imagesOff.style.backgroundImage = `url('${this._image.src}')`;
            } else {
                Slider.fullScreenImage.style.backgroundImage = `url('${this._image.src}')`;
            }
        }, false);
        this._image.addEventListener('error', () => {
            console.log(`error load: ${this._image.src}`);
        }, false);
    }
    //
    private SetOnClickFullScreen(): void {
        //
        Slider.fullScreenClose.addEventListener('click', () => {
            this._isFullScreen = false;
            Slider.fullScreen.style.opacity = '0';
            setTimeout(() => {
                document.getElementsByTagName('html')[0].style.overflow = 'auto';
                Slider.fullScreen.style.display = 'none';
                clearTimeout(this._clipTimeOut);
                this.clipRandomAnimate(this._interval, this._imagesOff);
                Slider.fullScreenList.innerHTML = '';
                this._listFSImages.length = 0;
            }, 450);
        }, false);
        //
        Slider.fullScreenImageLeft.addEventListener('click', () => {
            if (Slider.currentNameFullScring === this._name && this._indexImg > 0) {
                this._indexImg -= 1;
                this.ToChangeFullScreenImage();
                this._image.src = this._srcImgs[this._indexImg];
                this.SetEnableShowLeftRight(Slider.fullScreenImageLeft, Slider.fullScreenImageRight);
            };
        }, false);
        //
        Slider.fullScreenImageRight.addEventListener('click', () => {
            if (Slider.currentNameFullScring === this._name && this._indexImg < this._srcImgs.length - 1) {
                this._indexImg += 1;
                this.ToChangeFullScreenImage();
                this._image.src = this._srcImgs[this._indexImg];
                this.SetEnableShowLeftRight(Slider.fullScreenImageLeft, Slider.fullScreenImageRight);
            };
        }, false);
    }
    //        
    private SetWindowResize(): void {
        window.addEventListener('resize', () => {
            this.OnWindowResize();
        }, false);
    }
    //
    private OnWindowResize() {
        this._imagesOff.style.height = `${this._imagesOff.clientWidth / this._imageRate}px`;
    }
    //
    private SetOnClickOff(): void {
        //
        this._showLeftOff.addEventListener('click', () => {
            if (this._indexImg > 0) {
                this._indexImg -= 1;
                this._image.src = this._srcImgs[this._indexImg];
            };
            this.SetEnableShowLeftRight(this._showLeftOff, this._showRightOff);
        }, false);
        //
        this._showRightOff.addEventListener('click', () => {
            if (this._indexImg < this._srcImgs.length - 1) {
                this._indexImg += 1;
                this._image.src = this._srcImgs[this._indexImg];
            };
            this.SetEnableShowLeftRight(this._showLeftOff, this._showRightOff);
        }, false);
        //
        this._showCollapsOff.addEventListener('click', () => {
            clearTimeout(this._clipTimeOut);
            Slider.currentNameFullScring = this._name;
            let lbSelected: HTMLLabelElement;
            document.getElementsByTagName('html')[0].style.overflow = 'hidden';
            this._isFullScreen = true;
            this._image.src = this._srcImgs[this._indexImg];
            this.SetEnableShowLeftRight(Slider.fullScreenImageLeft, Slider.fullScreenImageRight);
            Slider.fullScreen.style.display = 'flex';
            setTimeout(() => { Slider.fullScreen.style.opacity = '1'; }, 50);
            // Create list images
            Slider.fullScreenList.innerHTML = '';
            this._listFSImages.length = 0;
            for (let item = 0; item < this._srcImgs.length; item++) {
                let rb = document.createElement('input');
                rb.type = 'radio';
                rb.name = 'listImgs';
                rb.id = `img${item}`;
                rb.dataset['indexImg'] = `${item}`;
                rb.className = Slider.cssFullScreeListRadio;
                rb.addEventListener('change', (e) => { this.OnChangeFullScreenList(e); }, false);
                let lb = document.createElement('label');
                lb.htmlFor = rb.id;
                lb.className = Slider.cssFullScreeListItem;
                let img = document.createElement('img');
                let preloadImg: HTMLImageElement = new Image();
                preloadImg.addEventListener('load', () => { img.src = preloadImg.src; }, false);
                preloadImg.src = this._srcImgs[item];
                lb.appendChild(img);
                this._listFSImages.push(new ListFS(rb, lb));
                Slider.fullScreenList.appendChild(rb);
                Slider.fullScreenList.appendChild(lb);
                if (item === this._indexImg) {
                    rb.checked = true;
                    lbSelected = lb;
                }
            }
            window.setTimeout(() => { lbSelected.scrollIntoView({ block: "center", behavior: "smooth" }); }, 50);
        }, false);
        //
        this._imagesOff.addEventListener('mouseenter', () => {
            clearTimeout(this._clipTimeOut);
        }, false);
        //
        this._imagesOff.addEventListener('mouseleave', () => {
            clearTimeout(this._clipTimeOut);
            if (!this._isFullScreen) {
                this.clipRandomAnimate(this._interval, this._imagesOff);
            }
        }, false);
    }
    //
    private SetEnableShowLeftRight(arrowLeft: HTMLElement, arrowRight: HTMLElement): void {
        if (this._indexImg == 0) {
            arrowLeft.dataset.enable = 'false';
            arrowRight.dataset.enable = 'true';
        } else if (this._indexImg == this._srcImgs.length - 1) {
            arrowLeft.dataset.enable = 'true';
            arrowRight.dataset.enable = 'false';
        } else {
            arrowLeft.dataset.enable = 'true';
            arrowRight.dataset.enable = 'true';
        }
    }
    //
    private clipRandomAnimate(interval, box: HTMLElement): void {
        clearTimeout(this._clipTimeOut);
        if (!this._isFullScreen) {
            this._clipTimeOut = window.setTimeout(() => {
                this._indexImg = (this._indexImg < this._srcImgs.length - 1) ? (this._indexImg + 1) : 0;
                this._image.src = this._srcImgs[this._indexImg];
                this.SetEnableShowLeftRight(this._showLeftOff, this._showRightOff);
                this._clipTimeOut = window.setTimeout(() => { this.clipRandomAnimate(interval, box); }, interval);
            }, interval);
        }
    }
    //
    private ToChangeFullScreenImage(): void {
        let selected = this._listFSImages.filter(elem => elem.input.dataset['indexImg'] === this._indexImg.toString());
        if (selected.length && selected.length === 1) {
            selected[0].input.checked = true;
            selected[0].label.scrollIntoView({ block: "center", behavior: "smooth" });
        }
    }
    //
    private OnChangeFullScreenList(e: Event): void {
        let selected: HTMLInputElement = e.target as HTMLInputElement;
        if (selected.checked) {
            this._indexImg = Number(selected.dataset['indexImg']);
            this._image.src = this._srcImgs[this._indexImg];
            this.SetEnableShowLeftRight(Slider.fullScreenImageLeft, Slider.fullScreenImageRight);
            this._listFSImages.filter(elem => elem.input.dataset['indexImg'] === selected.dataset['indexImg'])[0].label.scrollIntoView({ block: "center", behavior: "smooth" });
        }
    }
}
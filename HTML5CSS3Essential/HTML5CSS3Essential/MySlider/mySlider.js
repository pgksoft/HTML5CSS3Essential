class ListFS {
    constructor(input, label) {
        this.input = input;
        this.label = label;
    }
}
export class Slider {
    constructor(name, srcImgs, imagesOff, showLeftOff, showRightOff, showCollapsOff) {
        this._imageRate = 1.5;
        this._interval = 2100;
        this._indexImg = 0;
        this._image = new Image();
        this._isFullScreen = false;
        this._listFSImages = new Array();
        this._name = name;
        this._srcImgs = srcImgs;
        this._imagesOff = imagesOff;
        this._showLeftOff = showLeftOff;
        this._showRightOff = showRightOff;
        this._showCollapsOff = showCollapsOff;
        this.SetOnLoadImage();
        this.SetWindowResize();
        this.SetOnClickOff();
        this.SetOnClickFullScreen();
        this.SetEnableShowLeftRight(this._showLeftOff, this._showRightOff);
        this.OnWindowResize();
        this._image.src = this._srcImgs[this._indexImg];
        this.clipRandomAnimate(this._interval, this._imagesOff);
    }
    SetOnLoadImage() {
        this._image.addEventListener('load', () => {
            if (!this._isFullScreen) {
                this._imagesOff.style.backgroundImage = `url('${this._image.src}')`;
            }
            else {
                Slider.fullScreenImage.style.backgroundImage = `url('${this._image.src}')`;
            }
        }, false);
        this._image.addEventListener('error', () => {
            console.log(`error load: ${this._image.src}`);
        }, false);
    }
    SetOnClickFullScreen() {
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
        Slider.fullScreenImageLeft.addEventListener('click', () => {
            if (Slider.currentNameFullScring === this._name && this._indexImg > 0) {
                this._indexImg -= 1;
                this.ToChangeFullScreenImage();
                this._image.src = this._srcImgs[this._indexImg];
                this.SetEnableShowLeftRight(Slider.fullScreenImageLeft, Slider.fullScreenImageRight);
            }
            ;
        }, false);
        Slider.fullScreenImageRight.addEventListener('click', () => {
            if (Slider.currentNameFullScring === this._name && this._indexImg < this._srcImgs.length - 1) {
                this._indexImg += 1;
                this.ToChangeFullScreenImage();
                this._image.src = this._srcImgs[this._indexImg];
                this.SetEnableShowLeftRight(Slider.fullScreenImageLeft, Slider.fullScreenImageRight);
            }
            ;
        }, false);
    }
    SetWindowResize() {
        window.addEventListener('resize', () => {
            this.OnWindowResize();
        }, false);
    }
    OnWindowResize() {
        this._imagesOff.style.height = `${this._imagesOff.clientWidth / this._imageRate}px`;
    }
    SetOnClickOff() {
        this._showLeftOff.addEventListener('click', () => {
            if (this._indexImg > 0) {
                this._indexImg -= 1;
                this._image.src = this._srcImgs[this._indexImg];
            }
            ;
            this.SetEnableShowLeftRight(this._showLeftOff, this._showRightOff);
        }, false);
        this._showRightOff.addEventListener('click', () => {
            if (this._indexImg < this._srcImgs.length - 1) {
                this._indexImg += 1;
                this._image.src = this._srcImgs[this._indexImg];
            }
            ;
            this.SetEnableShowLeftRight(this._showLeftOff, this._showRightOff);
        }, false);
        this._showCollapsOff.addEventListener('click', () => {
            clearTimeout(this._clipTimeOut);
            Slider.currentNameFullScring = this._name;
            let lbSelected;
            document.getElementsByTagName('html')[0].style.overflow = 'hidden';
            this._isFullScreen = true;
            this._image.src = this._srcImgs[this._indexImg];
            this.SetEnableShowLeftRight(Slider.fullScreenImageLeft, Slider.fullScreenImageRight);
            Slider.fullScreen.style.display = 'flex';
            setTimeout(() => { Slider.fullScreen.style.opacity = '1'; }, 50);
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
                let preloadImg = new Image();
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
        this._imagesOff.addEventListener('mouseenter', () => {
            clearTimeout(this._clipTimeOut);
        }, false);
        this._imagesOff.addEventListener('mouseleave', () => {
            clearTimeout(this._clipTimeOut);
            if (!this._isFullScreen) {
                this.clipRandomAnimate(this._interval, this._imagesOff);
            }
        }, false);
    }
    SetEnableShowLeftRight(arrowLeft, arrowRight) {
        if (this._indexImg == 0) {
            arrowLeft.dataset.enable = 'false';
            arrowRight.dataset.enable = 'true';
        }
        else if (this._indexImg == this._srcImgs.length - 1) {
            arrowLeft.dataset.enable = 'true';
            arrowRight.dataset.enable = 'false';
        }
        else {
            arrowLeft.dataset.enable = 'true';
            arrowRight.dataset.enable = 'true';
        }
    }
    clipRandomAnimate(interval, box) {
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
    ToChangeFullScreenImage() {
        let selected = this._listFSImages.filter(elem => elem.input.dataset['indexImg'] === this._indexImg.toString());
        if (selected.length && selected.length === 1) {
            selected[0].input.checked = true;
            selected[0].label.scrollIntoView({ block: "center", behavior: "smooth" });
        }
    }
    OnChangeFullScreenList(e) {
        let selected = e.target;
        if (selected.checked) {
            this._indexImg = Number(selected.dataset['indexImg']);
            this._image.src = this._srcImgs[this._indexImg];
            this.SetEnableShowLeftRight(Slider.fullScreenImageLeft, Slider.fullScreenImageRight);
            this._listFSImages.filter(elem => elem.input.dataset['indexImg'] === selected.dataset['indexImg'])[0].label.scrollIntoView({ block: "center", behavior: "smooth" });
        }
    }
}
Slider.cssFullScreeListRadio = 'radio';
Slider.cssFullScreeListItem = 'item';
//# sourceMappingURL=mySlider.js.map
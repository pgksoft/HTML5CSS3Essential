import * as SL from '../../../MySlider/mySlider'
import { fail } from 'assert';

class TravelAgency {
    private _errorLoadDescription: HTMLLabelElement[];
    private _mapHotel: HTMLElement;
    private _nameMapHotel: HTMLSpanElement;
    private _closeMapHotel: HTMLElement;
    private _mapFrame: HTMLIFrameElement;
    private _listAnchorToMap: HTMLAnchorElement[];
    private _sliderHotels: SL.Slider[];
    constructor(
        errorLoadDescription: HTMLLabelElement[],
        listAnchorToMap: HTMLAnchorElement[],
        mapHotel: HTMLElement,
        nameMapHotel: HTMLSpanElement,
        closeMapHotel: HTMLElement,
        mapFrame: HTMLIFrameElement,
        sliderHotels: SL.Slider[]
    ) {
        this._errorLoadDescription = errorLoadDescription;
        this._listAnchorToMap = listAnchorToMap;
        this._mapHotel = mapHotel;
        this._nameMapHotel = nameMapHotel;
        this._closeMapHotel = closeMapHotel;
        this._mapFrame = mapFrame;
        this._sliderHotels = sliderHotels;
        //
        for (let err of this._errorLoadDescription) {
            console.log(err.innerText);
        }
        //
        this.SetEventAnchor();
    }
    // Helpers
    SetEventAnchor() {
        for (let item of this._listAnchorToMap) {
            item.addEventListener('click', () => {
                this._nameMapHotel.innerText = item.dataset.nameHotel;
                if (item.dataset.mapSrc) {
                    this._mapFrame.src = item.dataset.mapSrc;
                }
                document.getElementsByTagName('html')[0].style.overflow = 'hidden';
                this._mapHotel.style.display = 'flex';
                setTimeout(() => { this._mapHotel.style.opacity = '1'; }, 100);
            }, false);
        }
        this._closeMapHotel.addEventListener('click', () => {
            this._mapHotel.style.opacity = '0';
            setTimeout(() => {
                document.getElementsByTagName('html')[0].style.overflow = 'auto';
                this._mapHotel.style.display = 'none';
                this._mapFrame.removeAttribute('src');
            }, 450);
        }, false);
    }
}

SL.Slider.fullScreen = document.getElementById('show-full-screen');
SL.Slider.fullScreenImage = document.getElementById('full-screen-image');
SL.Slider.fullScreenClose = document.getElementById('full-screen-close');
SL.Slider.fullScreenImageLeft = document.getElementById('images-fs-left');
SL.Slider.fullScreenImageRight = document.getElementById('images-fs-right');
SL.Slider.fullScreenList = document.getElementById('full-screen-list');

let manageTavelAgency: TravelAgency = new TravelAgency(
    [
        <HTMLLabelElement>document.getElementById('errorLoadDescription01'),
        <HTMLLabelElement>document.getElementById('errorLoadDescription02'),
        <HTMLLabelElement>document.getElementById('errorLoadDescription03'),
        <HTMLLabelElement>document.getElementById('errorLoadDescription04')
    ],
    [
        <HTMLAnchorElement>document.getElementById('01-anchor-to-map'),
        <HTMLAnchorElement>document.getElementById('02-anchor-to-map'),
        <HTMLAnchorElement>document.getElementById('03-anchor-to-map'),
        <HTMLAnchorElement>document.getElementById('04-anchor-to-map')
    ],
    document.getElementById('map-hotel'),
    document.getElementById('map-name-hotel'),
    document.getElementById('map-close-control'),
    <HTMLIFrameElement>document.getElementById('map'),
    [
        new SL.Slider('01',
            [
                'Hotels/Maxx-Royal-Kemer-Resort/01-maxx-royal-kemer-resort.jpg',
                'Hotels/Maxx-Royal-Kemer-Resort/02-maxx-royal-kemer-resort.jpg',
                'Hotels/Maxx-Royal-Kemer-Resort/03-maxx-royal-kemer-resort.jpg',
                'Hotels/Maxx-Royal-Kemer-Resort/04-maxx-royal-kemer-resort.jpg',
                'Hotels/Maxx-Royal-Kemer-Resort/05-maxx-royal-kemer-resort.jpg',
                'Hotels/Maxx-Royal-Kemer-Resort/06-maxx-royal-kemer-resort.jpg',
                'Hotels/Maxx-Royal-Kemer-Resort/07-maxx-royal-kemer-resort.jpg',
                'Hotels/Maxx-Royal-Kemer-Resort/08-maxx-royal-kemer-resort.jpg',
                'Hotels/Maxx-Royal-Kemer-Resort/09-maxx-royal-kemer-resort.jpg',
                'Hotels/Maxx-Royal-Kemer-Resort/10-maxx-royal-kemer-resort.jpg',
                'Hotels/Maxx-Royal-Kemer-Resort/11-maxx-royal-kemer-resort.jpg'
            ],
            document.getElementById('01-imagesOff'),
            document.getElementById('01-images-show-left'),
            document.getElementById('01-images-show-right'),
            document.getElementById('01-show-collaps-off')
        ),
        new SL.Slider('02',
            [
                'Hotels/Maxx-Royal-Belek-Golf-Resort/01-maxx-royal-belek-golf-resort.jpg',
                'Hotels/Maxx-Royal-Belek-Golf-Resort/02-maxx-royal-belek-golf-resort.jpg',
                'Hotels/Maxx-Royal-Belek-Golf-Resort/03-maxx-royal-belek-golf-resort.jpg',
                'Hotels/Maxx-Royal-Belek-Golf-Resort/04-maxx-royal-belek-golf-resort.jpg',
                'Hotels/Maxx-Royal-Belek-Golf-Resort/05-maxx-royal-belek-golf-resort.jpg',
                'Hotels/Maxx-Royal-Belek-Golf-Resort/06-maxx-royal-belek-golf-resort.jpg',
                'Hotels/Maxx-Royal-Belek-Golf-Resort/07-maxx-royal-belek-golf-resort.jpg',
                'Hotels/Maxx-Royal-Belek-Golf-Resort/08-maxx-royal-belek-golf-resort.jpg',
                'Hotels/Maxx-Royal-Belek-Golf-Resort/09-maxx-royal-belek-golf-resort.jpg',
                'Hotels/Maxx-Royal-Belek-Golf-Resort/10-maxx-royal-belek-golf-resort.jpg',
                'Hotels/Maxx-Royal-Belek-Golf-Resort/11-maxx-royal-belek-golf-resort.jpg',
                'Hotels/Maxx-Royal-Belek-Golf-Resort/12-maxx-royal-belek-golf-resort.jpg',
                'Hotels/Maxx-Royal-Belek-Golf-Resort/13-maxx-royal-belek-golf-resort.jpg',
                'Hotels/Maxx-Royal-Belek-Golf-Resort/14-maxx-royal-belek-golf-resort.jpg'
            ],
            document.getElementById('02-imagesOff'),
            document.getElementById('02-images-show-left'),
            document.getElementById('02-images-show-right'),
            document.getElementById('02-show-collaps-off')
        ),
        new SL.Slider('03',
            [
                'Hotels/Gloria-Serenity-Resort/01-gloria-serenity-resort.jpg',
                'Hotels/Gloria-Serenity-Resort/02-gloria-serenity-resort.jpg',
                'Hotels/Gloria-Serenity-Resort/03-gloria-serenity-resort.jpg',
                'Hotels/Gloria-Serenity-Resort/04-gloria-serenity-resort.jpg',
                'Hotels/Gloria-Serenity-Resort/05-gloria-serenity-resort.jpg',
                'Hotels/Gloria-Serenity-Resort/06-gloria-serenity-resort.jpg',
                'Hotels/Gloria-Serenity-Resort/07-gloria-serenity-resort.jpg',
                'Hotels/Gloria-Serenity-Resort/08-gloria-serenity-resort.jpg',
                'Hotels/Gloria-Serenity-Resort/09-gloria-serenity-resort.jpg',
                'Hotels/Gloria-Serenity-Resort/10-gloria-serenity-resort.jpg',
                'Hotels/Gloria-Serenity-Resort/11-gloria-serenity-resort.jpg',
                'Hotels/Gloria-Serenity-Resort/12-gloria-serenity-resort.jpg',
                'Hotels/Gloria-Serenity-Resort/13-gloria-serenity-resort.jpg',
                'Hotels/Gloria-Serenity-Resort/14-gloria-serenity-resort.jpg',
                'Hotels/Gloria-Serenity-Resort/15-gloria-serenity-resort.jpg'
            ],
            document.getElementById('03-imagesOff'),
            document.getElementById('03-images-show-left'),
            document.getElementById('03-images-show-right'),
            document.getElementById('03-show-collaps-off')
        ),
        new SL.Slider('04',
            [
                'Hotels/Hilton-Dalaman-Sarigerme-Resort-Spa/01-hilton-dalaman-sarigerme-resort-spa.jpg',
                'Hotels/Hilton-Dalaman-Sarigerme-Resort-Spa/02-hilton-dalaman-sarigerme-resort-spa.jpg',
                'Hotels/Hilton-Dalaman-Sarigerme-Resort-Spa/03-hilton-dalaman-sarigerme-resort-spa.jpg',
                'Hotels/Hilton-Dalaman-Sarigerme-Resort-Spa/04-hilton-dalaman-sarigerme-resort-spa.jpg',
                'Hotels/Hilton-Dalaman-Sarigerme-Resort-Spa/05-hilton-dalaman-sarigerme-resort-spa.jpg',
                'Hotels/Hilton-Dalaman-Sarigerme-Resort-Spa/06-hilton-dalaman-sarigerme-resort-spa.jpg',
                'Hotels/Hilton-Dalaman-Sarigerme-Resort-Spa/07-hilton-dalaman-sarigerme-resort-spa.jpg',
                'Hotels/Hilton-Dalaman-Sarigerme-Resort-Spa/08-hilton-dalaman-sarigerme-resort-spa.jpg',
                'Hotels/Hilton-Dalaman-Sarigerme-Resort-Spa/09-hilton-dalaman-sarigerme-resort-spa.jpg',
                'Hotels/Hilton-Dalaman-Sarigerme-Resort-Spa/10-hilton-dalaman-sarigerme-resort-spa.jpg',
                'Hotels/Hilton-Dalaman-Sarigerme-Resort-Spa/11-hilton-dalaman-sarigerme-resort-spa.jpg',
                'Hotels/Hilton-Dalaman-Sarigerme-Resort-Spa/12-hilton-dalaman-sarigerme-resort-spa.jpg',
                'Hotels/Hilton-Dalaman-Sarigerme-Resort-Spa/13-hilton-dalaman-sarigerme-resort-spa.jpg',
                'Hotels/Hilton-Dalaman-Sarigerme-Resort-Spa/14-hilton-dalaman-sarigerme-resort-spa.jpg',
                'Hotels/Hilton-Dalaman-Sarigerme-Resort-Spa/15-hilton-dalaman-sarigerme-resort-spa.jpg'
            ],
            document.getElementById('04-imagesOff'),
            document.getElementById('04-images-show-left'),
            document.getElementById('04-images-show-right'),
            document.getElementById('04-show-collaps-off')
        )
    ]
);
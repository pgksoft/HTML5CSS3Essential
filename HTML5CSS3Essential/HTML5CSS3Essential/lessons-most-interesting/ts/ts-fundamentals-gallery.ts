import { VideoGallery } from "../../js-advanced/media";

let tsVideoGallery: VideoGallery = new VideoGallery(
    '../img-media-gallery/playback_play.png',
    '../img-media-gallery/playback_pause.png',
    '../img-media-gallery/volume-high.png',
    '../img-media-gallery/volume-mute.png',
    '../img-media-gallery/fullscreen.png',
    '../img-media-gallery/fullscreen-exit.png'
);
tsVideoGallery.add(<HTMLMediaElement>document.getElementById('ts-lesson2-addTask'));
tsVideoGallery.add(<HTMLMediaElement>document.getElementById('ts-lesson2-Task2'));
tsVideoGallery.add(<HTMLMediaElement>document.getElementById('ts-lesson3-addTask'));
tsVideoGallery.add(<HTMLMediaElement>document.getElementById('ts-lesson3-Task2'));
tsVideoGallery.add(<HTMLMediaElement>document.getElementById('ts-ps'));

let clipImgs = new Array();
for (var i = 0; i < 17; i++) {
    clipImgs.push(`../img-clip/AlexApel${(i + 1).toString().padStart(2, '0')}.jpg`);
}
let getСasualInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
let asides = document.getElementsByClassName('body-aside');
for (let aside of asides) {
    for (let iBox = 0; iBox < 6; iBox++) {
        let boxClip = document.createElement('div');
        boxClip.className = 'box-clip';
        boxClip.style.setProperty('--imgOne', `url('${clipImgs[getСasualInt(0, clipImgs.length - 1)]}')`);
        boxClip.style.setProperty('--imgTwo', `url('${clipImgs[getСasualInt(0, clipImgs.length - 1)]}')`);
        let setClip = document.createElement('div');
        setClip.className = 'set-clip clip-one';
        //setClip.innerText = '1 2 3 4 5 6 7 8 9';
        boxClip.appendChild(setClip);
        setClip = document.createElement('div');
        setClip.className = 'set-clip clip-two';
        //setClip.innerText = 'A B C D E F G H K';
        boxClip.appendChild(setClip);
        aside.appendChild(boxClip);
    }
}
let oneClips = document.getElementsByClassName('clip-one');
let twoClips = document.getElementsByClassName('clip-two');
let clipTimeOut;
let log = true;
let clipTag = {
    type: 1,
    tag: null
};
function clipRandomAnimate(interval) {
    clearTimeout(clipTimeOut);
    clipTimeOut = setTimeout(function go(interval) {
        if (getСasualInt(0, 1)) {
            clipTag.type = 1;
            clipTag.tag = oneClips[getСasualInt(0, oneClips.length - 1)];
            clipTag.tag.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)';
            clipTag.tag.nextSibling.style.clipPath = 'polygon(0 0, 0 0, 0 100%, 0 100%)';
            clipTimeOut = setTimeout(() => {
                clipTag.tag.style.clipPath = 'polygon(51% 0, 100% 0, 100% 100%, 51% 100%)';
                clipTag.tag.nextSibling.style.clipPath = 'polygon(0 0, 49% 0, 49% 100%, 0% 100%)';
                clipRandomAnimate(5000);
            }, 1000);
        } else {
            clipTag.type = 2;
            clipTag.tag = twoClips[getСasualInt(0, twoClips.length - 1)];
            clipTag.tag.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)';
            clipTimeOut = setTimeout(() => {
                clipTag.tag.style.clipPath = 'polygon(0 0, 49% 0, 49% 100%, 0% 100%)';                
                clipRandomAnimate(5000);
            }, 1000);
        }
    }, interval);
}

clipRandomAnimate(5000);

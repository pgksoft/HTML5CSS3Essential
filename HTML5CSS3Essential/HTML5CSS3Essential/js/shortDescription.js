// Definitions
function isDisplayBlock(element) {
    return element.style.display === "block" || window.getComputedStyle(element, null)["display"] === "block";
}
let shortDescriptionPanel = document.getElementById('shortDescriptionPanel');

// Helpers
function getLesson() {
    if (document.body.dataset && document.body.dataset.lesson) {
        return document.body.dataset.lesson;
    } else {
        return '';
    }
}
function getCurrentNamePage() {
    return location.pathname.split("/")[location.pathname.split("/").length - 1].split(".")[0];
}
function showShortDescriptionPanel() {
    if (!isDisplayBlock(shortDescriptionPanel)) {
        shortDescriptionPanel.style.display = 'block';
        setTimeout(() => {
            shortDescriptionPanel.style.opacity = 1;
        }, 20);

    }
}
function hideShortDescriptionPanel() {
    shortDescriptionPanel.style.opacity = 0;
    setTimeout(() => {
        if (isDisplayBlock(shortDescriptionPanel)) shortDescriptionPanel.style.display = 'none';
    }, 450);
}

// Define manage
document.getElementById('logoBox').addEventListener('click', () => {
    if (isDisplayBlock(shortDescriptionPanel)) {
        hideShortDescriptionPanel();
    } else {
        showShortDescriptionPanel();
    }
}, false);
document.body.addEventListener('keydown', (e) => {
    if (e.charCode === 0) {
        switch (e.keyCode) {
            case 27: if (isDisplayBlock(shortDescriptionPanel)) hideShortDescriptionPanel(); break;
            default: break;
        }
    }
}, false);
document.getElementById('shortDescriptionPanelClose').addEventListener('click', () => {
    hideShortDescriptionPanel();
}, false);

// Init short description panel
setTimeout(() => {
    let key = getLesson() + getCurrentNamePage();
    if (!localStorage.getItem(key)) {
        localStorage.setItem(key, true);
        showShortDescriptionPanel();
    }
}, 50);
if (localStorage.getItem('device')) {
    if (localStorage.getItem('device') === 'Mobile') {
        document.getElementById('shortDescriptionPanel').style.fontSize = '0.9rem';
    }
}



//LESSON 09

// Helpers <==================================================================================================================
let $$ = (id) => document.getElementById(id);
let cards = document.getElementsByClassName('card');
let cardDescriptions = document.getElementsByClassName('card-description');
let currentCard;
function getCardDescription(id) {
    let one;
    for (let item of cardDescriptions) {
        if (item.dataset.id === id) one = item;
    }
    return one;
};
function computedStyle(item, value) {
    return window.getComputedStyle(item, null)[value];
}

// Define manage <==================================================================================================================
$$('RB34N5440SA-front').addEventListener('click', () => {
    $$('RB34N5440SA').src = 'img/samsung RB34N5440SA.jpg';
}, false);
$$('RB34N5440SA-inside').addEventListener('click', () => {
    $$('RB34N5440SA').src = 'img/samsung RB34N5440SA inside.jpg';
}, false);
for (let item of cards) {
    item.addEventListener('click', (e) => {
        currentCard = e.currentTarget;
        let cardDescription = getCardDescription(currentCard.id);
        let isClear = false;
        //at the beginning it's looking for the cardDescription has opacity equal one
        for (let item of cardDescriptions) {
            if (cardDescription && item.dataset.id !== cardDescription.dataset.id && item.style.opacity === '1') isClear = true;
            if (!cardDescription) isClear = true;
            if (isClear) {
                item.style.top = '33%';
                item.style.opacity = 0;
                setTimeout(() => {
                    if (item.style.opacity === '0') {
                        item.style.display = 'none';
                    }
                }, 1000);
            }
            isClear = false;
        }
        //and now it's showing description for current card 
        if (cardDescription) {
            cardDescription.style.display = 'flex';
            setTimeout(() => {
                cardDescription.style.opacity = 1;
                cardDescription.style.top = '0px';
            }, 20);
        }
    }, false);
}

// Init
$$('Bosch-BGB2UCAR').click();
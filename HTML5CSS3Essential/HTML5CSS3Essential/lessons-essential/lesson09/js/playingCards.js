//LESSON 9

// Defining and creating a deck of cards
let cardSuits = new Map(
    [
        ['C', 'Clubs'], // трефы
        ['D', 'Diamonds'], // бубны
        ['H', 'Hears'], // червы
        ['S', 'Spades'] // пики
    ]);
let faceCards = new Map(
    [
        ['A', 'Ack'], // валет
        ['Q', 'Queen'], // дама
        ['K', 'King'], // король
        ['A', 'Ace'] // туз
    ]);
let cards = new Array();
for (let cardSuit of cardSuits.keys()) {
    // Url of digital playing cards
    for (let i = 2; i <= 10; i++) {
        cards.push(`playing-card/${i}${cardSuit}.png`);
    }
    // Url of face playing cards
    for (let faceCard of faceCards.keys()) {
        cards.push(`playing-card/${faceCard}${cardSuit}.png`);
    }
}
cards.push('playing-card/Joker1.png');
let deskOfCards;

// Helpers <================================================================================================================= 
let $$ = (id) => document.getElementById(id);
let getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
function execDealCards() {
    let dealtCards;
    let indexCard;
    let img;
    let div;
    deskOfCards = JSON.parse(JSON.stringify(cards));
    $$('cardtable').innerHTML = '';
    // Deal cards
    for (let i = 0; i < 6; i++) {
        img = document.createElement('img');
        indexCard = getRandomInt(0, deskOfCards.length - 1);
        img.src = deskOfCards[indexCard];
        img.className = 'card shake-at-the-end-of-random-rotate';
        img.alt = img.src;
        div = document.createElement('div');
        div.className = 'card-place';
        div.appendChild(img);
        $$('cardtable').appendChild(div);
        deskOfCards.splice(indexCard, 1);
    }
    dealtCards = document.getElementsByClassName('card');
    // Define manage of transform and animate
    for (let card of dealtCards) {
        card.addEventListener('mouseover', () => {
            if (card.style.transform === 'rotate(0deg)') {
                let sign = getRandomInt(0, 1);
                let deg = getRandomInt(10, 350);
                card.style.transform = `rotate(${sign === 0 ? '' : '-'}${deg}deg)`;
                // Define shake at the end of random rotate
                setTimeout(() => {
                    card.style.setProperty('--ten-percent', `${sign === 0 ? '' : '-'}${deg+10}deg`);
                    card.style.setProperty('--twenty-percent', `${sign === 0 ? '' : '-'}${deg-9}deg`);
                    card.style.setProperty('--thirty-percent', `${sign === 0 ? '' : '-'}${deg+7}deg`);
                    card.style.setProperty('--forty-percent', `${sign === 0 ? '' : '-'}${deg-6}deg`);
                    card.style.setProperty('--fifty-percent', `${sign === 0 ? '' : '-'}${deg+5}deg`);
                    card.style.setProperty('--sixty-percent', `${sign === 0 ? '' : '-'}${deg-4}deg`);
                    card.style.setProperty('--seventy-percent', `${sign === 0 ? '' : '-'}${deg+3}deg`);
                    card.style.setProperty('--eighty-percent', `${sign === 0 ? '' : '-'}${deg-2}deg`);
                    card.style.setProperty('--ninety-percent', `${sign === 0 ? '' : '-'}${deg+1}deg`);
                    card.style.setProperty('--hundred-percent', `${sign === 0 ? '' : '-'}${deg}deg`);
                    if (!card.classList.contains('shake')) card.classList.add('shake');
                    setTimeout(() => {
                        if (card.classList.contains('shake')) card.classList.remove('shake');
                    }, 700);
                }, 1000);
            } else {
                card.style.transform = 'rotate(0deg)';
                setTimeout(() => {
                    if (!card.classList.contains('swing-rotate')) card.classList.add('swing-rotate');
                    setTimeout(() => {
                        if (card.classList.contains('swing-rotate')) card.classList.remove('swing-rotate');
                    }, 700);
                }, 1000);
            }
        }, false);
    }
    // Rotate cards after deal
    setTimeout(() => {
        for (let card of dealtCards) {
            let sign = getRandomInt(0, 1);
            let deg = getRandomInt(10, 350);
            card.style.transform = `rotate(${sign === 0 ? '' : '-'}${deg}deg)`;
            // Define shake at the end of random rotate
            setTimeout(() => {
                card.style.setProperty('--ten-percent', `${sign === 0 ? '' : '-'}${deg + 10}deg`);
                card.style.setProperty('--twenty-percent', `${sign === 0 ? '' : '-'}${deg - 9}deg`);
                card.style.setProperty('--thirty-percent', `${sign === 0 ? '' : '-'}${deg + 7}deg`);
                card.style.setProperty('--forty-percent', `${sign === 0 ? '' : '-'}${deg - 6}deg`);
                card.style.setProperty('--fifty-percent', `${sign === 0 ? '' : '-'}${deg + 5}deg`);
                card.style.setProperty('--sixty-percent', `${sign === 0 ? '' : '-'}${deg - 4}deg`);
                card.style.setProperty('--seventy-percent', `${sign === 0 ? '' : '-'}${deg + 3}deg`);
                card.style.setProperty('--eighty-percent', `${sign === 0 ? '' : '-'}${deg - 2}deg`);
                card.style.setProperty('--ninety-percent', `${sign === 0 ? '' : '-'}${deg + 1}deg`);
                card.style.setProperty('--hundred-percent', `${sign === 0 ? '' : '-'}${deg}deg`);
                if (!card.classList.contains('shake')) card.classList.add('shake');
                setTimeout(() => {
                    if (card.classList.contains('shake')) card.classList.remove('shake');
                }, 700);
            }, 1000);
        }
    }, 50);
}

// Init
execDealCards();

// Define manage <============================================================================================================
$$('dealCards').addEventListener('click', () => { execDealCards(); }, false);




//LESSON5

// Helpers
let getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
function CreateArray(size) {
    let array = new Array();
    for (let i = 0; i < size; i++) {
        array.push(getRandomInt(1, 2147483647)); 
    }
    return array;
}

// Define manage
addEventListener('message', function (e) {

    let cmd = e.data[0];

    switch (cmd) {
        case 'source':
            postMessage([0, cmd, CreateArray(e.data[1])]);
            break;
        case 'sourceSort':
            let source = e.data[1];
            postMessage([0, cmd, source.sort((a, b) => a - b)]);
            break;
        default:
            postMessage([-1,'Незарегистрированная команда']);
    }
}, true);
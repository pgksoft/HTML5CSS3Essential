//LESSON5

// Helpers
let $ = (id) => document.getElementById(id);
window.requestFrame = function (callback) {
    var f = window.mozRequestAnimationFrame ||
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 500);
        };
    f(callback);
};

// Init
let source;
let sourceSort;
showSizeArray($('sizeArray').value);
let worker = new Worker("js/workerArray.dist.js");
let isStart = false;
let start = Date.now();

// Event handlers
function oninputSizeArray(e) {
    showSizeArray(e.target.value);
}
function showSizeArray(value) {
    $('valSizeArray').textContent = value;
}
function onmessageWorker(e) {
    isStart = false;
    let error = e.data[0];
    let msgErr;
    let cmd;
    if (error === 0) {
        cmd = e.data[1];
        if (cmd === 'source') {
            source = e.data[2];
            writeLog('create', source.length, new Date(Date.now() - start).toISOString().slice(11, -1), 'blue');
            showArray(source, $('source'));
            if ($('btnSortArr').disabled) {
                $('btnSortArr').disabled = false;
            }
        } else if (cmd === 'sourceSort') {
            sourceSort = e.data[2];
            writeLog('sort', sourceSort.length, new Date(Date.now() - start).toISOString().slice(11, -1), 'green');
            showArray(sourceSort, $('sourceSort'));
        }
    } else {
        msgErr = e.data[1];
    }
}
function showArray(arr, element) {
    let item;
    let isShowSeparate = true;
    for (let ipos = 0; ipos < arr.length; ipos++) {
        if (ipos >= 0 && ipos < 100 || ipos > arr.length - 100) {
            item = document.createElement('p');
            item.className = 'margin0 inline ';
            item.textContent = `${arr[ipos]}, `;
            element.appendChild(item);
        } else {
            if (isShowSeparate) {
                isShowSeparate = false;
                item = document.createElement('p');
                item.textContent = '-'.repeat(20);
                element.appendChild(item);
            }
        }
    }
}
function progress(element) {
    element.textContent = new Date(Date.now() - start).toISOString().slice(11, -1);
    if (isStart) requestFrame(() => progress(element));
}
function onclickCreateArray() {
    $('progressCreateArr').textContent = '';
    $('source').innerHTML = '';
    $('sourceSort').innerHTML = '';
    start = Date.now();
    isStart = true;
    worker.postMessage(['source', Number($('sizeArray').value)]);
    progress($('progressCreateArr'));
}
function onclickSortArray() {
    $('progressSortArr').textContent = '';
    $('sourceSort').innerHTML = '';
    start = Date.now();
    isStart = true;
    worker.postMessage(['sourceSort', source]);
    progress($('progressSortArr'));
}
function writeLog(action, sizeArray, progress, classNameColor = 'blue') {
    let p = document.createElement('p');
    p.className = `margin0 ${classNameColor}`;
    p.textContent = `${action}, size: ${sizeArray}, progress: ${progress}`;
    $('log').appendChild(p);
}

// Define manage
$('btnCreateArr').addEventListener('click', onclickCreateArray, false);
$('btnSortArr').addEventListener('click', onclickSortArray, false);
$('sizeArray').addEventListener('input', oninputSizeArray, false);
worker.addEventListener("message", onmessageWorker, false);
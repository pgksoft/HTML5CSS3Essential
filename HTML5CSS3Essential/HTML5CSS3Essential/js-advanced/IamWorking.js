var nsIAmWorking;
(function (nsIAmWorking) {
    let namePage = location.pathname.split("/")[location.pathname.split("/").length - 1].split(".")[0];
    let links = document.getElementsByTagName('a');
    for (let i = 0; i < links.length; i++) {
        if (links.item(i).dataset.iamworking) {
            links[i].href = '../../IamWorking.html';
        }
    }
})(nsIAmWorking || (nsIAmWorking = {}));
//# sourceMappingURL=IamWorking.js.map
namespace nsIAmWorking {
    let namePage: string = location.pathname.split("/")[location.pathname.split("/").length - 1].split(".")[0];
    let links: HTMLCollection = document.getElementsByTagName('a');
    for (let i = 0; i < links.length; i++) {
        if ((<HTMLElement>links.item(i)).dataset.iamworking) {
            (<HTMLAnchorElement>links[i]).href = '../../IamWorking.html';
        }
    }
}

let $$ = (id) => document.getElementById(id);
function setOffline() {
    $$('appIsWorking').title = 'app is working offline';
    $$('appIsWorking').src = '../../img/flash-circle-24.png';
    $$('appIsWorking').dataset.isWorking = 'offline';
}
document.addEventListener("DOMContentLoaded", setOffline, false);

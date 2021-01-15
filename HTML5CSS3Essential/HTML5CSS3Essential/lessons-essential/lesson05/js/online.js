let $$ = (id) => document.getElementById(id);
function setOnline() {
    $$('appIsWorking').title = 'app is working online';
    $$('appIsWorking').src = '../../img/online-24.png';
    $$('appIsWorking').dataset.isWorking = 'online';
}
document.addEventListener("DOMContentLoaded", setOnline, false);

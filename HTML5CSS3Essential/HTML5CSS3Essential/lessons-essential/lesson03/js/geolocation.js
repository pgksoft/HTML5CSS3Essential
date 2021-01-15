class Geolocation {
    constructor(showSupportGeolocation, latitude, longitude, accuracy, showLoading, errorLoading, btn) {
        this.NAMEGEOAPI = 'HTML5 Geolocation API';
        this.htmlShowSupportGeolocation = showSupportGeolocation;
        this.latitude = latitude;
        this.longitude = longitude;
        this.accuracy = accuracy;
        this.showLoading = showLoading;
        this.errorLoading = errorLoading;
        this.getButton = btn;
        this.counter = 0;
    }
    DefineControl() {
        window.addEventListener('load', () => { this.GetMsgSupportGeolocation(); }, true);
        window.addEventListener('load', () => { this.hideLoadStatus(); }, true);
        window.addEventListener('load', () => { this.updateStatus(''); }, true);
        this.getButton.onclick = () => { this.GetGeolocation(); };
    }
    IsSupport() {
        return navigator.geolocation;
    }
    GetMsgSupportGeolocation() {
        this.htmlShowSupportGeolocation.innerHTML = this.IsSupport ? `${this.NAMEGEOAPI}: true` : '${this.NAMEGEOAPI}: false';
    }
    GetGeolocation() {
        console.log(this.counter++);
        this.updateStatus();
        this.showLoadStatus();
        navigator.geolocation.getCurrentPosition(
            (position) => { this.updateLocation(position); },
            (error) => { this.handleError(error); },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
        );
    }
    updateLocation(position) {
        this.latitude.innerHTML = position.coords.latitude;
        this.longitude.innerHTML = position.coords.longitude;
        this.accuracy.innerHTML = position.coords.accuracy;
        this.hideLoadStatus();
    }
    hideLoadStatus() {
        this.showLoading.style.visibility = "hidden";
    }
    showLoadStatus() {
        this.showLoading.style.visibility = "visible";
    }
    handleError(error) {
        switch (error.code) {
            case 0:
                this.updateStatus("При попытке определить местоположение возникала ошибка: " + error.message);
                break;
            case 1:
                this.updateStatus("Пользователь запретил получение данных о местоположении.");
                break;
            case 2:
                this.updateStatus("Браузеру не удалось определить местоположение: " + error.message);
                break;
            case 3:
                this.updateStatus("Истекло доступное время ожидания.");
                break;
        }
        this.hideLoadStatus();
    }
    updateStatus(message = '') {
        this.errorLoading.innerHTML = message;
    }
}

let geoLoc = new Geolocation(
    document.getElementById('isSupportGeolocation'),
    document.getElementById('latitude'),
    document.getElementById('longitude'),
    document.getElementById('accuracy'),
    document.getElementById('showLoading'),
    document.getElementById('errorLoading'),
    document.getElementById('getGeolocation')
);
geoLoc.DefineControl();


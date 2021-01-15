class TestMedia {
    constructor(slider) {
        this._slider;
        this.slider = slider;
    }
    get slider() {
        return this._slider;
    }
    set slider(value) {
        this._slider = value;
        $(this._slider).slider({
            animate: "fast",
            range: "min",
            step: 1,
            value: 20,
            max: 100
        });
    }
}
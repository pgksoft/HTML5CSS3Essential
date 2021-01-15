export let CheckOffscreenCanvas = () => typeof OffscreenCanvas !== "undefined" ? true : false;
export let GetOffscreenCanvas = (canvas) => {
    let offScreenCanvas = canvas.transferControlToOffscreen();
    return offScreenCanvas;
};

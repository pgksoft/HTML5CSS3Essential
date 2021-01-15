import {
    Params,
    Speed,
    ElementKind,
    NameEventChangeStatusBrownianMotion,
    NameEventStepByStepBrownianMotion,
    ElementAny,
    ElementSquare,
    ElementCircle,
    FillType,

    FillTypeAny,
    FillTypeColor,
    FillTypeInitialGradient,
    FillTypeRedrawGradient
} from '../bmParams.js'
import { Figure, Square, Circle } from '../model/brownianMotion.js'
import { Colors, GradientProperties } from '../../../../js-advanced/colorManagement.js';
import { CheckOffscreenCanvas, GetOffscreenCanvas } from '../../../../js-advanced/pgkToTSUtils.js';

const AreaWidth = 1;
const AreaHeight = 2;
const enum StateOffscareenCanvasAnimate { Init, Start, Wait, WasAnimaited }

export class ViewBrownianMotion {
    private constructor(
        brownianMotionArea: HTMLCanvasElement
    ) {
        this._brownianMotionArea = brownianMotionArea;
        //
        if (CheckOffscreenCanvas() && Params.instance.isOffScreenCanvas) {
            this._bmAsyncCanvas = new Worker('ts/view/bmAsyncCanvas.dist.js');
        } else {
            this._context = this._brownianMotionArea.getContext('2d');
        }
        //
        this._log.innerHTML = '';
        this.SetSizeBrownianMotionBuffer();
        this._buffer = this._bmAreaBuffer.getContext('2d');
        this.DefineEvents();
        this.InitScaleArea();
        //
        if (CheckOffscreenCanvas() && Params.instance.isOffScreenCanvas) {
            this._bmOffScreenCanvas = GetOffscreenCanvas(this._brownianMotionArea);
            this._aSincCanvasBuffer = GetOffscreenCanvas(this._aSincAreaBuffer);
            this._bmOffScreenCanvas.width = this.GetScale(AreaWidth);
            this._bmOffScreenCanvas.height = this.GetScale(AreaHeight);
            this._aSincCanvasBuffer.width = this.GetScale(AreaWidth);
            this._aSincCanvasBuffer.height = this.GetScale(AreaHeight);
            let offScreenCanvas = this._bmOffScreenCanvas;
            this._bmAsyncCanvas.postMessage({ offScreenCanvas }, [offScreenCanvas])
            let offCanvasBuffer = this._aSincCanvasBuffer;
            this._bmAsyncCanvas.postMessage({ offCanvasBuffer }, [offCanvasBuffer])
        }
        //
        this.Init();
    }

    // Fields - self management
    private static _instance: ViewBrownianMotion = undefined;
    // Fields
    private _brownianMotionArea: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;
    private _bmAreaBuffer: HTMLCanvasElement = document.createElement('canvas');
    private _buffer: CanvasRenderingContext2D;
    private _figures: Set<Figure> = new Set();
    private _isAnimate: boolean = false;
    private _isStepByStep: boolean = false;
    private _log: HTMLElement = document.getElementById('log');
    private _bmAsyncCanvas: Worker;
    private _bmOffScreenCanvas;
    private _aSincAreaBuffer: HTMLCanvasElement = document.createElement('canvas');
    private _aSincCanvasBuffer;
    private _stateOffscreenCanvasAnimate: StateOffscareenCanvasAnimate = StateOffscareenCanvasAnimate.Init;

    // Properties - helpers
    private get speed(): number {
        let speed: number = Params.instance.speed[1];
        if (speed == Array.from(Speed.entries()).find((pair) => pair[0] === 'Любая')[1]) {
            speed = Colors.instance.RandomInt(1, Speed.size - 1);
        }
        return speed;
    }
    private get lengthPath(): number {
        return Colors.instance.RandomInt(Params.instance.path[0], Params.instance.path[1]);
    }
    private get fillType(): [string, number] {
        let type: [string, number] = Params.instance.fill;
        if (type[0] === FillTypeAny) {
            let element: number = Colors.instance.RandomInt(1, FillType.size - 1);
            type = Array.from(FillType.entries()).find((pair) => pair[1] == element);
        }
        return type;
    }
    private get angleAlfa(): number {
        return Colors.instance.RandomInt(0, 359);
    }

    // Methods
    static Create(
        brownianMotionArea: HTMLCanvasElement
    ): ViewBrownianMotion {
        if (!ViewBrownianMotion._instance) {
            ViewBrownianMotion._instance = new ViewBrownianMotion(
                brownianMotionArea
            );
        }
        return ViewBrownianMotion._instance;
    }

    Redraw(): void {
        if (!this._isAnimate && !Params.instance.isOffScreenCanvas) this._context.clearRect(0, 0, this._brownianMotionArea.width, this._brownianMotionArea.height);
        this._figures.clear();
        this.Init();
    }

    // Helpers
    private SetSizeBrownianMotionBuffer(): void {
        this._bmAreaBuffer.width = this._brownianMotionArea.width;
        this._bmAreaBuffer.height = this._brownianMotionArea.height;
    }

    private DefineEvents(): void {
        window.addEventListener('resize', () => { this.SetSizeBrownianMotionBuffer(); }, false);
        //
        document.addEventListener(NameEventStepByStepBrownianMotion, () => { this.OnStepByStepBrownianMotion(); }, false);
        document.addEventListener(NameEventChangeStatusBrownianMotion, (e: CustomEvent) => { this.OnChangeStatusBrownianMotion(e); }, false);
        document.addEventListener(Params.instance.nameEventAmountChange, () => { this.OnAmountChange(); }, false);
        document.addEventListener(Params.instance.nameEventFillChange, () => { this.OnFillChange(); }, false);
        document.addEventListener(Params.instance.nameEventKindChange, () => { this.OnKindChange(); }, false);
        document.addEventListener(Params.instance.nameEventPathChange, () => { this.OnPathChange(); }, false);
        document.addEventListener(Params.instance.nameEventSizeChange, () => { this.OnSizeChange(); }, false);
        document.addEventListener(Params.instance.nameEventSpeedChange, () => { this.OnSpeedChange(); }, false);
        document.addEventListener(Params.instance.nameEventScaleChange, () => { this.OnScaleChange(); }, false);
        document.addEventListener(Params.instance.nameEventIsOffScreenCanvas, () => { this.OnIsOffscreenCanvas(); }, false);
        //
        if (CheckOffscreenCanvas() && Params.instance.isOffScreenCanvas) {
            this._bmAsyncCanvas.onmessage = ({ data: { step } }) => { this.OnMessageBmAsyncCanvas({ step }); };
        }
    }

    private GetFigure(): Figure {
        let figure: Figure;
        let kind: string = Params.instance.kind[0];
        if (kind === ElementAny) {
            let element: number = Colors.instance.RandomInt(1, ElementKind.size - 1);
            kind = Array.from(ElementKind.entries()).find((pair) => pair[1] == element)[0];
        }
        if (kind === ElementSquare) {
            figure = new Square();
        } else if (kind === ElementCircle) {
            figure = new Circle();
        }
        return figure;
    }

    private InitFigure(item: Figure): Figure {
        item.size = Params.instance.size;
        item.borderWidth = Math.floor(item.size / 6);
        item.startX = Colors.instance.RandomInt(0, this.GetScale(AreaWidth) - item.size);
        item.startY = Colors.instance.RandomInt(0, this.GetScale(AreaHeight) - item.size);
        item.x = item.startX;
        item.y = item.startY;
        item.fillType = this.fillType;
        if (item.fillType[0] === FillTypeColor) {
            item.colorBorder = Colors.instance.randomColor;
            item.colorInside = Colors.instance.randomColor;
        } else if (item.fillType[0] === FillTypeInitialGradient || item.fillType[0] === FillTypeRedrawGradient) {
            let context: CanvasRenderingContext2D;
            if (!Params.instance.isOffScreenCanvas) {
                if (!this._isAnimate) {
                    context = this._context;
                } else {
                    context = this._buffer;
                }
                item.gradientBorder = Colors.instance.GetFillBoxLineGradient(context, item.x, item.y, item.size, item.gradientPropertiesBorder);
                item.gradientInside = Colors.instance.GetFillBoxLineGradient(context, item.x + item.borderWidth, item.y + item.borderWidth, item.size - item.borderWidth * 2, item.gradientPropertiesInside);
            } else {
                item.isGradientDefined = false;
                let prop: GradientProperties = new GradientProperties();
                item.gradientPropertiesBorder = prop.GetGradientProperties();
                prop = new GradientProperties();
                item.gradientPropertiesInside = prop.GetGradientProperties();
            }
        }
        item.angleAlfa = this.angleAlfa;
        item.speed = this.speed;
        item.lengthPath = this.lengthPath;
        item.ordinal = this._figures.size + 1;
        item.step = 0;
        item.countSteps = Math.round(this.lengthPath / this.speed);
        return item;
    }

    private Init(): void {
        for (let i = 0; i < Params.instance.amount; i++) {
            this._figures.add(this.InitFigure(this.GetFigure()));
        }
        if (!Params.instance.isOffScreenCanvas) {
            for (let figure of this._figures) {
                figure.Draw(this._context);
            }
        } else if (CheckOffscreenCanvas() && Params.instance.isOffScreenCanvas) {
            if (!this._isAnimate) {
                this.ShowAsyncCanvas();
            }
        }
    }

    private InitScaleArea(): void {
        if (!Params.instance.isOffScreenCanvas) {
            this._brownianMotionArea.width = Params.instance.scale[1];
            this._brownianMotionArea.height = Math.round(this._brownianMotionArea.width / 2);
            this.SetSizeBrownianMotionBuffer();
        }
    }

    private OnStepByStepBrownianMotion(): void {
        if (this._isAnimate) this._isAnimate = false;
        this._isStepByStep = true;
        this.Animate();
    }

    private OnChangeStatusBrownianMotion(e: CustomEvent): void {
        this._isAnimate = e.detail.value;
        if (this._isAnimate) {
            this._isStepByStep = false;
            if (Params.instance.isOffScreenCanvas) {
                this._stateOffscreenCanvasAnimate = StateOffscareenCanvasAnimate.Init;
            }
            this.Animate();
        }
    }

    private OnAmountChange(): void {
        if (Params.instance.amount == 1) {
            this._log.innerHTML = '';
        }
        if (Params.instance.amount < this._figures.size) {
            let countRemove = this._figures.size - Params.instance.amount;
            for (let item of this._figures) {
                this._figures.delete(item);
                countRemove--;
                if (countRemove === 0) break;
            }
            if (!this._isAnimate) {
                if (!Params.instance.isOffScreenCanvas) {
                    this._context.clearRect(0, 0, this._brownianMotionArea.width, this._brownianMotionArea.height);
                    for (let item of this._figures) {
                        item.Draw(this._context);
                    }
                } else {
                    this.ShowAsyncCanvas();
                }
            }
        } else if (Params.instance.amount > this._figures.size) {
            let countAdd = Params.instance.amount - this._figures.size;
            if (!Params.instance.isOffScreenCanvas) {
                for (let i = 0; i < countAdd; i++) {
                    let item: Figure = this.InitFigure(this.GetFigure());
                    this._figures.add(item);
                    if (!this._isAnimate) item.Draw(this._context);
                }
            } else {
                for (let i = 0; i < countAdd; i++) {
                    let item: Figure = this.InitFigure(this.GetFigure());
                    this._figures.add(item);
                }
                if (!this._isAnimate) {
                    this.ShowAsyncCanvas();
                }
            }
        }
    }

    private OnFillChange(): void {
        for (let item of this._figures) {
            item.fillType = this.fillType;
            if (item.fillType[0] === FillTypeColor) {
                item.colorBorder = Colors.instance.randomColor;
                item.colorInside = Colors.instance.randomColor;
            } else if (item.fillType[0] === FillTypeInitialGradient || item.fillType[0] === FillTypeRedrawGradient) {
                if (!Params.instance.isOffScreenCanvas) {
                    let context: CanvasRenderingContext2D;
                    if (!this._isAnimate) {
                        context = this._context;
                    } else {
                        context = this._buffer;
                    }
                    item.gradientBorder = Colors.instance.GetFillBoxLineGradient(context, item.x, item.y, item.size, item.gradientPropertiesBorder);
                    item.gradientInside = Colors.instance.GetFillBoxLineGradient(context, item.x + item.borderWidth, item.y + item.borderWidth, item.size - item.borderWidth * 2, item.gradientPropertiesInside);
                } else {
                    item.isGradientDefined = false;
                    let prop: GradientProperties = new GradientProperties();
                    item.gradientPropertiesBorder = prop.GetGradientProperties();
                    prop = new GradientProperties();
                    item.gradientPropertiesInside = prop.GetGradientProperties();
                }
            }
            if (!Params.instance.isOffScreenCanvas && !this._isAnimate) item.Draw(this._context);
        }
        if (Params.instance.isOffScreenCanvas) {
            if (!this._isAnimate) {
                this.ShowAsyncCanvas();
            }
        }
    }

    private OnKindChange(): void {
        this._figures.clear();
        if (!Params.instance.isOffScreenCanvas) {
            if (!this._isAnimate) this._context.clearRect(0, 0, this._brownianMotionArea.width, this._brownianMotionArea.height);
            for (let i = 0; i < Params.instance.amount; i++) {
                let item = this.InitFigure(this.GetFigure());
                this._figures.add(item);
                if (!this._isAnimate) item.Draw(this._context);
            }
        } else {
            for (let i = 0; i < Params.instance.amount; i++) {
                let item = this.InitFigure(this.GetFigure());
                this._figures.add(item);
            }
            if (!this._isAnimate) {
                this.ShowAsyncCanvas();
            }
        }

    }

    private OnPathChange(): void {
        for (let item of this._figures) {
            item.lengthPath = this.lengthPath;
            item.countSteps = Math.round(this.lengthPath / this.speed);
        }
    }

    private OnSizeChange(): void {
        this._figures.clear();
        if (!Params.instance.isOffScreenCanvas) {
            if (!this._isAnimate) this._context.clearRect(0, 0, this._brownianMotionArea.width, this._brownianMotionArea.height);
            for (let i = 0; i < Params.instance.amount; i++) {
                let item = this.InitFigure(this.GetFigure());
                this._figures.add(item);
                if (!this._isAnimate) item.Draw(this._context);
            }
        } else {
            for (let i = 0; i < Params.instance.amount; i++) {
                let item = this.InitFigure(this.GetFigure());
                this._figures.add(item);
            }
            if (!this._isAnimate) {
                this.ShowAsyncCanvas();
            }
        }
    }

    private OnSpeedChange(): void {
        for (let item of this._figures) {
            item.speed = this.speed;
            item.countSteps = Math.round(this.lengthPath / this.speed);
        }
    }

    private OnScaleChange(): void {
        this.InitScaleArea();
        this._figures.clear();
        if (!Params.instance.isOffScreenCanvas) {
            if (!this._isAnimate) this._context.clearRect(0, 0, this._brownianMotionArea.width, this._brownianMotionArea.height);
            for (let i = 0; i < Params.instance.amount; i++) {
                let item = this.InitFigure(this.GetFigure());
                this._figures.add(item);
                if (!this._isAnimate) item.Draw(this._context);
            }
        } else {
            for (let i = 0; i < Params.instance.amount; i++) {
                let item = this.InitFigure(this.GetFigure());
                this._figures.add(item);
            }
            if (!this._isAnimate) {
                this.ShowAsyncCanvas();
            }
        }
    }

    private OnIsOffscreenCanvas(): void {
        document.location.reload();
    }

    private CalcMotion(item: Figure, areaWidth: number, areaHeight: number): boolean {
        let isNewMove = false;
        item.step++;
        if (item.step < item.countSteps) {
            let cathetus: number = item.step * item.speed;
            let abscissa: number = 0;
            let ordinate: number = 0;
            let angleCalcAlfa: number;
            if (item.angleAlfa == 0) {
                abscissa = cathetus;
                if (item.startX + abscissa < areaWidth - item.size) {
                    item.x = item.startX + abscissa;
                } else isNewMove = true;
            } else if (item.angleAlfa > 0 && item.angleAlfa < 90) {
                angleCalcAlfa = item.angleAlfa;
                ordinate = Math.round(cathetus * Math.sin(this.DegreesToRadians(angleCalcAlfa)));
                abscissa = Math.round(cathetus * Math.cos(this.DegreesToRadians(angleCalcAlfa)));
                if (item.startX + abscissa < areaWidth - item.size && item.startY - ordinate >= 0) {
                    item.x = item.startX + abscissa;
                    item.y = item.startY - ordinate;
                } else isNewMove = true;
            } else if (item.angleAlfa == 90) {
                ordinate = cathetus;
                if (item.startY - ordinate >= 0) {
                    item.y = item.startY - ordinate;
                } else isNewMove = true;
            } else if (item.angleAlfa > 90 && item.angleAlfa < 180) {
                angleCalcAlfa = item.angleAlfa - 90;
                abscissa = Math.round(cathetus * Math.sin(this.DegreesToRadians(angleCalcAlfa)));
                ordinate = Math.round(cathetus * Math.cos(this.DegreesToRadians(angleCalcAlfa)));
                if (item.startX - abscissa >= 0 && item.startY - ordinate >= 0) {
                    item.x = item.startX - abscissa;
                    item.y = item.startY - ordinate;
                } else isNewMove = true;
            } else if (item.angleAlfa == 180) {
                abscissa = cathetus;
                if (item.startX - abscissa >= 0) {
                    item.x = item.startX - abscissa;
                } else isNewMove = true;
            } else if (item.angleAlfa > 180 && item.angleAlfa < 270) {
                angleCalcAlfa = item.angleAlfa - 180;
                ordinate = Math.round(cathetus * Math.sin(this.DegreesToRadians(angleCalcAlfa)));
                abscissa = Math.round(cathetus * Math.cos(this.DegreesToRadians(angleCalcAlfa)));
                if (item.startX - abscissa >= 0 && item.startY + ordinate < areaHeight - item.size) {
                    item.x = item.startX - abscissa;
                    item.y = item.startY + ordinate;
                } else isNewMove = true;
            } else if (item.angleAlfa == 270) {
                ordinate = cathetus;
                if (item.startY + ordinate < areaHeight - item.size) {
                    item.y = item.startY + ordinate;
                } else isNewMove = true;
            } else if (item.angleAlfa > 270 && item.angleAlfa < 360) {
                angleCalcAlfa = item.angleAlfa - 270;
                abscissa = Math.round(cathetus * Math.sin(this.DegreesToRadians(angleCalcAlfa)));
                ordinate = Math.round(cathetus * Math.cos(this.DegreesToRadians(angleCalcAlfa)));
                if (item.startX + abscissa < areaWidth - item.size && item.startY + ordinate < areaHeight - item.size) {
                    item.x = item.startX + abscissa;
                    item.y = item.startY + ordinate;
                } else isNewMove = true;
            }
        } else isNewMove = true;
        return isNewMove;
    };

    private Animate() {
        if (!Params.instance.isOffScreenCanvas) {
            this._buffer.clearRect(0, 0, this._bmAreaBuffer.width, this._bmAreaBuffer.height);
        }
        if (!Params.instance.isOffScreenCanvas ||
            Params.instance.isOffScreenCanvas && (this._stateOffscreenCanvasAnimate === StateOffscareenCanvasAnimate.Init || this._stateOffscreenCanvasAnimate === StateOffscareenCanvasAnimate.WasAnimaited)
        ) {
            if (Params.instance.isOffScreenCanvas) {
                this._stateOffscreenCanvasAnimate = StateOffscareenCanvasAnimate.Start;
            }
            for (let item of this._figures) {
                if (this.CalcMotion(item, this.GetScale(AreaWidth), this.GetScale(AreaHeight))) {
                    // New path of motion
                    item.startX = item.x;
                    item.startY = item.y;
                    if (item.startX < 0) item.startX = 0;
                    if (item.startX > this.GetScale(AreaWidth) - item.size) item.startX = this.GetScale(AreaWidth) - item.size;
                    if (item.startY < 0) item.startY = 0;
                    if (item.startY > this.GetScale(AreaHeight) - item.size) item.startY = this.GetScale(AreaHeight) - item.size;
                    item.fillType = this.fillType;
                    if (item.fillType[0] === FillTypeColor) {
                        item.colorBorder = Colors.instance.randomColor;
                        item.colorInside = Colors.instance.randomColor;
                    } else if (item.fillType[0] === FillTypeInitialGradient || item.fillType[0] === FillTypeRedrawGradient) {
                        if (!Params.instance.isOffScreenCanvas) {
                            let context: CanvasRenderingContext2D;
                            if (!this._isAnimate) {
                                context = this._context;
                            } else {
                                context = this._buffer;
                            }
                            item.gradientBorder = Colors.instance.GetFillBoxLineGradient(context, item.x, item.y, item.size, item.gradientPropertiesBorder);
                            item.gradientInside = Colors.instance.GetFillBoxLineGradient(context, item.x + item.borderWidth, item.y + item.borderWidth, item.size - item.borderWidth * 2, item.gradientPropertiesInside);
                        } else {
                            if (item.fillType[0] === FillTypeInitialGradient) {
                                item.isGradientDefined = false;
                            };
                            item.isGradientDefined = false;
                            let prop: GradientProperties = new GradientProperties();
                            item.gradientPropertiesBorder = prop.GetGradientProperties();
                            prop = new GradientProperties();
                            item.gradientPropertiesInside = prop.GetGradientProperties();
                        }
                    }
                    item.angleAlfa = this.angleAlfa;
                    item.speed = this.speed;
                    item.lengthPath = this.lengthPath;
                    item.step = 0;
                    item.countSteps = Math.round(this.lengthPath / this.speed);
                    item.isInitLog = false;
                };
                if (this._isStepByStep) {
                    this._log.innerHTML = `<span ${item.isInitLog ? '' : 'class="accent"'}>${item.toString()}</span>` + this._log.innerHTML;
                }
                if (!Params.instance.isOffScreenCanvas) item.Draw(this._buffer);
            }
            if (!Params.instance.isOffScreenCanvas) {
                this._context.clearRect(0, 0, this._brownianMotionArea.width, this._brownianMotionArea.height);
                this._context.drawImage(this._bmAreaBuffer, 0, 0);
            }
        }
        if (Params.instance.isOffScreenCanvas && this._stateOffscreenCanvasAnimate === StateOffscareenCanvasAnimate.Start) {
            this._stateOffscreenCanvasAnimate = StateOffscareenCanvasAnimate.Wait;
            this.ShowAsyncCanvas();
        }
        if (this._isAnimate) this.requestFrame(() => this.Animate());
    }

    private requestFrame(callback) {
        var f = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 300);
            };
        f(callback);
    }

    private DegreesToRadians(degrees: number): number {
        return (degrees * Math.PI) / 180.0;
    }

    private OnMessageBmAsyncCanvas({ step }): void {
        if (step === 'ItWasAnimated') {
            if (this._stateOffscreenCanvasAnimate === StateOffscareenCanvasAnimate.Wait) {
                this._stateOffscreenCanvasAnimate = StateOffscareenCanvasAnimate.WasAnimaited;
            }
        }
    }

    private GetScale(parm: number): number {
        if (parm === AreaWidth) return Params.instance.scale[1];
        if (parm === AreaHeight) return Math.round(Params.instance.scale[1] / 2);
    }

    private ShowAsyncCanvas(): void {
        let figures = this._figures;
        let width = this.GetScale(AreaWidth);
        let height = this.GetScale(AreaHeight);
        this._bmAsyncCanvas.postMessage({ figures, width, height });
    }

}
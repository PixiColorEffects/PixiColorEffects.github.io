import { CLEAR_MODES, Filter, FilterState, FilterSystem, RenderTexture } from "pixi.js";
import { SoftLight } from "../../filters/fill/softLight";
import { HardLight } from "../../filters/fill/hardLight";
import { VividLight } from "../../filters/fill/vividLight";
import { Overlay } from "../../filters/fill/overlay";
import { Multiply } from "../../filters/fill/multiply";
import { ColorDodge } from "../../filters/fill/colorDodge";
import { ColorBurn } from "../../filters/fill/colorBurn";
import { Screen } from "../../filters/fill/screen";
import { Default } from "../../filters/fill/default";
declare const fillMode: {
    default: typeof Default;
    screen: typeof Screen;
    overlay: typeof Overlay;
    multiply: typeof Multiply;
    colorDodge: typeof ColorDodge;
    colorBurn: typeof ColorBurn;
    hardLight: typeof HardLight;
    softLight: typeof SoftLight;
    vividLight: typeof VividLight;
};
export declare type FillModeType = keyof typeof fillMode;
export declare class Fill<T extends FillModeType> extends Filter {
    private _fillFilter;
    constructor(value?: number, fillColor?: string, mode?: T);
    apply(filterManager: FilterSystem, input: RenderTexture, output: RenderTexture, clearMode?: CLEAR_MODES, _currentState?: FilterState): void;
    update(): void;
    get mode(): T;
    set mode(mode: T);
    get fillColor(): string;
    set fillColor(value: string);
    get value(): number;
    set value(value: number);
}
export {};

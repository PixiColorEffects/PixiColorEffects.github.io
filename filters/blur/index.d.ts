import { CLEAR_MODES, Filter, FilterState, FilterSystem, RenderTexture } from "pixi.js";
export declare class Blur extends Filter {
    private _blurFilter;
    constructor(value?: number);
    apply(filterManager: FilterSystem, input: RenderTexture, output: RenderTexture, clearMode?: CLEAR_MODES, _currentState?: FilterState): void;
    get value(): number;
    set value(value: number);
}

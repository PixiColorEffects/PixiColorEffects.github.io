import { Filter, FilterSystem, RenderTexture, CLEAR_MODES, FilterState } from "pixi.js";
export declare class Brightness extends Filter {
    private _colorMatrixFilter;
    constructor(value?: number);
    apply(filterManager: FilterSystem, input: RenderTexture, output: RenderTexture, clearMode?: CLEAR_MODES, _currentState?: FilterState): void;
    get value(): number;
    set value(value: number);
}

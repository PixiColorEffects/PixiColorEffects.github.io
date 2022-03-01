import { Filter, FilterSystem, RenderTexture, CLEAR_MODES, FilterState } from "pixi.js";
declare type Options = {
    preset: number[][];
};
export declare class Curves extends Filter {
    private _imageData;
    constructor(options: Options);
    apply(filterManager: FilterSystem, input: RenderTexture, output: RenderTexture, clearMode?: CLEAR_MODES, _currentState?: FilterState): void;
    update(): void;
    get options(): Options;
    set options(value: Options);
    static createCurveSet(e: any): interpolateCanvas;
}
declare class interpolateCanvas {
    constructor(e?: number, t?: any[], s?: any[], i?: any[], n?: any[]);
    static getInterpolation(e: any, t: any): Float32Array;
    static fillPaletteMap(e: any, t: any): void;
}
export {};

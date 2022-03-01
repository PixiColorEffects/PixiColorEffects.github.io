import { Filter, FilterSystem, RenderTexture, CLEAR_MODES, FilterState } from "pixi.js";
declare type Options = Record<string, 0>;
export declare class Levels extends Filter {
    private _imageData;
    constructor(options: Options);
    apply(filterManager: FilterSystem, input: RenderTexture, output: RenderTexture, clearMode?: CLEAR_MODES, _currentState?: FilterState): void;
    update(): void;
    get options(): Options;
    set options(value: Options);
}
export {};

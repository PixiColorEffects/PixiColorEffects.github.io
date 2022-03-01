import { Filter, FilterSystem, RenderTexture, CLEAR_MODES, FilterState } from "pixi.js";
import { PresetKey } from "./preset";
export declare class Preset extends Filter {
    private filtersArr;
    constructor(preset: PresetKey);
    apply(filterManager: FilterSystem, input: RenderTexture, output: RenderTexture, clearMode?: CLEAR_MODES, _currentState?: FilterState): void;
}

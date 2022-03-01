import { Filter } from "pixi.js";
export declare class Toning extends Filter {
    private _imageData;
    constructor(value?: number, lightColor?: string, darkColor?: string);
    update(): void;
    get value(): number;
    set value(value: number);
    get lightColor(): string;
    set lightColor(value: string);
    get darkColor(): string;
    set darkColor(value: string);
    static fillPaletteMap(payload: {
        value: number;
        lightColor: {
            r: number;
            g: number;
            b: number;
        };
        darkColor: {
            r: number;
            g: number;
            b: number;
        };
    }, image: ImageData): void;
}

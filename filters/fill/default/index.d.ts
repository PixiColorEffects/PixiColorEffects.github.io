import { Filter } from "pixi.js";
export declare class Default extends Filter {
    constructor(value?: number, fillColor?: string);
    update(): void;
    get fillColor(): string;
    set fillColor(color: string);
    get value(): number;
    set value(value: number);
}

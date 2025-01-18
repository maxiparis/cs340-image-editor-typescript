import Color from "./Color";

export default class ImageRead {
    pixels: Color[][] = []

    constructor(width: number, height: number) {
        this.pixels = new Array(width).fill(null).map(() => new Array(height).fill(new Color()))
    }
}
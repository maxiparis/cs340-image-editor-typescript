import Color from "./Color";

export default class ImageRead {
    pixels: Color[][] = []

    constructor(width: number, height: number) {
        this.pixels = new Array(width).fill(null).map(() => new Array(height).fill(new Color()))
    }

    getWidth() {
        return this.pixels.length
    }

    getHeight() {
        return this.pixels[0].length
    }

    set(x: number, y: number, c: Color) {
        this.pixels[x][y] = c
    }

    get(x: number, y: number): Color {
       return this.pixels[x][y]
    }
}
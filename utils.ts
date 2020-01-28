export abstract class Utils {
    public static rng(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    public static calcPixels(x: number, xMax: number, wMax: number): number {
        return Math.floor((((x * 100) / xMax) * wMax) / 100)
    }
}

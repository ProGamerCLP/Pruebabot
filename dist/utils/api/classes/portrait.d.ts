/// <reference types="node" />
interface AvatarData {
    borderWidth?: number;
    avatarURL: string;
    x: number;
    y: number;
    size: number;
    borderColor?: string;
}
interface TextData {
    text: string;
    x: number;
    y: number;
    size: number;
    color: string | CanvasGradient | CanvasPattern;
    style?: "centered" | "left";
}
type drawQuery = AvatarData | TextData;
declare class Portrait {
    background: string | string[];
    font: string;
    height: number;
    width: number;
    constructor({ background, fontFamily, width, height, }: {
        background: string | string[];
        fontFamily: string;
        width: number;
        height: number;
    });
    draw(query: drawQuery[]): Promise<Buffer>;
}
export default Portrait;

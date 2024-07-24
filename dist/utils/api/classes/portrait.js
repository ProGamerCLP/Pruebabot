"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("../functions/url");
const color_1 = require("../functions/color");
const files_1 = require("../functions/files");
const canvas_1 = require("canvas");
const path_1 = require("path");
const testBackground = (path) => __awaiter(void 0, void 0, void 0, function* () { return files_1.file.access(path) && (yield url_1.url.imageTest(path)) && color_1.color.isHexCode(path); });
class Portrait {
    constructor({ background, fontFamily, width, height, }) {
        let bkg = background;
        if (typeof background !== "string") {
            for (const bg of background) {
                if (!testBackground(bg))
                    bkg = "#FFFFFF";
            }
        }
        else if (!testBackground(background))
            bkg = "#FFFFFF";
        const fontName = (0, path_1.basename)(fontFamily);
        this.background = background;
        this.font = fontName;
        this.height = height;
        this.width = width;
        (0, canvas_1.registerFont)(`assets/fonts/${fontName}`, { family: fontFamily });
    }
    draw(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const canvas = (0, canvas_1.createCanvas)(this.width, this.height);
            const ctx = canvas.getContext("2d");
            // sombreado
            ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
            ctx.shadowBlur = 15;
            ctx.shadowOffsetX = 5;
            ctx.shadowOffsetY = 5;
            const paintBackground = (bg) => __awaiter(this, void 0, void 0, function* () {
                if (color_1.color.isHexCode(bg)) {
                    // if the background is a plain color
                    ctx.fillStyle = bg;
                    ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);
                }
                else {
                    // if background is an image
                    const image = yield (0, canvas_1.loadImage)(bg);
                    ctx.drawImage(image, 10, 10, canvas.width - 20, canvas.height - 20);
                }
            });
            // paint background
            let background;
            if (Array.isArray(this.background)) {
                const random = ~~(Math.random() * this.background.length);
                background = this.background[random];
            }
            else
                background = this.background;
            yield paintBackground(background);
            for (const e of query) {
                if ("avatarURL" in e) {
                    // avatar data
                    const avatarImage = yield (0, canvas_1.loadImage)(e.avatarURL).catch((err) => null);
                    if (!avatarImage)
                        continue;
                    const radius = e.size / 2;
                    const border = e.borderWidth || 5;
                    // rellenar contorno de la imagen
                    ctx.shadowColor = "rgba(0, 0, 0, 0.4)"; // sombreado del contorno
                    ctx.shadowBlur = 15;
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(e.x, e.y, radius, 0, 2 * Math.PI);
                    ctx.closePath();
                    ctx.fillStyle = `${e.borderColor || "white"}`;
                    ctx.fill();
                    ctx.beginPath();
                    ctx.arc(e.x, e.y, radius - border, 0, 2 * Math.PI);
                    ctx.closePath();
                    ctx.clip();
                    ctx.drawImage(avatarImage, e.x - (radius - border), e.y - (radius - border), (radius - border) * 2, (radius - border) * 2);
                    ctx.restore();
                }
                else {
                    // text data
                    ctx.font = `${e.size}px ${this.font}`;
                    ctx.fillStyle = `${e.color}`;
                    if (e.style === "centered") {
                        const metrics = ctx.measureText(e.text);
                        ctx.fillText(e.text, e.x - metrics.width / 2, e.y);
                    }
                    else
                        ctx.fillText(e.text, e.x, e.y);
                }
            }
            return canvas.toBuffer();
        });
    }
}
exports.default = Portrait;
//# sourceMappingURL=portrait.js.map
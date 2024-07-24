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
exports.generateImage = void 0;
const canvas_1 = require("canvas");
const module_1 = require("../module");
const defaultLogo = "https://static.vecteezy.com/system/resources/previews/018/930/604/original/discord-logo-discord-icon-transparent-free-png.png";
function generateImage(member) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, canvas_1.registerFont)(`./assets/fonts/${module_1.welcomeModule.config.get("font")}`, {
            family: "welcomeImageFont",
        });
        const config = module_1.welcomeModule.config.get();
        const canvas = (0, canvas_1.createCanvas)(1000, 500);
        const ctx = canvas.getContext("2d");
        // sombreado
        ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
        ctx.shadowBlur = 15;
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 5;
        const background = yield (0, canvas_1.loadImage)(config.background);
        ctx.drawImage(background, 10, 10, canvas.width - 20, canvas.height - 20);
        // set name
        ctx.shadowColor = "rgba(0, 0, 0, 0.8)"; // retocar sombreado para el texto
        ctx.shadowBlur = 5;
        ctx.font = "80px welcomeImageFont";
        ctx.fillStyle = "white";
        const username = member.user.username;
        const usernameMtrcs = ctx.measureText(username);
        const name_x = Number(config.text_x);
        const name_y = Number(config.text_y);
        ctx.fillText(username, name_x - usernameMtrcs.width / 2, name_y);
        // draw text
        ctx.font = "40px welcomeImageFont";
        const textMetrics = ctx.measureText(config.text);
        ctx.fillText(config.text, name_x - textMetrics.width / 2, name_y + 50);
        // set avatar
        const avatarURL = member.user.avatarURL({ extension: "png", size: 1024 }) || defaultLogo;
        if (avatarURL) {
            const avatarImage = yield (0, canvas_1.loadImage)(avatarURL);
            const size = Number(config.avatar_size);
            const radius = size / 2;
            const avatarX = Number(config.avatar_x);
            const avatarY = Number(config.avatar_y);
            // rellenar contorno de la imagen
            ctx.shadowColor = "rgba(0, 0, 0, 0.4)"; // sombreado del contorno
            ctx.shadowBlur = 15;
            ctx.beginPath();
            ctx.arc(avatarX, avatarY, radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fillStyle = "white";
            ctx.fill();
            ///////////////
            ctx.beginPath();
            ctx.arc(avatarX, avatarY, radius - 5, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(avatarImage, avatarX - (radius - 5), avatarY - (radius - 5), (radius - 5) * 2, (radius - 5) * 2);
        }
        //
        return canvas.toBuffer();
    });
}
exports.generateImage = generateImage;
//
//# sourceMappingURL=fsdfsd.js.map
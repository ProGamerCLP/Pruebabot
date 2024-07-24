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
exports.getBranding = void 0;
const { getColorFromURL } = require("color-thief-node");
function getDominantColor(iconURL) {
    return __awaiter(this, void 0, void 0, function* () {
        const rgbArr = yield getColorFromURL(iconURL);
        const hex = rgbArr.reduce((acc, val) => {
            const hexVal = val.toString(16).padStart(2, "0");
            return acc + hexVal;
        }, "#");
        return {
            pattern: Number(`0x${hex.slice(1)}`),
            hex: hex.toUpperCase(),
        };
    });
}
function getBranding(guild) {
    return __awaiter(this, void 0, void 0, function* () {
        const icon = guild.iconURL({ extension: "png", size: 256 }) ||
            "https://logodownload.org/wp-content/uploads/2017/11/discord-logo-1-1.png";
        const banner = guild.bannerURL({ extension: "png" });
        if (!icon)
            return null;
        const color = yield getDominantColor(icon);
        return { color, icon, banner };
    });
}
exports.getBranding = getBranding;
//# sourceMappingURL=branding.js.map
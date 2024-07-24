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
const codecord_1 = require("../../../utils/api/codecord");
const module_1 = require("../module");
function generateImage(member) {
    return __awaiter(this, void 0, void 0, function* () {
        const config = module_1.welcomeModule.config.get(), data = yield module_1.welcomeModule.data.get(member.guild.id), branding = yield codecord_1.color.getGuildBranding(member.guild);
        const portrait = new codecord_1.Portrait({
            background: data.imageURL ||
                (branding === null || branding === void 0 ? void 0 : branding.color.hex) ||
                config.defaultBackground ||
                "#ffffff",
            fontFamily: config.font,
            width: 1200,
            height: 600,
        });
        const buffer = yield portrait.draw([
            // member avatar
            {
                borderWidth: 10,
                avatarURL: member.avatarURL({ extension: "png" }) ||
                    member.user.avatarURL({ extension: "png" }) ||
                    config.defaultAvatar,
                x: Number(config.avatar_x),
                y: Number(config.avatar_y),
                size: Number(config.avatar_size),
            },
            // username
            {
                text: member.user.username,
                x: Number(config.text_x),
                y: Number(config.text_y),
                size: 100,
                color: "#ffffff",
                style: "centered",
            },
            // subtitle
            {
                text: config.text,
                x: Number(config.text_x),
                y: Number(config.text_y) + 50,
                size: 60,
                color: "#ffffff",
                style: "centered",
            },
        ]);
        return buffer;
    });
}
exports.generateImage = generateImage;
//# sourceMappingURL=generateImage.js.map
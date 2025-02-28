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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const codecord_1 = require("../../../utils/api/codecord");
const messages_1 = __importDefault(require("../utils/messages"));
const branding_1 = require("../../../utils/api/functions/branding");
const gifs = [
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGljeG0xb2Qza2UwdWI4ajdnOHhmbWNkZXFwbWJqdGM0a2ZqaG8yMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Vh2c84FAPVyvvjZJNM/giphy.gif",
    "https://c.tenor.com/jJuyU09YX3AAAAAd/tenor.gif",
    "https://gifdb.com/images/high/daily-lives-of-high-school-boys-tadakuni-ban-hecynpn3l6h64240.gif",
    "https://c.tenor.com/TbfChfHKkOUAAAAC/ban-button.gif",
    "https://c.tenor.com/9zCgefg___cAAAAC/tenor.gif",
];
exports.default = (i) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!i.guild)
        return;
    const embed = i.message.embeds[0];
    if (!embed)
        return;
    const userId = (_b = (_a = embed.footer) === null || _a === void 0 ? void 0 : _a.text.split(":")[1]) === null || _b === void 0 ? void 0 : _b.replace(/ /g, "");
    const reason = embed.description;
    const info = embed.fields[0];
    if (!userId || !reason)
        return;
    const m = yield codecord_1.snowflake.fetch(i.guild.members, userId);
    if (!m || !(m instanceof discord_js_1.GuildMember))
        return;
    yield m
        .ban({ reason })
        .catch((e) => console.log(messages_1.default.missingPermissionsBan));
    const branding = yield (0, branding_1.getBranding)(i.guild);
    yield i.update({
        embeds: [
            {
                author: {
                    icon_url: branding === null || branding === void 0 ? void 0 : branding.icon,
                    name: i.guild.name + " Moderation",
                },
                color: (branding === null || branding === void 0 ? void 0 : branding.color.pattern) || 0xfffff,
                description: `:small_red_triangle_down: <@${i.user.id}> ha baneado a **${m.user.username}**\n> Fecha: *${new Date().toDateString()}*
          > Infracción: ${reason}
          > ${info.name}: ${info.value}`,
                image: { url: gifs[~~(Math.random() * gifs.length)] },
            },
        ],
        components: [],
    });
});
//# sourceMappingURL=ban.js.map
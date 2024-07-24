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
const discord_js_1 = require("discord.js");
const codecord_1 = require("../../../utils/api/codecord");
const branding_1 = require("../../../utils/api/functions/branding");
exports.default = (i) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!i.guild)
        return;
    const embed = i.message.embeds[0];
    console.log(`[moderation] Revoking timeout...`);
    if (!embed)
        return;
    const userId = (_b = (_a = embed.footer) === null || _a === void 0 ? void 0 : _a.text.split(":")[1]) === null || _b === void 0 ? void 0 : _b.replace(/ /g, "");
    const reason = embed === null || embed === void 0 ? void 0 : embed.description;
    const info = embed.fields[0];
    if (!userId || !reason)
        return;
    const m = yield codecord_1.snowflake.fetch(i.guild.members, userId);
    if (!m || !(m instanceof discord_js_1.GuildMember))
        return;
    const branding = yield (0, branding_1.getBranding)(i.guild);
    yield i.update({
        embeds: [
            {
                author: {
                    icon_url: branding === null || branding === void 0 ? void 0 : branding.icon,
                    name: i.guild.name + " Moderation",
                },
                color: (branding === null || branding === void 0 ? void 0 : branding.color.pattern) || 0xfffff,
                description: `:small_blue_diamond: **<@${i.user.id}>** ha retirado el timeout a **${m.user.username}** (<@${m.user.id}>)\n> Fecha: *${new Date().toDateString()}*
        > Infracción: ${reason}
        > ${info.name}: ${info.value}`,
            },
        ],
        components: [],
    });
    console.log(`> ${i.user.username} ha retirado el timeout a ${m.user.username}`);
});
//# sourceMappingURL=revoke.js.map
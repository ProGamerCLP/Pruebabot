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
const warn_1 = require("../utils/warn");
exports.default = ({ mentions, author, guild, content }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!author || !mentions.everyone || !guild)
        return;
    const member = yield codecord_1.snowflake.fetch(guild.members, author.id);
    if (!member ||
        !(member instanceof discord_js_1.GuildMember) ||
        member.permissions.has(discord_js_1.PermissionFlagsBits.Administrator) ||
        member.permissions.has(discord_js_1.PermissionFlagsBits.MentionEveryone))
        return;
    yield (0, warn_1.warn)(guild, "mentions", author, {
        content,
    });
});
//# sourceMappingURL=mentions.js.map
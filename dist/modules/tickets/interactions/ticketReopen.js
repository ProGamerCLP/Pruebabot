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
exports.default = (i) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!i.channel || i.channel.type !== discord_js_1.ChannelType.GuildText || !i.guild)
        return;
    const ownerId = (_a = i.channel.topic) === null || _a === void 0 ? void 0 : _a.split("/")[1], owner = yield codecord_1.snowflake.fetch(i.guild.members, ownerId);
    if (!owner || !(owner instanceof discord_js_1.GuildMember))
        return yield i.reply({
            content: "Cannot reopen this ticket, the owner is not in this guild.",
        });
    yield i.channel.permissionOverwrites.create(owner === null || owner === void 0 ? void 0 : owner.id, {
        ViewChannel: true,
    });
    yield i.update({
        content: "✨ Se ha reanudado la conversación de éste ticket.",
        components: [],
    });
    const r = i.channel.name.split("-");
    yield i.channel.setName(`${r[0]}-${(_b = i.channel.topic) === null || _b === void 0 ? void 0 : _b.split("/")[0]}-${r[2]}`);
    yield i.channel.send({
        content: `<@${owner.id}>`,
    });
});
//# sourceMappingURL=ticketReopen.js.map
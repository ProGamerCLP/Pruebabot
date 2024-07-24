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
const logs_1 = require("../../../utils/functions/discord/logs");
const functions_1 = require("../../../utils/functions/functions");
// sends log to #discord-logs channel when a message id deleted
exports.default = (message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!message.guild)
        return;
    // fetch the log channel
    const channel = (_a = message.guild) === null || _a === void 0 ? void 0 : _a.channels.cache.get("221853258155561011");
    const log = yield logs_1.logs.last(message.guild, {
        type: discord_js_1.AuditLogEvent.MessageDelete,
    });
    if (!log || !(log instanceof discord_js_1.GuildAuditLogsEntry))
        return;
    if (!channel || channel.type !== discord_js_1.ChannelType.GuildText)
        return console.error("Deleted message log channel is invalid.");
    // find the user who deleted the message
    const { executorId, targetId } = log;
    // create a the log message
    if (executorId && targetId) {
        const executor = message.guild.members.cache.get(executorId);
        const author = (yield functions_1.snowflake.fetch(message.guild.members, targetId)) ||
            message.author;
        let str;
        if (author && author instanceof discord_js_1.GuildMember) {
            if (executor && executor.user.id === author.id)
                str = `${executor.user.username} ha eliminado su mensaje:`;
            else if (executor && author.id === message.client.user.id)
                str = `${executor.user.username} ha borrado un mensaje del bot oficial.`;
            else if (executor)
                str = `${executor.user.username} ha eliminado un mensaje de ${author.user.username}`;
            else
                str = `Se ha eliminado un mensaje de ${message.author.username}`;
        }
        else
            str = `${executor} ha borrado un mensaje.`;
        const date = `${new Date().toString().split("GMT")[0]}`;
        const channelTag = `Canal: ${message.channel}`;
        const content = (() => {
            const a = "```";
            const b = message.content;
            if (!message.content)
                return;
            return `${a}${b}${a}`;
        })();
        const desc = [
            { name: "Fecha", value: date, inline: true },
            { name: "Canal", value: channelTag, inline: true },
        ];
        if (content)
            desc.push({ name: "Contenido", value: content, inline: false });
        yield channel.send({
            embeds: [
                new discord_js_1.EmbedBuilder()
                    .setAuthor({
                    name: "Mensaje eliminado",
                    // icono del servidor del renacer rp
                    iconURL: "https://images-ext-1.discordapp.net/external/XsYSa0hMpXcqBwQnet-6LeL3WMUgX7yWqdvwoaFKUfY/https/i.postimg.cc/mkLwk33C/LOGO-SIN-FONDO-CON-SOMBRA.png?format=webp&quality=lossless&width=80&height=74",
                })
                    .setTitle(str)
                    .setColor("Red")
                    .setFields(desc),
            ],
        });
    }
});
//# sourceMappingURL=messageDelete.js.map
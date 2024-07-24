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
const components_1 = require("../commands/manager/components");
const codecord_1 = require("../../../utils/api/codecord");
const module_1 = require("../module");
const actionRow = new discord_js_1.ActionRowBuilder().addComponents(components_1.closeButton, components_1.transcriptButton);
/**
 * Response to a ticket menu
 */
exports.default = (i) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const { guild, member } = i;
    if (!guild || !member)
        return;
    const config = module_1.module.config.get();
    const ticketId = i.values[0];
    const ticket = yield module_1.module.data.get(ticketId);
    if (!ticket)
        return i.reply({
            content: "No hemos podido abrir el ticket, porfavor informe al staff sobre el asunto. Muchas gracias por su paciencia.",
        });
    const supportRole = yield codecord_1.snowflake.fetch(guild.roles, ticket.support);
    /// check if the user has a ticket opened actually
    const channelRange = ticket.parent
        ? guild.channels.cache.filter((channel) => channel.parentId === ticket.parent)
        : guild.channels.cache;
    for (const channel of channelRange.values()) {
        if (channel.type === discord_js_1.ChannelType.GuildText &&
            ((_a = channel.topic) === null || _a === void 0 ? void 0 : _a.split("/")[0]) === ticketId &&
            ((_b = channel.topic) === null || _b === void 0 ? void 0 : _b.split("/")[1]) === i.user.id)
            return yield i.reply({
                content: "❌ Ya tienes un ticket abierto",
                ephemeral: true,
            });
    }
    // check if the ticket has questions integrated
    let questionsInput = [];
    let replyTarget = i;
    if (ticket.questions.length > 0) {
        const c = new codecord_1.Collector(i);
        const inputs = ticket.questions.map((q, index) => ({
            label: q,
            style: index === 0 ? discord_js_1.TextInputStyle.Short : discord_js_1.TextInputStyle.Paragraph,
            customId: `ticketCreateQuestion_${index}`,
        }));
        const submitted = yield c.modalSubmission(i, {
            inputs,
        });
        if (!submitted)
            return;
        Object.entries(submitted.values).forEach(([valueId, input]) => {
            const questionId = valueId.split("_")[1];
            questionsInput.push({ id: questionId, input });
        });
        replyTarget = submitted.response;
    }
    if (replyTarget.replied) {
        yield replyTarget.reply({
            content: `${config.loadingEmoji} Creando ticket...`,
            ephemeral: true,
        });
    }
    else {
        yield replyTarget.reply({
            content: `${config.loadingEmoji} Creando ticket...`,
            ephemeral: true,
        });
    }
    /// creates the channel
    const channel = yield guild.channels
        .create({
        name: `${"0".repeat(4 - String(ticket.number + 1).length)}${ticket.number + 1}-${ticket.label.split(",")[0]}-${i.user.username}`.slice(0, 25),
        topic: `${ticketId}/${i.user.id}`,
        parent: ticket.parent,
        type: discord_js_1.ChannelType.GuildText,
        permissionOverwrites: [
            {
                id: guild.roles.everyone,
                deny: [discord_js_1.PermissionFlagsBits.ViewChannel],
            },
            {
                id: i.user.id,
                allow: [discord_js_1.PermissionFlagsBits.ViewChannel],
            },
        ],
    })
        .catch((e) => null);
    if (!channel)
        return yield i.editReply({
            content: "Ha ocurrido un error, porfavor ponte en contacto con el staff para avisar de ésta falla!",
        });
    // if support role is activated
    if (supportRole && supportRole instanceof discord_js_1.Role) {
        channel.permissionOverwrites.create(supportRole.id, {
            ViewChannel: true,
        });
    }
    // messages
    yield replyTarget.editReply({
        content: `✅ **Tu ticket ha sido creado, porfavor diríjase a ${channel} para continuar.**`,
    });
    const content = `${supportRole ? `<@&${supportRole.id}>` : ""}<@${i.user.id}> \n${((_c = ticket.message_onCreate) === null || _c === void 0 ? void 0 : _c.content) || ""}`;
    const embeds = ((_d = ticket.message_onCreate) === null || _d === void 0 ? void 0 : _d.embeds)
        ? ticket.message_onCreate.embeds.map((embedData, i) => {
            let data = Object.assign({}, embedData);
            let fields = [...(embedData.fields || [])];
            if (i == 0 && questionsInput.length > 0) {
                for (const question of questionsInput) {
                    const questionIndex = Number(question.id);
                    fields.push({
                        name: `${ticket.questions[questionIndex]}`,
                        value: question.input || "No se ha aportado ninguna respuesta.",
                    });
                }
            }
            data.fields = fields;
            return new discord_js_1.EmbedBuilder(data);
        })
        : undefined;
    yield module_1.module.data.set(`${ticketId}`, Object.assign(Object.assign({}, ticket), { number: ticket.number + 1 }));
    yield channel.send({
        content,
        embeds,
        components: [actionRow],
    });
});
//# sourceMappingURL=ticketCreate.js.map
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
const module_1 = require("../../module");
const codecord_1 = require("../../../../utils/api/codecord");
exports.default = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { channel, guild } = interaction;
    if (!channel || !guild || !(channel.messages instanceof discord_js_1.GuildMessageManager))
        return;
    yield interaction.deferReply({
        ephemeral: true,
    });
    // interaction inputs
    const ticketIds = (_a = interaction.options
        .getString("ticket")) === null || _a === void 0 ? void 0 : _a.replace(" ", "").split(",");
    const messageId = interaction.options.getString("message_id");
    // fetch the message
    const message = yield codecord_1.snowflake.fetch(channel.messages, messageId);
    if (!message || !(message instanceof discord_js_1.Message))
        return;
    if (!ticketIds)
        return;
    if (!message)
        return interaction.editReply("❌ No hemos podido encontrar el mensaje de la id de referencia.");
    let tickets = [];
    for (const ticketId of ticketIds) {
        const ticket = yield module_1.module.data.get(ticketId);
        if (ticket)
            tickets.push(Object.assign({ id: ticketId }, ticket));
    }
    if (tickets.length < 1)
        return;
    const menu = new discord_js_1.StringSelectMenuBuilder()
        .setCustomId("ticketCreate")
        .setMaxValues(1)
        .setPlaceholder("> Utiliza el menu para abrir un ticket.");
    for (const ticket of tickets) {
        const option = new discord_js_1.StringSelectMenuOptionBuilder()
            .setValue(ticket.id)
            .setLabel(ticket.label);
        if (ticket.description)
            option.setDescription(ticket.description.slice(0, 50));
        if (ticket.emoji)
            option.setEmoji(ticket.emoji);
        menu.options.push(option);
    }
    yield channel.send({
        content: message.content,
        embeds: message.embeds,
        components: [
            new discord_js_1.ActionRowBuilder().addComponents(menu),
        ],
    });
    yield interaction.editReply("✅ Se ha enviado el panel de tickets exitosamente.");
});
//# sourceMappingURL=main.js.map
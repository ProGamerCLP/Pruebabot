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
const discord_html_transcripts_1 = require("discord-html-transcripts");
const codecord_1 = require("../../../utils/api/codecord");
const module_1 = require("../module");
const feedbackMenu = new discord_js_1.StringSelectMenuBuilder()
    .setCustomId("ticketFeedback")
    .setPlaceholder("Selecciona una opción para dejar tu feedback ⭐")
    .setMaxValues(1)
    .setMinValues(1)
    .setOptions([
    new discord_js_1.StringSelectMenuOptionBuilder()
        .setLabel("👍 Excelente")
        .setDescription("¡Me encanta! Todo funcionó perfectamente.")
        .setValue("feedback_5"),
    new discord_js_1.StringSelectMenuOptionBuilder()
        .setLabel("😊 Bueno")
        .setDescription("Estuvo bien, pero podría mejorar en algunos aspectos.")
        .setValue("feedback_4"),
    new discord_js_1.StringSelectMenuOptionBuilder()
        .setLabel("😐 Regular")
        .setDescription("Ni bien ni mal, simplemente regular.")
        .setValue("feedback_3"),
    new discord_js_1.StringSelectMenuOptionBuilder()
        .setLabel("😕 Malo")
        .setDescription("No estuvo bien, hubo varios problemas.")
        .setValue("feedback_2"),
    new discord_js_1.StringSelectMenuOptionBuilder()
        .setLabel("👎 Terrible")
        .setDescription("Lo peor que he experimentado. Nada funcionó como esperaba.")
        .setValue("feedback_1"),
]);
exports.default = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { channel, guild } = interaction;
    if (!channel || !guild)
        return;
    if (channel.type !== discord_js_1.ChannelType.GuildText)
        return;
    const loadingEmoji = module_1.module.config.get("loadingEmoji");
    // closing message
    yield interaction.reply({
        content: `**${loadingEmoji} Cerrando ticket en 5 segundos...**\n*Cerrado por <@${interaction.user.id}>*`,
    });
    // references
    const transcript = yield (0, discord_html_transcripts_1.createTranscript)(channel);
    const ownerId = (channel.topic || "").split("/")[1];
    const owner = yield codecord_1.snowflake.fetch(guild.members, ownerId);
    const ticketId = (channel.topic || "").split("/")[0];
    const ticket = yield module_1.module.data.get(ticketId);
    const transcriptChannel = guild.channels.cache.find((channel) => channel.id === (ticket === null || ticket === void 0 ? void 0 : ticket.transcriptChannel));
    try {
        // send message to the ticket owner on close
        if (ticket &&
            owner &&
            ticket.message_onDelete &&
            owner instanceof discord_js_1.GuildMember) {
            yield owner
                .send({
                content: ticket.message_onDelete.content,
                embeds: ((_a = ticket.message_onDelete) === null || _a === void 0 ? void 0 : _a.embeds)
                    ? ticket.message_onDelete.embeds.map((embedData) => new discord_js_1.EmbedBuilder(embedData))
                    : undefined,
                components: ticket.feedbackChannel
                    ? [
                        new discord_js_1.ActionRowBuilder().addComponents(feedbackMenu),
                    ]
                    : [],
            })
                .catch((e) => console.error(`Cannot open dm to ${owner.user.username}`));
            if (ticket.dmTranscript != "false") {
                yield owner
                    .send({
                    files: [transcript],
                })
                    .catch((e) => null);
            }
        }
        // sending warning to the moderation channel
        if (transcriptChannel && transcriptChannel.type === discord_js_1.ChannelType.GuildText) {
            // embed
            yield transcriptChannel.send({
                embeds: [
                    new discord_js_1.EmbedBuilder()
                        .setTitle(`🔐 ${channel.name} ha sido cerrado.`)
                        .setDescription(`Cerrado por <@${interaction.user.id}>`),
                ],
            });
            // transcript
            yield transcriptChannel.send({
                files: [transcript],
            });
        }
        const confirmCloseButton = new discord_js_1.ButtonBuilder()
            .setCustomId("ticketDelete")
            .setLabel(`Delete ticket`)
            .setEmoji("🗑️")
            .setStyle(2);
        const reopenButton = new discord_js_1.ButtonBuilder()
            .setCustomId("ticketReopen")
            .setLabel(`Re-open ticket`)
            .setEmoji("✅")
            .setStyle(2);
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            if (owner) {
                // closing message
                yield interaction.editReply({
                    content: `**<a:1446greenverify:1209663856943702146> Este ticket ha sido marcado como cerrado**\n*Cerrado por <@${interaction.user.id}>*`,
                    components: [
                        new discord_js_1.ActionRowBuilder().addComponents(reopenButton, confirmCloseButton),
                    ],
                });
                if (!channel.permissionOverwrites.cache.has(owner === null || owner === void 0 ? void 0 : owner.id)) {
                    yield channel.permissionOverwrites.create(owner === null || owner === void 0 ? void 0 : owner.id, {
                        ViewChannel: false,
                    });
                }
                else {
                    yield channel.permissionOverwrites.edit(owner === null || owner === void 0 ? void 0 : owner.id, {
                        ViewChannel: false,
                    });
                }
                const c = channel.name.split("-");
                const n = c[0];
                yield channel.setName(`${n}-closed-${c[2]}`.slice(0, 25));
            }
            else {
                channel.delete();
            }
        }), 5000);
    }
    catch (error) {
        console.log("An error has ocurred trying to deleting a ticket.\n", error);
    }
});
//# sourceMappingURL=ticketClose.js.map
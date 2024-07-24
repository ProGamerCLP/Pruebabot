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
const menuFunctions_1 = __importDefault(require("../utils/menuFunctions"));
const inputs_1 = __importDefault(require("../utils/djs/inputs"));
const types_1 = require("../utils/types");
const codecord_1 = require("../../../utils/api/codecord");
const module_1 = require("../module");
const components_1 = require("../utils/djs/components");
exports.default = {
    // command data
    data: new discord_js_1.SlashCommandBuilder()
        .setName("embed")
        .setDescription("Crear mensaje embed.")
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.Administrator),
    /**
     * Creates a configuration interface to create a embed
     * @param interaction
     * @returns
     */
    execute: (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        const { channel, guild } = interaction;
        if (!channel || !guild)
            return;
        let content = null;
        let embed = new discord_js_1.EmbedBuilder().setTitle("Nuevo embed!");
        // replies the interaction for the first time
        yield interaction.reply({
            embeds: [embed],
            components: [components_1.buttonActionRow, components_1.menuActionRow],
            ephemeral: true,
            fetchReply: true,
        });
        const collector = new codecord_1.Collector(interaction);
        collector.listen({
            /**
             * Loads a embed that was saved before
             * @param i
             */
            load: (i) => __awaiter(void 0, void 0, void 0, function* () {
                const submitted = yield collector.modalSubmission(i, {
                    inputs: inputs_1.default.load,
                });
                if (!submitted)
                    return;
                const embedId = submitted.values.loadName;
                const data = yield module_1.embedModule.data.get(embedId);
                if (!data)
                    return submitted.response.reply({
                        content: `${embedId} no ha sido guardado en la base de datos.`,
                        ephemeral: true,
                    });
                embed = new discord_js_1.EmbedBuilder(data);
                if (data.content)
                    content = data.content;
                yield submitted.response.deferUpdate({});
            }),
            /**
             * Sends a message with the ids of all stored embeds
             * @param i
             */
            logs: (i) => __awaiter(void 0, void 0, void 0, function* () {
                const datakeys = yield module_1.embedModule.data.keys();
                let str = datakeys.length < 1
                    ? "No hay embeds guardados actualmente."
                    : datakeys.join(", ");
                yield i.reply({
                    embeds: [
                        new discord_js_1.EmbedBuilder().setTitle("Embeds guardados").setDescription(str),
                    ],
                    ephemeral: true,
                });
            }),
            /**
             * Saves the actual embed configuration
             * @param i
             */
            save: (i) => __awaiter(void 0, void 0, void 0, function* () {
                const submitted = yield collector.modalSubmission(i, {
                    inputs: inputs_1.default.save,
                });
                if (!submitted)
                    return;
                const datakeys = yield module_1.embedModule.data.keys();
                const saveName = submitted.values.saveName;
                const embedId = codecord_1.id.createUnique(datakeys, saveName);
                yield module_1.embedModule.data.set(embedId, Object.assign(Object.assign({}, embed.toJSON()), { content }));
                yield submitted.response.reply({
                    content: `✅ Embed guardado en la base de datos como **${embedId}**`,
                    ephemeral: true,
                });
            }),
            /**
             * Sends the actual embed configuration to the channel
             * @param i
             */
            send: (i) => __awaiter(void 0, void 0, void 0, function* () {
                if (!i.channel)
                    return;
                yield i.channel.send({
                    content: content || undefined,
                    embeds: [embed],
                });
                yield i.update({});
            }),
            /**
             * Listens to the menu interactions, which are those who can change the embed fields
             * @param i
             */
            embedFieldSelect: (m) => __awaiter(void 0, void 0, void 0, function* () {
                const opt = m.values[0];
                if (!(0, types_1.isOption)(opt))
                    return;
                const input = inputs_1.default[opt];
                // await a modal response
                const submitted = yield collector.modalSubmission(m, {
                    inputs: input instanceof discord_js_1.TextInputBuilder ? [input] : input,
                });
                if (!submitted)
                    return;
                if (opt === "content") {
                    const str = submitted.values.content;
                    content = str;
                    yield (submitted === null || submitted === void 0 ? void 0 : submitted.response.deferUpdate({}));
                    return;
                }
                const f = menuFunctions_1.default.menuOption[opt];
                yield f(m, submitted, embed);
                if (!submitted.response.replied)
                    yield (submitted === null || submitted === void 0 ? void 0 : submitted.response.deferUpdate({}));
            }),
            /**
             * This functions is executed every time a interaction is detected, it's function is to update the interface.
             * @param i
             */
            default: () => __awaiter(void 0, void 0, void 0, function* () {
                yield interaction
                    .editReply({
                    content,
                    embeds: [embed],
                    components: [components_1.buttonActionRow, components_1.menuActionRow],
                })
                    .catch((e) => null);
            }),
        });
    }),
};
//# sourceMappingURL=embed.js.map
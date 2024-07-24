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
// request
const awaitingRequests = new Map();
// if the user has more than 4 requests pending then we close
const userRequestSpamPrevention = (userId) => {
    // filter for every user pending to a interaction the user of this interaction
    const userRequests = [...awaitingRequests.values()].filter((id) => id === userId);
    if (userRequests.length > 4)
        return false;
    else
        return true;
};
class Collector {
    constructor(interaction, time) {
        this.interaction = interaction;
        this.time = time || 5; // minutes
    }
    listen(arr) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.interaction.channel)
                return;
            const reply = yield this.interaction.fetchReply().catch((e) => null);
            if (!reply)
                throw new Error(`Can't listen to interaction components if there is no reply to filter. (${this.interaction.id})`);
            const filter = (m) => {
                return (m.message.id === reply.id && this.interaction.user.id === m.user.id);
            };
            const collector = this.interaction.channel.createMessageComponentCollector({
                time: (this.time ? this.time : 5) * 60 * 1000,
                filter,
            });
            collector.on("collect", (m) => __awaiter(this, void 0, void 0, function* () {
                const run = arr[m.customId];
                console.log(`> ${m.user.username} interacted with " ${m.customId}"`);
                if (run)
                    yield run(m);
                if (arr.default && m.customId in arr)
                    yield arr.default(m);
            }));
            collector.once("end", () => __awaiter(this, void 0, void 0, function* () {
                collector.stop();
                if (this.interaction.replied)
                    this.interaction
                        .editReply({ components: [] })
                        .catch((e) => console.log("An error ocurred trying to edit the interaction message", e));
            }));
        });
    }
    modalSubmission(m, { time, title, inputs, }) {
        return __awaiter(this, void 0, void 0, function* () {
            // id del modal
            const custom_id = `modal-${m.id}`;
            // Crear modal menu
            const modal = new discord_js_1.ModalBuilder({
                title: title || "Rellena el formulario",
                custom_id,
            });
            // si no hay suficientes campos de entrada
            if (inputs.length < 1)
                throw new Error("There must be at least one text input builder.");
            // añadir todos los inputs al modal
            for (const input of inputs) {
                let inputBuilder = input instanceof discord_js_1.TextInputBuilder ? input : parseInput(input);
                const row = new discord_js_1.ActionRowBuilder().addComponents(inputBuilder);
                modal.addComponents(row);
            }
            const filter = (res) => {
                if (m instanceof discord_js_1.MessageComponentInteraction &&
                    (!res || !res.message || res.message.id !== m.message.id))
                    return false;
                return res.user.id === m.user.id && res.customId === custom_id;
            };
            yield m.showModal(modal);
            // if we are awaiting to the same interaction then there is no need to await another interaction equal
            if (awaitingRequests.has(custom_id))
                throw new Error("Repeated modal.");
            if (!userRequestSpamPrevention(m.user.id))
                throw new Error("This user is on spam prevention.");
            const response = yield m
                .awaitModalSubmit({
                time: (time || 5) * 60 * 1000,
                filter,
            })
                .catch(() => {
                return null;
            });
            if (!response)
                return null;
            console.log(`> Modal submission by ${response.user.username} recieved.`);
            const values = Object.fromEntries(response.fields.components.map((actionRow) => {
                const data = actionRow.components[0];
                return [data.customId, data.value];
            }));
            return { response, values };
        });
    }
}
function parseInput(data) {
    const input = new discord_js_1.TextInputBuilder()
        .setStyle(data.style || 1)
        .setCustomId(data.customId)
        .setLabel(data.label);
    if (data.max)
        input.setMaxLength(data.max);
    if (data.min)
        input.setMaxLength(data.min);
    if (data.placeHolder)
        input.setPlaceholder(data.placeHolder);
    if (data.required)
        input.setRequired(data.required);
    if (data.value)
        input.setValue(data.value);
    return input;
}
exports.default = Collector;
//# sourceMappingURL=collector.js.map
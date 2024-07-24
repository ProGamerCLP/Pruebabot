"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketInputs = void 0;
const discord_js_1 = require("discord.js");
const toInput = (data) => new discord_js_1.TextInputBuilder(Object.assign({ label: "Input", custom_id: "value" }, data));
const ticketInputs = {
    label: toInput({
        style: discord_js_1.TextInputStyle.Short,
        max_length: 25,
        min_length: 1,
        label: "Nombre",
    }),
    description: toInput({
        style: discord_js_1.TextInputStyle.Paragraph,
        max_length: 2500,
        min_length: 1,
        label: "Descripción",
    }),
    emoji: toInput({
        style: discord_js_1.TextInputStyle.Short,
        max_length: 50,
        min_length: 1,
        label: "Emoji",
    }),
    parent: toInput({
        style: discord_js_1.TextInputStyle.Short,
        max_length: 50,
        min_length: 1,
        label: "Parent",
    }),
    transcriptChannel: toInput({
        style: discord_js_1.TextInputStyle.Short,
        max_length: 50,
        min_length: 1,
        label: "transcriptChannel",
    }),
    message_onCreate: toInput({
        style: discord_js_1.TextInputStyle.Short,
        max_length: 50,
        min_length: 1,
        label: "Id del mensaje",
    }),
    message_onDelete: toInput({
        style: discord_js_1.TextInputStyle.Short,
        max_length: 50,
        min_length: 1,
        label: "Id del mensaje",
    }),
    support: toInput({
        style: discord_js_1.TextInputStyle.Short,
        max_length: 25,
        min_length: 1,
        label: "Rol de soporte (id)",
    }),
    addQuestion: toInput({
        style: discord_js_1.TextInputStyle.Short,
        max_length: 66,
        min_length: 1,
        label: "Escribir pregunta",
    }),
    rmQuestion: toInput({
        style: discord_js_1.TextInputStyle.Short,
        max_length: 25,
        min_length: 1,
        label: "Eliminar pregunta (número)",
    }),
    feedbackChannel: toInput({
        style: discord_js_1.TextInputStyle.Short,
        max_length: 25,
        min_length: 1,
        label: "Feedback (id de canal)",
    }),
    dmTranscript: toInput({
        style: discord_js_1.TextInputStyle.Short,
        max_length: 50,
        min_length: 1,
        label: "true|false",
    }),
};
exports.ticketInputs = ticketInputs;
//# sourceMappingURL=inputs.js.map
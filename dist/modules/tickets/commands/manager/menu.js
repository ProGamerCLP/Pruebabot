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
const components_1 = require("./components");
const module_1 = require("../../module");
const inputs_1 = require("./inputs");
const codecord_1 = require("../../../../utils/api/codecord");
const isOption = (opt) => opt;
const checkMessage = (m, input) => __awaiter(void 0, void 0, void 0, function* () {
    if (!m.guild || !m.channel)
        return false;
    if (!(m.channel.messages instanceof discord_js_1.GuildMessageManager))
        return false;
    const msg = yield codecord_1.snowflake.fetch(m.channel.messages, input);
    if (!msg || !(msg instanceof discord_js_1.Message))
        return false;
    return msg;
});
const f = {
    label: (m, input) => input,
    description: (m, input) => input,
    parent: (m, input) => {
        if (!m.guild)
            return false;
        const channel = m.guild.channels.cache.get(input);
        if (!channel || channel.type !== discord_js_1.ChannelType.GuildCategory)
            return false;
        else
            return input;
    },
    emoji: (m, input) => {
        if (codecord_1.emoji.is(input))
            return input;
    },
    message_onCreate: (m, input) => __awaiter(void 0, void 0, void 0, function* () {
        const msg = yield checkMessage(m, input);
        if (!msg)
            return false;
        return {
            content: msg.content,
            embeds: msg.embeds,
        };
    }),
    message_onDelete: (m, input) => __awaiter(void 0, void 0, void 0, function* () {
        const msg = yield checkMessage(m, input);
        if (!msg)
            return false;
        return {
            content: msg.content,
            embeds: msg.embeds.map((e) => e.toJSON()),
        };
    }),
    transcriptChannel: (m, input) => {
        if (!m.guild)
            return false;
        const channel = m.guild.channels.cache.get(input);
        if (!channel || channel.type !== discord_js_1.ChannelType.GuildText)
            return false;
        else
            return input;
    },
    support: (m, input) => {
        if (!m.guild)
            return false;
        if (m.guild.roles.cache.has(input))
            return input;
    },
    addQuestion: (m, question, ticket) => {
        const { questions } = ticket;
        return [...questions, question];
    },
    rmQuestion: (m, questionIndex, ticket) => {
        const { questions } = ticket;
        let i = 0;
        const index = Number(questionIndex);
        const question = questions[index - 1];
        if (!question)
            return false;
        return questions.filter((q) => q !== question);
    },
    feedbackChannel: (m, channelId) => __awaiter(void 0, void 0, void 0, function* () {
        if (!m.guild)
            return false;
        const channel = yield codecord_1.snowflake.fetch(m.guild.channels, channelId);
        if (!channel)
            return false;
        else
            return channel.id;
    }),
    dmTranscript: (m, input) => __awaiter(void 0, void 0, void 0, function* () {
        return input == "true" ? "true" : "false";
    }),
};
const messages = {
    feedbackChannel: "Introduce una id de canal válida.",
    label: "Introduce un título válido",
    description: "Introduce una descripción válida",
    emoji: "Introduce un emoji válido",
    message_onCreate: "Introduce una id de mensaje válida",
    message_onDelete: "Introduce una id de mensaje válida",
    parent: "Introduce una id de categoría válida",
    support: "Introduce una id de rol válida",
    transcriptChannel: "Introduce una id de canal válida",
    addQuestion: "Introduce una pregunta válida",
    rmQuestion: "Introduce una pregunta válida",
    dmTranscript: "",
};
exports.default = ({ book, collector, i, }) => __awaiter(void 0, void 0, void 0, function* () {
    const opt = i.values[0];
    // if option is invalid
    if (!isOption(opt))
        throw new Error("[Err] Not valid option");
    const optionData = components_1.selectMenu.options.find((op) => op.data.value === opt);
    if (!optionData)
        throw new Error(`${opt} is not a ticket data key valid option.`);
    const submitted = yield collector.modalSubmission(i, {
        title: "Editar ticket",
        inputs: [inputs_1.ticketInputs[opt]],
    });
    if (!submitted)
        return;
    const input = submitted.values.value, entriesPerPage = module_1.module.config.get("entriesPerPage"), ticketIndex = (book.page - 1) * Number(entriesPerPage) + (book.paragraph - 1), ticketIds = yield module_1.module.data.keys(), ticketId = ticketIds[ticketIndex], ticket = yield module_1.module.data.get(ticketId);
    if (!ticket)
        return;
    const myF = f[opt];
    let result = yield myF(i, input, ticket);
    // !!!
    if (!result) {
        const eMsg = messages[opt];
        return yield submitted.response.reply({
            content: `❌ **${eMsg}**`,
            ephemeral: true,
        });
    }
    // !!!
    if (opt === "addQuestion" || opt === "rmQuestion") {
        const newData = Object.assign(Object.assign({}, ticket), { questions: result });
        yield module_1.module.data.set(ticketId, newData);
    }
    else {
        const newData = Object.assign(Object.assign({}, ticket), { [opt]: result });
        yield module_1.module.data.set(ticketId, newData);
    }
    if (!submitted.response.replied)
        yield submitted.response.deferUpdate({});
});
//# sourceMappingURL=menu.js.map
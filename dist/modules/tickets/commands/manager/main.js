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
const interface_1 = require("./interface");
const codecord_1 = require("../../../../utils/api/codecord");
const module_1 = require("../../module");
const menu_1 = __importDefault(require("./menu"));
const codecord_2 = require("../../../../utils/api/codecord");
exports.default = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    let confirmDelete = false;
    // defer reply
    yield interaction.reply({
        embeds: [
            {
                description: "🌀 Cargando interfaz de gestión...",
            },
        ],
        ephemeral: true,
    });
    // create new instance of codecord book
    const book = new codecord_2.Book({
        render: () => __awaiter(void 0, void 0, void 0, function* () {
            if (!interaction.guild)
                return {
                    content: "Ha ocurrido un error",
                };
            const data = yield (0, interface_1.messageInterface)(book, interaction.guild);
            return interaction.replied ? data : Object.assign(Object.assign({}, data), { ephemeral: true });
        }),
        length: () => __awaiter(void 0, void 0, void 0, function* () {
            const E = yield module_1.module.data.keys();
            const EPP = module_1.module.config.get("entriesPerPage");
            let pages = ~~(E.length / Number(EPP));
            if (E.length % Number(EPP) != 0)
                pages += 1;
            return pages;
        }),
        height: () => __awaiter(void 0, void 0, void 0, function* () {
            const keys = yield module_1.module.data.keys();
            const entriesPerPage = module_1.module.config.get("entriesPerPage");
            const elements = keys.slice((book.page - 1) * entriesPerPage, (book.page - 1) * entriesPerPage + entriesPerPage);
            return elements.length;
        }),
        interaction,
    });
    yield book.fix();
    yield book.write();
    const collector = new codecord_2.Collector(interaction);
    collector.listen({
        "ticket.up": () => __awaiter(void 0, void 0, void 0, function* () { return yield book.lookParagraph(-1); }),
        "ticket.down": () => __awaiter(void 0, void 0, void 0, function* () { return yield book.lookParagraph(1); }),
        "ticket.left": () => __awaiter(void 0, void 0, void 0, function* () { return yield book.previous(); }),
        "ticket.right": () => __awaiter(void 0, void 0, void 0, function* () { return yield book.next(); }),
        "ticket.dataCreate": (m) => __awaiter(void 0, void 0, void 0, function* () {
            const datakeys = yield module_1.module.data.keys();
            const submitted = yield collector.modalSubmission(m, {
                inputs: [
                    {
                        customId: "input",
                        label: "Id del ticket",
                        style: discord_js_1.TextInputStyle.Short,
                    },
                ],
            });
            if (!submitted)
                return;
            const input = submitted.values.input, ticketId = yield codecord_1.id.createUnique(datakeys, input);
            yield module_1.module.data.set(`${ticketId}`, {
                label: "Nuevo ticket",
                emoji: null,
                description: null,
                parent: null,
                message_onCreate: null,
                message_onDelete: null,
                support: null,
                questions: [],
                feedbackChannel: null,
                dmTranscript: false,
                number: 0,
            });
            yield submitted.response.deferUpdate({});
            // send changes
            yield book.fix();
            yield book.write();
        }),
        "ticket.dataDelete": (m) => __awaiter(void 0, void 0, void 0, function* () {
            const EPP = Number(module_1.module.config.get("entriesPerPage")), ticketIndex = (book.page - 1) * Number(EPP) + (book.paragraph - 1), ticketKeys = yield module_1.module.data.keys(), ticketId = ticketKeys[ticketIndex];
            if (confirmDelete && ticketId) {
                module_1.module.data.delete(ticketId);
                const bookLength = yield book.getLength();
                if (book.page >= bookLength)
                    book.page = bookLength;
                book.paragraph = 1;
                confirmDelete = false;
            }
            else {
                confirmDelete = true;
                setTimeout(() => {
                    confirmDelete = false;
                }, 5000);
            }
            // send changes
            yield book.fix();
            yield book.write();
        }),
        // select menu interaction to edit a ticket property
        "ticket.editMenu": (i) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, menu_1.default)({ book, collector, i });
            // send changes
            yield book.write();
        }),
        default: (i) => __awaiter(void 0, void 0, void 0, function* () {
            if (!i.replied)
                yield i.deferUpdate({});
        }),
    });
});
//# sourceMappingURL=main.js.map
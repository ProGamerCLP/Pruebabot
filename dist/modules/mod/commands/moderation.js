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
const embeds_1 = require("../djs/embeds");
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("moderation")
        .setDescription("Moderation")
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.Administrator)
        .addSubcommand((subcommand) => subcommand
        .setName("manager")
        .setDescription("Administrar sistema de moderación")),
    execute(cmd) {
        return __awaiter(this, void 0, void 0, function* () {
            return cmd.reply({
                content: "`💻 La interfaz de configuración está aún en desarollo!`",
            });
            if (!cmd.guild || !cmd.channel)
                return;
            const MI = new embeds_1.ModerationInterface(cmd);
            const book = new codecord_1.Book({
                render() {
                    return __awaiter(this, void 0, void 0, function* () {
                        const e = {
                            content: "Ha ocurrido un error.",
                        };
                        if (!cmd.guild)
                            return e;
                        const ui = yield MI.render(book);
                        if (!ui)
                            return e;
                        return ui;
                    });
                },
                length: () => __awaiter(this, void 0, void 0, function* () {
                    const pages = MI.pages();
                    return pages.length;
                }),
            });
            yield book.write();
            const c = new codecord_1.Collector(cmd);
            const { next, previous } = book;
            c.listen({
                // left and right buttons
                next,
                previous,
                // up and down buttons
                up: () => __awaiter(this, void 0, void 0, function* () { return yield book.lookParagraph(-1); }),
                down: () => __awaiter(this, void 0, void 0, function* () { return yield book.lookParagraph(1); }),
                main_menu(i) {
                    return __awaiter(this, void 0, void 0, function* () { });
                },
                spam_button(i) {
                    return __awaiter(this, void 0, void 0, function* () { });
                },
                malware_button(i) {
                    return __awaiter(this, void 0, void 0, function* () { });
                },
                inside_buttonDisable(i) {
                    return __awaiter(this, void 0, void 0, function* () { });
                },
                inside_buttonAlarm(i) {
                    return __awaiter(this, void 0, void 0, function* () { });
                },
                backup_button(i) {
                    return __awaiter(this, void 0, void 0, function* () { });
                },
                // buttons to disable or enable some funtionalities
                enable(i) {
                    return __awaiter(this, void 0, void 0, function* () { });
                },
                disable(i) {
                    return __awaiter(this, void 0, void 0, function* () { });
                },
            });
        });
    },
};
//# sourceMappingURL=moderation.js.map
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
const PASSWORD = process.env.adminPassword;
function auth(interaction, collector) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!PASSWORD)
            return;
        // provide the password
        const submitted = yield collector.modalSubmission(interaction, {
            inputs: [
                {
                    style: 2,
                    label: "Introduce la contraseña",
                    customId: "password",
                },
            ],
        });
        if (!submitted)
            return;
        yield submitted.response.deferUpdate({});
        const auth = yield codecord_1.password.verify(submitted.values.password, PASSWORD);
        return auth;
    });
}
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("admin")
        .setDescription("Admin bot manager")
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.Administrator),
    execute: (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        if (!interaction.guild)
            return;
        yield interaction.deferReply({
            ephemeral: true,
        });
        const collector = new codecord_1.Collector(interaction);
        // provide password
        if (PASSWORD) {
            const valid = yield auth(interaction, collector);
            if (!valid)
                return yield interaction.editReply("Invalid password.");
        }
    }),
};
//# sourceMappingURL=admin.js.map
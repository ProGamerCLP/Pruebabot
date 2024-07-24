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
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("ticket")
        .setDescription("📩 - Ticket manager")
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.Administrator)
        .addSubcommand((subcommand) => subcommand
        .setName("panel")
        .setDescription("📩 - Crear nuevo panel de tickts.")
        .addStringOption((option) => option
        .setName("message_id")
        .setDescription("Contenido del panel de tickets. (id de mensaje)")
        .setRequired(true))
        .addStringOption((option) => option
        .setName("ticket")
        .setDescription("Separar por comas. Ejemplo: 1, 4, 3, 2")
        .setRequired(true)))
        .addSubcommand((subcommand) => subcommand.setName("manager").setDescription("📩 - Ver y editar tickets")),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const subcommand = interaction.options.getSubcommand();
            const ctx = require(`./${subcommand}/main`).default;
            ctx(interaction);
        });
    },
};
//# sourceMappingURL=ticket.js.map
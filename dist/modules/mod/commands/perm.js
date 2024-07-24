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
const module_1 = require("../module");
const branding_1 = require("../../../utils/api/functions/branding");
const choices = [
    {
        name: "Mencionar @everyone y @here",
        value: "mentions",
    },
    {
        name: "Banear sin revisión",
        value: "massBan",
    },
    {
        name: "Kickear sin revisión",
        value: "massKick",
    },
    {
        name: "Enviar direcciones IP por chat público",
        value: "ip",
    },
    {
        name: "Crear canales sin criterio",
        value: "channelCreate",
    },
    {
        name: "Eliminar canales sin criterio",
        value: "channelDelete",
    },
    {
        name: "Enviar palabras baneadas",
        value: "badword",
    },
    {
        name: "Enviar invitaciones de otros servidores",
        value: "invite",
    },
    {
        name: "Mandar archivos sospechosos",
        value: "suspiciousFile",
    },
    {
        name: "Permitir flood",
        value: "flood",
    },
];
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("perm")
        .setDescription("Añadir o retirar un permiso a un usuario")
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.Administrator)
        .addUserOption((o) => o
        .setName("usuario")
        .setDescription("Usuario al que añadir el permiso")
        .setRequired(true))
        .addStringOption((o) => o
        .setName("permiso")
        .setDescription("Permiso que añadir o retirar")
        .addChoices(choices)
        .setRequired(true)),
    execute(cmd) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!cmd.guild)
                return;
            const user = cmd.options.getUser("usuario"), permission = cmd.options.getString("permiso"), branding = yield (0, branding_1.getBranding)(cmd.guild);
            const ps = choices.find((x) => x.value === permission);
            if (!user || !permission)
                return;
            let whitelist = yield module_1.mod.data.get(permission), description;
            if (!whitelist)
                whitelist = [];
            if (whitelist.includes(user.id)) {
                whitelist = whitelist.filter((u) => u !== user.id);
                description = `❌ <@${user.id}> ya no puede **${ps === null || ps === void 0 ? void 0 : ps.name.toLowerCase()}**`;
            }
            else {
                whitelist.push(user.id);
                description = `✅ <@${user.id}> ahora puede **${ps === null || ps === void 0 ? void 0 : ps.name.toLowerCase()}**`;
            }
            yield module_1.mod.data.set(permission, whitelist);
            yield cmd.reply({
                ephemeral: true,
                embeds: [
                    {
                        author: {
                            icon_url: branding === null || branding === void 0 ? void 0 : branding.icon,
                            name: cmd.guild.name + " moderation",
                        },
                        title: "Permisos actualizados",
                        description,
                        fields: [
                            {
                                name: "Lista de usuarios con este permiso",
                                value: `${whitelist.length > 0
                                    ? whitelist.map((id) => `<@${id}>`)
                                    : "No hay usuarios con este permiso"}`,
                            },
                        ],
                        color: (branding === null || branding === void 0 ? void 0 : branding.color.pattern) || 0xffffff,
                    },
                ],
            });
        });
    },
};
//# sourceMappingURL=perm.js.map
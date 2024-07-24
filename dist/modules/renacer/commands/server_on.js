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
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
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
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("server_on")
        .setDescription("Avisar de que el servidor esta activo")
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.Administrator),
    execute: (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        yield interaction.reply({
            content: "Mensaje enviado!",
            ephemeral: true,
        });
        yield ((_a = interaction.channel) === null || _a === void 0 ? void 0 : _a.send({
            embeds: [
                new builders_1.EmbedBuilder()
                    .setTitle("¡Server ON!")
                    .setDescription("Nuestro servidor ha terminado de reiniciarse, actualmente ya se vuelve a encontrar **en línea!**")
                    .setThumbnail("https://images-ext-1.discordapp.net/external/XsYSa0hMpXcqBwQnet-6LeL3WMUgX7yWqdvwoaFKUfY/https/i.postimg.cc/mkLwk33C/LOGO-SIN-FONDO-CON-SOMBRA.png?format=webp&quality=lossless&width=80&height=74")
                    .setImage("https://images-ext-1.discordapp.net/external/l13gGJikwW2vcs3a_IqYKUBT5ZJlPMC6IXxOPbOSuxI/https/i.postimg.cc/hG3MTzx6/SERVER-ON.gif")
                    .setColor(0xffffff)
                    .setFooter({
                    text: "Powered by el Renacer",
                    iconURL: "https://images-ext-1.discordapp.net/external/XsYSa0hMpXcqBwQnet-6LeL3WMUgX7yWqdvwoaFKUfY/https/i.postimg.cc/mkLwk33C/LOGO-SIN-FONDO-CON-SOMBRA.png?format=webp&quality=lossless&width=80&height=74",
                }),
            ],
        }));
    }),newCommand: {
        data: new discord_js_1.SlashCommandBuilder()
            .setName("aficha")
            .setDescription("Aprueba la ficha de un usuario")
            .addStringOption(option =>
                option.setName("usuario")
                    .setDescription("El nombre del usuario")
                    .setRequired(true)),
        execute: (interaction) => __awaiter(void 0, void 0, void 0, function* () {
            const usuario = interaction.options.getString('usuario');
            yield interaction.reply({
                content: `¡${usuario}, tu ficha ha sido aprobada! Ahora tienes WL de Oro`,
                ephemeral: true,
            });
        }),
    }
};
//# sourceMappingURL=server_on.js.map

// Exportamos módulo
module.exports = {
    data: new SlashCommandBuilder()
    .setName('a')
    .addUserOption( o => o.setName('usuario')),
    
    // inicia la interacción 
    async execute (interaction) {
    // Constante del usuario seleccionado 
    const user = interaction.options.getUser('usuario')
    
    // Mandar mensaje
    await interaction.reply({content: ` ${user} ha sido aprobado por ${interaction.user}` })
    }
    }
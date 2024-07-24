"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buttonActionRow = exports.menuActionRow = void 0;
const discord_js_1 = require("discord.js");
const options = [
    new discord_js_1.StringSelectMenuOptionBuilder()
        .setLabel("Título")
        .setDescription("Encabezado del mensaje")
        .setValue("title"),
    new discord_js_1.StringSelectMenuOptionBuilder()
        .setLabel("Descripción")
        .setDescription("Descripción del mensaje")
        .setValue("description"),
    new discord_js_1.StringSelectMenuOptionBuilder()
        .setLabel("Autor del mensaje")
        .setDescription("Se encuentra encima del título")
        .setValue("author"),
    new discord_js_1.StringSelectMenuOptionBuilder()
        .setLabel("Imagen")
        .setDescription("URL de la imagen del mensaje")
        .setValue("image"),
    new discord_js_1.StringSelectMenuOptionBuilder()
        .setLabel("Miniatura")
        .setDescription("URL de la miniatura del mensaje")
        .setValue("thumbnail"),
    new discord_js_1.StringSelectMenuOptionBuilder()
        .setLabel("Pie de página")
        .setDescription("Propiedades del pié de página")
        .setValue("footer"),
    new discord_js_1.StringSelectMenuOptionBuilder()
        .setLabel("Color")
        .setDescription("Color del mensaje")
        .setValue("color"),
    new discord_js_1.StringSelectMenuOptionBuilder()
        .setLabel("Agregar campo")
        .setDescription("Agregar un campo adicional al mensaje")
        .setValue("fieldAdd"),
    new discord_js_1.StringSelectMenuOptionBuilder()
        .setLabel("Eliminar campo")
        .setDescription("Eliminar un campo del mensaje")
        .setValue("fieldRemove"),
    new discord_js_1.StringSelectMenuOptionBuilder()
        .setLabel("Contenido")
        .setDescription("Mensaje fuera del embed")
        .setValue("content"),
];
const menu = new discord_js_1.StringSelectMenuBuilder()
    .setCustomId("embedFieldSelect")
    .setPlaceholder("⚙️ Personalizar mensaje embed.")
    .setMaxValues(1)
    .setMinValues(1)
    .setOptions(options);
const menuActionRow = new discord_js_1.ActionRowBuilder().addComponents(menu);
exports.menuActionRow = menuActionRow;
const sendButton = new discord_js_1.ButtonBuilder()
    .setCustomId("send")
    .setLabel("Enviar")
    .setStyle(discord_js_1.ButtonStyle.Primary);
const logButton = new discord_js_1.ButtonBuilder()
    .setCustomId("logs")
    .setLabel("📑")
    .setStyle(discord_js_1.ButtonStyle.Secondary);
const loadButton = new discord_js_1.ButtonBuilder()
    .setCustomId("load")
    .setLabel("Cargar")
    .setStyle(discord_js_1.ButtonStyle.Secondary);
const saveButton = new discord_js_1.ButtonBuilder()
    .setCustomId("save")
    .setLabel("Guardar")
    .setStyle(discord_js_1.ButtonStyle.Secondary);
const buttonActionRow = new discord_js_1.ActionRowBuilder().addComponents(sendButton, loadButton, saveButton, logButton);
exports.buttonActionRow = buttonActionRow;
//# sourceMappingURL=components.js.map
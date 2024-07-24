"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const title = new discord_js_1.TextInputBuilder()
    .setCustomId("title")
    .setMaxLength(256)
    .setStyle(discord_js_1.TextInputStyle.Short)
    .setLabel("Título");
const description = new discord_js_1.TextInputBuilder()
    .setCustomId("description")
    .setMaxLength(4000)
    .setStyle(discord_js_1.TextInputStyle.Paragraph)
    .setLabel("Descripción");
const image = new discord_js_1.TextInputBuilder()
    .setCustomId("image")
    .setMaxLength(256)
    .setStyle(discord_js_1.TextInputStyle.Short)
    .setLabel("Imagen");
const thumbnail = new discord_js_1.TextInputBuilder()
    .setCustomId("thumbnail")
    .setMaxLength(256)
    .setStyle(discord_js_1.TextInputStyle.Short)
    .setLabel("Portada");
const color = new discord_js_1.TextInputBuilder()
    .setCustomId("color")
    .setMaxLength(7)
    .setStyle(discord_js_1.TextInputStyle.Short)
    .setRequired(true)
    .setLabel("Color");
const fieldAdd = [
    new discord_js_1.TextInputBuilder()
        .setCustomId("name")
        .setMaxLength(256)
        .setStyle(discord_js_1.TextInputStyle.Short)
        .setMinLength(1)
        .setRequired(true)
        .setLabel("Encabezado"),
    new discord_js_1.TextInputBuilder()
        .setCustomId("value")
        .setMaxLength(1024)
        .setMinLength(1)
        .setStyle(discord_js_1.TextInputStyle.Paragraph)
        .setRequired(true)
        .setLabel("Cuerpo"),
    new discord_js_1.TextInputBuilder()
        .setCustomId("inline")
        .setMaxLength(5)
        .setStyle(discord_js_1.TextInputStyle.Short)
        .setRequired(true)
        .setLabel("Alinear (true/false)"),
];
const fieldRemove = new discord_js_1.TextInputBuilder()
    .setCustomId("removeFieldIndex")
    .setRequired(true)
    .setMaxLength(256)
    .setStyle(discord_js_1.TextInputStyle.Short)
    .setLabel("Título del campo");
const author = [
    new discord_js_1.TextInputBuilder()
        .setCustomId("authorName")
        .setRequired(true)
        .setMaxLength(256)
        .setStyle(discord_js_1.TextInputStyle.Short)
        .setLabel("Nombre del autor"),
    new discord_js_1.TextInputBuilder()
        .setCustomId("authorUrl")
        .setMaxLength(256)
        .setStyle(discord_js_1.TextInputStyle.Short)
        .setLabel("Icono del autor"),
];
const footer = [
    new discord_js_1.TextInputBuilder()
        .setCustomId("footerText")
        .setMaxLength(256)
        .setRequired(true)
        .setStyle(discord_js_1.TextInputStyle.Short)
        .setLabel("Texto de pié de página"),
    new discord_js_1.TextInputBuilder()
        .setCustomId("footerIcon")
        .setMaxLength(256)
        .setStyle(discord_js_1.TextInputStyle.Short)
        .setLabel("Icono de pié de página"),
];
const save = [
    new discord_js_1.TextInputBuilder()
        .setCustomId("saveName")
        .setRequired(true)
        .setMaxLength(256)
        .setStyle(discord_js_1.TextInputStyle.Short)
        .setLabel("Nombre del embed"),
];
const load = [
    new discord_js_1.TextInputBuilder()
        .setCustomId("loadName")
        .setRequired(true)
        .setMaxLength(256)
        .setStyle(discord_js_1.TextInputStyle.Short)
        .setLabel("Nombre del embed"),
];
const content = [
    new discord_js_1.TextInputBuilder()
        .setCustomId("content")
        .setRequired(true)
        .setMaxLength(2000)
        .setStyle(discord_js_1.TextInputStyle.Paragraph)
        .setLabel("Contenido del mensaje"),
];
const inputs = {
    title,
    description,
    image,
    thumbnail,
    author,
    footer,
    color,
    fieldAdd,
    fieldRemove,
    save,
    load,
    content,
};
exports.default = inputs;
//# sourceMappingURL=inputs.js.map
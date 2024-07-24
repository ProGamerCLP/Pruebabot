"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputs = void 0;
const discord_js_1 = require("discord.js");
const avatar_cords = [
    new discord_js_1.TextInputBuilder()
        .setCustomId("avatar_x")
        .setLabel("Coordenada x del avatar")
        .setStyle(discord_js_1.TextInputStyle.Short)
        .setMaxLength(4)
        .setRequired(true)
        .setPlaceholder("Añadir número"),
    new discord_js_1.TextInputBuilder()
        .setCustomId("avatar_y")
        .setLabel("Coordenada y del avatar")
        .setStyle(discord_js_1.TextInputStyle.Short)
        .setMaxLength(4)
        .setRequired(true)
        .setPlaceholder("Añadir número"),
];
const text_cords = [
    new discord_js_1.TextInputBuilder()
        .setCustomId("text_x")
        .setLabel("Coordenada x del texto")
        .setStyle(discord_js_1.TextInputStyle.Short)
        .setMaxLength(4)
        .setRequired(true)
        .setPlaceholder("Añadir número"),
    new discord_js_1.TextInputBuilder()
        .setCustomId("text_y")
        .setLabel("Coordenada y del texto")
        .setStyle(discord_js_1.TextInputStyle.Short)
        .setMaxLength(4)
        .setRequired(true)
        .setPlaceholder("Añadir número"),
];
const avatar_size = [
    new discord_js_1.TextInputBuilder()
        .setCustomId("avatar_size")
        .setLabel("Tamaño del avatar")
        .setStyle(discord_js_1.TextInputStyle.Short)
        .setMaxLength(4)
        .setRequired(true)
        .setPlaceholder("Añadir número"),
];
const background = [
    new discord_js_1.TextInputBuilder()
        .setCustomId("background")
        .setLabel("Fondo de imagen")
        .setStyle(discord_js_1.TextInputStyle.Short)
        .setRequired(true)
        .setPlaceholder("Especificar url"),
];
const text = [
    new discord_js_1.TextInputBuilder()
        .setCustomId("text")
        .setLabel("Texto")
        .setStyle(discord_js_1.TextInputStyle.Short)
        .setRequired(true)
        .setMaxLength(20)
        .setPlaceholder("Escribir texto"),
];
const channelId = [
    new discord_js_1.TextInputBuilder()
        .setCustomId("channelId")
        .setLabel("Canal de bienvenida (id)")
        .setStyle(discord_js_1.TextInputStyle.Short)
        .setRequired(true)
        .setMaxLength(20),
];
const message_public = [
    new discord_js_1.TextInputBuilder()
        .setCustomId("messageId")
        .setLabel("Mensaje público (id)")
        .setStyle(discord_js_1.TextInputStyle.Short)
        .setRequired(true)
        .setMaxLength(20),
];
const message_private = [
    new discord_js_1.TextInputBuilder()
        .setCustomId("messageId")
        .setLabel("Mensaje al dm (id)")
        .setStyle(discord_js_1.TextInputStyle.Short)
        .setRequired(true)
        .setMaxLength(20),
];
exports.inputs = {
    text,
    text_cords,
    avatar_cords,
    avatar_size,
    background,
    channelId,
    message_public,
    message_private,
};
//# sourceMappingURL=input.js.map
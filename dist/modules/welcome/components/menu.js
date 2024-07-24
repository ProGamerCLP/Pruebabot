"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.welcomeImageCommandComponents = void 0;
const discord_js_1 = require("discord.js");
const welcomeImageCommandSelectMenu = new discord_js_1.StringSelectMenuBuilder()
    .setCustomId("welcomeImageSelectMenu")
    .setPlaceholder("🖼️ Configurar imagen de bienvenida")
    .setMaxValues(1)
    .setMinValues(1)
    .setOptions([
    new discord_js_1.StringSelectMenuOptionBuilder()
        .setLabel("Mensaje público")
        .setEmoji("💬")
        .setDescription("Copiar Id de otro mensaje")
        .setValue("message_public"),
    new discord_js_1.StringSelectMenuOptionBuilder()
        .setLabel("Mensaje privado")
        .setEmoji("🔏")
        .setDescription("Copiar Id de otro mensaje")
        .setValue("message_private"),
    new discord_js_1.StringSelectMenuOptionBuilder()
        .setLabel("Canal de bienvenidas")
        .setEmoji("📨")
        .setDescription("A que canal se enviarán las bienvenidas")
        .setValue("channelId"),
    new discord_js_1.StringSelectMenuOptionBuilder()
        .setLabel("Posición del avatar")
        .setEmoji("👤")
        .setDescription("Cordenada x / y")
        .setValue("avatar_cords"),
    new discord_js_1.StringSelectMenuOptionBuilder()
        .setLabel("Tamaño del avatar")
        .setEmoji("↕️")
        .setDescription("Radio del avatar. (1000max)")
        .setValue("avatar_size"),
    new discord_js_1.StringSelectMenuOptionBuilder()
        .setLabel("Fondo")
        .setEmoji("🖼️")
        .setDescription("Url de la imagen de fondo")
        .setValue("background"),
    new discord_js_1.StringSelectMenuOptionBuilder()
        .setLabel("Texto")
        .setEmoji("💭")
        .setDescription("Texto inferior al nombre del usuario.")
        .setValue("text"),
    new discord_js_1.StringSelectMenuOptionBuilder()
        .setLabel("Posición del texto")
        .setEmoji("💭")
        .setDescription("Cordenadas del nombre y texto de la imagen")
        .setValue("text_cords"),
    new discord_js_1.StringSelectMenuOptionBuilder()
        .setLabel("Testear sistema")
        .setEmoji("💻")
        .setDescription("Simular una bienvenida")
        .setValue("test"),
]);
const welcomeImageCommandComponents = new discord_js_1.ActionRowBuilder().setComponents(welcomeImageCommandSelectMenu);
exports.welcomeImageCommandComponents = welcomeImageCommandComponents;
///
//
//# sourceMappingURL=menu.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectMenu = exports.ticketManagerComponents = exports.transcriptButton = exports.closeButton = void 0;
const discord_js_1 = require("discord.js");
const module_1 = require("../../module");
const cfg = module_1.module.config.get();
///////////// Buttons /////////////
const blank = new discord_js_1.ButtonBuilder()
    .setCustomId("ticket.blank")
    .setLabel("ㅤ")
    .setStyle(discord_js_1.ButtonStyle.Secondary);
const blank2 = new discord_js_1.ButtonBuilder()
    .setCustomId("ticket.blank2")
    .setLabel("ㅤ")
    .setStyle(discord_js_1.ButtonStyle.Secondary);
const up = new discord_js_1.ButtonBuilder()
    .setCustomId("ticket.up")
    .setLabel("⮝")
    .setStyle(discord_js_1.ButtonStyle.Secondary);
const down = new discord_js_1.ButtonBuilder()
    .setCustomId("ticket.down")
    .setLabel("⮟")
    .setStyle(discord_js_1.ButtonStyle.Secondary);
const left = new discord_js_1.ButtonBuilder()
    .setCustomId("ticket.left")
    .setLabel("⮜")
    .setStyle(discord_js_1.ButtonStyle.Secondary);
const right = new discord_js_1.ButtonBuilder()
    .setCustomId("ticket.right")
    .setLabel("⮞")
    .setStyle(discord_js_1.ButtonStyle.Secondary);
const create = new discord_js_1.ButtonBuilder()
    .setCustomId("ticket.dataCreate")
    .setLabel("🞦")
    .setStyle(discord_js_1.ButtonStyle.Success);
const deleteButton = new discord_js_1.ButtonBuilder()
    .setCustomId("ticket.dataDelete")
    .setLabel("𝝬")
    .setStyle(discord_js_1.ButtonStyle.Danger);
const closeButton = new discord_js_1.ButtonBuilder()
    .setCustomId("ticketClose")
    .setLabel(cfg.closeButtonLabel || "Cerrar ticket")
    .setEmoji(cfg.closeButtonEmoji || "🔒")
    .setStyle(Number(cfg.closeButtonStyle || 1));
exports.closeButton = closeButton;
const transcriptButton = new discord_js_1.ButtonBuilder()
    .setCustomId("ticketTranscript")
    .setLabel(cfg.transcriptButtonEmoji || "📋")
    .setStyle(Number(cfg.transcriptButtonStyle || 1));
exports.transcriptButton = transcriptButton;
///////////// Menus /////////////
const selectMenu = new discord_js_1.StringSelectMenuBuilder()
    .setCustomId("ticket.editMenu")
    .setMaxValues(1)
    .setPlaceholder("> Selecciona para editar este ticket")
    .setOptions(new discord_js_1.StringSelectMenuOptionBuilder()
    .setLabel("Titulo")
    .setValue("label")
    .setEmoji("🔸")
    .setDescription("Nombre del ticket, ej: Soporte, Reporte, Donaciones..."), new discord_js_1.StringSelectMenuOptionBuilder()
    .setLabel("Descripción")
    .setValue("description")
    .setEmoji("🔸")
    .setDescription("Descripción del ticket"), new discord_js_1.StringSelectMenuOptionBuilder()
    .setLabel("Emoji")
    .setValue("emoji")
    .setEmoji("🔸")
    .setDescription("Emoji identificador del ticket: 📈,📖... (personalizados también)"), new discord_js_1.StringSelectMenuOptionBuilder()
    .setLabel("Categoría")
    .setValue("parent")
    .setEmoji("🔸")
    .setDescription("Id de la categoría en la que se abriran estos tickets."), new discord_js_1.StringSelectMenuOptionBuilder()
    .setLabel("Canal de transcripts")
    .setValue("transcriptChannel")
    .setEmoji("🔸")
    .setDescription("(id de canal) A donde se enviarán los transcripts de éste ticket."), new discord_js_1.StringSelectMenuOptionBuilder()
    .setLabel("Mensaje de Apertura")
    .setValue("message_onCreate")
    .setEmoji("🔸")
    .setDescription("(ID DE MENSAJE!) Copiar contenido de mensaje y pegarlo en la apertura."), new discord_js_1.StringSelectMenuOptionBuilder()
    .setLabel("Mensaje de Cierre")
    .setValue("message_onDelete")
    .setEmoji("🔸")
    .setDescription("(ID DE MENSAJE!) Copiar contenido de mensaje y pegarlo en el cierre (md)."), new discord_js_1.StringSelectMenuOptionBuilder()
    .setLabel("Rol de Soporte")
    .setValue("support")
    .setEmoji("🔸")
    .setDescription("Id de rol de soporte"), new discord_js_1.StringSelectMenuOptionBuilder()
    .setLabel("Añadir pregunta")
    .setValue("addQuestion")
    .setEmoji("🔸")
    .setDescription("Añadir una pregunta al abrir el ticket"), new discord_js_1.StringSelectMenuOptionBuilder()
    .setLabel("Eliminar pregunta")
    .setValue("rmQuestion")
    .setEmoji("🔸")
    .setDescription("Eliminar pregunta al abrir ticket"), new discord_js_1.StringSelectMenuOptionBuilder()
    .setLabel("Mandar transcript al dm")
    .setValue("dmTranscript")
    .setEmoji("🔸"));
exports.selectMenu = selectMenu;
const ticketManagerComponents = () => [
    new discord_js_1.ActionRowBuilder().addComponents(blank, up, blank2, create),
    new discord_js_1.ActionRowBuilder().addComponents(left, down, right, deleteButton),
    new discord_js_1.ActionRowBuilder().addComponents(selectMenu),
];
exports.ticketManagerComponents = ticketManagerComponents;
//# sourceMappingURL=components.js.map
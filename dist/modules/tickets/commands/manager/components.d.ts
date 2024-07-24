import { ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder } from "discord.js";
declare const closeButton: ButtonBuilder;
declare const transcriptButton: ButtonBuilder;
declare const selectMenu: StringSelectMenuBuilder;
declare const ticketManagerComponents: () => (ActionRowBuilder<StringSelectMenuBuilder> | ActionRowBuilder<ButtonBuilder>)[];
export { closeButton, transcriptButton, ticketManagerComponents, selectMenu };

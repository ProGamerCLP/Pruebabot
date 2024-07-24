import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
declare const _default: {
    data: SlashCommandBuilder;
    /**
     * Creates a configuration interface to create a embed
     * @param interaction
     * @returns
     */
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
};
export default _default;

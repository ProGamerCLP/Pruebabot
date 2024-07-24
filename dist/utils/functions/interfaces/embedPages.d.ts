import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ChatInputCommandInteraction, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuInteraction } from "discord.js";
interface PageData {
    embeds: EmbedBuilder[];
    components: ActionRowBuilder<ButtonBuilder | StringSelectMenuBuilder>[];
    ephemeral?: boolean;
    content?: string;
}
type RenderFunction = () => Promise<PageData>;
declare class ResponsiveEmbed {
    x: number;
    y: number;
    render: RenderFunction;
    interaction?: ChatInputCommandInteraction | ButtonInteraction | StringSelectMenuInteraction;
    constructor(render: RenderFunction, interaction?: ChatInputCommandInteraction | ButtonInteraction | StringSelectMenuInteraction);
    navigate(n: {
        x?: number;
        y?: number;
    }): void;
    update(): Promise<void>;
    setCollector(functions: {
        [key: string]: Function;
    }): void;
}
export default ResponsiveEmbed;

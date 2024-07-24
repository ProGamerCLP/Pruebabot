import { ChatInputCommandInteraction, EmbedBuilder, Guild } from "discord.js";
import { Book } from "../../../utils/api/codecord";
import { Cfg } from "../config/types";
declare class ModerationInterface {
    config: Cfg;
    cmd: ChatInputCommandInteraction;
    constructor(cmd: ChatInputCommandInteraction);
    updateConfig(): void;
    pages(): string[];
    render(book: Book): Promise<{
        content: string;
        components: never[];
        embeds?: undefined;
    } | {
        embeds: EmbedBuilder[];
        content?: undefined;
        components?: undefined;
    } | {
        embeds: {
            description: string;
        }[];
    } | undefined>;
    main(): Promise<{
        content: string;
        components: never[];
        embeds?: undefined;
    } | {
        embeds: EmbedBuilder[];
        content?: undefined;
        components?: undefined;
    }>;
    spam(): Promise<{
        content: string;
        components: never[];
        embeds?: undefined;
    } | {
        embeds: EmbedBuilder[];
        content?: undefined;
        components?: undefined;
    }>;
    malware(): Promise<{
        content: string;
        components: never[];
        embeds?: undefined;
    } | {
        embeds: EmbedBuilder[];
        content?: undefined;
        components?: undefined;
    }>;
    inside(): Promise<{
        content: string;
        components: never[];
        embeds?: undefined;
    } | {
        embeds: EmbedBuilder[];
        content?: undefined;
        components?: undefined;
    }>;
    backup(): Promise<{
        content: string;
        components: never[];
        embeds?: undefined;
    } | {
        embeds: EmbedBuilder[];
        content?: undefined;
        components?: undefined;
    }>;
}
declare const warnEmbed: (guild: Guild, reason: string) => Promise<EmbedBuilder>;
export { ModerationInterface, warnEmbed };

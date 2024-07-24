import { EmbedBuilder, Guild } from "discord.js";
import { Book } from "../../../../utils/api/codecord";
export declare function messageInterface(book: Book, guild: Guild): Promise<{
    content: undefined;
    embeds: EmbedBuilder[];
    components: (import("discord.js").ActionRowBuilder<import("discord.js").StringSelectMenuBuilder> | import("discord.js").ActionRowBuilder<import("discord.js").ButtonBuilder>)[];
}>;

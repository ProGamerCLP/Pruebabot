import { StringSelectMenuInteraction } from "discord.js";
import { Book, Collector } from "../../../../utils/api/codecord";
declare const _default: ({ book, collector, i, }: {
    book: Book;
    collector: Collector;
    i: StringSelectMenuInteraction;
}) => Promise<import("discord.js").InteractionResponse<boolean> | undefined>;
export default _default;

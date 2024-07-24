import { ChatInputCommandInteraction, MessageComponentInteraction, MessagePayload, MessageReplyOptions } from "discord.js";
type MDATA = MessagePayload | MessageReplyOptions;
type BookInteraction = ChatInputCommandInteraction | MessageComponentInteraction;
type BookLength = number | {
    (): number | Promise<number>;
};
type RenderFunction = {
    (): Promise<MDATA>;
};
declare class Book {
    render: RenderFunction;
    interaction?: BookInteraction;
    page: number;
    length: BookLength;
    paragraph: number;
    height: BookLength;
    constructor(c: {
        render: RenderFunction;
        length: BookLength;
        interaction?: BookInteraction;
        page?: number;
        paragraph?: number;
        height?: BookLength;
    });
    getLength(): Promise<number>;
    getPageHeight(): Promise<number | undefined>;
    fix(): Promise<void>;
    navError(): Promise<void>;
    next(): Promise<void>;
    previous(): Promise<void>;
    lookParagraph(n: number): Promise<void>;
    write(): Promise<void>;
}
/**
 * @example
    const book = new Book({
    render: async () => {
        return new EmbedBuilder();
    },
    length: 5,
        });
 */
export default Book;

import { ChatInputCommandInteraction } from "discord.js";
declare function createFor(interaction: ChatInputCommandInteraction, listener: {
    collect: Function;
    end: Function;
}, time?: number): Promise<void>;
export { createFor };

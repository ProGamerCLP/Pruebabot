import { Message } from "discord.js";
declare function main(m: Message): {
    interval: number;
    chain: number;
    message: string;
} | undefined;
export default main;

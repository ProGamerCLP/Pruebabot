import { Message } from "discord.js";
declare const main: ({ content: str }: Message) => RegExpMatchArray | null;
export default main;

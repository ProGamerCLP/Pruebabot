import { Message } from "discord.js";
declare function main({ guild, content: str }: Message): Promise<string | false | undefined>;
export default main;

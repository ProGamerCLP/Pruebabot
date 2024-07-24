/// <reference types="node" />
import { GuildMember } from "discord.js";
declare function generateImage(member: GuildMember): Promise<Buffer>;
export { generateImage };

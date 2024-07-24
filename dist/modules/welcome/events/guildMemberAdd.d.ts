import { GuildMember } from "discord.js";
/**
 * Every time a new user joins the guild, the invite cache is updated and messages are sent to the dm & public welcome channel.
 * @param {GuildMember} member
 * @void
 */
declare const _default: (member: GuildMember) => Promise<void>;
export default _default;

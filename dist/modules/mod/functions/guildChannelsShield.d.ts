import { Guild, GuildAuditLogsEntry } from "discord.js";
declare function main(guild: Guild, { executorId, executor, target, actionType }: GuildAuditLogsEntry): Promise<void>;
export default main;

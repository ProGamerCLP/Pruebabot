import { AuditLogEvent, Guild } from "discord.js";
declare function last(guild: Guild, options: {
    user?: string;
    type: AuditLogEvent;
}): Promise<import("discord.js").GuildAuditLogsEntry<AuditLogEvent, import("discord.js").GuildAuditLogsActionType, import("discord.js").GuildAuditLogsTargetType, AuditLogEvent> | null | undefined>;
export declare const logs: {
    last: typeof last;
};
export {};

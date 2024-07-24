import { ChannelManager, GuildChannelManager, GuildManager, GuildMemberManager, GuildMessageManager, RoleManager } from "discord.js";
type Manager = GuildChannelManager | GuildMemberManager | GuildMessageManager | ChannelManager | GuildManager | RoleManager | GuildMessageManager;
declare function test(str: string): boolean;
declare function fetch(manager: Manager, snowflakeId: string | null | undefined): Promise<import("discord.js").Guild | import("discord.js").Channel | import("discord.js").GuildMember | import("discord.js").Role | import("discord.js").Message<true> | null | undefined>;
export declare const snowflake: {
    test: typeof test;
    fetch: typeof fetch;
};
export {};

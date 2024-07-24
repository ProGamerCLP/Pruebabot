import { Client, Guild, Invite } from "discord.js";
declare function updateCache(client: Client): Promise<void>;
declare function getLastUsed(guild: Guild): Promise<void | Invite>;
export declare const invites: {
    getLastUsed: typeof getLastUsed;
    updateCache: typeof updateCache;
};
export {};

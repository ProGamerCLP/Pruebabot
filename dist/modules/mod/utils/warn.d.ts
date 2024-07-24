import { Guild, User } from "discord.js";
import { infraction } from "../types";
/**
 * Creates a report and sends it to the designed channel
 * @param infractionType
 * @param ctx
 */
declare function warn(guild: Guild, infraction: infraction, user: User, ctx: any): Promise<void>;
export { warn };

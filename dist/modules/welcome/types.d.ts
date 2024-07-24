import { MessageCreateOptions } from "discord.js";
type GuildData = {
    imageURL: string;
    channelId?: string;
    message_public?: MessageCreateOptions;
    message_private?: MessageCreateOptions;
};
export { GuildData };

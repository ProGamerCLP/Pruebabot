import { Guild } from "discord.js";
declare function getBranding(guild: Guild): Promise<{
    color: {
        pattern: number;
        hex: string;
    };
    icon: string;
    banner: string | null;
} | null>;
export { getBranding };

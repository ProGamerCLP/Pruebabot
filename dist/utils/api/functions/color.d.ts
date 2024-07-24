import { Guild } from "discord.js";
declare function isHexCode(str: string): boolean;
declare function getDominantColor(iconURL: string): Promise<{
    pattern: number;
    hex: string;
}>;
declare function getGuildBranding(guild: Guild): Promise<{
    color: {
        pattern: number;
        hex: string;
    };
    icon: string;
    banner: string | null;
} | null>;
export declare const color: {
    isHexCode: typeof isHexCode;
    getDominantColor: typeof getDominantColor;
    getGuildBranding: typeof getGuildBranding;
};
export {};

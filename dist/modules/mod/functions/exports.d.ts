import badword from "./badwords";
import flood from "./flood";
import suspiciousFile from "./malware";
import invite from "./invite";
declare const _default: {
    message: {
        badword: typeof badword;
        flood: typeof flood;
        ip: ({ content: str }: import("discord.js").Message<boolean>) => RegExpMatchArray | null;
        suspiciousFile: typeof suspiciousFile;
        invite: typeof invite;
        mentions: ({ mentions, author, guild, content }: import("discord.js").Message<boolean>) => Promise<void>;
    };
    kickAndBan: {};
    channel: {};
};
export default _default;

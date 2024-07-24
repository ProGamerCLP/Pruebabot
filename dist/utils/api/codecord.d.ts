import Book from "./classes/book";
import Collector from "./classes/collector";
import { date } from "./functions/date";
import { url } from "./functions/url";
import { snowflake } from "./functions/snowflake";
import { id } from "./functions/id";
import Portrait from "./classes/portrait";
import { password } from "./functions/cripto";
import { color } from "./functions/color";
import { emoji } from "./functions/emoji";
import Chain from "./classes/chain";
declare const codecord: {
    Book: typeof Book;
    Collector: typeof Collector;
    Portrait: typeof Portrait;
    date: {
        parseDifferenceToString: (date: Date | null) => string;
    };
    url: {
        test: (url: string) => Promise<boolean>;
        imageTest: (url: string) => Promise<boolean>;
    };
    snowflake: {
        test: (str: string) => boolean;
        fetch: (manager: import("discord.js").GuildMessageManager | import("discord.js").GuildChannelManager | import("discord.js").GuildMemberManager | import("discord.js").ChannelManager | import("discord.js").GuildManager | import("discord.js").RoleManager, snowflakeId: string | null | undefined) => Promise<import("discord.js").Guild | import("discord.js").Channel | import("discord.js").GuildMember | import("discord.js").Role | import("discord.js").Message<true> | null | undefined>;
    };
    id: {
        createUnique: (datakeys: string[], newkey: string) => string;
    };
    color: {
        isHexCode: (str: string) => boolean;
        getDominantColor: (iconURL: string) => Promise<{
            pattern: number;
            hex: string;
        }>;
        getGuildBranding: (guild: import("discord.js").Guild) => Promise<{
            color: {
                pattern: number;
                hex: string;
            };
            icon: string;
            banner: string | null;
        } | null>;
    };
    password: {
        hash: (str: string) => Promise<any>;
        verify: (password: string, hashedPassword: string) => Promise<any>;
    };
    emoji: {
        is: (str: string) => 2 | 0 | 1;
        stringify: (data: {
            name: string;
            id: string;
        }) => string;
    };
};
export default codecord;
export { Book, Collector, Chain, date, url, snowflake, id, Portrait, color, password, emoji, };

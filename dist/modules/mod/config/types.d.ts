interface Cfg {
    badwordShield: boolean;
    ipShield: boolean;
    floodShield: boolean;
    malwareShield: boolean;
    spamShield: boolean;
    insideShield: boolean;
    backup: boolean;
    badwordList: string;
    botWhitelist: string;
    urlWhitelist: string;
    fileTypeBlacklist: string;
    moderationChannel: string;
}
export { Cfg };

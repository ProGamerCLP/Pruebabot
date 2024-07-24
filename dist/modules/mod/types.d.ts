type infraction = "spam" | "flood" | "invite" | "channelCreate" | "channelDelete" | "massBan" | "massKick" | "ip" | "massRoleGiving" | "mentions" | "suspiciousFile";
declare const isInfraction: (str: string) => str is infraction;
export { infraction, isInfraction };

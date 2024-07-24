import { Client } from "discord.js";
/**
 * starts the client
 */
declare function create(): Promise<Client<boolean>>;
export declare const client: {
    create: typeof create;
};
export {};

import { Collection, SlashCommandBuilder } from "discord.js";
type Command = {
    data: SlashCommandBuilder;
    run: Function;
};
declare module "discord.js" {
    interface Client {
        commands: Collection<string, Command>;
        interactions: Collection<string, Function>;
        events: Collection<string, Function[]>;
    }
}
export { Command };

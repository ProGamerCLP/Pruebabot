import { ChatInputCommandInteraction, MessageComponentInteraction, ModalSubmitInteraction, TextInputBuilder } from "discord.js";
type FunctionArray = {
    [key: string]: Function;
};
type InputData = {
    label: string;
    max?: number;
    min?: number;
    placeHolder?: string;
    required?: boolean;
    customId: string;
    value?: string;
    style?: 1 | 2;
};
type InputQueryData = TextInputBuilder | InputData;
declare class Collector {
    interaction: ChatInputCommandInteraction | MessageComponentInteraction;
    time: number;
    constructor(interaction: ChatInputCommandInteraction | MessageComponentInteraction, time?: number);
    listen(arr: FunctionArray): Promise<void>;
    modalSubmission(m: MessageComponentInteraction | ChatInputCommandInteraction, { time, title, inputs, }: {
        time?: number;
        title?: string;
        inputs: InputQueryData[];
    }): Promise<{
        response: ModalSubmitInteraction<import("discord.js").CacheType>;
        values: {
            [k: string]: string;
        };
    } | null>;
}
export default Collector;

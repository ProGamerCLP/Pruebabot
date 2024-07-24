import { CacheType, MessageComponentInteraction, ModalBuilder, ModalSubmitInteraction, TextInputBuilder } from "discord.js";
/*************************************************************************
MODAL INPUTS
************************************************************************/
interface SubmittedInputData {
    response: ModalSubmitInteraction<CacheType>;
    values: {
        [k: string]: string;
    };
}
/**
 * Crea un menu modal y maneja la respuesta.
 * @param modalBuilder
 * @param filter
 */
declare function listen(data: {
    interaction: MessageComponentInteraction;
    time?: number;
    title: string;
    inputs: TextInputBuilder[];
}): Promise<SubmittedInputData | null>;
/**
 * Parsea la respuesta
 * @param modalBuilder
 * @param filter
 */
declare function getValues(submitted: ModalSubmitInteraction): {
    [k: string]: string;
};
/*************************************************************************
MODAL COMPONENT
************************************************************************/
interface modalCreateData {
    title: string;
    custom_id: string;
    inputs: TextInputBuilder[];
}
declare function create({ title, custom_id, inputs }: modalCreateData): ModalBuilder;
/*************************************************************************
EXPORTS
************************************************************************/
declare const modal: {
    listen: typeof listen;
    getValues: typeof getValues;
    create: typeof create;
};
export { SubmittedInputData, modalCreateData, modal };

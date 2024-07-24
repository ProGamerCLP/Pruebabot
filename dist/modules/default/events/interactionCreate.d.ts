import { Interaction } from "discord.js";
/**
 * Interaction event, executes when user interacts
 * @param {Interaction} interaction
 * @void
 */
declare function interactionHandler(interaction: Interaction): Promise<void>;
export default interactionHandler;

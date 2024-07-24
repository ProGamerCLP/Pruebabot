import { EmbedData } from "discord.js";
interface TicketData {
    label: string;
    description: string | null;
    emoji: string | null;
    parent: string | null;
    transcriptChannel: string | null;
    message_onDelete: {
        content: string | undefined;
        embeds: EmbedData[] | undefined;
    } | null;
    message_onCreate: {
        content: string | undefined;
        embeds: EmbedData[] | undefined;
    } | null;
    support: string | null;
    questions: string[];
    feedbackChannel: string | null;
    dmTranscript: "true" | "false";
    number: number;
}
type ticketDbList = {
    id: string;
    value: TicketData;
}[];
export { TicketData, ticketDbList };

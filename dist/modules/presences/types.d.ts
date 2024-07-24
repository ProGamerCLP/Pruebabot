import { ActivityType, PresenceStatusData } from "discord.js";
interface Presence {
    label: Function;
    type: ActivityType.Playing | ActivityType.Listening | ActivityType.Streaming | ActivityType.Watching;
    status: PresenceStatusData;
    parameter: Function;
}
export { Presence };

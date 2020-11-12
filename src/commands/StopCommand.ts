import BaseCommand from "../structures/BaseCommand";
import Disc_11 from "../structures/Disc_11";
import { ICommandComponent, IMessage } from "../../typings";
import { DefineCommand } from "../utils/decorators/DefineCommand";
import { isUserInTheVoiceChannel, isMusicPlaying, isSameVoiceChannel } from "../utils/decorators/MusicHelper";
import { createEmbed } from "../utils/createEmbed";

@DefineCommand({
    aliases: ["leave", "disconnect", "dc"],
    name: "stop",
    description: "Stop track and deletes the queue",
    usage: "{prefix}stop"
})
export default class StopCommand extends BaseCommand {
    public constructor(public client: Disc_11, public meta: ICommandComponent["meta"]) { super(client, meta); }

    @isUserInTheVoiceChannel()
    @isMusicPlaying()
    @isSameVoiceChannel()
    public execute(message: IMessage): any {
        message.guild?.queue?.voiceChannel?.leave();
        message.guild!.queue = null;

        message.channel.send(createEmbed("info", "⏹  **|**  The queue has been stopped."))
            .catch(e => this.client.logger.error("STOP_CMD_ERR:", e));
    }
}
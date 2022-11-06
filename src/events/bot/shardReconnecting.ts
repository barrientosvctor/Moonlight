import Type from "../../Moonlight";
import { EventBuilder } from "../../structures/EventBuilder";

export default new EventBuilder({
    name: "shardReconnecting",
    run(bot, id: number) {
        try {
            console.log(`Shard: ${id} está intentando reconectarse.`);
        } catch (err) {
            bot.error("Hubo un error en el evento.", { name: this.name, type: Type.Event, error: err });
        }
    }
});
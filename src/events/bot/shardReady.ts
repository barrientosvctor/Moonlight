import Type from "../../Moonlight";
import { EventBuilder } from "../../structures/EventBuilder";

export default new EventBuilder({
    name: "shardReady",
    run(bot, id: number) {
        try {
            console.log(`Shard: ${id} está listo para funcionar.`);
        } catch (err) {
            bot.error("Hubo un error en el evento.", { name: this.name, type: Type.Event, error: err });
        }
    }
});
import { Message } from "discord.js";
import { Moonlight } from "../Moonlight";

interface CommandBuilderOptions {
    name: string;
    description: string;
    cooldown: number;
    aliases?: Array<string>;
    usage?: string;
    example?: string;
    ownerOnly?: boolean;
    run: (bot: Moonlight, msg: Message, args: Array<string>, prefix: string) => void;
}

export class CommandBuilder {
    public name: CommandBuilderOptions["name"];
    public description: CommandBuilderOptions["description"];
    public cooldown: CommandBuilderOptions["cooldown"];
    public aliases?: CommandBuilderOptions["aliases"];
    public usage?: CommandBuilderOptions["usage"];
    public example?: CommandBuilderOptions["example"];
    public ownerOnly?: CommandBuilderOptions["ownerOnly"];
    public run: CommandBuilderOptions["run"];

    constructor(options: CommandBuilderOptions) {
        this.name = options.name;
        this.description = options.description;
        this.cooldown = options.cooldown;
        this.aliases = options.aliases;
        this.usage = options.usage;
        this.example = options.example;
        this.ownerOnly = options.ownerOnly;
        this.run = options.run;
    }
}
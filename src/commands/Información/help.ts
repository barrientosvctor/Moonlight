import { EmbedBuilder } from "discord.js";
import { CommandBuilder } from "../../structures/CommandBuilder";

export default new CommandBuilder({
    name: "help",
    description: "Muestra la lista de comandos que tiene el bot y además permite saber más información de cada uno de estos.",
    cooldown: 3,
    usage: "[comando]",
    example: "ban",
    async run(bot, msg, args, prefix) {
        try {
            const embed = new EmbedBuilder();
            if (!args[1]) {
                embed.setTitle("Lista de comandos")
                embed.setAuthor({ name: msg.author.tag, iconURL: msg.author.displayAvatarURL({ size: 2048, extension: "png" }) })
                embed.setDescription(`Prefix actual: \`${prefix}\`\nPara saber más información acerca de un comando escribe \`${prefix}${this.name} ${this.usage}\`\n${bot.categories.filter(c => c.name !== "Desarrollador").map(category => `**${category.name}**\n${category.commands.map(command => `\`${command.slice(0, -3)}\``).join(", ")}`).join("\n\n")}`)
                embed.setColor("Random")
                embed.setFooter({ text: msg.guild!.name, iconURL: msg.guild?.iconURL({ extension: "png", size: 2048 }) || undefined });
            } else {
                const command: CommandBuilder | undefined = bot.commands.get(args[1]) || bot.commands.get(bot.aliases.get(args[1])!);
                if (!command) return msg.reply(`El comando *${args[1]}* no existe. Asegúrate de escribir bien el nombre del comando que buscas.`);

                if (bot.isOwnerCommand(args[1]) && !bot.isOwner(msg.author)) return;

                embed.setColor("Random")
                embed.setAuthor({ name: msg.author.tag, iconURL: msg.author.displayAvatarURL({ size: 2048, extension: "png" }) })
                embed.setFooter({ text: "<> = Requerido | [] = Opcional. No escribas estos simbolos al momento de usar el comando.", iconURL: msg.guild?.iconURL({ extension: "png", size: 2048 }) || undefined });
                embed.setTitle(`Información sobre: \`${command.name}\``)
                embed.addFields(
                    { name: "Nombre", value: command.name },
                    { name: "Descripción", value: command.description },
                    { name: "Cooldown", value: `${command.cooldown} segundos` || "Ninguno" },
                    { name: "Uso", value: `${prefix}${command.name} ${command.usage}` || `${command.name}` },
                )

                if (command.example) embed.addFields({ name: "Ejemplo", value: `${prefix}${command.name} ${command.example}` });
            }
            return msg.reply({ embeds: [embed] });
        } catch (err) {
            console.error(err);
        }
    }
});
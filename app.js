import { Client, GatewayIntentBits ,AttachmentBuilder ,EmbedBuilder ,Events } from 'discord.js'
import 'dotenv/config'
import model from './LLM.js'
import {marked} from 'marked'
import {htmlToText} from 'html-to-text'
import removeMarkdown from 'remove-markdown'
import {HumanMessage ,SystemMessage} from '@langchain/core/messages'

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

client.on('ready',() => {
    console.log("Gemini Bot is online")
})

function splitMessage(text, max = 2000) {
    const chunks = [];
    while (text.length > 0) {
        let chunk = text.slice(0, max);
        const lastLineBreak = chunk.lastIndexOf('\n');
        if (lastLineBreak > 0 && chunk.length === max) {
            chunk = chunk.slice(0, lastLineBreak + 1);
        }
        chunks.push(chunk);
        text = text.slice(chunk.length);
    }
    return chunks;
}

client.on('messageCreate' ,async message => {
    if (message.author.bot) return;
    
    // Test
    if (message.content.toLowerCase() === "hello") {
        message.channel.send("hello ,my name is gemini")
    }

    // Call LLM
    if (message.content.startsWith("Gem:")) {
        const user_message = message.content.slice(4)
        const prompt_set = [
            new SystemMessage(
                process.env.SYSTEM_PROMPT
            ),
            new HumanMessage(user_message)
        ]
        const response = await model.invoke(prompt_set)

        const blocks = splitMessage(response.content)

        const embeds = blocks.map((block) => {
            const markdown = marked.parse(block)
            const text = htmlToText(markdown)
            const attachment = removeMarkdown(text)
            return new EmbedBuilder()
            .setDescription(attachment)
            .setColor(0x50b1f9)
        })

        message.channel.send({embeds})
    }
})

client.on(Events.InteractionCreate ,async interaction => {
    if (!interaction.isChatInputCommand()) return

    if (interaction.isChatInputCommand()) {
        const command = interaction.commandName
        if (command === 'gem') {
            await interaction.reply('Gemini Bot')
        }
    }
})

client.login(process.env.TOKEN)
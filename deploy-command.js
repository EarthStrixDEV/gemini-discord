import {REST ,Routes} from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const commands = [
    {
        name: 'gem',
        description: 'Gemini Bot',
    },
    {
        name: 'test',
        description: 'Test',
    }
]

const rest = new REST({version: 10}).setToken(process.env.TOKEN)

const CLIENT_ID = process.env.CLIENT_ID

(
    async() => {
        try {
            console.log('Registering commands...');
            await rest.put(
                Routes.applicationCommands(CLIENT_ID),
                {body: commands}
            )
            console.log('Commands registered successfully');
        } catch (error) {
            console.error(error);
        }
    }
)
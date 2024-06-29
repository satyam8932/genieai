import { OpenAIApi, Configuration } from 'openai-edge'

const configOpenAI = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configOpenAI);

export async function getEmbeddings(text: string) {
    try{
        const response = await openai.createEmbedding({
            model: 'text-embedding-ada-002',
            input: text.replace(/\n/g, ' '),
        })
        
        const results = await response.json();
        return results.data[0].embedding as number[];

    } catch(error) {
        console.log("Error creating embeddings", error);
        throw error;
    }
}
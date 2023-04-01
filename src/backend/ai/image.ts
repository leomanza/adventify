import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function generateImage(prompt: string) {
  // return "https://labs.openai.com/s/89t99UA77e06NBDXbfhVI7zY";

  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "256x256",
      response_format: "b64_json",
    });

    return response.status == 200 ? response.data.data[0].b64_json : null;
  } catch (error) {
    console.error(JSON.stringify(error));
    return null;
  }
}

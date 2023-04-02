import { Configuration, OpenAIApi, CreateImageRequestResponseFormatEnum } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export async function generateImage(prompt: string, format?: CreateImageRequestResponseFormatEnum) {
  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: '256x256',
      response_format: format ?? CreateImageRequestResponseFormatEnum.B64Json,
    })

    if (response.status != 200) return null

    return response.data.data[0].b64_json ?? response.data.data[0].url
  } catch (error) {
    console.error(JSON.stringify(error))
    return null
  }
}

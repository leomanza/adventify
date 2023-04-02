import pinIPFS from './pinIPFS'

export const getBase64FileEncoded = (base64File: string): Buffer =>
  Buffer.from(base64File.replace(/^data:.+;base64,/, ''), 'base64')

async function pinImage(image: string) {
  try {
    const data = getBase64FileEncoded(image)
    const res = await pinIPFS(data)
    if (!res) throw 'PIN error'
    return `ipfs://${res.path}`
  } catch (error) {
    console.error(error)
    return null
  }
}

export default pinImage

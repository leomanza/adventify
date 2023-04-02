import pinIPFS from './pinIPFS'

async function pinPlace(name: string, attributes: Record<string, unknown>, image: string) {
  try {
    const data = JSON.stringify({
      description: `Place minted through Adventify`,
      image,
      name,
      attributes: [{ ...attributes }],
    })

    const res = await pinIPFS(data)

    if (!res) throw 'PIN error'

    return `ipfs://${res.path}`
  } catch (error) {
    console.error(error)
    return null
  }
}

export default pinPlace

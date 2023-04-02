export function resolveIPFSUrl(url: string) {
  return `https://adventify.infura-ipfs.io/ipfs/${url.replace('ipfs://', '')}`
}

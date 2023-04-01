export function getLocationImageUrl(locationImage: string) {
  return `https://adventify.infura-ipfs.io/ipfs/${locationImage.replace(
    "ipfs://",
    ""
  )}`;
}

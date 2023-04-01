import { getAdventify } from "../crypto/getAdventify";

export async function mintLocation(address: string, tokenId: number) {
  try {
    const adventify = getAdventify();
    const txRecipient = await adventify.mint(address, tokenId, "0x");
    await txRecipient.wait();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

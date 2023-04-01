import { Adventify__factory } from "../../types/generated/typechain";
import { ethers } from "ethers";

// WEB wallet and provider
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider);

export function getAdventify() {
  return Adventify__factory.connect(process.env.ADVENTIFY as string, wallet);
}

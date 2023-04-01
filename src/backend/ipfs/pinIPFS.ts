import { create } from "ipfs-http-client";

const auth =
  "Basic " +
  Buffer.from(
    process.env.INFURA_PROJECT_ID + ":" + process.env.INFURA_KEY
  ).toString("base64");

const ipfsClient = create({
  url: process.env.INFURA_IPFS_API_ENDPOINT,
  headers: {
    authorization: auth,
  },
});

async function pinIPFS(data: any) {
  try {
    const res = await ipfsClient.add(data, { pin: true });
    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default pinIPFS;

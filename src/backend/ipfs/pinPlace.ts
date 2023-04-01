import { Place } from "@/types";
import pinIPFS from "./pinIPFS";

async function pinPlace(place: Record<string, unknown>, image: string) {
  try {
    const data = JSON.stringify({
      description: `Adventify place: ${place.name}`,
      image,
      name: place.name,
      attributes: [{ ...place }],
    });

    const res = await pinIPFS(data);

    if (!res) throw "PIN error";

    return `ipfs://${res.path}`;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default pinPlace;

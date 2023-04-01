import { BigNumber } from "ethers";

import { generateImage } from "@/backend/ai/image";
import { getAdventify } from "@/backend/crypto/getAdventify";
import LocationModel from "@/backend/database/models/location";
import { Place } from "@/types";
import pinPlace from "@/backend/ipfs/pinPlace";
import { type } from "os";
import { findLocation } from "@/backend/utils/findLocation";
import pinImage from "@/backend/ipfs/pinImage";

type PlaceInfo = {
  type: "place" | "city";
  id: string;
  name: string; // it can be something like "Eiffel tour or a city name like "buenos aires"
  reference: string; // for places it will be "Paris, France", for cities "Argentina"
  compoundCode?: Place["compoundCode"]; // required for places
  location: { latitude: number; longitude: number }; // required for places
};

export async function getOrCreateLocation(place: PlaceInfo) {
  if (place.type == "place" && !place.compoundCode) {
    console.error("GetLocation: can not be created.", JSON.stringify(place));
    return null;
  }

  // find location
  let location = await findLocation(place.id);
  if (location) return location;

  // generate image
  const prompt =
    place.type == "city"
      ? `Please generate a Van Gogh painting of the view of ${place.name} ${place.reference}`
      : `Please generate a Van Gogh Style image of the ${place.name} in ${place.reference}`;
  const generatedImage = await generateImage(prompt);
  if (!generatedImage) {
    return null;
  }

  // Upload image to IPFS
  const imageIPFSUrl = await pinImage(generatedImage);
  if (!imageIPFSUrl) {
    return null;
  }

  // Upload metadata to IPFS
  let ipfsPath = await pinPlace(place, imageIPFSUrl);
  if (!ipfsPath) {
    return null;
  }

  // get adventify
  const adventify = getAdventify();

  // Adventify SC: Create token
  try {
    const txRecipient = await adventify.createToken(place.id, ipfsPath);
    await txRecipient.wait();
  } catch (error) {
    console.error(error);
    return null;
  }

  console.log(`Creating token in Adventify SC collection`);

  // recover location token
  let locationTokenId: BigNumber;
  try {
    locationTokenId = await adventify.locationToTokenId(place.id);
  } catch (error) {
    console.error(error);
    return null;
  }

  console.log(`Creating Location in DB for tokenId: ${locationTokenId}`);

  // create location in DB
  try {
    location = await LocationModel.create({
      id: place.id,
      type: place.type,
      tokenId: locationTokenId,
      name: place.name,
      location: place.location
        ? {
            latitude: place.location.latitude,
            longitude: place.location.longitude,
          }
        : null,
      compoundCode: place.compoundCode
        ? {
            code: place.compoundCode.code,
            name: place.compoundCode.name,
          }
        : null,
      image: imageIPFSUrl,
      url: ipfsPath,
    });

    console.log("Location created");
    return location;
  } catch (error) {
    console.error(error);
    return null;
  }
}

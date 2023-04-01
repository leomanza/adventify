// check if place already exits

import LocationModel from "@/backend/database/models/location";

export async function findLocation(placeId: string) {
  try {
    const location = await LocationModel.findOne({ id: placeId }).exec();
    return location || null;
  } catch (error) {
    console.error(`Error trying to find place ${placeId}`);
    console.error(error);
    return null;
  }
}

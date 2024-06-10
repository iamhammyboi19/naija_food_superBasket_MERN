import { GOOGLE_MAP_APIKEY } from "../../config";

export async function get_user_address_usinglatlng(lat, lng) {
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAP_APIKEY}`
    );
    if (!res) {
      throw new Error(
        "Something went wrong trying to get your address through coordinates"
      );
    }
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}

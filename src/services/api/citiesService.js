import { find } from "./service";

export async function getAllCities() {
  return await find("/cities");
}

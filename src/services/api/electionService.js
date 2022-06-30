import { find } from "./service";

export async function getAllElection() {
  return await find("/election");
}

export async function getElectionByCity(cityId) {
  return await find("/election", { cityId });
}

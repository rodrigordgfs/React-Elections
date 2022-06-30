import { find, findById } from "./service";

export async function getAllCandidates() {
  return await find("/candidates");
}

export async function getCandidateById(id) {
  return await findById("/candidates", id);
}

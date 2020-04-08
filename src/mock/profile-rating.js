import {getRandomItem} from "../utils.js";

const PROFILE_RATING = [
  `Novice`,
  `Fan`,
  `Movie Buff`,
];

export const profileRating = getRandomItem(PROFILE_RATING);

import {getRandomInteger, getRandomItem, getRandomItems} from "../utils.js";
import {PROFILE_RATING} from "../const.js";

const RATING_MIN = 0;
const RATING_MAX = 100;
const HOUR_MIN = 0;
const HOUR_MAX = 3;
const MINUTE_MIN = 0;
const MINUTE_MAX = 59;
const COMMENTS_MIN = 0;
const COMMENTS_MAX = 5;
const RATING_AGE_MIN = 0;
const RATING_AGE_MAX = 18;
const DATE_MIN = new Date(1895, 2, 22, 12, 30); // первый фильмец в истории кино ^.^
const DATE_MAX = new Date();
const FILM_COUNT = 20;

const TITLES = [
  `Avatar`,
  `Intouchables`,
  `Firefly`,
  `Interstellar`,
  `Home`,
  `Code Geass`,
  `Lilyhammer`,
];

const GENRES = [
  `Musical`,
  `Western`,
  `Drama`,
  `Comedy`,
  `Cartoon`,
  `Mystery`,
];

const POSTERS = [
  `the-dance-of-life.jpg`,
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const EMOJIS = [
  `smile`,
  `angry`,
  `puke`,
  `sleeping`,
];

const COMMENT_TEXTS = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`,
];

const NAMES = [
  `Tim Macoveev`,
  `Darabont Ferenc`,
  `Robert Lee Zemeckis`,
  `Olivier Nakache`,
  `Anthony Mann`,
  `Anne Wigton`,
  `Heinz Herald`,
  `Richard Weil`,
  `Erich von Stroheim`,
  `Mary Beth Hughes`,
  `Dan Duryea`,
];

const COUNTRY = [
  `USA`,
  `Australia`,
  `UK`,
  `Germany`,
];

const generateComment = () => {
  return {
    emoji: getRandomItem(EMOJIS),
    text: getRandomItem(COMMENT_TEXTS),
    author: getRandomItem(NAMES),
    date: getRandomInteger(DATE_MIN.getTime(), DATE_MAX.getTime()),
  };
};

const generateFilm = () => {
  return {
    title: getRandomItem(TITLES),
    rating: getRandomInteger(RATING_MIN, RATING_MAX) / 10,
    year: getRandomInteger(DATE_MIN.getTime(), DATE_MAX.getTime()),
    duration: `${getRandomInteger(HOUR_MIN, HOUR_MAX)}h ${getRandomInteger(MINUTE_MIN, MINUTE_MAX)}m`,
    genres: getRandomItems(GENRES),
    poster: getRandomItem(POSTERS),
    description: getRandomItems(DESCRIPTIONS).join(` `),
    comments: new Array(getRandomInteger(COMMENTS_MIN, COMMENTS_MAX)).fill(``).map(generateComment),
    ratingAge: getRandomInteger(RATING_AGE_MIN, RATING_AGE_MAX),
    oririnalTitle: getRandomItem(TITLES),
    director: getRandomItem(NAMES),
    writers: getRandomItems(NAMES).join(`, `),
    actors: getRandomItems(NAMES).join(`, `),
    country: getRandomItem(COUNTRY),
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};

const films = generateFilms(FILM_COUNT);

const navigationCount = [
  getRandomInteger(0, films.length),
  getRandomInteger(0, films.length),
  getRandomInteger(0, films.length),
];

const profileRating = getRandomItem(PROFILE_RATING);

export {films, navigationCount, profileRating};

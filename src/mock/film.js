import {getRandomInteger, getRandomItem, getRandomItems} from "../utils.js";

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
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`,

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

const generateFilm = () => {
  return {
    title: getRandomItem(TITLES),
    rating: `${getRandomInteger(0, 9)}.${getRandomInteger(1, 9)}`,
    year: getRandomInteger(1895, 2020),
    duration: `${getRandomInteger(0, 3)}h ${getRandomInteger(0, 59)}m`,
    genre: getRandomItem(GENRES),
    poster: getRandomItem(POSTERS),
    description: getRandomItems(DESCRIPTIONS).join(` `),
    numberOfComments: getRandomInteger(0, 5),
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};

export {generateFilms};

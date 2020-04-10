const getRandomInteger = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const getRandomItem = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

const getRandomItems = (array) => {
  const min = getRandomInteger(0, (array.length - 1));
  const max = getRandomInteger((min + 1), array.length);
  return array.slice(min, max);
};

export {getRandomInteger, getRandomItem, getRandomItems};

const generatePositiveRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  return result;
};

const getRandomElement = (elements) => elements[generatePositiveRandomInteger(0, elements.length - 1)];

export {generatePositiveRandomInteger, getRandomElement};

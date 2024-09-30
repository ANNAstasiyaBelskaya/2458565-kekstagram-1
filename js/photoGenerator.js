import { generatePositiveRandomInteger, getRandomElement } from './util.js';
import {PHOTOS_ARRAY_MINLENGTH, AVATAR_MINVALUE, AVATAR_MAXVALUE, LIKES_MINVALUE, LIKES_MAXVALUE, COMMENTS_TEXT_MINVALUE, COMMENTS_TEXT_MAXVALUE, USER_NAMES, DESCRIPTIONS, COMMENTS} from './constants.js';

const getMessage = (array) => {
  const count = generatePositiveRandomInteger(COMMENTS_TEXT_MINVALUE, COMMENTS_TEXT_MAXVALUE);
  const message = new Set;
  while (message.size < count) {
    message.add(getRandomElement(array));
  }

  return [...message].join(' ');
};

const generateComments = (_, index) => ({
  id: index,
  avatar: `img/avatar-${generatePositiveRandomInteger(AVATAR_MINVALUE, AVATAR_MAXVALUE)}.svg`,
  message: getMessage(COMMENTS),
  name: getRandomElement(USER_NAMES),
});

const generatePhoto = (_, index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: getRandomElement(DESCRIPTIONS),
  likes: generatePositiveRandomInteger(LIKES_MINVALUE, LIKES_MAXVALUE),
  comments: Array.from({length: generatePositiveRandomInteger(0, COMMENTS.length)}, (commentIndex) => generateComments(_, commentIndex + 1))
});

const getPhotos = () => Array.from({length: PHOTOS_ARRAY_MINLENGTH}, generatePhoto);

export {getPhotos};

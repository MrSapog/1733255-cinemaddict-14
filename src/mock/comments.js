import {getRandomInteger} from '../utils/common.js';

const COMMENTS_COUNT = 20;

const emojis = [
  './images/emoji/smile.png',
  './images/emoji/sleeping.png',
  './images/emoji/puke.png',
  './images/emoji/angry.png',
];

const texts = [
  'Interesting setting and a good cast',
  'Booooooooooring',
  'Very very old. Meh',
  'Almost two hours? Seriously?',
  'Never watch this!',
  'Excellent',
];

const authors = [
  'Tim',
  'Nick',
  'Rod',
  'Todd',
  'Miles',
];

const createRandomComment = () => {
  return {
    id: getRandomInteger(1, 1000),
    emoji: emojis[getRandomInteger(0, emojis.length - 1)],
    get emojiAlt() {
      return this.emoji.match(/emoji\/(\w+)\.png/)[1];
    },
    text: texts[getRandomInteger(0, texts.length - 1)],
    author: authors[getRandomInteger(0, authors.length - 1)],
  };
};

export const randomComments = new Array(COMMENTS_COUNT).fill().map(() => createRandomComment());


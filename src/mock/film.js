import dayjs from 'dayjs';
import {getRandomInteger} from '../utils/common.js';
import {getRandomFloat} from '../utils/common.js';
import {getRandomStringArray} from '../utils/common.js';
import {getRandomNumberArray} from '../utils/common.js';
import {randomComments} from './comments.js';

const SENTENCES_MIN_COUNT = 1;
const SENTENCES_MAX_COUNT = 5;
const COMMENTS_MIN_COUNT = 0;
const COMMENTS_MAX_COUNT = 5;
const WRITERS_MIN_COUNT = 1;
const WRITERS_MAX_COUNT = 3;
const ACTORS_MIN_COUNT = 1;
const ACTORS_MAX_COUNT = 6;
const GENRES_MIN_COUNT = 1;
const GENRES_MAX_COUNT = 3;

const titles = [
  'The Dance of Life',
  'Sagebrush Trail',
  'The Man with the Golden Arm',
  'Santa Claus Conquers the Martians',
  'Popeye the Sailor Meets Sindbad the Sailor',
  'The Great Flamarion',
  'Made for Each Other',
];

const posters = [
  './images/posters/made-for-each-other.png',
  './images/posters/popeye-meets-sinbad.png',
  './images/posters/sagebrush-trail.jpg',
  './images/posters/santa-claus-conquers-the-martians.jpg',
  './images/posters/the-dance-of-life.jpg',
  './images/posters/the-great-flamarion.jpg',
  './images/posters/the-man-with-the-golden-arm.jpg',
];

const genres = [
  'Comedy',
  'Mystery',
  'Drama',
  'Cartoon',
  'Western',
];

const age = [
  '18+',
  '14+',
  '12+',
  '10+',
];

const directors = [
  'Ida Lupino',
  'Bong Joon Ho',
  'Guillermo del Toro',
  'David Cronenberg',
  'Sidney Lumet',
  'Woody Allen',
  'Tim Burton',
  'Terry Gilliam',
  'Lois Weber',
];

const writers = [
  'Billy Wilder',
  'Robert Towne',
  'Quentin Tarantino',
  'Francis Ford Coppola',
  'William Goldman',
  'Woody Allen',
  'Nora Ephron',
  'Ernest Lehman',
  'Paul Schrader',
  'Oliver Stone',
  'Aaron Sorkin',
];

const actors = [
  'Robert De Niro',
  'Jack Nicholson',
  'Marlon Brando',
  'Denzel Washington',
  'Humphrey Bogart',
  'Daniel Day-Lewis',
  'Sidney Poitier',
  'Tom Hanks',
  'Ingrid Bergman',
  'Bette Davis',
  'Gregory Peck',
  'Leonardo DiCaprio',
  'Audrey Hepburn',
  'Spencer Tracy',
];

const countries = [
  'USA',
  'Russia',
  'Canada',
  'China',
  'Brazil',
  'Australia',
  'India',
];

const descriptionTemplate = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';
const descriptionSentences = descriptionTemplate
  .slice(0, -1)
  .split('. ')
  .map((e) => e + '.');

const getCommentsById = (comments, productionDate, ...ids) => {
  const filteredComments = [];
  for (const id of ids) {

    const comment = comments.find((comment) => comment.id === id);
    if (productionDate.get('year') > 2018) {
      comment.date = productionDate.add(getRandomInteger(1, 31), 'day').format('YYYY/MM/DD HH:mm');
    } else {
      comment.date = dayjs().subtract(getRandomInteger(1, 730), 'day').format('YYYY/MM/DD HH:mm');
    }
    filteredComments.push(comment);
  }
  return filteredComments;
};

export const generateFilm = () => {
  const productionDate = dayjs()
    .date(getRandomInteger(1, 31))
    .month(getRandomInteger(1, 12))
    .year(getRandomInteger(1920, 2021));
  const commentsIds = randomComments.map((comment) => comment.id);
  const randomCommentsIds = getRandomNumberArray(commentsIds, COMMENTS_MIN_COUNT, COMMENTS_MAX_COUNT);
  return {
    title: titles[getRandomInteger(0, titles.length - 1)],
    poster: posters[getRandomInteger(0, posters.length - 1)],
    description: getRandomStringArray(descriptionSentences, SENTENCES_MIN_COUNT, SENTENCES_MAX_COUNT).join(' '),
    rating: getRandomFloat(5, 10, 1),
    year: productionDate.format('YYYY'),
    duration: getRandomInteger(1,2) + 'h ' + getRandomInteger(0,59) + 'm',
    genres: getRandomStringArray(genres, GENRES_MIN_COUNT, GENRES_MAX_COUNT),
    isWatchlist: Boolean(getRandomInteger()),
    isWatched: Boolean(getRandomInteger()),
    isFavorite: Boolean(getRandomInteger()),
    comments: getCommentsById(randomComments, productionDate, ...randomCommentsIds),
    age: age[getRandomInteger(0, age.length - 1)],
    director: directors[getRandomInteger(0, directors.length - 1)],
    writers: getRandomStringArray(writers, WRITERS_MIN_COUNT, WRITERS_MAX_COUNT),
    actors: getRandomStringArray(actors, ACTORS_MIN_COUNT, ACTORS_MAX_COUNT),
    country: countries[getRandomInteger(0, countries.length - 1)],
    fullDate: productionDate.format('D MMMM YYYY'),
  };
};



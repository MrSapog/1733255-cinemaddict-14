export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomFloat = function(min, max, digits) {
  if (min > max) {
    [min, max] = [max, min];
  }
  min = Math.abs(min);
  max = Math.abs(max);
  return (Math.random() * (max - min) + min).toFixed(digits);
};

export const getRandomStringArray = (array, minCount, maxCount) => {
  const randomArray = [];
  const arrayClone = array.slice();
  for (let i = 0; i < getRandomInteger(minCount, maxCount); i++) {
    randomArray.push(arrayClone.splice(getRandomInteger(0, arrayClone.length - 1), 1).toString());
  }
  return randomArray;
};

export const getRandomNumberArray = (array, minCount, maxCount) => {
  const randomArray = [];
  const arrayClone = array.slice();
  for (let i = 0; i < getRandomInteger(minCount, maxCount); i++) {
    const randomInteger = arrayClone.splice(getRandomInteger(0, arrayClone.length - 1), 1);
    randomArray.push(parseInt(randomInteger));
  }
  return randomArray;
};

export const capitalizeFirstLetter = (string) => string[0].toUpperCase() + string.slice(1);


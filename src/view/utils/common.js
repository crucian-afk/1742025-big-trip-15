const getRandomInteger = (min= 0, max = Number.MAX_SAFE_INTEGER) => {
  let num = null;
  if (max > min && min >= 0) {
    num = Math.floor( min + Math.random() * (max + 1 - min) );
  }
  return num;
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export {getRandomInteger, getRandomArrayElement, createElement};


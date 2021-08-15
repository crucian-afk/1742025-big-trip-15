const getRandomInt = (min= 0, max = Number.MAX_SAFE_INTEGER) => {
  let num;
  if (max > min && min >= 0) {
    num = Math.floor( min + Math.random() * (max + 1 - min) );
  } else { num = null; }
  return num;
};

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

const createArr = ([...source], maxLength) => Array.from(
  { length: Math.min(source.length, 1 + Math.random() * maxLength | 0) },
  () => source.splice(Math.random() * source.length | 0, 1)[0],
);

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export {getRandomInt, getRandomArrayElement, createArr, RenderPosition, renderElement, renderTemplate, createElement};

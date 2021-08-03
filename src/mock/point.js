import {getRandomInt, getRandomArrayElement, createArr} from '../view/utils.js';

import dayjs from 'dayjs';

const DESCRIPTION_KIT = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];
const CITIES = ['Moscow', 'Seoul', 'Florence', 'Frankfurt-am-Mein', 'Dresden', 'Stuttgart', 'Prague', 'Cairo'];
const PHOTO_SOURCES = [
  `http://picsum.photos/200/152?r=${getRandomInt(1, 1500)}`,
  `http://picsum.photos/200/152?r=${getRandomInt(1, 1500)}`,
  `http://picsum.photos/200/152?r=${getRandomInt(1, 1500)}`,
  `http://picsum.photos/200/152?r=${getRandomInt(1, 1500)}`,
  `http://picsum.photos/200/152?r=${getRandomInt(1, 1500)}`,
  `http://picsum.photos/200/152?r=${getRandomInt(1, 1500)}`,
];

const POINTS = [
  {
    'type': 'taxi',
    'offers': [
      {
        'title': 'Upgrade to a business class',
        'price': 120,
      },
      {
        'title': 'Choose the radio station',
        'price': 60,
      },
      {
        'title': 'Without talking',
        'price': 10,
      },
      {
        'title': 'Conditioner',
        'price': 5,
      },
      {
        'title': 'Add luggage',
        'price': 15,
      },
    ],
  },
  {
    'type': 'bus',
    'offers': [
      {
        'title': 'Choose seats',
        'price': 45,
      },
      {
        'title': 'Wi-fi password',
        'price': 10,
      },
      {
        'title': 'Eye mask and pillow',
        'price': 15,
      },
      {
        'title': 'Snacks',
        'price': 5,
      },
      {
        'title': 'Stop by request',
        'price': 10,
      },
    ],
  },
  {
    'type': 'train',
    'offers': [
      {
        'title': 'Tea, coffee, doshirak',
        'price': 10,
      },
      {
        'title': 'Charge iphone',
        'price': 10,
      },
      {
        'title': 'Bed linen, towel',
        'price': 15,
      },
      {
        'title': 'Chess',
        'price': 5,
      },
      {
        'title': 'Shower',
        'price': 15,
      },
    ],
  },
  {
    'type': 'ship',
    'offers': [
      {
        'title': 'Add meal',
        'price': 45,
      },
      {
        'title': 'Swim pool',
        'price': 30,
      },
      {
        'title': 'Visit concert',
        'price': 50,
      },
      {
        'title': 'Viewpoint on top',
        'price': 20,
      },
      {
        'title': 'Visit engine room',
        'price': 45,
      },
    ],
  },
  {
    'type': 'drive',
    'offers': [
      {
        'title': 'McAuto',
        'price': 35,
      },
      {
        'title': 'Extended Insurance',
        'price': 25,
      },
      {
        'title': 'Preparatory maintenance',
        'price': 15,
      },
      {
        'title': 'Take tent',
        'price': 75,
      },
      {
        'title': 'Turnpike road',
        'price': 20,
      },
    ],
  },
  {
    'type': 'flight',
    'offers': [
      {
        'title': 'Seats near window',
        'price': 45,
      },
      {
        'title': 'Upgrade to a business class',
        'price': 150,
      },
      {
        'title': 'Eye mask and pillow',
        'price': 15,
      },
      {
        'title': 'Flight with small animal',
        'price': 40,
      },
      {
        'title': 'Flight with big animal',
        'price': 60,
      },
    ],
  },
  {
    'type': 'check-in',
    'offers': [
      {
        'title': 'Priority check-in',
        'price': 35,
      },
      {
        'title': 'Bribe officer',
        'price': 150,
      },
      {
        'title': 'Declaring big money',
        'price': 50,
      },
      {
        'title': 'Declaring more luggage',
        'price': 45,
      },
      {
        'title': 'Delay transport',
        'price': 200,
      },
    ],
  },
  {
    'type': 'sightseeing',
    'offers': [
      {
        'title': 'Permission to take a video',
        'price': 45,
      },
      {
        'title': 'Individual excursion',
        'price': 60,
      },
      {
        'title': 'Group excursion',
        'price': 20,
      },
      {
        'title': 'Local shopping',
        'price': 15,
      },
      {
        'title': 'Professional photographer',
        'price': 60,
      },
    ],
  },
  {
    'type': 'restaurant',
    'offers': [
      {
        'title': 'Smoke free zone',
        'price': 15,
      },
      {
        'title': 'Food and snacks to go',
        'price': 20,
      },
      {
        'title': 'Perfomance for kids',
        'price': 35,
      },
      {
        'title': 'Live cooking',
        'price': 40,
      },
      {
        'title': 'Kids menu',
        'price': 5,
      },
    ],
  },
];

const generatePoints = () => {
  const mockPoint = getRandomArrayElement(POINTS);
  return {
    arrivalDate: dayjs(`2021-0${getRandomInt(1, 9)}-${getRandomInt(1, 28)}`).format('MMM D'),
    type: mockPoint['type'],
    destinationPoint: {
      description: createArr([...DESCRIPTION_KIT], getRandomInt(1, 5)).join(' '),
      name: getRandomArrayElement(CITIES),
      pictures: createArr([...PHOTO_SOURCES], getRandomInt(1, 5)),
    },
    offers: getRandomArrayElement(mockPoint['offers']),
  };
};

const renderSrc = (address) => (`<img class="event__photo" src="${address}" alt="Event photo">`);
const generatePhotoGallery = (array) => {
  if (array.length) {
    for (const photo of array) {
      return renderSrc(photo);
    }
  }
};

const renderOffer = (array) => (`
<span class="event__offer-title">${array['title']}</span>
&plus;&euro;&nbsp;
<span class="event__offer-price">${array['price']}</span>
`);

export {generatePoints, generatePhotoGallery, renderOffer};

export const BACKEND_URL = 'https://8.react.pages.academy/six-cities';
export const REQUEST_TIMEOUT = 5000;
export const AUTH_FAIL_MESSAGE = 'Не забудьте авторизоваться';
export const ERROR_FAIL_MESSAGE = 'Ошибка при загрузке';

export enum HttpCode {
  Unauthorized = 401,
}


export const MAX_AMOUNT_IMAGES = 6;
export const MIN_AMOUNT_IMAGES = 0;
export const MAX_AMOUNT_REVIEWS = 10;
export const MIN_AMOUNT_REVIEWS = 0;
export const AUTH_TOKEN_KEY_NAME = 'six-cities-token';

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const Cities = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export enum Page {
  Offer = 'offer',
  Favorites = 'favorites',
  Near = 'near',
}

export const PlacesSort = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
];

export const URL_MARKER_DEFAULT = 'img/pin.svg';
export const URL_MARKER_CURRENT = 'img/pin-active.svg';

export enum APIRoute {
  Main = '/',
  Hotels = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Reviews = '/comments',
  Favorite = '/favorite',
  Favorites = '/favorites',

}

export const EMAIL_VALID_REGEX =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PASSWORD_VALID_REGEX = /^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$/i;
export const EMAIL_VALIDATION_MESSAGE = 'Please enter a valid email address.';
export const PASSWORD_VALIDATION_MESSAGE = 'Please enter a valid password.';

export enum ReviewPostStatus {
  Pristine = 'PRISTINE',
  Posting = 'POSTING',
  Posted = 'POSTED',
  NotPosted = 'NOT_POSTED',
}

export const Ratings = [
  {
    title: 'perfect',
    value: '5',
  },
  {
    title: 'good',
    value: '4',
  },
  {
    title: 'not bad',
    value: '3',
  },
  {
    title: 'badly',
    value: '2',
  },
  {
    title: 'terribly',
    value: '1',
  },
];

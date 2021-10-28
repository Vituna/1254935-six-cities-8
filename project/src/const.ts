
export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const cities = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export enum page {
  Offer = 'offer',
  Favorites = 'favorites',
  Near = 'near',
}

export const PlacesSort: any = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
];

export const URL_MARKER_DEFAULT = 'img/pin.svg';

export const URL_MARKER_CURRENT = 'img/pin-active.svg';

export enum MapSize {
  MapHeightOffer = '850px',
  MapHeightProperty = '579px'
}

export enum APIRoute {
  Hotels = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Reviews = '/comments'
}

export const EMAIL_VALID_REGEX =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PASSWORD_VALID_REGEX = /^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$/i;
export const EMAIL_VALIDATION_MESSAGE = 'Please enter a valid email address.';
export const PASSWORD_VALIDATION_MESSAGE = 'Please enter a valid password.';
export const AUTH_USER_ERROR_MESSAGE = 'User authorization error';
export const FETCH_OFFERS_ERROR_MESSAGE = 'Error loading available offers';

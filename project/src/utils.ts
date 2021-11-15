import { AuthorizationStatus, EMAIL_VALID_REGEX, PASSWORD_VALID_REGEX } from './const';
import { AccommodationType } from './types/offer';

export const formatDateValue = (date: string): string => new Date(date).toLocaleDateString('en-US', {month: 'long', year: 'numeric'});
export const formatDateAttribute = (date: string): string => new Date(date).toLocaleDateString('en-CA');
export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

export const getRandomCity = (arr: string[]): string => {
  const rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

export  const getRating = (rating: number): number => rating / 5 * 100;

export const getFormValid = (comment: number, rating: string): boolean => comment > 60 && Boolean(rating);

export const isEmailValid = (email: string): boolean => EMAIL_VALID_REGEX.test(String(email).toLowerCase());
export const isPasswordValid = (password: string): boolean => PASSWORD_VALID_REGEX.test(String(password).toLowerCase());

export const getСhangesType = (type: string): string => {
  switch (type) {
    case AccommodationType.Room:
      return 'Private Room';
    case AccommodationType.Apartment:
      return 'Apartment';
    case AccommodationType.House:
      return 'House';
    case AccommodationType.Hotel:
      return 'Hotel';

    default:
      return type;
  }
};

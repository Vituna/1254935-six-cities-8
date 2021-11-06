import { AuthorizationStatus, EMAIL_VALID_REGEX, PASSWORD_VALID_REGEX } from './const';
import { City } from './types/offer';

export const formatDateValue = (date: string): string => new Date(date).toLocaleDateString('en-US', {day: 'numeric', month: 'long'});
export const formatDateAttribute = (date: string): string => new Date(date).toLocaleDateString('en-CA');
export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

export const getRandomCity = (arr: any): City => {
  const rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

export  const getRating = (rating: number) => rating / 5 * 100;

export const getFormValid = (comment: number, rating: string) => comment > 60 && Boolean(rating);

export const isEmailValid = (email: string) => EMAIL_VALID_REGEX.test(String(email).toLowerCase());
export const isPasswordValid = (password: string) => PASSWORD_VALID_REGEX.test(String(password).toLowerCase());

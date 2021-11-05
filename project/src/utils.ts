import { AuthorizationStatus } from './const';

export const formatDateValue = (date: string) => new Date(date).toLocaleDateString('en-US', {day: 'numeric', month: 'long'});
export const formatDateAttribute = (date: string) => new Date(date).toLocaleDateString('en-CA');
export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

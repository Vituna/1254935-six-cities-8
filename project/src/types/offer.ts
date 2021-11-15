
export type Offer = {
  bedrooms: number,
  city: {
    location: {
      latitude: number,
      longitude: number,
      zoom: number,
    }
    name: string,
  }
  description: string,
  goods: string[],
  host: {
    avatarUrl: string,
    id: number,
    isPro: boolean,
    name: string,
  }
    id: number,
    images: string[],
    isPremium: boolean,
    isFavorite: boolean,
    location: {
      latitude: number,
      longitude: number,
      zoom: number,
    }
    maxAdults: number,
    previewImage: string,
    price: number,
    rating: number,
    title: string,
    type: string,
};

export type OfferCardType = {
  id: number;
  title: string;
  previewImage: string;
  price: number;
  isPremium: boolean;
  type: string;
  isFavorite: boolean;
  rating: number;
}

type ReviewUser = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
}

export type OfferReview = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: ReviewUser;
}

export type OfferReviews = {
  id: number,
  user: {
    id: number,
    isPro: boolean,
    name: string,
    avatarUrl: string,
  },
  rating: number,
  comment: string,
  date: string,
};

export type CityLocation = {
    latitude: number,
    longitude: number,
    zoom: number,
}

export enum PlacesSortType {
  Popular = 'Popular',
  PriceLow = 'Price: low to high',
  PriceHigh = 'Price: high to low',
  Top = 'Top rated first',
}

export type OfferReviewResponse = Omit<OfferReviews, 'user'>
& {
  user: {
    'id': number,
    'is_pro': boolean,
    'name': string,
    'avatar_url': string,
  }
}

export type UseParamTypes = {
  id: number;
}

export type OfferResponse = Omit<
  Offer,
  | 'host'
  | 'isFavorite'
  | 'isPremium'
  | 'previewImage'
  | 'maxAdults'
> & {
  host: {
    'avatar_url': string,
    'id': number,
    'is_pro': boolean,
    'name': string,
  },
  'is_favorite': boolean,
  'is_premium': boolean,
  'max_adults': number,
  'preview_image': string,
}

export type NewReview = {
  comment: string,
  rating: number,
};

export type UserInfo = {
  avatarUrl: string,
  email: string,
  id: number,
  isPro: boolean,
  name: string,
  token: string,
 };

export type UserInfoResponse = Omit<UserInfo, 'avatarUrl' | 'isPro'> & {
 'avatar_url': string,
 'is_pro': boolean,
};

export enum City {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export enum AccommodationType {
  Room = 'room',
  Apartment = 'apartment',
  House = 'house',
  Hotel = 'hotel',
}

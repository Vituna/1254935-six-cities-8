
export type Offers = {
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

export type Citylocation = {
    latitude: number,
    longitude: number,
    zoom: number,
}


import { OfferResponse, Offer, OfferReviews, OfferReviewResponse, UserInfoResponse, UserInfo } from './types/offer';

export const offerAdapter = (hotel: OfferResponse): Offer => ({
  bedrooms: hotel.bedrooms,
  city: {
    name: hotel.city.name,
    location: {
      latitude: hotel.city.location.latitude,
      longitude: hotel.city.location.longitude,
      zoom: hotel.city.location.zoom,
    },
  },
  description: hotel.description,
  goods: hotel.goods,
  host: {
    id: hotel.host.id,
    name: hotel.host.name,
    avatarUrl: hotel.host.avatar_url,
    isPro: hotel.host.is_pro,
  },
  id: hotel.id,
  images: hotel.images,
  isFavorite: hotel.is_favorite,
  isPremium: hotel.is_premium,
  location: {
    latitude: hotel.location.latitude,
    longitude: hotel.location.longitude,
    zoom: hotel.location.zoom,
  },
  maxAdults: hotel.max_adults,
  previewImage: hotel.preview_image,
  price: hotel.price,
  title: hotel.title,
  type: hotel.type,
  rating: hotel.rating,
});

export const adaptReviewToClient = (reviewData: OfferReviewResponse): OfferReviews => ({
  id: reviewData.id,
  user: {
    id: reviewData.user.id,
    isPro: reviewData.user.is_pro,
    name: reviewData.user.name,
    avatarUrl: reviewData.user.avatar_url,
  },
  rating: reviewData.rating,
  comment: reviewData.comment,
  date: reviewData.date,
});

export const adaptAuthInfoToClient = (userInfo: UserInfoResponse): UserInfo => ({
  avatarUrl: userInfo['avatar_url'],
  email: userInfo.email,
  id: userInfo.id,
  isPro: userInfo['is_pro'],
  name: userInfo.name,
  token: userInfo.token,
});


import {toast} from 'react-toastify';
import {requireAuthorization, requireLogout, loadHotels, loadCurrentHotel, loadReviews, loadNearHotelComplete, setAuthInfoAction, sendReviewStatus, loadOffersStart, loadCurrentHotelError, setFavoriteHotelsAction, updateHotelAction, redirectToRoute} from './action';
import {AuthData} from '../types/auth-data';
import {NewReview, Offer, OfferResponse, OfferReviewResponse} from '../types/offer';
import {ThunkActionResult} from '../types/action';

import {saveToken, dropToken, Token} from '../components/services/token';
import {adaptAuthInfoToClient, adaptReviewToClient, offerAdapter} from '../adapter';
import browserHistory from '../browser-history';

import {APIRoute, AuthorizationStatus, AUTH_FAIL_MESSAGE, ERROR_FAIL_MESSAGE, ReviewPostStatus} from '../const';

export const fetchHotelsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(loadOffersStart());

    const {data} = await api.get<OfferResponse[]>(APIRoute.Hotels);
    dispatch(loadHotels(data.map((hotel) => offerAdapter(hotel))));
  };

export const fetchCurrentHotelAction = (id: number): ThunkActionResult =>
  async (dispatch, _getStore, api): Promise<void> => {
    try {
      const {data} = await api.get<OfferResponse>(
        `${APIRoute.Hotels}/${id}`,
      );
      dispatch(loadCurrentHotel(offerAdapter(data)));
    }
    catch {
      dispatch(loadCurrentHotelError());
    }
  };

export const fetchNearHotelAction = (id: number): ThunkActionResult =>
  async (dispatch, _getStore, api): Promise<void> => {
    try {
      const { data } = await api.get<OfferResponse[]>(
        `${APIRoute.Hotels}/${id}/nearby`,
      );
      const normalizedNearbyOffers = data.map((offer) => (
        offerAdapter(offer)
      ));
      dispatch(loadNearHotelComplete(normalizedNearbyOffers));
    }
    catch{
      toast.info(ERROR_FAIL_MESSAGE);
    }
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const response = await api.get(APIRoute.Login);
      if (response.status === 200) {
        const adaptedData = adaptAuthInfoToClient(response.data);
        dispatch(setAuthInfoAction(adaptedData));
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
      }
    } catch {
      toast.info(AUTH_FAIL_MESSAGE);
    }
  };

export const loginAction = ({login: email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data: {token}} = await api.post<{token: Token}>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    browserHistory.go(0);
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
    browserHistory.go(0);
  };

export const fetchReviewsAction = (id: number): ThunkActionResult =>
  async (dispatch, _getStore, api): Promise<void> => {
    try {
      const { data } = await api.get<OfferReviewResponse[]>(`${APIRoute.Reviews}/${id}`);
      const normalizedReviews = data.map((review: OfferReviewResponse) => (
        adaptReviewToClient(review)
      ));
      dispatch(loadReviews(normalizedReviews));
    }
    catch {
      toast.info(ERROR_FAIL_MESSAGE);
    }
  };

export const sendReviewAction = ({ comment, rating } : NewReview, id: number): ThunkActionResult =>
  async (dispatch, _getStore, api) => {
    dispatch(sendReviewStatus(ReviewPostStatus.Posting));
    try {
      const { data } = await api.post<OfferReviewResponse[]>(
        `${APIRoute.Reviews}/${id}`,
        { comment, rating },
      );
      const normalizedReviews = data.map((review) => (
        adaptReviewToClient(review)
      ));
      dispatch(loadReviews(normalizedReviews));
      dispatch(sendReviewStatus(ReviewPostStatus.Posted));
    }
    catch {
      dispatch(sendReviewStatus(ReviewPostStatus.NotPosted));
    }
  };

export const loadFavoriteAction = (): ThunkActionResult =>
  async function (dispatch, _getState, api): Promise<void> {
    try {
      const { data } = await api.get<OfferResponse[]>(APIRoute.Favorite);
      const adaptedData = data.map((hotel) => offerAdapter(hotel));

      dispatch(setFavoriteHotelsAction(adaptedData));
    }
    catch {
      toast.info(ERROR_FAIL_MESSAGE);
    }
  };

export const sendFavoriteAction = (hotel: Offer, onComplete?: (updatedOffer: Offer) => void): ThunkActionResult =>
  async function (dispatch, _getState, api): Promise<void> {
    try {
      const currentHotel = hotel;
      const isFavorite = currentHotel?.isFavorite;

      const { data } = await api.post<OfferResponse>(
        `${APIRoute.Favorite}/${currentHotel.id}/${isFavorite ? '0' : '1'}`,
      );
      const newHotel = offerAdapter(data);

      dispatch(updateHotelAction(newHotel));
      onComplete && onComplete(newHotel);
    }
    catch {
      dispatch(redirectToRoute(APIRoute.Login));
      browserHistory.go(0);
    }
  };

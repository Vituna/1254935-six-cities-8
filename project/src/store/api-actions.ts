import {ThunkActionResult} from '../types/action';
import {requireAuthorization, requireLogout, loadHotels, loadCurrentHotel, loadReviews, loadNearHotelComplete, setAuthInfoAction, sendReviewStatus} from './action';
import {saveToken, dropToken, Token} from '../components/services/token';
import {toast} from 'react-toastify';
import {APIRoute, AuthorizationStatus, AUTH_FAIL_MESSAGE, ReviewPostStatus} from '../const';
import {AuthData} from '../types/auth-data';
import {NewReview, OfferResponse, OfferReviewResponse} from '../types/offer';
import {adaptAuthInfoToClient, adaptReviewToClient, offerAdapter} from '../adapter';

export const fetchHotelsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<OfferResponse[]>(APIRoute.Hotels);
    dispatch(loadHotels(data.map((hotel) => offerAdapter(hotel))));
  };

export const fetchCurrentHotelAction = (id: string): ThunkActionResult =>
  async (dispatch, _getStore, api): Promise<void> => {
    const {data} = await api.get<OfferResponse>(
      `${APIRoute.Hotels}/${id}`,
    );
    dispatch(loadCurrentHotel(offerAdapter(data)));
  };

export const fetchNearHotelAction = (id: string): ThunkActionResult =>
  async (dispatch, _getStore, api): Promise<void> => {
    const { data } = await api.get<OfferResponse[]>(
      `${APIRoute.Hotels}/${id}/nearby`,
    );
    const normalizedNearbyOffers = data.map((offer) => (
      offerAdapter(offer)
    ));
    dispatch(loadNearHotelComplete(normalizedNearbyOffers));
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
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
  };

export const fetchReviewsAction = (id: string): ThunkActionResult =>
  async (dispatch, _getStore, api): Promise<void> => {
    const { data } = await api.get<OfferReviewResponse[]>(`${APIRoute.Reviews}/${id}`);
    const normalizedReviews = data.map((review: OfferReviewResponse) => (
      adaptReviewToClient(review)
    ));
    dispatch(loadReviews(normalizedReviews));
  };

export const sendReviewAction = ({ comment, rating } : NewReview, id: string): ThunkActionResult =>
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

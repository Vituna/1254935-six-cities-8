import { offerReducer } from './offer-store';
import { fakeOffers, fakeOffer} from '../../utils/test-mocks';
import { loadCurrentHotel, loadHotels, loadNearHotelComplete } from '../action';

const hotels = fakeOffers;
const hotel = fakeOffer;

describe('Reducer: Offer', () => {
  const state = {
    currentHotel: null,
    hotels: [],
    nearHotels: [],
    isOffersLoading: false,
    isLoadCurrentHotelError: false,
  };

  it('should update curent currentHotel by current value', () => {

    expect(offerReducer(state, loadCurrentHotel(hotel)))
      .toEqual( {
        currentHotel: hotel,
        hotels: [],
        nearHotels: [],
        isOffersLoading: false,
        isLoadCurrentHotelError: false,
      },
      );
  });

  it('should update Hotel by current value', () => {

    expect(offerReducer(state, loadHotels(hotels)))
      .toEqual( {
        currentHotel: null,
        hotels: hotels,
        nearHotels: [],
        isOffersLoading: false,
        isLoadCurrentHotelError: false,
      },
      );
  });

  it('should update nearHotels by current value', () => {

    expect(offerReducer(state, loadNearHotelComplete(hotels)))
      .toEqual( {
        currentHotel: null,
        hotels: [],
        nearHotels: hotels,
        isOffersLoading: false,
        isLoadCurrentHotelError: false,
      },
      );
  });
});

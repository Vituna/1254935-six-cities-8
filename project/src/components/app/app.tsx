import { useSelector } from 'react-redux';
import {Switch, Route, Router as BrowserRouter} from 'react-router-dom';
import {useState} from 'react';
import {Offer} from '../../types/offer';
import Preloader from '../loading-screen/loading-screen';
import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import Favorites from '../favorites/favorites';
import Property from '../property/property';
import NoFound from '../no-found/no-found';
import PrivateRoute from '../private-route/private-route';
import {createBrowserHistory} from 'history';
import { getAuthorizationStatus, getIsDataLoaded } from '../../store/auth-store/selectors';
import { getHotels } from '../../store/offer-store/selectors';
import { isCheckedAuth } from '../../utils';

const browserHistory = createBrowserHistory();

function App(): JSX.Element {

  const authorizationStatus = useSelector(getAuthorizationStatus);
  const isDataLoaded = useSelector(getIsDataLoaded);
  const offers = useSelector(getHotels);

  const [focusedCard, setFocusedCard] = useState<Offer | undefined>(undefined);

  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <Preloader />
    );
  }

  const onListItemHover = (listItemName: string) => {
    const currentPoint = offers.find((offer) => offer.title === listItemName);
    setFocusedCard(currentPoint);
  };

  const onListItemLeave = () => {
    setFocusedCard(undefined);
  };

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={'/'}>
          <Main focusedCard={focusedCard} onListItemHover={onListItemHover} onListItemLeave={onListItemLeave}/>
        </Route>
        <Route exact path={'/login'}>
          <SignIn />
        </Route>
        <PrivateRoute
          exact
          path={'/favorites'}
          render={() => <Favorites onListItemHover={onListItemHover}  onListItemLeave={onListItemLeave}/>}
        >
        </PrivateRoute>
        <Route exact path={'/offer/:id'}>
          <Property onListItemHover={onListItemHover} onListItemLeave={onListItemLeave}/>
        </Route>
        <Route>
          <NoFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export {App};
export default App;

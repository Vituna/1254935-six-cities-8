import { Link } from 'react-router-dom';

function NoFound(): JSX.Element {

  return (
    <div className="page page--gray page--main">
      <main className="page__main page__main--index page__main--index-empty">
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="favorites__status-wrapper">
                <b className="cities__status">404. Requested page is not available</b>
                <Link className="cities__status-description" to="/">
                  Click here to return to the main page
                </Link>
              </div>
            </section>
            <div className="cities__right-section"></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NoFound;

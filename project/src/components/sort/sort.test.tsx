import { Router } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { storeAuth } from '../../utils/test-mocks';
import Sort from './sort';

const history = createMemoryHistory();
const onSortChange = jest.fn();


const mockStore = configureMockStore([thunk]);

describe('Component: Sort', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore(storeAuth)}>
        <Router history={history}>
          <Sort typeSort={'Popular'} onSortChange={onSortChange}/>
        </Router>,
      </Provider>,
    );

    expect(screen.getByText(/Top rated first/i)).toBeInTheDocument();
  });
});

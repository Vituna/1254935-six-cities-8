import {useState} from 'react';

type SortProps = {
  placesSort: string[];
}

function Sort(props: SortProps): JSX.Element {
  const {placesSort} = props;

  const [isOpenSort, setOpenSort] = useState(false);

  const handleSort = (): void => {
    setOpenSort(!isOpenSort);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleSort}>
        Popular
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${isOpenSort ? 'places__options--opened' : ''}`}
      >
        {placesSort.map((option, i) => (
          <li className="places__option" tabIndex={0} key={`${option + i}`} >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Sort;

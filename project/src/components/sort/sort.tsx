import {useState} from 'react';

type SortProps = {
  placesSort: string[];
  typeSort: string;
  onSortChange: (option: string) => void,
}

function Sort(props: SortProps): JSX.Element {
  const {placesSort, typeSort, onSortChange} = props;

  const [isOpenSort, setOpenSort] = useState(false);

  const handleSort = (): void => {
    setOpenSort((prevState: boolean) => !prevState);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleSort}>
        {typeSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${isOpenSort ? 'places__options--opened' : ''}`}
      >
        {placesSort.map((option, i) => (
          <li onClick={
            (evt) => {evt.preventDefault(); onSortChange(option); handleSort();}
          } className="places__option" tabIndex={0} key={`${option + i}`}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Sort;

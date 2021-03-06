import {useState, useRef, useEffect} from 'react';

import {PlacesSort} from '../../const';

type SortProps = {
  typeSort: string;
  onSortChange: (option: string) => void,
}

function Sort(props: SortProps): JSX.Element {
  const {typeSort, onSortChange} = props;

  const [isOpenSort, setOpenSort] = useState(false);

  const sortRef = useRef<HTMLFormElement | null>(null);

  const handleSort = (): void => {
    setOpenSort((prevState: boolean) => !prevState);
  };

  const handleClick = (evt: React.MouseEvent<HTMLLIElement, globalThis.MouseEvent>, option: string) => {
    evt.preventDefault();
    onSortChange(option);
    handleSort();
  };

  useEffect(() => {
    const handleOutsideClick = (evt: MouseEvent) => {
      if (sortRef.current?.contains(evt.target as Node)) {
        return;
      }
      setOpenSort(false);
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <form className="places__sorting" action="#" method="get" ref={sortRef}>
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleSort}>
        {typeSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${isOpenSort ? 'places__options--opened' : 'places__option--active'}`}
      >
        {PlacesSort.map((option, i) => (
          <li onClick={
            (evt) => handleClick(evt, option)
          } className={`places__option ${typeSort === option ? 'places__option--active' : ''}` } tabIndex={0} key={`${option + i}`}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Sort;

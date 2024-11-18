import { useDispatch } from 'react-redux';
import { filterChange } from '../reducers/filterReducer';

const VisibilityFilter = () => {
  const dispatch = useDispatch();

  const filterSelected = (value) => {
    dispatch(filterChange(value));
  };

  return (
    <div>
      <input
        type="radio"
        name="filter"
        onChange={() => filterSelected('ALL')}
      />
      all{' '}
      <input
        type="radio"
        name="filter"
        onChange={() => filterSelected('IMPORTANT')}
      />
      important{' '}
      <input
        type="radio"
        name="filter"
        onChange={() => filterSelected('NONIMPORTANT')}
      />
      nonimportant{' '}
    </div>
  );
};

export default VisibilityFilter;

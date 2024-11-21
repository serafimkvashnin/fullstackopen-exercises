import noteReducer from './reducers/noteReducer';
import filterReducer from './reducers/filterReducer';
import { configureStore } from '@reduxjs/toolkit';

const reducer = {
  notes: noteReducer,
  filter: filterReducer
};

const store = configureStore({ reducer });

export default store;

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import noteReducer from './reducers/noteReducer';
import App from './App';
import { Provider } from 'react-redux';
import filterReducer from './reducers/filterReducer';
import { configureStore } from '@reduxjs/toolkit';

const reducer = {
  notes: noteReducer,
  filter: filterReducer
};

const store = configureStore({ reducer });

store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'the app state is in redux store',
    important: true,
    id: 3
  }
});

store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'state changes are made with actions',
    important: false,
    id: 4
  }
});

store.dispatch({
  type: 'TOGGLE_IMPORTANCE',
  payload: {
    id: 2
  }
});

const root = createRoot(document.getElementById('root'));

const renderApp = () => {
  root.render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  );
};

renderApp();
store.subscribe(renderApp);

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createStore } from 'redux';
import noteReducer from './reducers/noteReducer';
import App from './App';
import { Provider } from 'react-redux';

const store = createStore(noteReducer);

store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'the app state is in redux store',
    important: true,
    id: 1
  }
});

store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'state changes are made with actions',
    important: false,
    id: 2
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

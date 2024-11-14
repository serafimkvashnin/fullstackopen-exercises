import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import store from './counterStore';

const root = createRoot(document.getElementById('root'));

const renderApp = () => {
  root.render(
    <StrictMode>
      <App store={store} />
    </StrictMode>
  );
};

renderApp();
store.subscribe(renderApp);

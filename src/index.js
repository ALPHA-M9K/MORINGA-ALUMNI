import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client' for React 18
import './index.css';
import App from './App';
import { store } from './pages/Store';
import { Provider } from 'react-redux';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement); // Use createRoot instead of ReactDOM.render

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

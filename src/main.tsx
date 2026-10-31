import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppProvider } from './state/AppContext';
import { MediaProvider } from './state/MediaContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <MediaProvider>
        <App />
      </MediaProvider>
    </AppProvider>
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { ViewerProvider } from './context/ViewerContext.jsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ViewerProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ViewerProvider>
  </React.StrictMode>
);

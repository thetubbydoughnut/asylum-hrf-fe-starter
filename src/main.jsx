import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App.jsx';
import { Auth0Provider } from '@auth0/auth0-react';

require('dotenv').config();

createRoot(document.getElementById('root')).render(
  <Auth0Provider domain={process.env.AUTH0_DOMAIN} clientId={process.env.AUTH0_CLIENT_ID} authorizationParams={{ redirect_uri: window.location.origin }}>
    <App />
  </Auth0Provider>
);
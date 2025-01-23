// Required for React.StrictMode
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App.jsx';
import { ProvideAppContext } from './context/AppContext.jsx';
// Import Auth0 provider for authentication
import { Auth0Provider } from '@auth0/auth0-react';
// Import our Auth0 configuration
import { auth0Config } from './auth/auth0-config';

/**
 * TODO: Ticket 3:
 * Implement authentication using Auth0:
 * - Wrap ProvideAppContext with the Auth Provider from Auth0
 * - Add your credentials from Auth0 to a .env file (AUTH_DOMAIN, AUTH_CLIENT_ID)
 * - Set the domain, clientId, and authorizationParams
 */
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Auth0Provider wraps the app to provide authentication context */}
    <Auth0Provider {...auth0Config}>
      <ProvideAppContext>
        <App />
      </ProvideAppContext>
    </Auth0Provider>
  </React.StrictMode>
);
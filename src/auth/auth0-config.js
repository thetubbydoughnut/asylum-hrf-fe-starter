/**
 * Objective 2: Auth0 Configuration
 * 
 * This file configures the Auth0 authentication settings.
 * Changes made:
 * 1. Added proper scopes for user information
 * 2. Configured redirect handling
 */

// Configuration object for Auth0 authentication
// Uses environment variables for secure credential management
export const auth0Config = {
  // Auth0 domain from environment variables
  domain: import.meta.env.VITE_AUTH_DOMAIN,
  // Client ID from environment variables
  clientId: import.meta.env.VITE_AUTH_CLIENT_ID,
  // Redirect configuration for authentication flow
  authorizationParams: {
    redirect_uri: window.location.origin,
    scope: "openid profile email"
  }
}; 
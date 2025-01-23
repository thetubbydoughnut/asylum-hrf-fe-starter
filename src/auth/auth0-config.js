// Configuration object for Auth0 authentication
// Uses environment variables for secure credential management
export const auth0Config = {
  // Auth0 domain from environment variables
  domain: import.meta.env.VITE_AUTH_DOMAIN,
  // Client ID from environment variables
  clientId: import.meta.env.VITE_AUTH_CLIENT_ID,
  // Redirect configuration for authentication flow
  authorizationParams: {
    // Ensures users return to the same page after authentication
    redirect_uri: window.location.origin
  }
}; 
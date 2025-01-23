/**
 * Objective 2: Login/Logout Button Implementation
 * 
 * This component handles the authentication UI in the navigation menu.
 * It provides:
 * 1. A toggle button that switches between Login/Logout
 * 2. Integration with Auth0's authentication methods
 * 3. Proper redirect handling for both login and logout
 */
import { useAuth0 } from '@auth0/auth0-react';

export const LoggingButtons = () => {
  // Get authentication functions and state from Auth0
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  // Handle login with Auth0 redirect
  const handleLogin = () => {
    loginWithRedirect();
  };

  // Handle logout with redirect back to home
  const handleLogout = () => {
    logout({ 
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  };

  return (
    // Show either Login or Logout button based on authentication state
    <button 
      onClick={isAuthenticated ? handleLogout : handleLogin}
      className="nav-btn"
    >
      {isAuthenticated ? 'Logout' : 'Login'}
    </button>
  );
};
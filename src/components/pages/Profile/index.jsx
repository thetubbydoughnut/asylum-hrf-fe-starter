/**
 * Objective 3: Profile Page Implementation
 * 
 * Changes implemented:
 * 1. Created new Profile page component
 * 2. Added authentication checks and redirects
 * 3. Implemented protected routing
 * 4. Added user information display
 * 5. Styled to match application theme
 * 
 * Features:
 * - Protected route (only accessible when authenticated)
 * - Displays user profile image, name, and email
 * - Shows email verification status
 * - Shows account update information
 * - Uses consistent styling with primary/secondary colors
 */
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

export const ProfilePage = () => {
  // Get user data and authentication state from Auth0
  const { user, isAuthenticated, isLoading } = useAuth0();

  // Show loading state while checking authentication
  if (isLoading) {
    return <div className="flex-c items-center justify-center flex-1">Loading...</div>;
  }

  // Redirect to home if not authenticated - Protection mechanism
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex-1">
      {/* Title Section - Uses primary color scheme from app */}
      <section className="flex-c items-center text-center px-8 py-12 primary-c">
        <h1 className="text-6xl mb-6 text-white font-serif">
          Welcome, {user.name}
        </h1>
      </section>

      {/* Profile Content - Uses secondary color scheme and consistent spacing */}
      <section className="flex-c items-center py-20 secondary-c min-h-[70vh]">
        <div className="flex-c items-center max-w-3xl w-full mx-auto bg-white shadow-md">
          {/* Profile Header - Contains user image and primary info */}
          <div className="w-full bg-[#666555] p-8 flex items-center gap-8">
            <img 
              src={user.picture} 
              alt={user.name}
              className="w-24 h-24 rounded-full border-4 border-white"
            />
            <div className="text-left text-white">
              <h2 className="text-2xl font-serif mb-2">{user.name}</h2>
              <p className="opacity-90">{user.email}</p>
            </div>
          </div>

          {/* Profile Details - Contains verification and account info */}
          <div className="w-full p-8">
            <div className="grid gap-6 text-left">
              {/* Email Verification Status */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-serif text-[#666555] mb-2">Email Status</h3>
                <div className="flex items-center gap-2">
                  {user.email_verified ? (
                    <span className="text-green-600 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      Email Verified
                    </span>
                  ) : (
                    <span className="text-amber-600">Email Not Verified</span>
                  )}
                </div>
              </div>

              {/* Account Information */}
              <div>
                <h3 className="text-lg font-serif text-[#666555] mb-2">Account Details</h3>
                <div className="grid gap-2">
                  <p><span className="text-gray-600">Last Updated:</span> {new Date(user.updated_at).toLocaleDateString()}</p>
                  {user.locale && (
                    <p><span className="text-gray-600">Locale:</span> {user.locale}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

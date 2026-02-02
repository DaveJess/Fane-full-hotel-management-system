'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  redirectTo?: string;
}

export function AuthGuard({ children, allowedRoles = [], redirectTo = '/login' }: AuthGuardProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window === 'undefined') {
        setIsLoading(false);
        return;
      }

      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      
      if (!token) {
        router.push(redirectTo);
        return;
      }

      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          
          // Check if user role is allowed
          if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
            // Redirect based on role
            if (user.role === 'superadmin') {
              router.push('/admin');
            } else if (user.role === 'hotel' || user.role === 'HOTEL') {
              router.push('/dashboard/hotel-owner');
            } else {
              router.push('/dashboard');
            }
            return;
          }
          
          setIsAuthorized(true);
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push(redirectTo);
          return;
        }
      } else {
        setIsAuthorized(true); // Allow if no role restrictions
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, [router, allowedRoles, redirectTo]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null; // Will redirect in the useEffect
  }

  return <>{children}</>;
}

// Hook to check if user is authenticated
export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window === 'undefined') {
        setIsLoading(false);
        return;
      }

      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      
      if (!token) {
        setIsLoading(false);
        return;
      }

      if (userStr) {
        try {
          const userData = JSON.parse(userStr);
          setUser(userData);
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    setUser(null);
    window.location.href = '/login';
  };

  return { user, isLoading, logout, isAuthenticated: !!user };
}

// Hook specifically for hotel owners
export function useHotelOwnerAuth() {
  const { user, isLoading, logout, isAuthenticated } = useAuth();
  
  const isHotelOwner = user && (user.role === 'hotel' || user.role === 'HOTEL');
  
  return {
    user,
    isLoading,
    logout,
    isAuthenticated: isAuthenticated && isHotelOwner,
    isHotelOwner
  };
}

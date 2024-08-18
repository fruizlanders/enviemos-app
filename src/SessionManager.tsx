import type {ReactNode} from 'react';
import {useEffect, useRef} from 'react';

const SESSION_LIMIT = 3 * 60 * 1000; // 3 minutes in milliseconds

interface SessionManagerProps {
  children: ReactNode;
}

const SessionManager: React.FC<SessionManagerProps> = ({children}) => {
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null); // Use a ref to store the timeout ID

  const handleLogout = () => {
    // Logic for session logout
    window.location.href = '/login';
  };

  const resetSessionTimeout = () => {
    if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    timeoutIdRef.current = setTimeout(() => {
      alert('Sesión expirada. Se cerrará la sesión.');
      handleLogout();
    }, SESSION_LIMIT);
  };

  useEffect(() => {
    const handleUserActivity = () => resetSessionTimeout();

    // Set up the initial timeout and event listeners
    resetSessionTimeout();
    document.addEventListener('click', handleUserActivity);
    document.addEventListener('keypress', handleUserActivity);

    // Cleanup function to remove event listeners and clear timeout
    return () => {
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
      document.removeEventListener('click', handleUserActivity);
      document.removeEventListener('keypress', handleUserActivity);
    };
  }, []); // Empty dependency array to run effect only once on mount

  return <>{children}</>;
};

export default SessionManager;

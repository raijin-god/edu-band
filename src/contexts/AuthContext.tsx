import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, role: UserRole) => Promise<boolean>;
  loginWithToken: (token: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEMO_CREDENTIALS = {
  username: 'eduband',
  password: 'eduband',
};

const DEMO_TOKEN = '00000';

const USERS: Record<UserRole, User> = {
  guru: {
    id: '1',
    username: 'eduband',
    role: 'guru',
    name: 'Guru Demo',
  },
  siswa: {
    id: '2',
    username: 'eduband',
    role: 'siswa',
    name: 'Siswa',
  },
  wali: {
    id: '3',
    username: 'wali',
    role: 'wali',
    name: 'Wali Murid Demo',
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem('eduband_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        sessionStorage.removeItem('eduband_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string, role: UserRole): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password) {
      const loggedInUser = USERS[role];
      setUser(loggedInUser);
      sessionStorage.setItem('eduband_user', JSON.stringify(loggedInUser));
      return true;
    }
    return false;
  };

  const loginWithToken = async (token: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (token === DEMO_TOKEN) {
      const loggedInUser = USERS['wali'];
      setUser(loggedInUser);
      sessionStorage.setItem('eduband_user', JSON.stringify(loggedInUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('eduband_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loginWithToken,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

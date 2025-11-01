import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '@/services/auth';
import type { User, TelegramUser } from '@/types/telegram';

interface AuthContextType {
  user: User | null;
  login: (telegramUser: TelegramUser) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUserId = localStorage.getItem('userId');
    if (savedUserId) {
      authService.getUserById(savedUserId).then((userData) => {
        if (userData) {
          setUser(userData);
        } else {
          localStorage.removeItem('userId');
        }
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (telegramUser: TelegramUser) => {
    const userData = await authService.findOrCreateUser(telegramUser);
    setUser(userData);
    localStorage.setItem('userId', String(userData.telegramId));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

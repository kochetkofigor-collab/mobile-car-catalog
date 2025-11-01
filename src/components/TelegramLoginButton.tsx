import { useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import type { TelegramUser } from '@/types/telegram';

interface TelegramLoginButtonProps {
  botUsername: string;
  onError?: (error: string) => void;
}

declare global {
  interface Window {
    onTelegramAuth?: (user: TelegramUser) => void;
  }
}

export default function TelegramLoginButton({ botUsername, onError }: TelegramLoginButtonProps) {
  const { login } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.onTelegramAuth = (user: TelegramUser) => {
      login(user).catch((error) => {
        console.error('Login error:', error);
        onError?.('Не удалось войти');
      });
    };

    if (containerRef.current) {
      const script = document.createElement('script');
      script.src = 'https://telegram.org/js/telegram-widget.js?22';
      script.async = true;
      script.setAttribute('data-telegram-login', botUsername);
      script.setAttribute('data-size', 'large');
      script.setAttribute('data-radius', '8');
      script.setAttribute('data-onauth', 'onTelegramAuth(user)');
      script.setAttribute('data-request-access', 'write');
      containerRef.current.appendChild(script);
    }

    return () => {
      delete window.onTelegramAuth;
    };
  }, [botUsername, login, onError]);

  return <div ref={containerRef} className="flex justify-center" />;
}
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import type { TelegramUser } from '@/types/telegram';

interface TelegramLoginButtonProps {
  botId: string;
  onError?: (error: string) => void;
}

export default function TelegramLoginButton({ botId, onError }: TelegramLoginButtonProps) {
  const { login } = useAuth();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleLogin = () => {
    if (!window.Telegram?.Login) {
      onError?.('Telegram widget not loaded');
      return;
    }

    window.Telegram.Login.auth(
      { bot_id: botId, request_access: 'write' },
      (user: TelegramUser | false) => {
        if (user) {
          login(user).catch((error) => {
            console.error('Login error:', error);
            onError?.('Failed to login');
          });
        } else {
          onError?.('Login cancelled');
        }
      }
    );
  };

  return (
    <Button onClick={handleLogin} className="gap-2">
      <Icon name="Send" size={20} />
      Войти через Telegram
    </Button>
  );
}

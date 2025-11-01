import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface TelegramLoginButtonProps {
  botUsername: string;
  onError?: (error: string) => void;
}

export default function TelegramLoginButton({ botUsername, onError }: TelegramLoginButtonProps) {
  const { login } = useAuth();
  const { toast } = useToast();
  const [isPolling, setIsPolling] = useState(false);
  const [authToken, setAuthToken] = useState<string>('');

  useEffect(() => {
    if (!isPolling || !authToken) return;

    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(
          `https://functions.poehali.dev/6556fd57-707d-47b5-b12c-decca51112ac?token=${authToken}`
        );
        
        if (response.ok) {
          const data = await response.json();
          if (data.user) {
            clearInterval(pollInterval);
            setIsPolling(false);
            
            const telegramUser = {
              id: data.user.id,
              first_name: data.user.first_name,
              last_name: data.user.last_name,
              username: data.user.username,
              photo_url: data.user.photo_url,
              auth_date: Math.floor(Date.now() / 1000),
              hash: ''
            };
            
            await login(telegramUser);
          }
        }
      } catch (error) {
        console.error('Polling error:', error);
      }
    }, 2000);

    const timeout = setTimeout(() => {
      clearInterval(pollInterval);
      setIsPolling(false);
      toast({
        title: 'Время истекло',
        description: 'Попробуйте войти снова',
        variant: 'destructive'
      });
    }, 300000);

    return () => {
      clearInterval(pollInterval);
      clearTimeout(timeout);
    };
  }, [isPolling, authToken, login, toast]);

  const handleLogin = () => {
    const token = Math.random().toString(36).substring(2, 15);
    setAuthToken(token);
    setIsPolling(true);
    
    const telegramUrl = `https://t.me/${botUsername}?start=${token}`;
    window.open(telegramUrl, '_blank');
    
    toast({
      title: 'Откройте Telegram',
      description: 'Подтвердите вход в боте',
    });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Button 
        onClick={handleLogin} 
        disabled={isPolling}
        className="gap-2 w-full"
        size="lg"
      >
        {isPolling ? (
          <>
            <Icon name="Loader2" size={20} className="animate-spin" />
            Ожидание подтверждения...
          </>
        ) : (
          <>
            <Icon name="Send" size={20} />
            Войти через Telegram
          </>
        )}
      </Button>
      
      {isPolling && (
        <p className="text-sm text-muted-foreground animate-pulse">
          Откройте бота в Telegram и нажмите /start
        </p>
      )}
    </div>
  );
}
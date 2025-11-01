import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import TelegramLoginButton from '@/components/TelegramLoginButton';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading && user) {
      navigate('/');
    }
  }, [user, isLoading, navigate]);

  const handleError = (error: string) => {
    toast({
      title: 'Ошибка',
      description: error,
      variant: 'destructive'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-background/95 flex items-center justify-center">
        <Icon name="Loader2" size={48} className="text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon name="Send" size={32} className="text-primary" />
          </div>
          <h1 className="font-cormorant text-3xl font-bold mb-2">Вход в систему</h1>
          <p className="text-sm text-muted-foreground">Войдите через Telegram для доступа</p>
        </div>

        <div className="flex justify-center">
          <TelegramLoginButton 
            botId="YOUR_BOT_ID" 
            onError={handleError}
          />
        </div>

        <button
          onClick={() => navigate('/')}
          className="mt-6 w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Вернуться на главную
        </button>
      </Card>
    </div>
  );
}
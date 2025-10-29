import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface ListingRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ListingRequestModal({ isOpen, onClose }: ListingRequestModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('https://functions.poehali.dev/9e377815-dae4-48c3-a1c7-aafee87663ed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setFormData({ name: '', phone: '' });
      }, 2000);
    } catch (err) {
      console.error('Failed to submit request:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl border border-border max-w-md w-full">
        <div className="bg-background border-b border-border px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-semibold">Разместить автомобиль</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
            <Icon name="X" size={20} />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
              <Icon name="Check" size={32} className="text-green-500" />
            </div>
            <p className="text-lg font-medium">Заявка отправлена!</p>
            <p className="text-sm text-muted-foreground">Мы свяжемся с вами в ближайшее время</p>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Хочешь разместить свой авто?</h3>
              <p className="text-sm text-muted-foreground">
                Стоимость размещения мы всегда обговариваем индивидуально
              </p>
              
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.open('https://t.me/igormajorr', '_blank')}
              >
                Связаться с администратором в Telegram
              </Button>
            </div>

            <div className="border-t border-border pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Имя</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ваше имя"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Телефон</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+7 (999) 123-45-67"
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                      Отправка...
                    </>
                  ) : (
                    <>
                      Отправить заявку
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
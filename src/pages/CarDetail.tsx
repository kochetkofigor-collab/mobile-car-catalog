import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { cars } from '@/data/cars';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export default function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = cars.find(c => c.id === Number(id));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!car) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Icon name="Car" size={64} className="mx-auto text-muted-foreground/50" />
          <p className="text-muted-foreground">Автомобиль не найден</p>
          <Button onClick={() => navigate('/')}>Вернуться к каталогу</Button>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 pb-8">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="hover:bg-primary/10 active:bg-primary/20 active:scale-95 transition-all"
          >
            <Icon name="ArrowLeft" size={20} className="text-foreground" />
          </Button>
          <h1 className="font-cormorant text-2xl font-bold flex-1">
            {car.name}
          </h1>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 space-y-6 mt-6">
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted/30 animate-fade-in">
          <img
            src={car.images[currentImageIndex]}
            alt={car.name}
            className="w-full h-full object-cover"
          />
          
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm text-foreground font-medium border border-border/40">Москва</span>
          </div>
          
          {car.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/40 flex items-center justify-center hover:bg-background transition-all"
              >
                <Icon name="ChevronLeft" size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/40 flex items-center justify-center hover:bg-background transition-all"
              >
                <Icon name="ChevronRight" size={20} />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {car.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? 'bg-primary w-6'
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex gap-2 animate-fade-in">
          {car.isNew && (
            <Badge className="bg-primary text-primary-foreground pointer-events-none select-none">Новинка</Badge>
          )}
          {car.isPromo && (
            <Badge className="bg-destructive text-destructive-foreground pointer-events-none select-none">Акция</Badge>
          )}
        </div>

        <Card className="p-5 space-y-4 border-border/40 bg-card/50 backdrop-blur-sm animate-fade-in">
          <div>
            <h2 className="font-cormorant text-2xl font-bold mb-1">{car.name}</h2>
            <p className="text-muted-foreground">{car.year} год</p>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/40">
            <div className="text-center space-y-2">
              <Icon name="Banknote" size={24} className="mx-auto text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">{car.pricePerDay.toLocaleString('ru-RU')}</p>
                <p className="text-xs text-muted-foreground">₽/сутки</p>
              </div>
            </div>
            <div className="text-center space-y-2">
              <Icon name="Shield" size={24} className="mx-auto text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">{car.deposit.toLocaleString('ru-RU')}</p>
                <p className="text-xs text-muted-foreground">Депозит</p>
              </div>
            </div>
            <div className="text-center space-y-2">
              <Icon name="Calendar" size={24} className="mx-auto text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">{car.buyoutMonths}</p>
                <p className="text-xs text-muted-foreground">мес. выкупа</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-5 space-y-3 border-primary/30 bg-primary/5 animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Icon name="ShieldCheck" size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Проверенный арендодатель</h3>
              <p className="text-sm text-muted-foreground">
                Мы проверили документы и репутацию арендодателя. Безопасная сделка гарантирована.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-5 space-y-4 border-border/40 bg-card/50 backdrop-blur-sm animate-fade-in">
          <h3 className="font-cormorant text-xl font-semibold flex items-center gap-2">
            <Icon name="MessageCircle" size={20} className="text-primary" />
            Связаться с арендодателем
          </h3>
          <div className="space-y-3">
            <Button
              className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white"
              onClick={() => window.open('https://wa.me/79999999999', '_blank')}
            >
              <Icon name="MessageCircle" size={18} className="mr-2" />
              WhatsApp
            </Button>
            <Button
              className="w-full bg-[#0088cc] hover:bg-[#0077b3] text-white"
              onClick={() => window.open('https://t.me/username', '_blank')}
            >
              <Icon name="Send" size={18} className="mr-2" />
              Telegram
            </Button>
            <Button
              variant="outline"
              className="w-full border-primary/30 hover:bg-primary/10 hover:text-white [&_svg]:hover:text-white active:bg-primary active:text-white active:border-primary [&_svg]:active:text-white"
              onClick={() => window.open('tel:+79999999999', '_blank')}
            >
              <Icon name="Phone" size={18} className="mr-2" />
              +7 (999) 999-99-99
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
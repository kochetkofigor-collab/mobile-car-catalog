import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface CarCardProps {
  id: number;
  image: string;
  name: string;
  year: number;
  pricePerDay: number;
  city: string;
  isNew?: boolean;
  isPromo?: boolean;
  isVerified?: boolean;
  isHighlighted?: boolean;
  comingSoonDate?: string;
  onClick: () => void;
}

export const CarCard = ({ image, name, year, pricePerDay, city, isNew, isPromo, isVerified, isHighlighted, comingSoonDate, onClick }: CarCardProps) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
  };
  return (
    <Card 
      className={`overflow-hidden bg-card transition-all duration-300 cursor-pointer animate-fade-in hover:scale-[1.02] ${
        isHighlighted 
          ? 'border-2 border-primary shadow-xl shadow-primary/30 ring-4 ring-primary/20' 
          : 'border-border/40 hover:border-primary/50'
      }`}
      onClick={onClick}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted/30">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm text-foreground font-medium border border-border/40">{city}</span>
        </div>
        {(isNew || isPromo || comingSoonDate) && (
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {comingSoonDate && (
              <Badge className="bg-primary text-primary-foreground font-medium pointer-events-none">
                Скоро • {formatDate(comingSoonDate)}
              </Badge>
            )}
            {isNew && (
              <Badge className="bg-primary text-primary-foreground font-medium pointer-events-none">
                Новинка
              </Badge>
            )}
            {isPromo && (
              <Badge className="bg-destructive text-destructive-foreground font-medium pointer-events-none">
                Акция
              </Badge>
            )}
          </div>
        )}
      </div>
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-cormorant text-xl font-semibold text-foreground mb-1">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground">{year} год</p>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-border/40">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-primary">{pricePerDay.toLocaleString('ru-RU')}</span>
            <span className="text-sm text-muted-foreground">₽/сутки</span>
          </div>
          {isVerified && (
            <div className="flex items-center gap-1 text-primary">
              <Icon name="ShieldCheck" size={16} />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CarCardProps {
  id: number;
  image: string;
  name: string;
  year: number;
  pricePerDay: number;
  isNew?: boolean;
  isPromo?: boolean;
  onClick: () => void;
}

export const CarCard = ({ image, name, year, pricePerDay, isNew, isPromo, onClick }: CarCardProps) => {
  return (
    <Card 
      className="overflow-hidden border-border/40 bg-card hover:border-primary/50 transition-all duration-300 cursor-pointer animate-fade-in hover:scale-[1.02]"
      onClick={onClick}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted/30">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        {(isNew || isPromo) && (
          <div className="absolute top-3 right-3 flex gap-2">
            {isNew && (
              <Badge className="bg-primary text-primary-foreground font-medium">
                Новинка
              </Badge>
            )}
            {isPromo && (
              <Badge className="bg-destructive text-destructive-foreground font-medium">
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
        <div className="flex items-baseline gap-1 pt-2 border-t border-border/40">
          <span className="text-2xl font-bold text-primary">{pricePerDay.toLocaleString('ru-RU')}</span>
          <span className="text-sm text-muted-foreground">₽/сутки</span>
        </div>
      </div>
    </Card>
  );
};

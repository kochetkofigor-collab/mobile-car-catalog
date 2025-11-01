import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { carsService } from '@/services/firestore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CarCard } from '@/components/CarCard';
import Icon from '@/components/ui/icon';
import type { Car } from '@/data/cars';

export default function Profile() {
  const navigate = useNavigate();
  const { user, isLoading, logout } = useAuth();
  const [cars, setCars] = useState<Car[]>([]);
  const [loadingCars, setLoadingCars] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    if (user) {
      carsService
        .getByUserId(user.id)
        .then((data) => {
          setCars(data);
          setLoadingCars(false);
        })
        .catch((err) => {
          console.error('Failed to load user cars:', err);
          setLoadingCars(false);
        });
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-background/95 flex items-center justify-center">
        <Icon name="Loader2" size={48} className="text-primary animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 pb-8">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="rounded-full"
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <h1 className="font-cormorant text-2xl font-bold">Мой профиль</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              className="rounded-full"
            >
              <Icon name="LogOut" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 space-y-6 mt-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.photoUrl} alt={user.firstName} />
              <AvatarFallback className="text-2xl">
                {user.firstName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">
                {user.firstName} {user.lastName}
              </h2>
              {user.username && (
                <p className="text-muted-foreground">@{user.username}</p>
              )}
              <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                <Icon name="Calendar" size={14} />
                <span>
                  С {new Date(user.createdAt).toLocaleDateString('ru-RU')}
                </span>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Car" size={20} className="text-primary" />
              <h2 className="font-cormorant text-2xl font-semibold">
                Мой автопарк
              </h2>
            </div>
            <span className="text-sm text-muted-foreground">
              {cars.length} {cars.length === 1 ? 'автомобиль' : 'автомобилей'}
            </span>
          </div>

          {loadingCars ? (
            <div className="text-center py-8">
              <Icon name="Loader2" size={32} className="mx-auto text-primary animate-spin" />
            </div>
          ) : cars.length > 0 ? (
            <div className="grid gap-4">
              {cars.map((car) => (
                <CarCard
                  key={car.id}
                  {...car}
                  image={car.images[0]}
                  isVerified={car.landlord?.isVerified}
                  onClick={() => navigate(`/car/${car.id}`)}
                />
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <Icon name="Car" size={48} className="mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground mb-4">
                У вас пока нет автомобилей
              </p>
              <Button onClick={() => navigate('/')}>
                <Icon name="Search" size={16} className="mr-2" />
                Найти автомобиль
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

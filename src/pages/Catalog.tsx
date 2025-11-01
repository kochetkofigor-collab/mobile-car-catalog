import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CarCard } from '@/components/CarCard';
import { CarFilters } from '@/components/CarFilters';
import { Car } from '@/data/cars';
import Icon from '@/components/ui/icon';
import ListingRequestModal from '@/components/ListingRequestModal';
import { Button } from '@/components/ui/button';
import { carsService } from '@/services/firestore';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Catalog() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    priceRange: [1000, 10000] as [number, number],
    brand: 'all',
    year: 'all',
    city: 'all'
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    carsService.getAll()
      .then(data => {
        setCars(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load cars:', err);
        setLoading(false);
      });
  }, []);

  const filteredCars = cars.filter(car => {
    const priceMatch = car.pricePerDay >= filters.priceRange[0] && car.pricePerDay <= filters.priceRange[1];
    const brandMatch = filters.brand === 'all' || car.brand === filters.brand;
    const yearMatch = filters.year === 'all' || car.year.toString() === filters.year;
    const cityMatch = filters.city === 'all' || car.city === filters.city;
    return priceMatch && brandMatch && yearMatch && cityMatch;
  });

  const newCars = filteredCars.filter(car => car.isNew);
  const promoCars = filteredCars.filter(car => car.isPromo);
  const comingSoonCars = filteredCars.filter(car => car.comingSoonDate);
  const allCars = filteredCars;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-background/95 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Icon name="Loader2" size={48} className="mx-auto text-primary animate-spin" />
          <p className="text-muted-foreground">Загрузка автомобилей...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 pb-8">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <h1 className="font-cormorant text-3xl font-bold text-center bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">KEYRIDER</h1>
              <p className="text-center text-sm text-muted-foreground mt-1">Площадка для выбора авто</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                size="icon"
                variant="outline"
                className="rounded-full w-10 h-10 border-border/60 hover:border-primary/50 hover:bg-primary/5 transition-all [&_svg]:text-white"
                onClick={() => setIsModalOpen(true)}
              >
                <Icon name="DollarSign" size={20} />
              </Button>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.photoUrl} alt={user.firstName} />
                        <AvatarFallback>{user.firstName.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
                        {user.username && <p className="text-xs text-muted-foreground">@{user.username}</p>}
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/admin')}>
                      <Icon name="Settings" size={16} className="mr-2" />
                      Админ панель
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>
                      <Icon name="LogOut" size={16} className="mr-2" />
                      Выйти
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full w-10 h-10 border-border/60 hover:border-primary/50 hover:bg-primary/5 transition-all"
                  onClick={() => navigate('/login')}
                >
                  <Icon name="User" size={20} />
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <ListingRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="max-w-md mx-auto px-4 space-y-6 mt-6">
        <CarFilters onFilterChange={setFilters} />

        {newCars.length > 0 && (
          <section className="space-y-4 animate-fade-in">
            <div className="flex items-center gap-2">
              <Icon name="Sparkles" size={20} className="text-primary" />
              <h2 className="font-cormorant text-2xl font-semibold">Новинки</h2>
            </div>
            <div className="grid gap-4">
              {newCars.map(car => (
                <CarCard
                  key={car.id}
                  {...car}
                  image={car.images[0]}
                  isVerified={car.landlord?.isVerified}
                  onClick={() => navigate(`/car/${car.id}`)}
                />
              ))}
            </div>
          </section>
        )}

        {promoCars.length > 0 && (
          <section className="space-y-4 animate-fade-in">
            <div className="flex items-center gap-2">
              <Icon name="Percent" size={20} className="text-destructive" />
              <h2 className="font-cormorant text-2xl font-semibold">Акции</h2>
            </div>
            <div className="grid gap-4">
              {promoCars.map(car => (
                <CarCard
                  key={car.id}
                  {...car}
                  image={car.images[0]}
                  isVerified={car.landlord?.isVerified}
                  onClick={() => navigate(`/car/${car.id}`)}
                />
              ))}
            </div>
          </section>
        )}

        {comingSoonCars.length > 0 && (
          <section className="space-y-4 animate-fade-in">
            <div className="flex items-center gap-2">
              <Icon name="Clock" size={20} className="text-amber-500" />
              <h2 className="font-cormorant text-2xl font-semibold">Скоро в наличии</h2>
            </div>
            <div className="grid gap-4">
              {comingSoonCars.map(car => (
                <CarCard
                  key={car.id}
                  {...car}
                  image={car.images[0]}
                  isVerified={car.landlord?.isVerified}
                  onClick={() => navigate(`/car/${car.id}`)}
                />
              ))}
            </div>
          </section>
        )}

        <section className="space-y-4 animate-fade-in">
          <div className="flex items-center gap-2">
            <Icon name="Car" size={20} className="text-primary" />
            <h2 className="font-cormorant text-2xl font-semibold">Все автомобили</h2>
          </div>
          <div className="grid gap-4">
            {allCars.map(car => (
              <CarCard
                key={car.id}
                {...car}
                image={car.images[0]}
                isVerified={car.landlord?.isVerified}
                onClick={() => navigate(`/car/${car.id}`)}
              />
            ))}
          </div>
        </section>

        {filteredCars.length === 0 && (
          <div className="text-center py-12 space-y-3">
            <Icon name="Search" size={48} className="mx-auto text-muted-foreground/50" />
            <p className="text-muted-foreground">Автомобили не найдены</p>
            <p className="text-sm text-muted-foreground/70">Попробуйте изменить параметры фильтра</p>
          </div>
        )}
      </div>
    </div>
  );
}
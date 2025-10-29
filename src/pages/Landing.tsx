import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CarCard } from '@/components/CarCard';
import { CarFilters } from '@/components/CarFilters';
import { Car } from '@/data/cars';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import ListingRequestModal from '@/components/ListingRequestModal';
import { carsService } from '@/services/firestore';

export default function Landing() {
  const navigate = useNavigate();
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

  const featuredCars = filteredCars.filter(car => car.isNew || car.isPromo).slice(0, 6);
  const allCars = filteredCars;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-background/95 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Icon name="Loader2" size={48} className="mx-auto text-primary animate-spin" />
          <p className="text-muted-foreground">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/95">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="container mx-auto px-4 lg:px-8 py-4 lg:py-6">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Car" size={20} className="text-white lg:w-6 lg:h-6" />
              </div>
              <div>
                <h1 className="font-cormorant text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                  KEYRIDER
                </h1>
                <p className="text-xs lg:text-sm text-muted-foreground hidden sm:block">Премиум аренда автомобилей</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="rounded-full border-border/60 hover:border-primary/50 hover:bg-primary/5 transition-all"
              onClick={() => setIsModalOpen(true)}
            >
              <Icon name="DollarSign" size={18} className="mr-2" />
              <span className="hidden sm:inline">Разместить авто</span>
              <span className="sm:hidden">Разместить</span>
            </Button>
          </div>
        </div>
      </header>

      <ListingRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <section className="relative overflow-hidden py-12 lg:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mx-auto lg:mx-0">
                  <Icon name="Sparkles" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-primary">Более 100+ автомобилей</span>
                </div>
                <h2 className="font-cormorant text-4xl lg:text-6xl font-bold leading-tight">
                  Арендуйте авто <br className="hidden lg:block" />
                  <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                    вашей мечты
                  </span>
                </h2>
                <p className="text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
                  Премиум автомобили от проверенных арендодателей. Простое бронирование, честные условия, безопасные сделки.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button 
                    size="lg" 
                    className="text-base lg:text-lg h-12 lg:h-14 px-6 lg:px-8 rounded-full"
                    onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <Icon name="Search" size={20} className="mr-2" />
                    Посмотреть каталог
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="text-base lg:text-lg h-12 lg:h-14 px-6 lg:px-8 rounded-full border-border/60 hover:border-primary/50"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <Icon name="Plus" size={20} className="mr-2" />
                    Разместить авто
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800&h=600&fit=crop" 
                    alt="Premium car"
                    className="w-full h-[300px] lg:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="text-sm lg:text-base font-medium mb-1">От 2,000₽ в день</p>
                    <h3 className="text-2xl lg:text-3xl font-bold font-cormorant">Mercedes-Benz, BMW, Audi</h3>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 lg:-top-8 lg:-right-8 w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-primary to-secondary rounded-full blur-3xl opacity-50" />
                <div className="absolute -bottom-4 -left-4 lg:-bottom-8 lg:-left-8 w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-secondary to-primary rounded-full blur-3xl opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-card/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {[
                { icon: 'ShieldCheck', title: 'Проверенные авто', desc: 'Все автомобили проходят тщательную проверку' },
                { icon: 'Clock', title: 'Быстрое бронирование', desc: 'Оформление за 5 минут онлайн' },
                { icon: 'Award', title: 'Лучшие цены', desc: 'Конкурентные тарифы без скрытых платежей' },
                { icon: 'Headphones', title: 'Поддержка 24/7', desc: 'Всегда готовы помочь с любым вопросом' }
              ].map((feature, idx) => (
                <div key={idx} className="text-center space-y-3 p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/40 hover:border-primary/40 transition-all">
                  <div className="w-14 h-14 lg:w-16 lg:h-16 mx-auto rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    <Icon name={feature.icon as any} size={24} className="text-primary lg:w-7 lg:h-7" />
                  </div>
                  <h3 className="font-semibold text-base lg:text-lg">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="text-center space-y-3 lg:space-y-4">
              <h2 className="font-cormorant text-3xl lg:text-5xl font-bold">Каталог автомобилей</h2>
              <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
                Найдите идеальный автомобиль для вашей поездки
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <CarFilters onFilterChange={setFilters} />
            </div>

            {featuredCars.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Icon name="Star" size={24} className="text-primary" />
                  <h3 className="font-cormorant text-2xl lg:text-3xl font-semibold">Рекомендуем</h3>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredCars.map(car => (
                    <CarCard
                      key={car.id}
                      {...car}
                      image={car.images[0]}
                      isVerified={car.landlord?.isVerified}
                      onClick={() => navigate(`/car/${car.id}`)}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Icon name="Car" size={24} className="text-primary" />
                <h3 className="font-cormorant text-2xl lg:text-3xl font-semibold">Все автомобили</h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            </div>

            {allCars.length === 0 && (
              <div className="text-center py-12 lg:py-20 space-y-4">
                <Icon name="SearchX" size={48} className="mx-auto text-muted-foreground lg:w-16 lg:h-16" />
                <div className="space-y-2">
                  <h3 className="text-xl lg:text-2xl font-semibold">Ничего не найдено</h3>
                  <p className="text-muted-foreground">Попробуйте изменить параметры фильтра</p>
                </div>
                <Button 
                  variant="outline"
                  onClick={() => setFilters({
                    priceRange: [1000, 10000],
                    brand: 'all',
                    year: 'all',
                    city: 'all'
                  })}
                >
                  Сбросить фильтры
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6 lg:space-y-8">
            <h2 className="font-cormorant text-3xl lg:text-5xl font-bold">
              Готовы начать путешествие?
            </h2>
            <p className="text-base lg:text-xl text-muted-foreground max-w-2xl mx-auto">
              Забронируйте автомобиль прямо сейчас или разместите своё авто для аренды
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-base lg:text-lg h-12 lg:h-14 px-6 lg:px-8 rounded-full"
                onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Icon name="Search" size={20} className="mr-2" />
                Выбрать автомобиль
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-base lg:text-lg h-12 lg:h-14 px-6 lg:px-8 rounded-full"
                onClick={() => setIsModalOpen(true)}
              >
                <Icon name="DollarSign" size={20} className="mr-2" />
                Заработать на аренде
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/40 py-8 lg:py-12 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Icon name="Car" size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-cormorant text-xl lg:text-2xl font-bold">KEYRIDER</h3>
                  <p className="text-xs lg:text-sm text-muted-foreground">© 2025 Все права защищены</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Icon name="Instagram" size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Icon name="Send" size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Icon name="Mail" size={20} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

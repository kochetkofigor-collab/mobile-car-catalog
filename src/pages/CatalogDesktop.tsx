import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car } from '@/data/cars';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import ListingRequestModal from '@/components/ListingRequestModal';
import Footer from '@/components/Footer';
import Logo from '@/components/Logo';
import { carsService, brandsService, citiesService, type Brand } from '@/services/firestore';

export default function CatalogDesktop() {
  const navigate = useNavigate();
  const [cars, setCars] = useState<Car[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    brand: 'all',
    city: 'all',
    priceRange: [1000, 10000] as [number, number],
    year: 'all',
    category: 'all'
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    Promise.all([
      carsService.getAll(),
      brandsService.getAll(),
      citiesService.getAll()
    ])
      .then(([carsData, brandsData, citiesData]) => {
        setCars(carsData);
        setBrands(brandsData);
        setCities(citiesData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load data:', err);
        setLoading(false);
      });
  }, []);

  const filteredCars = cars.filter(car => {
    const brandMatch = filters.brand === 'all' || car.brand === filters.brand;
    const cityMatch = filters.city === 'all' || car.city === filters.city;
    const yearMatch = filters.year === 'all' || car.year.toString() === filters.year;
    const priceMatch = car.pricePerDay >= filters.priceRange[0] && car.pricePerDay <= filters.priceRange[1];
    const categoryMatch = filters.category === 'all' || 
      (filters.category === 'promo' && car.isPromo) ||
      (filters.category === 'new' && car.isNew) ||
      (filters.category === 'comingSoon' && car.comingSoonDate);
    return brandMatch && cityMatch && yearMatch && priceMatch && categoryMatch;
  });

  const years = Array.from(new Set(cars.map(car => car.year))).sort((a, b) => b - a);

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
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-12">
              <div>
                <Logo size="lg" />
                <p className="text-sm text-muted-foreground mt-1">Площадка для выбора авто</p>
              </div>
              
              <nav className="flex items-center gap-8">
                <a 
                  href="#" 
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-all relative group"
                >
                  Каталог
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </a>
                <a 
                  href="#" 
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-all relative group"
                >
                  О нас
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </a>
                <a 
                  href="#" 
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-all relative group"
                >
                  Контакты
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </a>
              </nav>
            </div>
            
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(true)}
              className="border-border/60 hover:border-primary/50 hover:bg-primary/5 hover:text-foreground transition-all"
            >
              <Icon name="DollarSign" size={20} className="mr-2" />
              Разместить авто
            </Button>
          </div>
        </div>
      </header>

      <ListingRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-3 space-y-6">
            <Card className="p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-cormorant text-2xl font-semibold flex items-center gap-2">
                  <Icon name="SlidersHorizontal" size={20} className="text-primary" />
                  Фильтры
                </h2>
                <span className="text-sm text-muted-foreground">
                  Найдено: <span className="font-semibold text-primary">{filteredCars.length}</span>
                </span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Категория</label>
                  <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Все" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все</SelectItem>
                      <SelectItem value="promo">Акции</SelectItem>
                      <SelectItem value="new">Новинки</SelectItem>
                      <SelectItem value="comingSoon">Скоро появится</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Город</label>
                  <Select value={filters.city} onValueChange={(value) => setFilters(prev => ({ ...prev, city: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Все города" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все города</SelectItem>
                      {cities.map(city => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Марка</label>
                  <Select value={filters.brand} onValueChange={(value) => setFilters(prev => ({ ...prev, brand: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Все марки" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все марки</SelectItem>
                      {brands.map(brand => (
                        <SelectItem key={brand.id} value={brand.name}>{brand.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Год выпуска</label>
                  <Select value={filters.year} onValueChange={(value) => setFilters(prev => ({ ...prev, year: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Любой год" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Любой год</SelectItem>
                      {years.map(year => (
                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 pt-1">
                  <label className="block text-sm font-medium mb-2 flex items-center gap-1.5">
                    <Icon name="Banknote" size={14} />
                    Цена за сутки
                  </label>
                  <Slider
                    value={filters.priceRange}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: [value[0], value[1]] as [number, number] }))}
                    min={1000}
                    max={10000}
                    step={500}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs">
                    <span className="text-primary font-semibold">{filters.priceRange[0].toLocaleString('ru-RU')} ₽</span>
                    <span className="text-primary font-semibold">{filters.priceRange[1].toLocaleString('ru-RU')} ₽</span>
                  </div>
                </div>

                {(filters.brand !== 'all' || filters.city !== 'all' || filters.year !== 'all' || filters.category !== 'all' || filters.priceRange[0] !== 1000 || filters.priceRange[1] !== 10000) && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setFilters({ brand: 'all', city: 'all', year: 'all', category: 'all', priceRange: [1000, 10000] })}
                  >
                    <Icon name="X" size={16} className="mr-2" />
                    Сбросить фильтры
                  </Button>
                )}
              </div>
            </Card>
          </aside>

          <main className="col-span-9">
            {filteredCars.length === 0 ? (
              <Card className="p-12 text-center">
                <Icon name="Car" size={64} className="mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Автомобили не найдены</h3>
                <p className="text-muted-foreground">Попробуйте изменить фильтры поиска</p>
              </Card>
            ) : (
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCars.map(car => (
                  <Card 
                    key={car.id} 
                    className={`overflow-hidden hover:border-primary/50 transition-all cursor-pointer group ${
                      car.isHighlighted ? 'ring-2 ring-primary shadow-lg shadow-primary/20' : ''
                    }`}
                    onClick={() => navigate(`/car/${car.id}`)}
                  >
                    <div className="relative aspect-video overflow-hidden bg-muted">
                      <img 
                        src={car.images[0]} 
                        alt={car.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {car.landlord?.isVerified && (
                        <div className="absolute top-2 right-2 pointer-events-none">
                          <Badge className="bg-primary text-primary-foreground">
                            <Icon name="ShieldCheck" size={12} className="mr-1" />
                            Проверенный арендодатель
                          </Badge>
                        </div>
                      )}
                      {car.isHighlighted && (
                        <div className="absolute bottom-2 left-2 pointer-events-none">
                          <Badge className="bg-yellow-500 text-yellow-950">
                            <Icon name="Star" size={12} className="mr-1" />
                            VIP
                          </Badge>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      {(car.isNew || car.isPromo || car.comingSoonDate || car.rentalOnly) && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {car.isNew && (
                            <Badge className="bg-primary text-primary-foreground pointer-events-none text-xs">
                              Новинка
                            </Badge>
                          )}
                          {car.isPromo && (
                            <Badge className="bg-destructive text-destructive-foreground pointer-events-none text-xs">
                              Акция
                            </Badge>
                          )}
                          {car.comingSoonDate && (
                            <Badge className="bg-primary text-primary-foreground pointer-events-none text-xs">
                              Скоро • {new Date(car.comingSoonDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
                            </Badge>
                          )}
                          {car.rentalOnly && (
                            <Badge className="bg-secondary text-secondary-foreground pointer-events-none text-xs">
                              Только аренда
                            </Badge>
                          )}
                        </div>
                      )}
                      <h3 className={`font-cormorant text-xl font-semibold mb-1 group-hover:text-primary transition-colors ${!(car.isNew || car.isPromo || car.comingSoonDate || car.rentalOnly) ? 'mt-1' : ''}`}>
                        {car.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {car.year} год • {car.city}
                      </p>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-2xl font-bold text-primary">{car.pricePerDay.toLocaleString('ru-RU')} ₽</p>
                          <p className="text-xs text-muted-foreground">за сутки</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold">{car.deposit.toLocaleString('ru-RU')} ₽</p>
                          <p className="text-xs text-muted-foreground">Депозит</p>
                        </div>
                      </div>
                      <div className="pt-3 border-t border-border/40">
                        <p className="text-xs text-muted-foreground flex items-start gap-1.5">
                          <Icon name="Info" size={12} className="flex-shrink-0 mt-0.5" />
                          <span>Условия и цена могут отличаться. Уточняйте детали у арендодателя перед бронированием.</span>
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
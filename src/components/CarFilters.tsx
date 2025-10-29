import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { citiesService, brandsService, type Brand } from '@/services/firestore';

interface CarFiltersProps {
  onFilterChange: (filters: {
    priceRange: [number, number];
    brand: string;
    year: string;
    city: string;
  }) => void;
}

export const CarFilters = ({ onFilterChange }: CarFiltersProps) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([1000, 10000]);
  const [brand, setBrand] = useState('all');
  const [year, setYear] = useState('all');
  const [city, setCity] = useState('all');
  const [cities, setCities] = useState<string[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    Promise.all([
      citiesService.getAll(),
      brandsService.getAll()
    ])
      .then(([citiesData, brandsData]) => {
        setCities(citiesData);
        setBrands(brandsData);
      })
      .catch(err => console.error('Failed to load data:', err));
  }, []);

  const handlePriceChange = (value: number[]) => {
    const range: [number, number] = [value[0], value[1]];
    setPriceRange(range);
    onFilterChange({ priceRange: range, brand, year, city });
  };

  const handleBrandChange = (value: string) => {
    setBrand(value);
    onFilterChange({ priceRange, brand: value, year, city });
  };

  const handleYearChange = (value: string) => {
    setYear(value);
    onFilterChange({ priceRange, brand, year: value, city });
  };

  const handleCityChange = (value: string) => {
    setCity(value);
    onFilterChange({ priceRange, brand, year, city: value });
  };

  return (
    <Card className="p-4 space-y-4 border-border/40 bg-card/50 backdrop-blur-sm">
      <div className="flex items-center gap-2 pb-3 border-b border-border/40">
        <Icon name="SlidersHorizontal" size={20} className="text-primary" />
        <h2 className="font-cormorant text-xl font-semibold">Фильтры</h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
            <Icon name="Car" size={14} />
            Марка
          </label>
          <Select value={brand} onValueChange={handleBrandChange}>
            <SelectTrigger className="bg-background border-border/40 h-9">
              <SelectValue placeholder="Марка" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все</SelectItem>
              {brands.map(brand => (
                <SelectItem key={brand.id} value={brand.name}>{brand.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
            <Icon name="Calendar" size={14} />
            Год
          </label>
          <Select value={year} onValueChange={handleYearChange}>
            <SelectTrigger className="bg-background border-border/40 h-9">
              <SelectValue placeholder="Год" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
              <SelectItem value="2020">2020</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
          <Icon name="MapPin" size={14} />
          Город
        </label>
        <Select value={city} onValueChange={handleCityChange}>
          <SelectTrigger className="bg-background border-border/40 h-9">
            <SelectValue placeholder="Город" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все города</SelectItem>
            {cities.map(city => (
              <SelectItem key={city} value={city}>{city}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 pt-1">
        <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
          <Icon name="Banknote" size={14} />
          Цена за сутки
        </label>
        <Slider
          value={priceRange}
          onValueChange={handlePriceChange}
          min={1000}
          max={10000}
          step={500}
          className="w-full"
        />
        <div className="flex justify-between text-xs">
          <span className="text-primary font-semibold">{priceRange[0].toLocaleString('ru-RU')} ₽</span>
          <span className="text-primary font-semibold">{priceRange[1].toLocaleString('ru-RU')} ₽</span>
        </div>
      </div>
    </Card>
  );
};
import { useState, useEffect } from 'react';
import { Car } from '@/data/cars';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface CarFormProps {
  car?: Car;
  onSave: (car: Partial<Car>) => void;
  onCancel: () => void;
}

interface City {
  id: number;
  name: string;
}

export default function CarForm({ car, onSave, onCancel }: CarFormProps) {
  const [cities, setCities] = useState<City[]>([]);
  const [formData, setFormData] = useState<Partial<Car>>({
    name: car?.name || '',
    brand: car?.brand || '',
    year: car?.year || new Date().getFullYear(),
    pricePerDay: car?.pricePerDay || 0,
    deposit: car?.deposit || 0,
    buyoutMonths: car?.buyoutMonths || 0,
    images: car?.images || [],
    city: car?.city || '',
    isNew: car?.isNew || false,
    isPromo: car?.isPromo || false,
  });

  useEffect(() => {
    fetch('https://functions.poehali.dev/98f72ddd-b05e-4e9e-96a6-ddb57c179216')
      .then(r => r.json())
      .then(data => setCities(data))
      .catch(err => console.error('Failed to load cities:', err));
  }, []);

  useEffect(() => {
    if (car) {
      setFormData(car);
    }
  }, [car]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field: keyof Car, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-background border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {car ? 'Редактировать автомобиль' : 'Добавить автомобиль'}
          </h2>
          <button onClick={onCancel} className="p-2 hover:bg-muted rounded-full transition-colors">
            <Icon name="X" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Бренд</label>
              <Input
                value={formData.brand}
                onChange={(e) => handleChange('brand', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Название</label>
              <Input
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Год</label>
              <Input
                type="number"
                value={formData.year}
                onChange={(e) => handleChange('year', parseInt(e.target.value))}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Цена/день (₽)</label>
              <Input
                type="number"
                value={formData.pricePerDay}
                onChange={(e) => handleChange('pricePerDay', parseInt(e.target.value))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Залог (₽)</label>
              <Input
                type="number"
                value={formData.deposit}
                onChange={(e) => handleChange('deposit', parseInt(e.target.value))}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Выкуп (мес)</label>
              <Input
                type="number"
                value={formData.buyoutMonths}
                onChange={(e) => handleChange('buyoutMonths', parseInt(e.target.value))}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Город</label>
            <Select value={formData.city} onValueChange={(value) => handleChange('city', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите город" />
              </SelectTrigger>
              <SelectContent>
                {cities.map(city => (
                  <SelectItem key={city.id} value={city.name}>{city.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">URL изображений (через запятую)</label>
            <Input
              value={Array.isArray(formData.images) ? formData.images.join(', ') : ''}
              onChange={(e) => handleChange('images', e.target.value.split(',').map(s => s.trim()))}
              placeholder="https://..., https://..."
            />
          </div>

          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isNew}
                onChange={(e) => handleChange('isNew', e.target.checked)}
                className="w-4 h-4 rounded border-input"
              />
              <span className="text-sm">Новинка</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isPromo}
                onChange={(e) => handleChange('isPromo', e.target.checked)}
                className="w-4 h-4 rounded border-input"
              />
              <span className="text-sm">Акция</span>
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              <Icon name="Save" size={18} className="mr-2" />
              Сохранить
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              Отмена
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
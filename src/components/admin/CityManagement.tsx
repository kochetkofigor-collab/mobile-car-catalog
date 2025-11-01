import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { citiesService, type City } from '@/services/firestore';

export default function CityManagement() {
  const [cities, setCities] = useState<City[]>([]);
  const [newCityName, setNewCityName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCities();
  }, []);

  const loadCities = async () => {
    setLoading(true);
    try {
      const data = await citiesService.getAllWithIds();
      setCities(data);
    } catch (err) {
      console.error('Failed to load cities:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCity = async () => {
    if (!newCityName.trim()) return;

    try {
      await citiesService.add(newCityName.trim());
      setNewCityName('');
      loadCities();
    } catch (err) {
      console.error('Failed to add city:', err);
    }
  };

  const handleDeleteCity = async (cityId: string) => {
    if (!confirm('Удалить этот город?')) return;

    try {
      await citiesService.delete(cityId);
      loadCities();
    } catch (err) {
      console.error('Failed to delete city:', err);
      alert('Ошибка при удалении города');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Icon name="Loader2" size={32} className="text-primary animate-spin" />
      </div>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="font-cormorant text-2xl font-semibold mb-4">Управление городами</h2>
      
      <div className="flex gap-2 mb-6">
        <Input
          placeholder="Введите название города"
          value={newCityName}
          onChange={(e) => setNewCityName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddCity()}
        />
        <Button onClick={handleAddCity} disabled={!newCityName.trim()}>
          <Icon name="Plus" size={18} className="mr-2" />
          Добавить
        </Button>
      </div>

      <div className="space-y-2">
        {cities.map(city => (
          <Card key={city.id} className="p-3 hover:border-primary/50 transition-all">
            <div className="flex items-center justify-between">
              <span className="font-medium">{city.name}</span>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => handleDeleteCity(city.id)}
              >
                <Icon name="Trash2" size={16} />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
}
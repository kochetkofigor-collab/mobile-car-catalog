import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Car, Landlord } from '@/data/cars';
import CarForm from '@/components/admin/CarForm';
import LessorForm from '@/components/admin/LessorForm';

export default function Admin() {
  const [cars, setCars] = useState<Car[]>([]);
  const [landlords, setLandlords] = useState<Landlord[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [editingLandlord, setEditingLandlord] = useState<Landlord | null>(null);
  const [showCarForm, setShowCarForm] = useState(false);
  const [showLandlordForm, setShowLandlordForm] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    Promise.all([
      fetch('https://functions.poehali.dev/e47007a1-86f7-427c-b1d7-4027839fd8eb').then(r => r.json()),
      fetch('https://functions.poehali.dev/d4435c2a-3bd7-4d37-8c77-18eec246da73').then(r => r.json())
    ])
      .then(([carsData, landlordsData]) => {
        setCars(carsData);
        setLandlords(landlordsData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load data:', err);
        setLoading(false);
      });
  };

  const handleSaveCar = (carData: Partial<Car>) => {
    const method = editingCar ? 'PUT' : 'POST';
    const body = editingCar ? { ...carData, id: editingCar.id } : carData;

    fetch('https://functions.poehali.dev/e47007a1-86f7-427c-b1d7-4027839fd8eb', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then(() => {
        loadData();
        setShowCarForm(false);
        setEditingCar(null);
      })
      .catch(err => console.error('Failed to save car:', err));
  };

  const handleSaveLandlord = (landlordData: Partial<Landlord>) => {
    const method = editingLandlord ? 'PUT' : 'POST';
    const body = editingLandlord ? { ...landlordData, id: editingLandlord.id } : landlordData;

    fetch('https://functions.poehali.dev/d4435c2a-3bd7-4d37-8c77-18eec246da73', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then(() => {
        loadData();
        setShowLandlordForm(false);
        setEditingLandlord(null);
      })
      .catch(err => console.error('Failed to save landlord:', err));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Icon name="Loader2" size={48} className="mx-auto text-primary animate-spin" />
          <p className="text-muted-foreground">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 pb-8">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Icon name="Settings" size={24} className="text-primary" />
            <h1 className="font-cormorant text-3xl font-bold">Панель управления</h1>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 mt-6">
        <Tabs defaultValue="cars" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="cars">Автомобили ({cars.length})</TabsTrigger>
            <TabsTrigger value="landlords">Арендодатели ({landlords.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="cars" className="space-y-4">
            <Card className="p-6">
              <h2 className="font-cormorant text-2xl font-semibold mb-4">Управление автомобилями</h2>
              <div className="space-y-3">
                {cars.map(car => (
                  <Card key={car.id} className="p-4 hover:border-primary/50 transition-all">
                    <div className="flex items-center gap-4">
                      <img 
                        src={car.images[0]} 
                        alt={car.name}
                        className="w-24 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{car.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {car.year} • {car.city} • {car.pricePerDay.toLocaleString('ru-RU')} ₽/сутки
                        </p>
                        {car.landlord && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Арендодатель: {car.landlord.name}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {car.isNew && (
                          <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Новинка</span>
                        )}
                        {car.isPromo && (
                          <span className="px-2 py-1 bg-destructive/10 text-destructive text-xs rounded">Акция</span>
                        )}
                      </div>
                      <Button variant="outline" size="sm">
                        <Icon name="Pencil" size={16} className="mr-1" />
                        Редактировать
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
              <Button 
                className="mt-4 w-full"
                onClick={() => {
                  setEditingCar(null);
                  setShowCarForm(true);
                }}
              >
                <Icon name="Plus" size={18} className="mr-2" />
                Добавить автомобиль
              </Button>
            </Card>
          </TabsContent>

          <TabsContent value="landlords" className="space-y-4">
            <Card className="p-6">
              <h2 className="font-cormorant text-2xl font-semibold mb-4">Управление арендодателями</h2>
              <div className="space-y-3">
                {landlords.map(landlord => (
                  <Card key={landlord.id} className="p-4 hover:border-primary/50 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="User" size={24} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{landlord.name}</h3>
                          {landlord.isVerified && (
                            <Icon name="BadgeCheck" size={16} className="text-primary" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {landlord.phone}
                        </p>
                        <div className="flex gap-2 mt-1">
                          {landlord.whatsapp && (
                            <span className="text-xs text-muted-foreground">WhatsApp: {landlord.whatsapp}</span>
                          )}
                          {landlord.telegram && (
                            <span className="text-xs text-muted-foreground">Telegram: @{landlord.telegram}</span>
                          )}
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setEditingLandlord(landlord);
                          setShowLandlordForm(true);
                        }}
                      >
                        <Icon name="Pencil" size={16} className="mr-1" />
                        Редактировать
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
              <Button 
                className="mt-4 w-full"
                onClick={() => {
                  setEditingLandlord(null);
                  setShowLandlordForm(true);
                }}
              >
                <Icon name="Plus" size={18} className="mr-2" />
                Добавить арендодателя
              </Button>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="p-6 mt-6 border-primary/30 bg-primary/5">
          <div className="flex items-start gap-3">
            <Icon name="Info" size={20} className="text-primary mt-0.5" />
            <div>
              <h3 className="font-semibold mb-1">Информация</h3>
              <p className="text-sm text-muted-foreground">
                Здесь вы можете управлять автомобилями и арендодателями. Все изменения сохраняются в базе данных.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {showCarForm && (
        <CarForm
          car={editingCar || undefined}
          onSave={handleSaveCar}
          onCancel={() => {
            setShowCarForm(false);
            setEditingCar(null);
          }}
        />
      )}

      {showLandlordForm && (
        <LessorForm
          lessor={editingLandlord || undefined}
          onSave={handleSaveLandlord}
          onCancel={() => {
            setShowLandlordForm(false);
            setEditingLandlord(null);
          }}
        />
      )}
    </div>
  );
}
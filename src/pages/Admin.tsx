import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Car, Landlord } from '@/data/cars';
import CarForm from '@/components/admin/CarForm';
import LessorForm from '@/components/admin/LessorForm';
import CityManagement from '@/components/admin/CityManagement';

export default function Admin() {
  const navigate = useNavigate();
  const [cars, setCars] = useState<Car[]>([]);
  const [landlords, setLandlords] = useState<Landlord[]>([]);
  const [listingRequests, setListingRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [editingLandlord, setEditingLandlord] = useState<Landlord | null>(null);
  const [showCarForm, setShowCarForm] = useState(false);
  const [showLandlordForm, setShowLandlordForm] = useState(false);


  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    loadData();
  }, [navigate]);

  const loadData = () => {
    Promise.all([
      fetch('https://functions.poehali.dev/e47007a1-86f7-427c-b1d7-4027839fd8eb').then(r => r.json()),
      fetch('https://functions.poehali.dev/d4435c2a-3bd7-4d37-8c77-18eec246da73').then(r => r.json()),
      fetch('https://functions.poehali.dev/9e377815-dae4-48c3-a1c7-aafee87663ed').then(r => r.json())
    ])
      .then(([carsData, landlordsData, requestsData]) => {
        setCars(carsData);
        setLandlords(landlordsData);
        setListingRequests(requestsData);
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

  const handleDeleteCar = (carId: number) => {
    if (!confirm('Удалить этот автомобиль?')) return;

    fetch(`https://functions.poehali.dev/e47007a1-86f7-427c-b1d7-4027839fd8eb?id=${carId}`, {
      method: 'DELETE'
    })
      .then(() => loadData())
      .catch(err => console.error('Failed to delete car:', err));
  };

  const handleDeleteLandlord = (landlordId: number) => {
    if (!confirm('Удалить этого комитента?')) return;

    fetch(`https://functions.poehali.dev/d4435c2a-3bd7-4d37-8c77-18eec246da73?id=${landlordId}`, {
      method: 'DELETE'
    })
      .then(() => loadData())
      .catch(err => console.error('Failed to delete landlord:', err));
  };

  const handleDeleteRequest = (requestId: number) => {
    if (!confirm('Удалить эту заявку?')) return;

    fetch(`https://functions.poehali.dev/9e377815-dae4-48c3-a1c7-aafee87663ed?id=${requestId}`, {
      method: 'DELETE'
    })
      .then(() => loadData())
      .catch(err => console.error('Failed to delete request:', err));
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
        <div className="max-w-6xl mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 md:gap-3">
              <Icon name="Settings" size={20} className="text-primary md:w-6 md:h-6" />
              <h1 className="font-cormorant text-xl md:text-3xl font-bold truncate">Панель управления</h1>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                localStorage.removeItem('isAdminAuthenticated');
                navigate('/login');
              }}
              className="shrink-0"
            >
              <Icon name="LogOut" size={16} className="md:mr-2" />
              <span className="hidden md:inline">Выйти</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 mt-4 md:mt-6">
        <Tabs defaultValue="cars" className="space-y-4 md:space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="cars" className="text-xs md:text-sm">
              <span className="hidden sm:inline">Автомобили</span>
              <span className="sm:hidden">Авто</span>
              <span className="ml-1">({cars.length})</span>
            </TabsTrigger>
            <TabsTrigger value="landlords" className="text-xs md:text-sm">
              <span className="hidden sm:inline">Комитенты</span>
              <span className="sm:hidden">Комит.</span>
              <span className="ml-1">({landlords.length})</span>
            </TabsTrigger>
            <TabsTrigger value="requests" className="text-xs md:text-sm">
              <span className="hidden sm:inline">Заявки</span>
              <span className="sm:hidden">Заяв.</span>
              <span className="ml-1">({listingRequests.length})</span>
            </TabsTrigger>
            <TabsTrigger value="cities" className="text-xs md:text-sm">Города</TabsTrigger>
          </TabsList>

          <TabsContent value="cars" className="space-y-4">
            <Card className="p-4 md:p-6">
              <h2 className="font-cormorant text-xl md:text-2xl font-semibold mb-4">Управление автомобилями</h2>
              <div className="space-y-3">
                {cars.map(car => (
                  <Card key={car.id} className="p-3 md:p-4 hover:border-primary/50 transition-all">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
                      <img 
                        src={car.images[0]} 
                        alt={car.name}
                        className="w-full sm:w-24 h-32 sm:h-16 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0 w-full">
                        <h3 className="font-semibold truncate">{car.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {car.year} • {car.city}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {car.pricePerDay.toLocaleString('ru-RU')} ₽/сутки
                        </p>
                        {car.landlord && (
                          <p className="text-xs text-muted-foreground mt-1 truncate">
                            {car.landlord.name}
                          </p>
                        )}
                        <div className="flex gap-2 mt-2 sm:hidden">
                          {car.isNew && (
                            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Новинка</span>
                          )}
                          {car.isPromo && (
                            <span className="px-2 py-1 bg-destructive/10 text-destructive text-xs rounded">Акция</span>
                          )}
                        </div>
                      </div>
                      <div className="hidden sm:flex gap-2">
                        {car.isNew && (
                          <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded whitespace-nowrap">Новинка</span>
                        )}
                        {car.isPromo && (
                          <span className="px-2 py-1 bg-destructive/10 text-destructive text-xs rounded whitespace-nowrap">Акция</span>
                        )}
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto flex-wrap">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setEditingCar(car);
                            setShowCarForm(true);
                          }}
                          className="flex-1 sm:flex-none"
                        >
                          <Icon name="Pencil" size={16} className="sm:mr-1" />
                          <span className="hidden sm:inline">Редактировать</span>
                        </Button>
                        <Button 
                          variant={car.isHighlighted ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            const updatedCar = { ...car, isHighlighted: !car.isHighlighted };
                            fetch('https://functions.poehali.dev/e47007a1-86f7-427c-b1d7-4027839fd8eb', {
                              method: 'PUT',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify(updatedCar)
                            })
                              .then(() => loadData())
                              .catch(err => console.error('Failed to update highlight:', err));
                          }}
                          className="flex-1 sm:flex-none"
                        >
                          <Icon name="Zap" size={16} className="sm:mr-1" />
                          <span className="hidden sm:inline">{car.isHighlighted ? 'Убрать' : 'Выделить'}</span>
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteCar(car.id)}
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
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
            <Card className="p-4 md:p-6">
              <h2 className="font-cormorant text-xl md:text-2xl font-semibold mb-4">Управление комитентами</h2>
              <div className="space-y-3">
                {landlords.map(landlord => (
                  <Card key={landlord.id} className="p-3 md:p-4 hover:border-primary/50 transition-all">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="User" size={24} className="text-primary" />
                      </div>
                      <div className="flex-1 min-w-0 w-full">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold truncate">{landlord.name}</h3>
                          {landlord.isVerified && (
                            <Icon name="BadgeCheck" size={16} className="text-primary flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {landlord.phone}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 mt-1">
                          {landlord.whatsapp && (
                            <span className="text-xs text-muted-foreground truncate">WhatsApp: {landlord.whatsapp}</span>
                          )}
                          {landlord.telegram && (
                            <span className="text-xs text-muted-foreground truncate">Telegram: @{landlord.telegram}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setEditingLandlord(landlord);
                            setShowLandlordForm(true);
                          }}
                          className="flex-1 sm:flex-none"
                        >
                          <Icon name="Pencil" size={16} className="sm:mr-1" />
                          <span className="hidden sm:inline">Редактировать</span>
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteLandlord(landlord.id)}
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
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
                Добавить комитента
              </Button>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            <Card className="p-4 md:p-6">
              <h2 className="font-cormorant text-xl md:text-2xl font-semibold mb-4">Заявки на размещение</h2>
              <div className="space-y-3">
                {listingRequests.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Заявок пока нет</p>
                ) : (
                  listingRequests.map(request => (
                    <Card key={request.id} className="p-3 md:p-4 hover:border-primary/50 transition-all">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon name="User" size={24} className="text-primary" />
                        </div>
                        <div className="flex-1 min-w-0 w-full">
                          <h3 className="font-semibold truncate">{request.name}</h3>
                          <p className="text-sm text-muted-foreground">{request.phone}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(request.createdAt).toLocaleString('ru-RU')}
                          </p>
                        </div>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteRequest(request.id)}
                          className="w-full sm:w-auto"
                        >
                          <Icon name="Trash2" size={16} className="sm:mr-1" />
                          <span className="hidden sm:inline">Удалить</span>
                        </Button>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="cities" className="space-y-4">
            <CityManagement />
          </TabsContent>
        </Tabs>

        <Card className="p-4 md:p-6 mt-4 md:mt-6 border-primary/30 bg-primary/5">
          <div className="flex items-start gap-3">
            <Icon name="Info" size={20} className="text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-1 text-sm md:text-base">Информация</h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                Здесь вы можете управлять автомобилями и арендодателями. Все изменения сохраняются в базе данных.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {showCarForm && (
        <CarForm
          car={editingCar || undefined}
          landlords={landlords}
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
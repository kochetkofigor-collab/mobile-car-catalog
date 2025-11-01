import { useState, useEffect } from 'react';
import { Car, Landlord } from '@/data/cars';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { citiesService, brandsService, type Brand } from '@/services/firestore';
import { uploadImage } from '@/services/image-upload';

interface CarFormProps {
  car?: Car;
  landlords: Landlord[];
  onSave: (car: Partial<Car>) => void;
  onCancel: () => void;
}

export default function CarForm({ car, landlords, onSave, onCancel }: CarFormProps) {
  const [cities, setCities] = useState<string[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [uploading, setUploading] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
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
    landlord: car?.landlord || undefined,
    color: car?.color || '',
    plateNumber: car?.plateNumber || '',
    sts: car?.sts || '',
    vin: car?.vin || '',
    comingSoonDate: car?.comingSoonDate || '',
    rentalOnly: car?.rentalOnly || false,
  });

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

  useEffect(() => {
    if (car) {
      setFormData(car);
    }
  }, [car]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.brand || !formData.city) {
      alert('Заполните все обязательные поля: Марка, Название, Город');
      return;
    }
    
    if (!formData.images || formData.images.length === 0 || formData.images[0] === '') {
      alert('Добавьте хотя бы одно изображение');
      return;
    }
    
    onSave(formData);
  };

  const handleChange = (field: keyof Car, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const uploadPromises = Array.from(files).map(file => uploadImage(file));
      const urls = await Promise.all(uploadPromises);
      
      const currentImages = formData.images || [];
      handleChange('images', [...currentImages, ...urls]);
    } catch (err) {
      console.error('Failed to upload images:', err);
      alert('Ошибка при загрузке изображений');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...(formData.images || [])];
    newImages.splice(index, 1);
    handleChange('images', newImages);
  };

  const handleMoveImage = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;
    
    const newImages = [...(formData.images || [])];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    
    handleChange('images', newImages);
  };

  const handleMoveLeft = (index: number) => {
    if (index > 0) {
      handleMoveImage(index, index - 1);
    }
  };

  const handleMoveRight = (index: number) => {
    if (formData.images && index < formData.images.length - 1) {
      handleMoveImage(index, index + 1);
    }
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
              <label className="block text-sm font-medium mb-2">Марка</label>
              <Select value={formData.brand} onValueChange={(value) => handleChange('brand', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите марку" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map(brand => (
                    <SelectItem key={brand.id} value={brand.name}>{brand.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Комитент</label>
            <Select 
              value={formData.landlord?.id || 'none'} 
              onValueChange={(value) => {
                if (value === 'none') {
                  handleChange('landlord', undefined);
                } else {
                  const selectedLandlord = landlords.find(l => l.id === value);
                  handleChange('landlord', selectedLandlord);
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите комитента" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Без комитента</SelectItem>
                {landlords.map(landlord => (
                  <SelectItem key={landlord.id} value={landlord.id}>
                    {landlord.name} {landlord.isVerified && '✓'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Фотографии</label>
            <div className="space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {formData.images?.map((url, index) => (
                  <div key={index} className="relative group aspect-video bg-muted rounded-lg overflow-hidden border-2 border-border">
                    <img src={url} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute top-1 left-1 px-2 py-0.5 bg-background/90 backdrop-blur-sm rounded text-xs font-semibold">
                      {index + 1}
                    </div>
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => handleMoveLeft(index)}
                        disabled={index === 0}
                        className="p-1.5 bg-background/90 backdrop-blur-sm rounded-full disabled:opacity-30 hover:bg-background"
                      >
                        <Icon name="ChevronLeft" size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveRight(index)}
                        disabled={!formData.images || index === formData.images.length - 1}
                        className="p-1.5 bg-background/90 backdrop-blur-sm rounded-full disabled:opacity-30 hover:bg-background"
                      >
                        <Icon name="ChevronRight" size={14} />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 p-1.5 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Icon name="X" size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <div>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="cursor-pointer"
                />
                {uploading && (
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                    <Icon name="Loader2" size={12} className="animate-spin" />
                    Загрузка...
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Цвет</label>
              <Input
                value={formData.color}
                onChange={(e) => handleChange('color', e.target.value)}
                placeholder="Черный"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Гос. номер</label>
              <Input
                value={formData.plateNumber}
                onChange={(e) => handleChange('plateNumber', e.target.value)}
                placeholder="А123БВ777"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">СТС</label>
              <Input
                value={formData.sts}
                onChange={(e) => handleChange('sts', e.target.value)}
                placeholder="7777 123456"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">VIN</label>
              <Input
                value={formData.vin}
                onChange={(e) => handleChange('vin', e.target.value)}
                placeholder="WBADT43452G123456"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Скоро в наличии (дата появления)</label>
            <Input
              type="date"
              value={formData.comingSoonDate}
              onChange={(e) => handleChange('comingSoonDate', e.target.value || null)}
              placeholder="Выберите дату"
            />
            <p className="text-xs text-muted-foreground mt-1">Оставьте пустым, если авто уже доступно</p>
          </div>

          <div className="flex gap-4 flex-wrap">
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
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isHighlighted}
                onChange={(e) => handleChange('isHighlighted', e.target.checked)}
                className="w-4 h-4 rounded border-input"
              />
              <span className="text-sm">VIP подсветка</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.rentalOnly}
                onChange={(e) => handleChange('rentalOnly', e.target.checked)}
                className="w-4 h-4 rounded border-input"
              />
              <span className="text-sm">Только аренда (без выкупа)</span>
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
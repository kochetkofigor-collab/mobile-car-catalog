import { useState, useEffect } from 'react';
import { Landlord } from '@/data/cars';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface LessorFormProps {
  lessor?: Landlord;
  onSave: (lessor: Partial<Landlord>) => void;
  onCancel: () => void;
}

export default function LessorForm({ lessor, onSave, onCancel }: LessorFormProps) {
  const [formData, setFormData] = useState<Partial<Landlord>>({
    name: lessor?.name || '',
    phone: lessor?.phone || '',
    whatsapp: lessor?.whatsapp || '',
    telegram: lessor?.telegram || '',
    isVerified: lessor?.isVerified || false,
  });

  useEffect(() => {
    if (lessor) {
      setFormData(lessor);
    }
  }, [lessor]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field: keyof Landlord, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl border border-border max-w-lg w-full">
        <div className="bg-background border-b border-border px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-semibold">
            {lessor ? 'Редактировать комитента' : 'Добавить комитента'}
          </h2>
          <button onClick={onCancel} className="p-2 hover:bg-muted rounded-full transition-colors">
            <Icon name="X" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Имя</label>
            <Input
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Телефон</label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+7 (999) 123-45-67"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">WhatsApp</label>
            <Input
              value={formData.whatsapp}
              onChange={(e) => handleChange('whatsapp', e.target.value)}
              placeholder="79991234567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Telegram</label>
            <Input
              value={formData.telegram}
              onChange={(e) => handleChange('telegram', e.target.value)}
              placeholder="username"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isVerified}
                onChange={(e) => handleChange('isVerified', e.target.checked)}
                className="w-4 h-4 rounded border-input"
              />
              <span className="text-sm">Проверенный комитент</span>
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
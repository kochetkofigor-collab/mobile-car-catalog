import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { partnersService } from '@/services/firestore';
import type { Partner } from '@/data/partners';

export default function PartnerManagement() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    website: '',
    description: ''
  });

  useEffect(() => {
    loadPartners();
  }, []);

  const loadPartners = async () => {
    try {
      const data = await partnersService.getAll();
      setPartners(data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load partners:', err);
      setLoading(false);
    }
  };

  const handleEdit = (partner: Partner) => {
    setEditingPartner(partner);
    setFormData({
      name: partner.name,
      logo: partner.logo,
      website: partner.website || '',
      description: partner.description || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить этого партнёра?')) return;

    try {
      await partnersService.delete(id);
      loadPartners();
    } catch (err) {
      console.error('Failed to delete partner:', err);
      alert('Ошибка при удалении партнёра');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingPartner) {
        await partnersService.update(editingPartner.id, formData);
      } else {
        await partnersService.add({
          ...formData,
          createdAt: new Date().toISOString()
        });
      }
      loadPartners();
      setShowForm(false);
      setEditingPartner(null);
      setFormData({ name: '', logo: '', website: '', description: '' });
    } catch (err) {
      console.error('Failed to save partner:', err);
      alert('Ошибка при сохранении партнёра');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPartner(null);
    setFormData({ name: '', logo: '', website: '', description: '' });
  };

  if (loading) {
    return <div className="text-center py-8">Загрузка...</div>;
  }

  return (
    <div className="space-y-4">
      <Card className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-cormorant text-xl md:text-2xl font-semibold">Управление партнёрами</h2>
          {!showForm && (
            <Button onClick={() => setShowForm(true)} size="sm">
              <Icon name="Plus" size={16} className="mr-2" />
              Добавить партнёра
            </Button>
          )}
        </div>

        {showForm && (
          <Card className="p-4 mb-4 bg-muted/30">
            <h3 className="font-semibold mb-4">
              {editingPartner ? 'Редактировать партнёра' : 'Новый партнёр'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Название</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="logo">URL логотипа</Label>
                <Input
                  id="logo"
                  type="url"
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="website">Сайт (необязательно)</Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="description">Описание (необязательно)</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">
                  <Icon name="Check" size={16} className="mr-2" />
                  Сохранить
                </Button>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Отмена
                </Button>
              </div>
            </form>
          </Card>
        )}

        <div className="space-y-3">
          {partners.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Партнёры не добавлены</p>
          ) : (
            partners.map(partner => (
              <Card key={partner.id} className="p-4 hover:border-primary/50 transition-all">
                <div className="flex items-center gap-4">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-20 h-20 object-contain rounded border border-border p-2"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold">{partner.name}</h3>
                    {partner.website && (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        {partner.website}
                      </a>
                    )}
                    {partner.description && (
                      <p className="text-sm text-muted-foreground mt-1">{partner.description}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(partner)}
                    >
                      <Icon name="Edit" size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(partner.id)}
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}

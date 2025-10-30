import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { brandsService, type Brand } from '@/services/firestore';

export default function BrandManagement() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [newBrand, setNewBrand] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      const data = await brandsService.getAll();
      setBrands(data);
    } catch (err) {
      console.error('Failed to load brands:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!newBrand.trim()) return;

    try {
      await brandsService.add(newBrand.trim());
      setNewBrand('');
      loadBrands();
    } catch (err) {
      console.error('Failed to add brand:', err);
    }
  };

  const handleUpdate = async (id: string) => {
    if (!editingName.trim()) return;

    try {
      await brandsService.update(id, editingName.trim());
      setEditingId(null);
      setEditingName('');
      loadBrands();
    } catch (err) {
      console.error('Failed to update brand:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить эту марку?')) return;

    try {
      await brandsService.delete(id);
      loadBrands();
    } catch (err) {
      console.error('Failed to delete brand:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Icon name="Loader2" size={24} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card className="p-4 md:p-6">
      <h2 className="font-cormorant text-xl md:text-2xl font-semibold mb-4">Марки автомобилей</h2>
      
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Название марки (например: Toyota)"
          value={newBrand}
          onChange={(e) => setNewBrand(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <Button onClick={handleAdd} disabled={!newBrand.trim()}>
          <Icon name="Plus" size={16} className="mr-2" />
          Добавить
        </Button>
      </div>

      <div className="space-y-2">
        {brands.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            Марок пока нет. Добавьте первую марку!
          </p>
        ) : (
          brands.map((brand) => (
            <Card key={brand.id} className="p-3 hover:border-primary/50 transition-all">
              {editingId === brand.id ? (
                <div className="flex gap-2">
                  <Input
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleUpdate(brand.id!);
                      if (e.key === 'Escape') {
                        setEditingId(null);
                        setEditingName('');
                      }
                    }}
                    autoFocus
                  />
                  <Button
                    size="sm"
                    onClick={() => handleUpdate(brand.id!)}
                    disabled={!editingName.trim()}
                  >
                    <Icon name="Check" size={16} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingId(null);
                      setEditingName('');
                    }}
                  >
                    <Icon name="X" size={16} />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="font-medium">{brand.name}</span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingId(brand.id!);
                        setEditingName(brand.name);
                      }}
                    >
                      <Icon name="Edit2" size={14} />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(brand.id!)}
                    >
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ))
        )}
      </div>
    </Card>
  );
}
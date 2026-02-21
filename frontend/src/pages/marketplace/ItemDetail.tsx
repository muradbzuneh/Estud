import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button';
import { marketplaceService } from '../../services/marketplaceService';
import { MarketplaceItem } from '../../types';

export default function ItemDetail() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<MarketplaceItem | null>(null);

  useEffect(() => {
    if (id) {
      loadItem(id);
    }
  }, [id]);

  const loadItem = async (itemId: string) => {
    try {
      const data = await marketplaceService.getById(itemId);
      setItem(data);
    } catch (err) {
      console.error('Failed to load item');
    }
  };

  const handleFavorite = async () => {
    if (id) {
      try {
        await marketplaceService.toggleFavorite(id);
      } catch (err) {
        console.error('Failed to toggle favorite');
      }
    }
  };

  if (!item) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
      <p className="text-gray-700 mb-4">{item.description}</p>
      <p className="text-2xl font-bold mb-4">${item.price}</p>
      <Button onClick={handleFavorite}>Add to Favorites</Button>
    </div>
  );
}

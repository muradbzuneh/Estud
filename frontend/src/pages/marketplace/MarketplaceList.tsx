import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import { marketplaceService } from '../../services/marketplaceService';
import type { MarketplaceItem } from '../../types';

export default function MarketplaceList() {
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      const response = await marketplaceService.getAll();
      setItems(response.items || response);
    } catch (err) {
      console.error('Failed to load items');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container mx-auto p-6">Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Marketplace</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.length === 0 ? (
          <p className="text-gray-600">No items available</p>
        ) : (
          items.map((item) => (
            <Card
              key={item._id}
              onClick={() => navigate(`/marketplace/${item._id}`)}
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-600 line-clamp-2">{item.description}</p>
              <p className="text-lg font-bold mt-2">${item.price}</p>
              <p className="text-sm text-gray-500">
                Status: {item.status}
              </p>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

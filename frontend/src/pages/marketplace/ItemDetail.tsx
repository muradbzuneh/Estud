import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { marketplaceService } from '../../services/marketplaceService';
import type { MarketplaceItem } from '../../types';

export default function ItemDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<MarketplaceItem | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      loadItem(id);
    }
  }, [id]);

  const loadItem = async (itemId: string) => {
    try {
      setLoading(true);
      const data = await marketplaceService.getById(itemId);
      setItem(data);
    } catch (err) {
      console.error('Failed to load item');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id || !confirm('Are you sure you want to delete this item?')) return;
    
    try {
      await marketplaceService.delete(id);
      alert('Item deleted successfully');
      navigate('/marketplace');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete item');
    }
  };

  if (loading) return <div className="container mx-auto p-6">Loading...</div>;
  if (!item) return <div className="container mx-auto p-6">Item not found</div>;

  return (
    <div className="container mx-auto p-6">
      <Button onClick={() => navigate('/marketplace')}>← Back</Button>
      <div className="mt-6">
        <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
        <p className="text-gray-700 mb-4">{item.description}</p>
        <p className="text-2xl font-bold mb-4">${item.price}</p>
        <p className="text-sm text-gray-600 mb-2">Category: {item.category}</p>
        <p className="text-sm text-gray-600 mb-4">
          Status: <span className={`font-semibold ${
            item.status === 'available' ? 'text-green-600' : 'text-red-600'
          }`}>{item.status}</span>
        </p>
        <p className="text-sm text-gray-500">
          Seller: {item.seller.name}
        </p>
        <div className="mt-6">
          <Button onClick={handleDelete}>Delete Item</Button>
        </div>
      </div>
    </div>
  );
}

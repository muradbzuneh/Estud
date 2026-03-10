import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import { marketplaceService } from '../../services/marketplaceService';
import type { MarketplaceItem } from '../../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/';


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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Marketplace</h1>
        <button
          onClick={() => navigate('/marketplace/create')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Create Listing
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.length === 0 ? (
          <p className="text-gray-600 col-span-full text-center py-8">No items available</p>
        ) : (
          items.map((item) => (
            
            <Card
              key={item._id}
              onClick={() => navigate(`/marketplace/${item._id}`)}
              className="cursor-pointer hover:shadow-xl transition-shadow"
            >
              {item.images && item.images.length > 0 ? (
                <img
  src={
    item.images && item.images.length > 0
      ? `${API_URL}${item.images[0]}`
      : "/no-image.png"
  }
  alt={item.title}
/>
                
              ) : (
                <div className="w-full h-48 bg-gray-200 rounded-t-lg mb-3 flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 line-clamp-2 mb-2">{item.description}</p>
              <div className="flex justify-between items-center mt-3">
                <p className="text-2xl font-bold text-blue-600">${item.price}</p>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  item.isSold ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                }`}>
                  {item.isSold ? 'Sold' : 'Available'}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Category: {item.category}
              </p>
            </Card>
            
          ))
        )}
      </div>
    </div>
  );
}

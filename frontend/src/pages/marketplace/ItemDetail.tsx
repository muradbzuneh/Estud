import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { marketplaceService } from '../../services/marketplaceService';
import type { MarketplaceItem } from '../../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/uploads';

export default function ItemDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<MarketplaceItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const handleMarkAsSold = async () => {
    if (!id || !confirm('Mark this item as sold?')) return;
    
    try {
      await marketplaceService.markAsSold(id);
      alert('Item marked as sold');
      if (id) loadItem(id);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update item');
    }
  };

  if (loading) return <div className="container mx-auto p-6">Loading...</div>;
  if (!item) return <div className="container mx-auto p-6">Item not found</div>;

  return (
    <div className="container mx-auto p-6">
      <Button onClick={() => navigate('/marketplace')}>← Back to Marketplace</Button>
      
      <div className="mt-6 grid md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          {item.images && item.images.length > 0 ? (
         <>
              <img
                src={`${API_URL}${item.images[currentImageIndex]}`}
                alt={item.title}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
                onError={(e) => {
                  e.currentTarget.src = '/Drawing1.jpg';

                }}
              />
              {item.images.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto">
                  {item.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={`${API_URL}${img}`}
                      alt={`${item.title} ${idx + 1}`}
                      className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${
                        idx === currentImageIndex ? 'border-blue-600' : 'border-gray-300'
                      }`}
                      onClick={() => setCurrentImageIndex(idx)}
                      onError={(e) => {
                        e.currentTarget.src = '/Drawing.jpg';
                      }}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 text-xl">No Image Available</span>
            </div>
          )}
        </div>

        {/* Item Details */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{item.title}</h1>
          
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-blue-600">${item.price}</span>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
              item.isSold ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
            }`}>
              {item.isSold ? 'Sold' : 'Available'}
            </span>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Category:</span> {item.category}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Department:</span> {item.department?.name || 'N/A'}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Seller:</span> {item.createdBy?.name || 'Unknown'}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{item.description}</p>
          </div>

          <div className="flex gap-3">
            {!item.isSold && (
              <Button onClick={handleMarkAsSold} className="bg-green-600 hover:bg-green-700">
                Mark as Sold
              </Button>
            )}
            <Button onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete Item
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

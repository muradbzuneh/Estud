import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Input from '../../components/Input';
import { announcementService } from '../../services/announcementService';

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'announcements' | 'cafe' | 'marketplace'>('announcements');
  
  // Announcement form state
  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleAnnouncementSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      await announcementService.create(announcementForm);
      setMessage('Announcement created successfully!');
      setAnnouncementForm({ title: '', content: '' });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to create announcement');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('announcements')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'announcements'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Announcements
          </button>
          <button
            onClick={() => setActiveTab('cafe')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'cafe'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Cafe Management
          </button>
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'marketplace'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Marketplace
          </button>
        </nav>
      </div>

      {activeTab === 'announcements' && (
        <Card>
          <h2 className="text-2xl font-bold mb-6">Create Announcement</h2>
          <form onSubmit={handleAnnouncementSubmit} className="space-y-4">
            <Input
              label="Title"
              value={announcementForm.title}
              onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                value={announcementForm.content}
                onChange={(e) => setAnnouncementForm({ ...announcementForm, content: e.target.value })}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {message && (
              <div className={`p-3 rounded ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {message}
              </div>
            )}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Announcement'}
            </Button>
          </form>
        </Card>
      )}

      {activeTab === 'cafe' && (
        <Card>
          <h2 className="text-2xl font-bold mb-6">Cafe Management</h2>
          <p className="text-gray-600">Cafe time slot management coming soon...</p>
        </Card>
      )}

      {activeTab === 'marketplace' && (
        <Card>
          <h2 className="text-2xl font-bold mb-6">Marketplace Management</h2>
          <p className="text-gray-600">Marketplace moderation tools coming soon...</p>
        </Card>
      )}
    </div>
  );
}

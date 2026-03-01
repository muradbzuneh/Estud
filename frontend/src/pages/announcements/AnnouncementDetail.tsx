import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { announcementService } from '../../services/announcementService';
import type { Announcement } from '../../types';
import { formatDate } from '../../utils/formatDate';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AnnouncementDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      loadAnnouncement(id);
    }
  }, [id]);

  const loadAnnouncement = async (announcementId: string) => {
    try {
      setLoading(true);
      const data = await announcementService.getById(announcementId);
      setAnnouncement(data);
    } catch (err) {
      console.error('Failed to load announcement');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container mx-auto p-6">Loading...</div>;
  if (!announcement) return <div className="container mx-auto p-6">Announcement not found</div>;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Button onClick={() => navigate('/announcements')}>← Back to Announcements</Button>
      
      <div className="mt-6 bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-4xl font-bold">{announcement.title}</h1>
          {announcement.isImportant && (
            <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold">
              Important
            </span>
          )}
        </div>

        {announcement.image && (
          <img
            src={`${API_URL}${announcement.image}`}
            alt={announcement.title}
            className="w-full max-h-96 object-cover rounded-lg mb-6"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        )}

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-semibold text-gray-700">Posted by:</span>
              <span className="ml-2 text-gray-600">{announcement.createdBy?.name || 'Admin'}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Date:</span>
              <span className="ml-2 text-gray-600">{formatDate(announcement.createdAt)}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Target:</span>
              <span className="ml-2 text-gray-600">{announcement.targetGroup}</span>
            </div>
            {announcement.department && (
              <div>
                <span className="font-semibold text-gray-700">Department:</span>
                <span className="ml-2 text-gray-600">{announcement.department.name}</span>
              </div>
            )}
            <div>
              <span className="font-semibold text-gray-700">Expires:</span>
              <span className="ml-2 text-gray-600">{formatDate(announcement.expiresAt)}</span>
            </div>
          </div>
        </div>

        <div className="prose max-w-none">
          <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
            {announcement.content}
          </p>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import { announcementService } from '../../services/announcementService';
import type { Announcement  } from '../../types';
import { formatDate } from '../../utils/formatDate';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AnnouncementList() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    try {
      setLoading(true);
      const data = await announcementService.getAll();
      setAnnouncements(data.announcements || data);
    } catch (err) {
      console.error('Failed to load announcements');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container mx-auto p-6">Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Announcements</h1>
      <div className="grid gap-6">
        {announcements.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No announcements available</p>
        ) : (
          announcements.map((announcement) => (
            <Card
              key={announcement._id}
              onClick={() => navigate(`/announcements/${announcement._id}`)}
              className="cursor-pointer hover:shadow-xl transition-shadow"
            >
              <div className="flex gap-4">
                {announcement.image && (
                  <img
                    src={`${API_URL}${announcement.image}`}
                    alt={announcement.title}
                    className="w-32 h-32 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className="text-2xl font-semibold mb-2">{announcement.title}</h3>
                    {announcement.isImportant && (
                      <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                        Important
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 line-clamp-2 mb-3">{announcement.content}</p>
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span>By: {announcement.createdBy?.name || 'Admin'}</span>
                    <span>•</span>
                    <span>{formatDate(announcement.createdAt)}</span>
                    {announcement.isRead !== undefined && (
                      <>
                        <span>•</span>
                        <span className={announcement.isRead ? 'text-gray-400' : 'text-blue-600 font-semibold'}>
                          {announcement.isRead ? 'Read' : 'Unread'}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

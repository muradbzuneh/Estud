import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import { announcementService } from '../../services/announcementService';
import { Announcement } from '../../types';

export default function AnnouncementList() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    try {
      const data = await announcementService.getAll();
      setAnnouncements(data);
    } catch (err) {
      console.error('Failed to load announcements');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Announcements</h1>
      <div className="grid gap-4">
        {announcements.map((announcement) => (
          <Card
            key={announcement._id}
            onClick={() => navigate(`/announcements/${announcement._id}`)}
          >
            <h3 className="text-xl font-semibold">{announcement.title}</h3>
            <p className="text-gray-600">{announcement.content}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { announcementService } from '../../services/announcementService';
import type { Announcement } from '../../types';

export default function AnnouncementDetail() {
  const { id } = useParams<{ id: string }>();
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);

  useEffect(() => {
    if (id) {
      loadAnnouncement(id);
    }
  }, [id]);

  const loadAnnouncement = async (announcementId: string) => {
    try {
      const data = await announcementService.getById(announcementId);
      setAnnouncement(data);
    } catch (err) {
      console.error('Failed to load announcement');
    }
  };

  if (!announcement) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{announcement.title}</h1>
      <p className="text-gray-700">{announcement.content}</p>
    </div>
  );
}

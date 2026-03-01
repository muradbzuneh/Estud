import express from 'express' ;
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routes/authRoutes/user.routes.js';
import deptRoute from './routes/authRoutes/department.routes.js';
import Login from './routes/authRoutes/auth.routes.js';
import timsloteRoute from './routes/cafeRoutes/slotRoute.js'
import reservationRoutes from "./routes/cafeRoutes/reservation.routes.js"
import Announcment from './routes/AnnouncmentRoutes/AnnouncmentRoutes.js';
import notificationRoutes from './routes/AnnouncmentRoutes/notificationRoutes.js';
import marketplaceRoutes from './routes/commerceRoutes/marketplace.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app= express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// Routes
app.use("/api/students", router)
app.use("/api/department", deptRoute)
app.use("/api/students", Login)
app.use("/api/timeslotes", timsloteRoute)
app.use("/api/reservations", reservationRoutes)
app.use("/api/announcment", Announcment)
app.use("/api/notifications", notificationRoutes)
app.use("/api/marketplace", marketplaceRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!');
});

export default app;
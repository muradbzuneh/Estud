import express from 'express' ;
import cors from 'cors';
import router from './routes/authRoutes/user.routes.js';
import deptRoute from './routes/authRoutes/department.routes.js';
import Login from './routes/authRoutes/auth.routes.js';
import timsloteRoute from './routes/cafeRoutes/slotRoute.js'
import reservationRoutes from "./routes/cafeRoutes/reservation.routes.js"
import Announcment from './routes/AnnouncmentRoutes/AnnouncmentRoutes.js';
import marketplaceRoutes from './routes/commerceRoutes/marketplace.routes.js';

const app= express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/students", router)
app.use("/api/department", deptRoute)
app.use("/api/students", Login)
app.use("/api/timeslotes", timsloteRoute)
app.use("/api/reservations", reservationRoutes)
app.use("/api/announcment", Announcment)
app.use("/api/marketplace", marketplaceRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!');
});

export default app;
import express from 'express' ;
import router from './routes/authRoutes/user.routes.js';
import deptRoute from './routes/authRoutes/department.routes.js';
import Login from './routes/authRoutes/auth.routes.js';
import timsloteRoute from './routes/cafeRoutes/slotRoute.js'
import reservationRoutes from "./routes/cafeRoutes/reservation.routes.js"
import Announcment from './routes/AnnouncmentRoutes/AnnouncmentRoutes.js';


const app= express();
app.use(express.json());

//middleware 

app.get

app.use("/api/students", router)
app.use("/api/department", deptRoute)
app.use("/api/students", Login)
app.use("/api/timeslotes", timsloteRoute)
app.use("/api/reservations", reservationRoutes)
app.use("/api/announcment", Announcment)





app.get('/', (req, res) => {
    res.send('Hello World!');
});

export default app;
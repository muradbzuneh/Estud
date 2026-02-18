import express from 'express' ;
import router from './routes/user.routes.js';
import deptRoute from './routes/department.routes.js';
import Login from './routes/auth.routes.js';
import timsloteRoute from './routes/slotRoute.js'

const app= express();
app.use(express.json());

//middleware 

app.get

app.use("/api/students", router)
app.use("/api/department", deptRoute)
app.use("/api/students", Login)
app.use("/api/timeslotes", timsloteRoute)




app.get('/', (req, res) => {
    res.send('Hello World!');
});

export default app;
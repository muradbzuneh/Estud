import express from 'express' ;
import router from './routes/user.routes.js';
import deptRoute from './routes/department.routes.js';

const app= express();
app.use(express.json());

app.use("/api/students", router)
app.use("/api/department", deptRoute)




app.get('/', (req, res) => {
    res.send('Hello World!');
});

export default app;
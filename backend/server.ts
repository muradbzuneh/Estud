import app  = require('./src/app') ;
import dotenv = require('dotenv');
import connectDB = require('./src/config/db');



dotenv.config();
connectDB();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
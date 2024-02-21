const express = require('express');
const app = express();
const cors = require('cors');


app.use(cors());
app.use(express.json());

const mainRouter = require('./routes/index')

const PORT = process.env.PORT || 3000;
const IP_ADDRESS = '0.0.0.0'; 


app.listen(PORT, IP_ADDRESS, () => {
    console.log(`Server is running on ${IP_ADDRESS}:${PORT}`);
    });






    app.use('/food',mainRouter)
   


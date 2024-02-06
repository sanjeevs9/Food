const express = require('express');
const app = express();
const cors = require('cors');


app.use(cors());
app.use(express.json());

const mainRouter = require('./routes/index')




app.use('/food',mainRouter)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


const express = require('express');
const app = express();
const cors = require('cors');


app.use(cors({origin:'*'}));
app.use(express.json());

const mainRouter = require('./routes/index')

const PORT = process.env.PORT || 5000; 

app.get("/",(req,res)=>{
    res.json({
        message:"hello from backend"
    })
})
app.listen(PORT,  () => {
    console.log(`Server is running on ${PORT}`);
    });






    app.use('/food',mainRouter)
   


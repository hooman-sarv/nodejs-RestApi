const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const userRoutes = require('./routes/user')
const productRoutes = require('./routes/product')

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/hooman',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


app.use('/user', userRoutes);
app.use('/product', productRoutes);

app.use(cors());









const port = 3000;

app.listen(port , ()=>{
    console.log(`server is running on port ${port}`);
});
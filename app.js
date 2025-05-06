// initialize express
const express = require('express')

// importing mongo DB 
const mongoose = require('mongoose');
const Product = require('./models/product.model.js')
const productRoute = require('./routes/product.route.js');

const app = express()
const port = 3000

// middleware part for passing JSON in post request
app.use(express.json())

//routes
app.use("/api/products", productRoute)

// database connection
mongoose.connect("mongodb+srv://Admin:27Ynnp3vwCCZIYVA@backenddb.icqyros.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB")
.then(() => {
    // first connect to database and then start the server
    console.log("Connected to database!")
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      })
      
})
.catch(() => {
    console.log("Connection to database failed!")
})


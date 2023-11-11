const express = require('express')
const dotenv = require('dotenv').config()
// const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const connectDB = require('../cofig/connectDB')
const app = express();
const userRoute = require('../Routes/userRoute')
const contactRoute = require('../Routes/contactRoute')
const errorHandler = require('../middleware/errorMiddleware')
const cookieParser = require('cookie-parser')

//reinstalled 
const path = require('path');
const serverPath = path.resolve(__dirname, 'server.js');
require(serverPath);

//Routes

app.get('/', (req,res) =>{
    res.send('Home page');
    });

    
//middlewaress
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())
// app.use(cors({
//     origin: ['http://localhost:3000'],
//     credentials:true,
// }))

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
const PORT =  5000

//Routes middleware
app.use('/api/users', userRoute)
app.use('/api/contactus', contactRoute)

// error handler
app.use(errorHandler)


//connect to mongoDB and start server

mongoose.connect(`mongodb+srv://akinwumisehinde:sahar@cluster0.3fqmwzt.mongodb.net/imis?retryWrites=true&w=majority`)
.then(() =>{
    app.listen(PORT, () =>{
        console.log(`server running on port ${PORT}`)
    })
})
.catch((err) => console.log(err))

//connect 2

// const startServer = async () =>{
//     try {
//         await  connectDB();
//         app.listen(PORT,() =>{
//             console.log(`server running on port ${PORT}`)
//      } )
//     } catch (error) {
//         console.log(error)
//     }
// }
// startServer()
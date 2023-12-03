import express from 'express';
import ownerRouter from './routes/owners.js';
import resturentRoute from './routes/resturent.js';



const app = express();

app.use(express.json())

app.use('/api' , ownerRouter)
app.use('/api' , resturentRoute)
 

app.listen(3000 , ()=> {
  console.log("server listening on port")  
})  
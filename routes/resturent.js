
 import express from "express"
import { addResturent, checkResturent } from "../controllers/resturant.js"
import { authenticate } from "../middleware/middleware.js"

 const resturentRoute = express.Router()

 resturentRoute.get('/resturents' , checkResturent)
 resturentRoute.post('/resturents/register', authenticate ,  addResturent )

 export default resturentRoute
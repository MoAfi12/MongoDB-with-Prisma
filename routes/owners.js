import express from 'express';
import  {addOwner, checkOwnerLogin, getOwners, getSpecial, updatedOwner}  from '../controllers/owners.js';


const ownerRouter = express.Router()

ownerRouter.get('/users' , getOwners)
ownerRouter.post('/users/register' , addOwner)
ownerRouter.put('/users/:id' , updatedOwner)
ownerRouter.get('/users/:id' ,getSpecial)
ownerRouter.post('/users/login' ,  checkOwnerLogin)


 export default ownerRouter
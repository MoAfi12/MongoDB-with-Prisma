import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../config/config.js"




export const authenticate = async(req , res ,next)=>{
const token = await req.headers.authorization

if(!token){
    res.status(401).send({message: "Invalid token provided in request"})
    return;
}
console.log("token received from server ", token)

const tokenWithout = token.split(" ")[1]

jwt.verify(tokenWithout , SECRET_KEY , (error , decoded)=>{
if(error){
    res.status(401).send({message: "Invalid token without secret key"})
}
req.decoded = decoded

next()
}
)

}
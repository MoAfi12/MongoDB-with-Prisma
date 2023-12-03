import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const SECRET_KEY = process.env.SECRET_KEY

const prisma = new PrismaClient()


export const getOwners =  async (req, res) => {
   try {
     const owners = await prisma.owner.findMany({});
 
     if (owners.length > 0) {
       res.status(200).send({message: 'Owners' , owners: owners});
     } else {
       res.status(404).json({ message: "Owners not found" });
     }
   } catch (err) {
     res.status(500).json({ message: "Failed to get owners", err });
     return;
   }
 };



export const addOwner = async (req, res) => {

   const { name, email , password} = req.body;
   try {
     
    const existOwner = await prisma.owner.findUnique({
      where:{
        email: email
      }
    })

    if(existOwner){
      res.status(404).send({message: 'Owner already exists'})
    }
      
    const hashedPassword = await bcrypt.hash(password , 12)
      
         const owner = await prisma.owner.create({
            data: {
               email,
               name,
               password: hashedPassword
            },
         });

         return res.status(200).send({ message: "Owner created", owner });
      
   } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Internal Server Error", error });
   }
};


export const updatedOwner = async(req , res)=>{
  try{

   const{id} = req.params
   const{email , name} = req.body
   const modefiedOwner = await prisma.owner.update({
    where:{
      id: String(id)
    },
    data: {
     email,
     name
    }
   })

   if(!modefiedOwner){
    res.status(404).send({message: 'Owner not found'})
    return;

   }
   res.status(200).send({message: 'Owner updated'})
  }
  catch(error){
   
    res.status(404).send({message: 'error happened updated' , error})

    return;
  }

}

export const getSpecial = async(req , res) => {
try {
  const{id} = req.params
  const getOwner = await prisma.owner.findUnique({
    where:{
      id: String(id),
    }
  })

  if(!getOwner){
    res.status(404).send({message: 'Owner not found'})
  }
  res.status(200).send({message: 'Owner' , getOwner})
} catch (error) {
  res.status(500).send(error)
}


}



export const checkOwnerLogin = async(req , res)=>{
  const{email, name , password} = req.body

  try {
    const loginOwner = await prisma.owner.findUnique({
      where:{
        email: email,

      }
    })
   
    if(!loginOwner) {
      res.status(404).send({message: 'Please enter your email correctly'})
    }
   
     const comparePassword = await bcrypt.compare(password , loginOwner.password )
     if(!comparePassword) {
     res.status(404).send({message: 'Please enter your password correctly'})
     
    }
  
    const token = jwt.sign({
      id: loginOwner.id , email: loginOwner.email
    },
    
  SECRET_KEY,
  {expiresIn: "1hr"}  
    )

  res.status(200).send({message: 'welcome back to the application' , token: token})


  } catch (error) {
    console.log(error)
    res.status(404).send({message: "Invalid login", error})
  }
}
import { PrismaClient } from "@prisma/client";



const prisma  = new PrismaClient()

export const checkResturent = async(req , res)=>{
    try {
        const findResturents = await prisma.resturent.findMany({})
        if(!findResturents.length > 0){
            res.status(404).send({message: "data about restures not found yet"})
            return;
        }
        res.status(200).send({message:"resturent found", findResturents})
    } catch (error) {
        res.status(404).send({message: "something went wrong found resturent" , error});
        return;
    }
}


export const addResturent = async(req , res)=>{
    const {name , location ,image , ownerId} = req.body

    try {
        const addNew = await prisma.resturent.create({
            data:{
                name,
                location,
                owner :{
                    connect:{
                        id :ownerId
                    }
                }
            }
        })

        if(!addNew){
            res.status(404).send({message: "Please try again registered resturent"})
            return;
        }

res.status(200).send({message: "success created resturent " , addNew}) 

    } catch (error) {
        res.status(404).send({message: "not created", error: error });
        console.log(error)
        return;
    }
}
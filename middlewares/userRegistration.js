import { users } from "../models/userModel.js";


export const userRegistration = async (req,res)=>{
     try {  
            const checkExisting = await users.findOne({"email":req.body.email});
            if(checkExisting){
                // return res.send(req.body.email) obj pathate hole .json use krte hobe
                return res.status(400).json({error:"user ase",email :req.body.email})
            }else{
                const data = new users({
                    name : req.body.name,
                    email : req.body.email,
                    number : req.body.number,
                })
                await data.save();
                return res.send(data)
            }
        }
     catch (error) {
            console.log(error)
        }
}
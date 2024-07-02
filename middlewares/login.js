import { users } from "../models/userModel.js"


export const login = async (req,res)=>{
        try {
            const data = await users.findOne({"email":req.body.email})
            if(data){
                if(data.number=== req.body.number){
                    return res.status(200).json({
                        "massage": "succes",
                        "data": data
                    })   
                }
                return res.status(401).json({
                    "massage" : "password wrong",
                    "data" : data
                })
            }else{
                return res.status(404).json({
                    "massage" : "user not exist",
                    "data" : data
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
import prisma from "../dbconnect/db.config.js";
import vine, { errors } from '@vinejs/vine'
import session from "express-session";
import { operatorTypeAdd } from "../validations/formValidation.js";

class OperatorTypeController {
    static async index(req,res){
        try {
            const operator = await prisma.operatorTypes.findMany({
                where: {
                    status: {
                        not: 5
                    }
                },
                orderBy: {
                    id: 'desc'
                }
            });
            
            res.render('admin/operator_type/index',{data:operator})
        } catch (error) {
            console.log(error);
        }
    }
    static async save(req,res){
        try {
            const body = req.body;
            const validator = vine.compile(operatorTypeAdd);
            const payload = await validator.validate({
                title:req.body.title,
                status:parseInt(req.body.status),
            });
            console.log(payload);
                const data  = {
                    title:req.body.title,
                    status:parseInt(req.body.status),
                }
            const user = await prisma.operatorTypes.create({
                data:payload
            })
            if (user) {
                return res.status(200).json({status:true,message:"Operator type added successfully."});
            }
                return res.status(200).json({status:false,message:"something went wrong!"});
        } catch (error) {
            if (error instanceof errors.E_VALIDATION_ERROR) {
                console.log(error.messages)
               return res.status(200).json({errors:error.messages});
            }else{
                return res.status(500).json({errors:error});
            }
        }
    }
}

export default OperatorTypeController;
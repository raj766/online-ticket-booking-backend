import prisma from "../dbconnect/db.config.js";
import vine, { errors } from '@vinejs/vine'
import { loginSchema,registerSchema } from "../validations/adminAuthValidation.js";
import bcrypt  from "bcryptjs";
import jwt from 'jsonwebtoken'
import session from "express-session";
class AdminAuthController {
    static async indexView(reg,res){
        try {
            res.render('admin/login')
        } catch (error) {
            console.log(error);
        }
    }
    static async loginAuth(req,res){
        try {
            const body = req.body;
            const validator = vine.compile(loginSchema);
            const payload = await validator.validate({email:body.username,password:body.password});
            //  const salt = bcrypt.genSaltSync(10);
            //  payload.password = bcrypt.hashSync(payload.password);
            //  payload.name ="Admin";
            // const user = await prisma.admin.create({
            //     data:payload
            // })
            
            const findAdminOne = await prisma.admin.findUnique({
                where:{
                    email:payload.email
                }
            });
           
            if (findAdminOne) {
                
                    if (!bcrypt.compareSync(payload.password , findAdminOne.password)) {
                        return res.status(200).json({status:false,message:"Invalid credenials."});
                    }

                    const payldData = {
                        id:findAdminOne.id,
                        name:findAdminOne.name,
                        email:findAdminOne.email,
                        loggedIn:true
                    }
                    req.session.name=findAdminOne.name;
                    req.session.email=findAdminOne.email;
                    req.session.loggedIn=true;

                    //  issue token to user
                    const token = jwt.sign(payldData,process.env.JWT_SECRET,{
                        expiresIn :"365d"
                    })
                    return res.status(200).json({'status':true,'message':"logged in successfully.",'token':token});
            }
            //return res.status(200).json({msg:'success'});
        } catch (error) {
            if (error instanceof errors.E_VALIDATION_ERROR) {
                console.log(error.messages)
               return res.status(200).json({errors:error.messages});
            }else{
                return res.status(500).json({errors:error});
            }
        }
    }
    static async dashboard(req,res){
        try {
            if (req.session.loggedIn) {

                req.session.views++;
                console.log(`Number of views: ${req.session.views}${req.session.name}${req.session.email}${req.session.loggedIn}`);
                res.render("admin/dashboard");
              } else {
                res.redirect(process.env.ADMIN_PREFIX);
              }
            
        } catch (error) {
            console.log(error);
            res.redirect(process.env.ADMIN_PREFIX);
        }
    }
}

export default AdminAuthController
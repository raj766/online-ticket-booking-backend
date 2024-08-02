import { Router } from "express";
import AdminAuthController from "../controllers/AdminAuthController.js";
import OperatorTypeController from "../controllers/OperatorTypeController.js";

const AdminAuthRoute = Router()

AdminAuthRoute.get('/',AdminAuthController.indexView);
AdminAuthRoute.post('/loginAuth',AdminAuthController.loginAuth);
AdminAuthRoute.get('/dashboard',AdminAuthController.dashboard);

// manage operator type
AdminAuthRoute.get('/operator-type',OperatorTypeController.index);
AdminAuthRoute.post('/saveOeratprType',OperatorTypeController.save);


export default AdminAuthRoute
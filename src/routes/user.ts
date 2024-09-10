import express, { Router } from "express";
import { createUser, deleteUser, getAllUsers, signInUser, updateUser } from "../controllers/auth/authController";
import { createUserValidation, signInUserValidation, updateValidation } from "../middlewares/auth/authValidation";
import { authenticate } from "../middlewares/auth/authMiddleware";

const router: Router = express.Router();

router.post('/register',createUserValidation,createUser);
router.post('/signin',signInUserValidation,signInUser);
router.put('/:id',updateValidation,authenticate,updateUser);
router.delete('/:id',authenticate,deleteUser);
router.get('/',authenticate,getAllUsers);
export default router;
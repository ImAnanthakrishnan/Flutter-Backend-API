import mongoose from 'mongoose';
import { IUser } from '../types/modelTypes';

const userSchema = new mongoose.Schema<IUser>({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
},{timestamps:true});

const User = mongoose.model('User',userSchema);

export default User;

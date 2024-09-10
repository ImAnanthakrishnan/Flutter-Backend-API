import { Request, Response } from "express";
import { validationResult } from "express-validator";
import User from "../../models/userModel";
import { generateToken, hashing } from "../../helpers/authHelper";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
  const errors = validationResult(req); //checking for validation error;
  if (!errors.isEmpty()) {
    res.status(400).json({
      message: errors.array(),
    });
    return;
  } //validation failed;

  const { username, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    res.status(409).json({
      message: `${name} is already a user`,
    });
  }

  const hashedPassword = await hashing(password); //hashing password

  user = new User({
    username,
    email,
    password: hashedPassword,
  });

  let newUser = await user.save(); //new user creation

  if (newUser) {
    res.status(200).json({
      message: `Thank you for registering`,
    });
  }
};

export const signInUser = async (req: Request, res: Response) => {
  const errors = validationResult(req); //checking for validation error;
  if (!errors.isEmpty()) {
    res.status(400).json({
      message: errors.array(),
    });
    return;
  } //validation failed;
  const { email } = req.body;
  let user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({
      message: "Please register",
    });
    return;
  }
  //password comparison
  let isPassword = user
    ? await bcrypt.compare(req.body.password, user.password)
    : false;

  if (!isPassword) {
    res.status(401).json({
      message: "Invalid credentials",
    });
  }

  let token = generateToken(user);

  res.status(200).json({
    success: true,
    message: "Successfully login",
    user,
    token,
  });
};

export const updateUser = async (req: Request, res: Response) => {
  const errors = validationResult(req); //checking for validation error;
  if (!errors.isEmpty()) {
    res.status(400).json({
      message: errors.array(),
    });
    return;
  } //validation failed;
  const {id} = req.params;
  const { username } = req.body;

  if(!username){
    res.status(400).json({message:'Bad Request'});
    return;
  }

  let existingUser = await User.findById( id );

  if (!existingUser) {
    res.status(404).json({
      message: "User not found",
    });
  }
  if (existingUser) {
    existingUser.username = username;
    const updatedUser = await existingUser.save();
    res.status(200).json({
      message: "Updated Successfully",
      updatedUser,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = User.findById(id);

  if (!user) {
    res.status(404).json({
      message: "User not found",
    });
  }

  const deletedUser = await User.findByIdAndDelete(id);

  return res.status(200).json({
    message: "User deleted successfully",
    deletedUser,
  });
};

export const getAllUsers = async (req: Request, res: Response) => {
  //all users from the database
  const users = await User.find();

  if (!users || users.length === 0) {
    return res.status(404).json({
      message: "No users found",
    });
  }

  //  list of users
  return res.status(200).json(users);
};

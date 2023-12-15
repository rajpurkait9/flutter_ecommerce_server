import { Request, Response } from "express";
import User from "../models/user.model";
import { errorHandler } from "../utils/errorHandler";
import { CreateJWTToken, tokenData } from "../utils/createNewToken";
import { EncryptString } from "../utils/encryptString";

const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, mobile }: tokenData = req.body;
    const isPhoneNumberAlreadyExsist = await User.findOne({
      mobile,
    });
    if (isPhoneNumberAlreadyExsist)
      return res.status(400).json({
        message: `this phone number ${mobile} already link with another user `,
      });

    const isEmailAlreadyExsist = await User.findOne({
      email,
    });

    if (isEmailAlreadyExsist)
      return res.status(400).json({
        message: `this email ${email} id already in use with another Id`,
      });
    let data: tokenData = {
      username,
      email,
      mobile,
    };

    let hashingPassword = await EncryptString(password);
    const token = CreateJWTToken(data);
    const user = await User.create({
      username,
      email,
      password: hashingPassword,
      mobile,
      token,
    });
    res.status(201).json({ user, message: "user created successfully" });
  } catch (error: any) {
    errorHandler(error, res);
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { mobileNo } = req.body;
    if (!mobileNo)
      return res.status(400).json({ message: "mobile number is required" });
    const isUserExsist = await User.find({
      mobile: mobileNo,
    });
    console.log(isUserExsist);
    if (isUserExsist.length === 0) {
      return res.status(200).json({
        mobileNo,
        message: "register",
      });
    } else {
      return res.status(200).json({
        user: isUserExsist,
        message: "Welcome back to the app",
      });
    }
  } catch (error: any) {
    errorHandler(error, res);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    const isIdValid = await User.find({
      _id: userId,
    });
    if (!isIdValid)
      return res.status(400).json({
        message: `user does not exit with this id ${userId}`,
      });
    else {
      await User.deleteOne({
        _id: userId,
      });
      return res.status(200).json({
        message: `User deleted successfully of this id ${userId}`,
      });
    }
  } catch (error: any) {
    errorHandler(error, res);
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    const { name, email, mobile } = req.body;
    res.status(200).json({
      message: `user updated successfully with this userId ${userId}`,
    });
  } catch (error: any) {
    errorHandler(error, res);
  }
};

export { registerUser, loginUser, deleteUser };

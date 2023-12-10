import { Request, Response } from "express";
import User from "../models/user.model";

const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    // const token = user.generateAuthToken();
    res.status(201).json({ user });
  } catch (error: any) {
    const message = error.message || "Internal server error";
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ message });
  }
};

export { registerUser };

import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const registration = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "user alrady exist" });
    user = new User({ username, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const paylaod = { user: { id: user._id } };

    if (typeof process.env.SECRETKEY == "string") {
      const token = jwt.sign(paylaod, process.env.SECRETKEY, {
        expiresIn: "1h",
      });
      return res.status(201).json({ token });
    }
  } catch (err: any) {
    console.log(err.message)
    return res.status(500).json({message: "server error"})
  }
};


const login = async (req: Request, res: Response) => {
    
}
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants/envVariables';
// import UserModel from "../schemas/userModel";

const auth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Error('It seems you need to log in first.');
    }
    const token = req.headers.authorization;
    const decoded = await jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export { auth };

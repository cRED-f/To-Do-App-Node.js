import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { setCookies } from "../utils/feature.js";
import ErrorHandler from "../middlewares/error.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email }).select("+password"); //schema te pass select:false chilo tai kotao access chilo nh tai aikhane +password kore add kore disi jate buja jai pass access korte parbe

    if (!user) {
      return next(new ErrorHandler("Invalid Email or Password", 400));
    }

    const isPassMatch = await bcrypt.compare(password, user.password);
    if (!isPassMatch) {
      return next(new ErrorHandler("Invalid  Password", 400));
    }
    setCookies(user, res, `Welcome Back ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return next(new ErrorHandler("User Already Exist", 400));
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    //utils e jabe
    setCookies(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};
// export const getMyProfile = async (req, res) => {
//   const { token } = req.cookies;
//   if (!token) {
//     return res.status(404).json({
//       success: true,
//       message: "Login First",
//     });
//   }
//   const decodedToken = jwt.verify(token, process.env.JWTCODE);
//   const user = await User.findById(decodedToken._id);
//   res.status(200).json({
//     success: true,
//     user,
//   });
// };
export const getMyProfile = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};
export const logout = async (req, res, next) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
      })
      .json({
        success: true,
        user: req.user,
      });
  } catch (error) {
    next(error);
  }
};

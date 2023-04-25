import jwt from "jsonwebtoken";

export const setCookies = (user, res, message, statusCode = 200) => {
  //ai function aro onk jaigai use hbe tai utils e create kore nisi
  const token = jwt.sign({ _id: user._id }, process.env.JWTCODE);
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 10 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message,
    });
};
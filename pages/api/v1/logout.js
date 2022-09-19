import { verify } from "jsonwebtoken";
import { serialize } from "cookie";

export default function logoutHandler(req, res) {
  const { TokenName } = req.cookies;

  try {
    verify(TokenName, process.env.DB_CLIENT_ID_TEXT);
    const serialized = serialize("TokenName", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });
    res.setHeader("Set-Cookie", serialized);
    res.status(200).json({message: "logout succesfully"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

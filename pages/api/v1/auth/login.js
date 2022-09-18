import Jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { verify } from "jsonwebtoken";
import { pool } from "../../config/db";

export default async function loginHandler(req, res) {
  switch (req.method) {
    case "GET":
      return await consultUser(req, res);
    case "POST":
      return await loginUser(req, res);
    default:
      return res.status(400).send("Method not allowed");
  }
}

const consultUser = async (req, res) => {
  try {
    const { TokenName } = req.cookies;

    const user = verify(TokenName, process.env.DB_CLIENT_ID);
    return res.json({ status: true });
  } catch (error) {
    return res.json({ status: false });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const valid = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  if (
    valid.test(email) &&
    typeof email === typeof "" &&
    typeof password === typeof "" &&
    password.length >= 8 &&
    email.length > 0
  ) {
    let emails = [];
    let passwords = [];

    const [result] = await pool.query("SELECT * FROM user;");

    result.map((e) => {
      emails.push(e.email);
      passwords.push(e.password);
    });

    if (emails.includes(email) && passwords.includes(password)) {
      try {
        const token = Jwt.sign(
          {
            exp: Math.floor(Date.now() / 100) + 60 * 60 * 24 * 30,
            email: email,
            password: password,
          },
          process.env.DB_CLIENT_ID
        );

        const serialized = serialize("TokenName", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 1000 * 60 * 60 * 2,
          path: "/",
        });

        res.setHeader("Set-Cookie", serialized);
        return res.json({ message: "login succesfully" });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
      }
    } else {
      return res.status(200).json({ message: "invalid email or password" });
    }
  } else {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

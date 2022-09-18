import { pool } from "../config/db";
import Jwt from "jsonwebtoken";

export default async function texthandler(req, res) {
  switch (req.method) {
    case "POST":
      return await insertText(req, res);
    case "GET":
      return await consultText(req, res);
    default:
      return res.status(400).send("Method not allowed");
  }
}

const consultText = async (req, res) => {
  try {
    const { TokenName } = req.cookies;
    const user = Jwt.verify(TokenName, process.env.DB_CLIENT_ID);
    const [csl] = await pool.query(
      `SELECT id FROM user WHERE email = "${user.email}"`
    );
    if (csl[0] !== undefined) {
      const id = csl[0].id;
      const [result] = await pool.query(
        `SELECT * FROM texts WHERE user_id = ${id}`
      );
      return res.status(200).json(result);
    }
  } catch (error) {
    console.log(error);
  }
};

const insertText = async (req, res) => {
  try {
    const { title, note } = req.body;
    const { TokenName } = req.cookies;
    const user = Jwt.verify(TokenName, process.env.DB_CLIENT_ID);
    if (typeof title === typeof "" && typeof note === typeof "") {
      const [result] = await pool.query(
        `SELECT id FROM user WHERE email = "${user.email}"`
      );
      const id = result[0].id;
      const insert = await pool.query(
        `INSERT INTO texts (title, note, user_id) values ("${title}","${note}", ${id})`
      );
      return res.status(200).json({ message: "ok" });
    }
  } catch (error) {
    console.log(error);
  }
};

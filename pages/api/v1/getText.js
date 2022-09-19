import { pool } from "../config/db";
import Jwt from "jsonwebtoken";

export default async function texthandler(req, res) {
  switch (req.method) {
    case "PUT":
      return await insertText(req, res);
    case "POST":
      return await consultText(req, res);
    default:
      return res.status(400).send("Method not allowed");
  }
}

const consultText = async (req, res) => {
  try {
    const { id } = req.body;
    const [result] = await pool.query(
      `SELECT * FROM texts WHERE notes_id = ${id}`
    );
    if (result[0] !== undefined) {
      return res.status(200).json(result[0]);
    }
  } catch (error) {
    console.log(error);
  }
};

const insertText = async (req, res) => {
  try {
    const { notes_id, title, note } = req.body;
    return await pool
      .query(
        `UPDATE texts SET title = "${title}", note = "${note}" WHERE notes_id = ${notes_id}`
      )
      .then(() => {
        return res.status(200).json({ id: notes_id });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

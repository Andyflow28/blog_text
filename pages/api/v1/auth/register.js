import { pool } from "../../config/db";

export default async function handlerUsers(req, res) {
  switch (req.method) {
    case "GET":
      return await getUsers(req, res);
    case "POST":
      return await registerUser(req, res);
    default:
      return res.status(400).send("Method not allowed");
  }
}

const getUsers = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM user;");
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const registerUser = async (req, res) => {
  try {
    const valid = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const { username, email, password } = req.body;
    if (
      valid.test(email) &&
      typeof email === typeof "" &&
      typeof password === typeof "" &&
      typeof username === typeof "" &&
      password.length >= 8 &&
      username.length > 0 &&
      email.length > 0
    ) {
      const emails = [];
      const usernames = [];
      const [consult] = await pool.query("SELECT * FROM user;");

      await consult.map((e) => {
        emails.push(e.email);
        usernames.push(e.password);
      });

      if (!emails.includes(email) && !usernames.includes(username)) {
        const result = await pool.query("INSERT INTO user SET ?", {
          username,
          email,
          password,
        });

        return res
          .status(200)
          .json({ message: "Your account has been Registed successfully" });
      } else {
        return res.status(200).json({
          message:
            "There is already an account with this email or with this user"
        });
      }
    } else {
      return res.status(200).json({
        message:
          "The email is not valid or the password has less than 8 characters"
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

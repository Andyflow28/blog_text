import { createPool } from "mysql2/promise";

const pool = createPool({
  host: process.env.DB_HOSTING,
  user: process.env.DB_USER_REMOTE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT_DATA,
  database: process.env.DB_BASE,
});

export { pool };
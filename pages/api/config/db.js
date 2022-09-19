import { createPool } from "mysql2/promise";

const pool = createPool({
  host: process.env.DB_HOSTING_TEXT,
  user: process.env.DB_USER_REMOTE_TEXT,
  password: process.env.DB_PASSWORD_TEXT,
  port: process.env.DB_PORT_DATA_TEXT,
  database: process.env.DB_BASE_TEXT,
});

export { pool };
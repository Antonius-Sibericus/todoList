import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "1214732",
    port: 5432,
    database: "todoapp"
  });

export default pool;
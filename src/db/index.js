import "dotenv/config";
import pg from "pg";

const database = new pg.Pool({
  connectionString: process.env.POSTGRES_URL,
});

export { database };

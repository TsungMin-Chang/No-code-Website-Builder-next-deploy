import { database } from "@/db";

export async function check_username_exist(name) {
  const result = await database.query(
    `SELECT count(*) FROM users WHERE name=$tag$${name}$tag$;`,
  );
  return result.rows[0].count !== "0";
}

export async function check_user_id_exist(user_id) {
  const result = await database.query(
    `SELECT count(*) FROM users WHERE user_id='${user_id}';`,
  );
  return result.rows[0].count !== "0";
}

export async function get_user_id(name, password) {
  const result = await database.query(
    `SELECT user_id FROM users WHERE name=$tag$${name}$tag$ AND password=md5($tag$${password}$tag$);`,
  );
  if (result.rowCount === 0) return "";
  return result.rows[0].user_id;
}

export async function get_user_name(user_id) {
  const result = await database.query(
    `SELECT name FROM users WHERE user_id='${user_id}';`,
  );
  if (result.rowCount === 0) return "";
  return result.rows[0].name;
}

export async function add_user(name, password) {
  const result = await database.query(
    `INSERT INTO users(name,password) VALUES ($tag$${name}$tag$,md5($tag$${password}$tag$)) ON CONFLICT(name) DO NOTHING RETURNING (user_id);`,
  );
  if (result.rowCount === 0) return "";
  return result.rows[0].user_id;
}

export async function update_user_password(user_id, new_password) {
  const result = await database.query(
    `UPDATE users SET password=md5($tag$${new_password}$tag$) WHERE user_id='${user_id}' RETURNING (user_id);`,
  );
  return result.rowCount === 1;
}

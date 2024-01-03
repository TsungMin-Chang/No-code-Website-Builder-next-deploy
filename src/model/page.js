import { database } from "@/db/index.js";

import { add_egde_node } from "./node.js";

export async function get_pages_by_user_id(user_id) {
  const result = await database.query(
    `SELECT page_id,name,description,css_type,background_image,background_color1,background_color2 FROM pages WHERE owner='${user_id}';`,
  );
  return result.rows;
}

export async function get_page_information(page_id) {
  const result = await database.query(
    `SELECT name,description,css_type,background_image,background_color1,background_color2 FROM pages WHERE page_id='${page_id}';`,
  );
  return result.rows[0];
}

export async function get_page_owner(page_id) {
  const result = await database.query(
    `SELECT owner FROM pages WHERE page_id='${page_id}';`,
  );
  if (result.rowCount === 0) return "";
  return result.rows[0].owner;
}

export async function get_edge_node_by_id(page_id) {
  const result = await database.query(
    `SELECT head_node_id,tail_node_id FROM pages WHERE page_id='${page_id}';`,
  );
  if (result.rowCount === 0) return [];
  const head_node_id = result.rows[0].head_node_id;
  const tail_node_id = result.rows[0].tail_node_id;
  return [head_node_id, tail_node_id];
}

export async function add_page(
  user_id,
  name,
  description,
  css_type,
  background_image,
  background_color1,
  background_color2,
) {
  let result = await database.query(
    `INSERT INTO pages(owner,name,description,css_type,background_image,background_color1,background_color2) VALUES ('${user_id}',$tag$${name}$tag$,$tag$${description}$tag$,${css_type},${background_image},'${background_color1}','${background_color2}') RETURNING (page_id);`,
  );
  const page_id = result.rows[0].page_id;
  const [head_node_id, tail_node_id] = await add_egde_node(page_id);
  await database.query(
    `UPDATE pages SET head_node_id='${head_node_id}',tail_node_id='${tail_node_id}' WHERE page_id='${page_id}';`,
  );
  return page_id;
}

export async function modify_page(page_id, column, content) {
  if (typeof content === "string") content = `$tag$${content}$tag$`;
  await database.query(
    `UPDATE pages SET ${column}=${content} WHERE page_id='${page_id}';`,
  );
}

export async function delete_page(page_id) {
  await database.query(`DELETE FROM pages WHERE page_id='${page_id}';`);
  await database.query(`DELETE FROM nodes WHERE page='${page_id}';`);
}

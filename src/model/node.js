import { database } from '@/db'
import {get_page_owner} from '@/model/page'

export async function add_egde_node(page_id) {
  let result = await database.query(
    `INSERT INTO nodes(page) VALUES ('${page_id}'),('${page_id}') RETURNING (node_id);`,
  );
  const head_node_id = result.rows[0].node_id;
  const tail_node_id = result.rows[1].node_id;
  await database.query(
    `UPDATE nodes SET next_node_id='${tail_node_id}' WHERE node_id='${head_node_id}';`,
  );
  await database.query(
    `UPDATE nodes SET pre_node_id='${head_node_id}' WHERE node_id='${tail_node_id}';`,
  );
  return [head_node_id, tail_node_id];
}

export async function add_middle_node(page_id, pre_node_id, content) {
  let result = await database.query(
    `SELECT next_node_id FROM nodes WHERE node_id='${pre_node_id}';`,
  );
  const next_node_id = result.rows[0].next_node_id;
  result = await database.query(
    `INSERT INTO nodes(page,pre_node_id,next_node_id,content) VALUES ('${page_id}','${pre_node_id}','${next_node_id}',$tag$${content}$tag$) RETURNING (node_id);`,
  );
  const node_id = result.rows[0].node_id;
  await database.query(
    `UPDATE nodes SET next_node_id='${node_id}' WHERE node_id='${pre_node_id}';`,
  );
  await database.query(
    `UPDATE nodes SET pre_node_id='${node_id}' WHERE node_id='${next_node_id}';`,
  );
  return node_id;
}

export async function get_node_content(node_id) {
  const result = await database.query(
    `SELECT content FROM nodes WHERE node_id='${node_id}';`,
  );
  if (result.rowCount === 0) return "";
  return result.rows[0].content;
}

export async function get_node_owner(node_id) {
  const result = await database.query(
    `SELECT page FROM nodes WHERE node_id='${node_id}';`,
  );
  if (result.rowCount === 0) return "";
  const page_id = result.rows[0].page;
  const owner = await get_page_owner(page_id)
  return owner
}

export async function get_nodes_by_page_id(page_id) {
  const result = await database.query(
    `SELECT node_id,next_node_id,content FROM nodes WHERE page='${page_id}';`,
  );
  return result.rows;
}

export async function modify_node_content(node_id, content) {
  await database.query(
    `UPDATE nodes SET content=$tag$${content}$tag$ WHERE node_id='${node_id}';`,
  );
}

export async function delete_node(node_id) {
  const result = await database.query(
    `DELETE FROM nodes WHERE node_id='${node_id}' RETURNING pre_node_id,next_node_id;`,
  );
  const pre_node_id = result.rows[0].pre_node_id;
  const next_node_id = result.rows[0].next_node_id;
  await database.query(
    `UPDATE nodes SET next_node_id='${next_node_id}' WHERE node_id='${pre_node_id}';`,
  );
  await database.query(
    `UPDATE nodes SET pre_node_id='${pre_node_id}' WHERE node_id='${next_node_id}';`,
  );
}

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(35) DEFAULT md5(gen_random_uuid()::text),
  name VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(35) NOT NULL
);

CREATE TABLE pages(
  id SERIAL PRIMARY KEY,
  page_id VARCHAR(35) DEFAULT md5(gen_random_uuid()::text),
  owner VARCHAR(35) NOT NULL,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(200),
  css_type SMALLINT,
  background_image SMALLINT,
  background_color1 VARCHAR(20),
  background_color2 VARCHAR(20),
  head_node_id VARCHAR(35),
  tail_node_id VARCHAR(35)
);

CREATE TABLE nodes(
  id SERIAL PRIMARY KEY,
  node_id VARCHAR(35) DEFAULT md5(gen_random_uuid()::text),
  page VARCHAR(35) NOT NULL,
  pre_node_id VARCHAR(35),
  next_node_id VARCHAR(35),
  content text
);
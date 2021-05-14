const uuid = 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'

const topics =
  'CREATE TABLE IF NOT EXISTS topics (id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(60) NOT NULL);'

const messages =
  'CREATE TABLE IF NOT EXISTS messages (id uuid DEFAULT uuid_generate_v4 (), message VARCHAR(500),' +
  'FOREIGN KEY (topic_id) REFERENCES topics(id));'

module.export = {
  uuid,
  topics,
  messages,
}

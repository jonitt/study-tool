import { Pool } from 'pg'
import config from 'config'
import migration from './migration'

const pool = createPool()

const createPool = () => {
  return new Pool(config.get('db'))
}

export async function init() {
  await createTables()
}

async function createTables() {
  const c = await pool.connect()

  await c.query(migration.uuid)
  await c.query(migration.topics)
  await c.query(migration.messages)
  
  c.release()
}

export async function getHealth() {
  const c = await pool.connect()
  const date = await c.query('SELECT NOW()')
  c.release()
  return date
}

const query = (sql, params = []) => {
  return pool
    .query(sql, params)
    .then(res => {
      return res.rows
    })
    .catch(err => {
      console.Console.log(err)
    })
}

export const end = () => pool.end()

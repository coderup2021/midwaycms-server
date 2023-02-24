import config from 'src/config/config.unittest'
import { createConnection } from 'mysql2'

export const clearDB = async () => {
  return new Promise((resolve, reject) => {
    const c = JSON.parse(JSON.stringify(config)) as any
    const typeorm = c.typeorm.dataSource.default

    const {
      host = 'localhost',
      username: user,
      password,
      port,
      database,
    } = typeorm
    const connection = createConnection({
      host,
      port,
      user,
      password,
      database,
    })

    connection.connect()

    const tables = ['article', 'cate']
    connection.query('SET foreign_key_checks=0', function (error) {
      if (error) throw error
    })

    tables.forEach((table) => {
      connection.query(`truncate ${table}`, function (error) {
        if (error) throw error
      })
    })

    connection.query('SET foreign_key_checks=1', function (error) {
      if (error) {
        reject(error)
      } else {
        connection.end()
        connection.destroy()
        resolve(1)
      }
    })
  })
}

'use strict'

module.exports = {
  getUserStatistic: (conn, userId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT * FROM users_stats_tab WHERE userid = ?`, [userId], (err, rows) => {
        callback(err, rows)
      })
    })
  }
}

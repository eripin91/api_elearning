'use strict'

module.exports = {
  getUserClass: (conn, userId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT * FROM users_classes_tab WHERE userid = ?`, [userId], (err, rows) => {
        callback(err, rows)
      })
    })
  }
}

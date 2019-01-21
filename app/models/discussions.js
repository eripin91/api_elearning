'use strict'

module.exports = {
  getThread: (conn, courseId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT * FROM discussion_tab WHERE parent = 0 AND courseid = ?`, courseId, (err, rows) => {
        callback(err, rows)
      })
    })
  }
}

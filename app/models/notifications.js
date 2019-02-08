'use strict'

module.exports = {
  insert: (conn, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`INSERT INTO notification_tab SET ?`, data, (err, rows) => {
        if (err) {
          callback(err)
        } else {
          callback(null, _.merge(data, { notificationid: rows.insertId }))
        }
      })
    })
  },
  checkerNotification: (conn, message, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query('SELECT * FROM notification_tab WHERE message = ?', message, (err, rows) => {
        callback(err, rows)
      })
    })
  }
}

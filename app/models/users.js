'use strict'

module.exports = {
  get: (conn, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT * FROM users_tab`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getUserClass: (conn, userId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT a.classid, b.userid, a.name, a.cover, c.fullname AS guru, (SELECT COUNT(userid) FROM users_classes_tab WHERE classid=classid AND classid=a.classid GROUP BY classid) AS member, (SELECT COUNT(courseid) FROM courses_tab WHERE classid=a.classid AND status=1 GROUP BY classid) AS course_done, (SELECT COUNT(courseid) FROM courses_tab WHERE classid=a.classid GROUP BY classid) AS courses FROM classes_tab a LEFT JOIN users_classes_tab b ON a.classid=b.classid LEFT JOIN guru_tab c ON a.guruid=c.guruid WHERE b.userid = ?`, userId, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  insert: (conn, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query('INSERT INTO users_tab SET ? ', data, (err, rows) => {
        if (err) {
          callback(err)
        } else {
          callback(null, _.merge(data, { id: rows.insertId }))
        }
      })
    })
  },
  update: (conn, id, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query('UPDATE users_tab SET ? WHERE userid = ? ', [data, id], (errUpdate, resultUpdate) => {
        callback(errUpdate, resultUpdate.affectedRows > 0 ? _.merge(data, { userid: id }) : [])
      })
    })
  }
}

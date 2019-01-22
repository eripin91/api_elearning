'use strict'

module.exports = {
  getThread: (conn, courseId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT a.discussionid, b.fullname AS threadstarter, a.post_title AS title, a.created_at, a.updated_at, (SELECT COUNT(discussionid) FROM discussion_tab WHERE courseid=? AND parent=a.discussionid ORDER BY parent) AS total_replied FROM discussion_tab a LEFT JOIN users_tab b ON a.userid=b.userid WHERE parent = 0 AND courseid = ?`, [courseId, courseId], (err, rows) => {
        callback(err, rows)
      })
    })
  }
}

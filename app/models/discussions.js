'use strict'

module.exports = {
  getThread: (conn, courseId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT a.discussionid, b.fullname AS threadstarter, 
                        a.post_content AS question, a.created_at, a.updated_at, 
                        (SELECT COUNT(discussionid) FROM discussion_tab WHERE parent=a.discussionid 
                        ORDER BY parent) AS total_replied, (SELECT COUNT(id) FROM discussion_likes_tab WHERE discussionid=a.discussionid AND status=1 ORDER BY discussionid) AS total_like FROM discussion_tab a LEFT JOIN users_tab b ON a.userid=b.userid WHERE a.parent = 0 AND a.courseid = ?`, [courseId, courseId], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getThreadDetail: (conn, disscussionId, sortBy, orderBy, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query('SELECT a.discussionid, b.fullname AS thread_starter, a.post_content, a.created_at, a.updated_at FROM discussion_tab a LEFT JOIN users_tab b ON a.userid = b.userid WHERE a.discussionid = ? AND a.parent=0', disscussionId, (err, rows) => {
        let data = rows[0]
        if (err) console.log(err)

        connection.query('SELECT a.discussionid, a.parent, a.post_content, b.fullname, (SELECT COUNT(id) FROM discussion_likes_tab WHERE discussionid=a.discussionid AND status=1 GROUP BY discussionid) AS total_like, a.created_at as time, a.updated_at FROM discussion_tab a LEFT JOIN users_tab b ON a.userid=b.userid WHERE a.parent = ? ORDER BY ' + sortBy + ' ' + orderBy, data.discussionid, (err, result) => {
          data.reply = result
          callback(err, data)
        })
      })
    })
  },
  insertThreadTitle: (conn, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`INSERT INTO discussion_tab SET ?`, data, (err, rows) => {
        if (err) {
          callback(err)
        } else {
          callback(null, _.merge(data, { disscussionid: rows.insertId }))
        }
      })
    })
  },
  insertThreadContent: (conn, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`INSERT INTO discussion_tab SET ?`, data, (err, rows) => {
        if (err) {
          callback(err)
        } else {
          callback(null, _.merge(data, { disscussionid: rows.insertId }))
        }
      })
    })
  },
  checkLike: (conn, disscussionId, userId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT * FROM discussion_likes_tab WHERE discussionid = ? AND userid = ? LIMIT 1`, [disscussionId, userId], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  insertLike: (conn, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`INSERT INTO discussion_likes_tab SET ?`, data, (err, rows) => {
        if (err) {
          callback(err)
        } else {
          callback(null, _.merge(data, { id: rows.insertId }))
        }
      })
    })
  },
  updateLike: (conn, id, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`UPDATE discussion_likes_tab SET ? WHERE id = ?`, [data, id], (errUpdate, resultUpdate) => {
        callback(errUpdate, resultUpdate.affectedRows > 0 ? _.merge(data, { id: id }) : [])
      })
    })
  }
}

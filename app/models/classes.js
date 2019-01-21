'use strict'

module.exports = {
  get: (conn, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT a.classid, a.name, a.cover, b.fullname As guru, (SELECT COUNT(userid) FROM users_classes_tab WHERE classid=classid AND classid=a.classid GROUP BY classid) AS member, (SELECT COUNT(courseid) FROM courses_tab WHERE classid=a.classid GROUP BY classid) AS courses, (SELECT SUM(e.duration) FROM courses_material_tab e LEFT JOIN courses_detail_tab f ON e.detailid=f.detailid LEFT JOIN courses_tab g ON f.courseid=g.courseid WHERE g.classid = a.classid) AS durasi FROM classes_tab a LEFT JOIN guru_tab b ON a.guruid=b.guruid WHERE a.status=1`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getRec: (conn, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT a.classid, a.priority, a.name, a.cover, b.fullname As guru, (SELECT COUNT(userid) FROM users_classes_tab WHERE classid=classid AND classid=a.classid GROUP BY classid) AS member, (SELECT COUNT(courseid) FROM courses_tab WHERE classid=a.classid GROUP BY classid) AS courses, (SELECT SUM(e.duration) FROM courses_material_tab e LEFT JOIN courses_detail_tab f ON e.detailid=f.detailid LEFT JOIN courses_tab g ON f.courseid=g.courseid WHERE g.classid = a.classid) AS durasi FROM classes_tab a LEFT JOIN guru_tab b ON a.guruid=b.guruid WHERE a.status=1 ORDER BY a.priority DESC`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getDetail: (conn, classId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT a.classid, a.name, a.created_at, a.description, a.cover, b.fullname As guru, b.profile_picture, (SELECT COUNT(userid) FROM users_classes_tab WHERE classid=classid AND classid=a.classid GROUP BY classid) AS member, (SELECT COUNT(courseid) FROM courses_tab WHERE classid=a.classid GROUP BY classid) AS courses FROM classes_tab a LEFT JOIN guru_tab b ON a.guruid=b.guruid WHERE a.classid = ? AND a.status=1`, classId, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  checkUserClass: (conn, userId, classId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT * FROM users_classes_tab WHERE userid = ? AND classid = ? LIMIT 1`, [userId, classId], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  insertUserClass: (conn, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`INSERT INTO users_classes_tab SET ? `, data, (err, rows) => {
        if (err) {
          callback(err)
        } else {
          callback(null, _.merge(data, { id: rows.insertId }))
        }
      })
    })
  },
  getRank: (conn, classId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT a.score, b.name, b.profile_picture from users_scores_tab a JOIN users_tab b ON a.userid=b.userid WHERE b.status=1 AND a.status=1 AND a.parentid = ? ORDER BY a.score DESC LIMIT 10`, [classId], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getUserRank: (conn, userId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT a.score, b.name, b.profile_picture from users_scores_tab a JOIN users_tab b ON a.userid=b.userid WHERE b.status=1 AND a.status=1 AND a.userId = ?`, [userId], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  updateUserClass: (conn, id, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`UPDATE users_classes_tab SET ? WHERE userid = ?`, [data, id], (errUpdate, resultUpdate) => {
        callback(errUpdate, resultUpdate.affectedRows > 0 ? _.merge(data, { userid: id }) : [])
      })
    })
  }
}

'use strict'

module.exports = {
  get: (conn, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT a.classid, a.name, a.cover, b.fullname AS guru, COUNT(c.userid) AS member, (SELECT COUNT(d.detailid) FROM courses_detail_tab d JOIN courses_tab e ON d.courseid=e.courseid WHERE e.classid=a.classid) AS courses, (SELECT SUM(f.duration) FROM courses_material_tab f LEFT JOIN courses_detail_tab g ON f.detailid=g.detailid LEFT JOIN courses_tab h ON g.courseid=h.courseid WHERE h.classid = a.classid) AS durasi FROM classes_tab a LEFT JOIN guru_tab b ON a.guruid=b.guruid LEFT JOIN users_classes_tab c ON a.classid=c.classid WHERE a.status=1 GROUP BY a.classid ORDER BY a.created_at DESC`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getRec: (conn, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT a.classid, a.priority, a.name, a.cover, b.fullname AS guru, COUNT(c.userid) AS member, (SELECT COUNT(d.detailid) FROM courses_detail_tab d JOIN courses_tab e ON d.courseid=e.courseid WHERE e.classid=a.classid) AS courses, (SELECT SUM(f.duration) FROM courses_material_tab f LEFT JOIN courses_detail_tab g ON f.detailid=g.detailid LEFT JOIN courses_tab h ON g.courseid=h.courseid WHERE h.classid = a.classid) AS durasi FROM classes_tab a LEFT JOIN guru_tab b ON a.guruid=b.guruid LEFT JOIN users_classes_tab c ON a.classid=c.classid WHERE a.status=1 GROUP BY a.classid ORDER BY a.priority DESC`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getDetail: (conn, classId, userId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT a.classid, a.userid, b.name, b.description, b.rating, b.created_at, c.fullname, c.profile_picture, (SELECT COUNT(userid) FROM users_classes_tab WHERE classid=classid AND classid=a.classid GROUP BY classid) AS member, (SELECT COUNT(userid) FROM users_classes_tab WHERE classid=classid AND classid=a.classid GROUP BY classid) AS member, (SELECT COUNT(d.detailid) FROM courses_detail_tab d JOIN courses_tab e ON d.courseid=e.courseid WHERE e.classid=a.classid) AS courses, (SELECT COUNT(f.id) FROM users_course_detail_tab f LEFT JOIN courses_detail_tab g on f.detailid=g.detailid LEFT JOIN courses_tab h on g.courseid=h.courseid WHERE f.userid=a.userid AND h.classid=a.classid) AS courses_done, (SELECT EXISTS(SELECT * FROM users_rating_tab WHERE userid=a.userid AND classid=a.classid)) AS is_rating FROM users_classes_tab a JOIN classes_tab b on a.classid=b.classid JOIN guru_tab c ON b.guruid=c.guruid WHERE a.classid=? AND a.userid=? AND a.status=1`, [classId, userId], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getUserClass: (conn, userId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT a.classid, b.userid, a.name, a.cover, c.fullname AS guru, (SELECT COUNT(userid) FROM users_classes_tab WHERE classid=classid AND classid=a.classid GROUP BY classid) AS member, (SELECT COUNT(d.detailid) FROM courses_detail_tab d JOIN courses_tab e ON d.courseid=e.courseid WHERE e.classid=a.classid) AS courses, (SELECT COUNT(f.id) FROM users_course_detail_tab f LEFT JOIN courses_detail_tab g on f.detailid=g.detailid LEFT JOIN courses_tab h on g.courseid=h.courseid WHERE f.userid=b.userid AND h.classid=a.classid) AS courses_done FROM classes_tab a LEFT JOIN users_classes_tab b ON a.classid=b.classid LEFT JOIN guru_tab c ON a.guruid=c.guruid WHERE b.userid = ?`, userId, (err, rows) => {
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
      connection.query(`SELECT a.score, b.name, b.profile_picture from users_scores_tab a JOIN users_tab b ON a.userid=b.userid WHERE b.status=1 AND a.status=1 AND a.type = 'class' AND a.parentid = ? ORDER BY a.score DESC LIMIT 10`, [classId], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getUserRank: (conn, userId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT a.score, b.name, b.profile_picture from users_scores_tab a JOIN users_tab b ON a.userid=b.userid WHERE b.status=1 AND a.status=1 AND a.type = 'class' AND a.userId = ?`, [userId], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  updateUserClass: (conn, id, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`UPDATE users_classes_tab SET ? WHERE userid = ?`, [data, id], (errUpdate, resultUpdate) => {
        callback(errUpdate, resultUpdate.affectedRows > 0 ? _.merge(data, { id: id }) : [])
      })
    })
  },
  checkRating: (conn, userId, classId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT * FROM users_rating_tab WHERE userid = ? AND classid = ? LIMIT 1`, [userId, classId], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  inserRating: (conn, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`INSERT INTO users_rating_tab SET ?`, data, (err, rows) => {
        if (err) {
          callback(err)
        } else {
          callback(null, _.merge(data, { id: rows.inserId }))
        }
      })
    })
  },
  updateRating: (conn, id, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`UPDATE classes_tab SET ? WHERE classid = ?`, [data, id], (errUpdate, resultUpdate) => {
        callback(errUpdate, resultUpdate.affectedRows > 0 ? _.merge(data, { classid: id }) : [])
      })
    })
  },
  getAverageRating: (conn, classId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT AVG(rating) AS rating FROM users_rating_tab WHERE status=1 AND classid = ?`, classId, (err, rows) => {
        callback(err, rows)
      })
    })
  }
}

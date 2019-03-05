'use strict'

module.exports = {
  getUserClass: (conn, userId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT * FROM users_classes_tab WHERE userid = ? AND status = 1 GROUP BY classid`, [userId], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getUserClassLimit: (conn, userId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT ct.classid, ct.name AS class_name, ct.cover, gt.fullname as guru, (SELECT COUNT(*) FROM users_classes_tab WHERE classid = ct.classid) AS member FROM users_classes_tab uc LEFT JOIN classes_tab ct ON uc.classid = ct.classid LEFT JOIN guru_tab gt ON ct.guruid = gt.guruid  WHERE userid = ? AND ct.status = 1 LIMIT 5`, [userId], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getUserClassProgress: (conn, userId, classId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT (SELECT COUNT(*) FROM courses_detail_tab WHERE courseid = c.courseid AND status = 1) AS all_bab, (SELECT COUNT(*) FROM users_course_detail_tab uc LEFT JOIN courses_detail_tab cd ON cd.detailid = uc.detailid WHERE uc.userid = ? AND cd.courseid = c.courseid AND cd.status = 1)  as progress_bab FROM classes_tab ct LEFT JOIN courses_tab c ON ct.classid = c.classId WHERE ct.classid = ? AND ct.status = 1`, [userId, classId], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getClass: (conn, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(connection)
      connection.query(`SELECT * FROM classes_tab WHERE status = 1 ORDER BY classid ASC`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getClassLimit: (conn, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT ct.classid, ct.name, ct.cover, gt.fullname AS guru FROM classes_tab ct LEFT JOIN guru_tab gt ON ct.guruid = gt.guruid WHERE ct.status = 1 ORDER BY classid ASC LIMIT 5`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getClassRecomendation: (conn, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT * FROM classes_tab WHERE status = 1 ORDER BY priority DESC `, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getClassRecomendationLimit: (conn, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT ct.classid, ct.name, gt.fullname AS guru, ct.cover, (SELECT COUNT(*) FROM users_classes_tab WHERE classid = ct.classid) as member FROM classes_tab ct LEFT JOIN guru_tab gt ON ct.guruid = gt.guruid WHERE ct.status = 1 ORDER BY ct.priority DESC`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getDetailCount: (conn, classId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT (SELECT COUNT(*) FROM courses_detail_tab WHERE courseid = c.courseid AND status = 1) AS total_bab FROM classes_tab ct LEFT JOIN courses_tab c ON ct.classid = c.classid WHERE ct.classid = ? AND ct.status = 1`, [classId], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getDurationCount: (conn, classId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT (SELECT SUM(cm.duration) FROM courses_detail_tab cd LEFT JOIN courses_material_tab cm ON cd.detailid = cm.detailid WHERE cd.courseid = c.courseid AND cd.status = 1) AS total_durasi FROM classes_tab ct LEFT JOIN courses_tab c ON ct.classid = c.classid WHERE ct.classid = ? AND ct.status = 1`, [classId], (err, rows) => {
        callback(err, rows)
      })
    })
  }
}

'use strict'

module.exports = {
  get: (conn, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT a.classid, a.name, a.cover, b.fullname As guru, (SELECT COUNT(userid) FROM users_classes_tab WHERE classid=classid AND classid=a.classid GROUP BY classid) AS member, (SELECT COUNT(courseid) FROM courses_tab WHERE classid=a.classid GROUP BY classid) AS courses, (SELECT SUM(e.duration) FROM courses_material_tab e LEFT JOIN courses_detail_tab f ON e.detailid=f.detailid LEFT JOIN courses_tab g ON f.courseid=g.courseid WHERE g.classid = a.classid) AS durasi FROM classes_tab a LEFT JOIN guru_tab b ON a.guruid=b.guruid`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getRec: (conn, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT a.classid, a.priority, a.name, a.cover, b.fullname As guru, (SELECT COUNT(userid) FROM users_classes_tab WHERE classid=classid AND classid=a.classid GROUP BY classid) AS member, (SELECT COUNT(courseid) FROM courses_tab WHERE classid=a.classid GROUP BY classid) AS courses, (SELECT SUM(e.duration) FROM courses_material_tab e LEFT JOIN courses_detail_tab f ON e.detailid=f.detailid LEFT JOIN courses_tab g ON f.courseid=g.courseid WHERE g.classid = a.classid) AS durasi FROM classes_tab a LEFT JOIN guru_tab b ON a.guruid=b.guruid ORDER BY a.priority DESC`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getDetail: (conn, classId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT a.classid, a.name, a.created_at, a.description, a.cover, b.fullname As guru, b.profile_picture, (SELECT COUNT(userid) FROM users_classes_tab WHERE classid=classid AND classid=a.classid GROUP BY classid) AS member, (SELECT COUNT(courseid) FROM courses_tab WHERE classid=a.classid GROUP BY classid) AS courses FROM classes_tab a LEFT JOIN guru_tab b ON a.guruid=b.guruid WHERE a.classid = ?`, classId, (err, rows) => {
        callback(err, rows)
      })
    })
  },
}
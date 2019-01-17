'use strict'

module.exports = {
  get: (conn, classId, callback) => {
    conn.getConnection((errConnection, connection) => {
      console.log(classId)
      if (errConnection) console.error(errConnection)
      connection.query('SELECT c.*, SUM(cm.duration) as durasi FROM courses_tab c LEFT JOIN courses_detail_tab cd ON cd.courseid = c.courseid LEFT JOIN courses_material_tab cm ON cm.detailid = cd.detailid WHERE c.classid = ? GROUP BY c.courseid, c.name, c.status ', classId, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getDetail: (conn, courseId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query('SELECT cd.name as detail_name, cd.status as status, cm.* FROM courses_detail_tab cd JOIN courses_material_tab cm ON cm.detailid = cd.detailid WHERE courseid = ?', courseId, (err, rows) => {
        callback(err, rows)
      })
    })
  }

}

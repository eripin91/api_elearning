'use strict'

module.exports = {
  get: (conn, classId, callback) => {
    conn.getConnection((errConnection, connection) => {
      console.log(classId)
      if (errConnection) console.error(errConnection)
      connection.query('SELECT c.* FROM courses_tab c JOIN classes_tab ct ON c.classid = ct.classid WHERE c.classid = ?', classId, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getDetail: (conn, courseId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query('SELECT cd.name as detail_name, cd.status as status, cm.* FROM courses_detail_tab cd LEFT JOIN courses_material_tab cm ON cm.detailid = cd.detailid WHERE courseid = ?', courseId, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getMaterial: (conn, courseId, detailId, callback) => {
    conn.getConnection((errConnection, connection) => {
      connection.query('SELECT cm.* FROM courses_material_tab cm JOIN courses_detail_tab cd ON cm.detailid =cd.detailid JOIN courses_tab c ON cd.courseid = c.courseid WHERE c.courseid = ? AND detailid = ?', [courseId.detailId], (err, rows) => {
        callback(err, rows)
      })
    })
  }

}

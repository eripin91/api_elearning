'use strict'

module.exports = {
  get: (conn, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query('SELECT * FROM courses_tab', (err, rows) => {
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

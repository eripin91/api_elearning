'use strict'

module.exports = {
  get: (conn, classId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query('SELECT c.* FROM courses_tab c JOIN classes_tab ct ON c.classid = ct.classid WHERE c.classid = ?', classId, (err, rows) => {
        let data = rows
        connection.query('SELECT cd.detailid, cd.name, SUM(cm.duration) as durasi FROM courses_detail_tab cd JOIN courses_material_tab cm ON cd.detailid = cm.detailid WHERE cd.courseid = ? GROUP BY(cd.detailid)', data[0].courseid, (err, result) => {
          data[0].course = result
          callback(err, data)
        })
      })
    })
  },
  getDetail: (conn, courseId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query('SELECT cd.detailid, cd.name, SUM(cm.duration) as durasi FROM courses_detail_tab cd JOIN courses_material_tab cm ON cd.detailid = cm.detailid WHERE cd.courseid = ? AND cd.status = 1 GROUP BY(cd.detailid)', courseId, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getMaterial: (conn, detailId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query('SELECT cm.materialid, cd.detailid, cm.name, cm.thumbnails, cm.duration FROM courses_material_tab cm JOIN courses_detail_tab cd ON cm.detailid = cd.detailid JOIN courses_tab c ON cd.courseid = c.courseid WHERE cd.detailid = ? AND cd.status = 1', detailId, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getMaterialDetail: (conn, materialId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query('SELECT * FROM courses_material_tab WHERE materialid = ? AND status = 1', materialId, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getUserMaterial: (conn, userId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if(errConnection) console.error(errConnection)
      connection.query('SELECT cm.materialid, cm.name, cm.thumbnails, cm.duration FROM users_material_progress_tab um JOIN users_tab u ON um.userid = u.userid JOIN courses_material_tab cm ON cm.materialid = um.materialid where um.userid = ? AND um.is_downloaded = 1', userId, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getNextMaterial: (conn, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if(errConnection) console.log(errConnection)
      connection.query('SELECT cm.materialid, cd.detailid, cm.name, cm.thumbnails, cm.duration FROM courses_material_tab cm JOIN courses_detail_tab cd ON cm.detailid = cd.detailid WHERE cm.detailid = ? AND cm.materialid > ? LIMIT 3', data, (err, rows) => {
        callback(err, rows)
      })
    })
  }

}

'use strict'

module.exports = {
  get: (conn, classId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query('SELECT c.* FROM courses_tab c LEFT JOIN classes_tab ct ON c.classid = ct.classid WHERE c.classid = ?', classId, (err, rows) => {
          let data = rows[0]
          let errror = err
          if (errror) console.log(errror)

          if(data === undefined) {
            callback(err, data)
          } else {
            connection.query('SELECT cd.detailid, cd.name, SUM(cm.duration) as durasi FROM courses_detail_tab cd LEFT JOIN courses_material_tab cm ON cd.detailid = cm.detailid WHERE cd.courseid = ? GROUP BY(cd.detailid)', data.courseid, (err, result) => {
              data.course = result
              console.log(data)
              callback(err, data)
            })
          }

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
  getMaterial: (conn, userId, detailId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query('SELECT cm.materialid, cd.detailid, cm.name, cm.thumbnails, cm.duration, (SELECT b.is_downloaded FROM courses_material_tab a LEFT JOIN users_material_progress_tab b ON a.materialid = b.materialid LEFT JOIN users_tab c ON b.userid = c.userid WHERE c.userid = ? AND b.materialid = cm.materialid) AS is_downloaded FROM courses_material_tab cm LEFT JOIN courses_detail_tab cd ON cm.detailid = cd.detailid LEFT JOIN courses_tab c ON cd.courseid = c.courseid WHERE cd.detailid = ? AND cd.status = 1', [userId, detailId], (err, rows) => {
        console.log(rows)
        callback(err, rows)
      })
    })
  },
  getCheckCourseComplete: (conn, detailId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query('SELECT COUNT(materialid) AS jumlah_materi FROM courses_material_tab WHERE detailid = ?', [detailId], (err, rows) => {
        let data = rows[0]
        console.log(rows)
        connection.query('SELECT COUNT(um.id) AS user_materi FROM users_material_progress_tab um LEFT JOIN courses_material_tab cm ON um.materialid = cm.materialid LEFT JOIN users_tab u ON um.userid = u.userid LEFT JOIN courses_detail_tab cd ON cm.detailid = cd.detailid WHERE cd.detailid = ?', detailId, (err, result) => {
          console.log(result[0].user_materi)
          data.user_materi = result[0].user_materi
          callback(err, data)
        })
      })
    })
  },

  getStatusDownload: (conn, userId, materialId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(connection)
      connection.query('SELECT um.is_downloaded FROM users_material_progress_tab um LEFT JOIN users_tab u ON um.userid = u.userid LEFT JOIN courses_material_tab cm ON um.materialid = cm.materialid WHERE um.userid = ? AND um.materialid = ?', [userId, materialId], (rows) => {
        callback(rows)
      })
    })
  },

  getMaterialDetail: (conn, materialId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query('SELECT * FROM courses_material_tab WHERE materialid = ? AND status = 1', materialId, (err, rows) => {
        function sizeCount(size, length) {
          var trigger = 0
          while (size >= length) {
            trigger += 1
            size = size / length
          }
          return {
            size: size,
            trigger: trigger
          }
        }

        let size, descriptor
        size = sizeCount(rows[0].size, 1024)
        descriptor = ['Byte', 'KB', 'MB', 'GB']

        rows[0].size = Math.ceil(size.size) + ' ' + descriptor[size.trigger]
        console.log(rows[0].size)
        let data = rows[0]
        let errror = err
        if (errror) console.log(errror)
        connection.query('SELECT cm.materialid, cd.detailid, cm.name, cm.thumbnails, cm.duration FROM courses_material_tab cm JOIN courses_detail_tab cd ON cm.detailid = cd.detailid WHERE cm.detailid = ? AND cm.materialid > ? LIMIT 3', [data.detailid, data.materialid], (err, result) => {
          data.next = result
          callback(err, data)
        })
      })
    })
  },
  insertMaterialDetail: (conn, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.log(errConnection)
      connection.query('INSERT INTO users_course_detail_tab SET ?', data, (err, rows) => {
        if (err) {
          callback(err)
        } else {
          callback(null, _.merge(data, { id: rows.inserId }))
        }
      })
    })
  },
  getUserMaterial: (conn, userId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query('SELECT cm.materialid, cm.name, cm.thumbnails, cm.duration FROM users_material_progress_tab um JOIN users_tab u ON um.userid = u.userid JOIN courses_material_tab cm ON cm.materialid = um.materialid where um.userid = ? AND um.is_downloaded = 1', userId, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getNextMaterial: (conn, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.log(errConnection)
      connection.query('SELECT cm.materialid, cd.detailid, cm.name, cm.thumbnails, cm.duration FROM courses_material_tab cm JOIN courses_detail_tab cd ON cm.detailid = cd.detailid WHERE cm.detailid = ? AND cm.materialid > ? LIMIT 3', data, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  checkUserCourseDetail: (conn, userId, detailId, callback) => {
    conn.getConnection((errConnection, connection) => {
      connection.query('SELECT * FROM users_course_detail_tab WHERE userid = ? AND detailid = ?', [userId, detailId], (err, rows) => {
        callback(err, rows)
      })
    })
  }

}

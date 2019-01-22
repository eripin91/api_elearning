'use strict'

module.exports = {
  getUserMaterial: (conn, userId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if(errConnection) console.log(errConnection)
      connection.query('SELECT cm.materialId, cm.name, cm.thumbnails, cm.duration FROM users_material_progress_tab um JOIN courses_material_tab cm ON um.materialid = cm.materialid JOIN users_tab u on u.userid = um.userid WHERE um.userid = ? AND um.is_downloaded = 1', userId, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  
}
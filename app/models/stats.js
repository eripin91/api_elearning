'use strict'

module.exports = {
  getUserStatistic: (conn, userId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT * FROM users_stats_tab WHERE userid = ?`, [userId], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getUserAchievementClass: (conn, userId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT userid, parentid AS classid FROM users_scores_tab WHERE type = 'class' AND userid = ?`, [userId], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getUserAchievementScore: (conn, classId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if(errConnection) console.error(errConnection)
      connection.query(`SELECT us.userid, ct.name, us.score, us.created_at FROM users_scores_tab us JOIN classes_tab ct ON us.parentid = ct.classid WHERE type = 'class' AND parentid = ? ORDER BY score`, [classId], (err, rows) => {
        callback(err, rows)
      })
    })
  },
}

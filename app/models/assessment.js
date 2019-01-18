'use strict'

module.exports = {
  getQuestions: (conn, assessmentid, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT * FROM assessment_detail_tab WHERE assessmentid = ?`, [assessmentid], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getQuestionsNumber: (conn, assessmentId, userId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT a.detailid,b.answer FROM assessment_detail_tab a LEFT JOIN users_assessment_tab b ON a.assessmentid = b.assessmentid WHERE a.assessmentid = ? AND b.userid = ? ORDER BY a.detailid ASC`, [assessmentId, userId], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  checkUserAlreadyAnswer: (conn, userId, assessmentId, parentId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT * FROM users_assessment_tab WHERE userid = ? AND assessmentid = ? AND parentid = ? LIMIT 1`, [userId, assessmentId, parentId], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  insertUserAnswer: (conn, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query('INSERT INTO users_assessment_tab SET ? ', data, (err, rows) => {
        if (err) {
          callback(err)
        } else {
          callback(null, _.merge(data, { id: rows.insertId }))
        }
      })
    })
  },
  updateUserAnswer: (conn, id, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query('UPDATE users_assessment_tab SET ? WHERE userid = ? ', [data, id], (errUpdate, resultUpdate) => {
        callback(errUpdate, resultUpdate.affectedRows > 0 ? _.merge(data, { userid: id }) : [])
      })
    })
  }
}

'use strict'

var Route = express.Router()

Route
  .get('/get', ClassesControllers.get)
  .get('/get/:classId/', ClassesControllers.getDetail)
  .get('/recs', ClassesControllers.getRec)

module.exports = Route
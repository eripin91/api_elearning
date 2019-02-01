/* global ClassesControllers */

'use strict'

var Route = express.Router()

Route
  .get('/get', ClassesControllers.get)
  .get('/get/:classId/:userId', ClassesControllers.getDetail)
  .get('/recs', ClassesControllers.getRec)
  .get('/user/:userId', ClassesControllers.getUserClass)
  .post('/rating', ClassesControllers.rating)

module.exports = Route

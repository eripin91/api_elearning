/* global ClassesControllers AuthHelper */

'use strict'

var Route = express.Router()

Route
  // .all('/*', AuthHelper.requiresAuthorization)
  .get('/get', ClassesControllers.get)
  .get('/get/:classId/:userId', AuthHelper.requiresAccessToken, ClassesControllers.getDetail)
  .get('/recs/:userId', ClassesControllers.getRec)
  .get('/user/:userId', ClassesControllers.getUserClass)
  .post('/rating', AuthHelper.requiresAccessToken, ClassesControllers.rating)
  .post('/add', ClassesControllers.insertUserClass)

module.exports = Route

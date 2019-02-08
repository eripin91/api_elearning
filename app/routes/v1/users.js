/* global UsersControllers */

'use strict'

var Route = express.Router()

Route
  .get('/get', UsersControllers.get)
  .get('/:userId/classes', UsersControllers.getUserClass)
  .post('/login', UsersControllers.login)
  .get('/request-token', UsersControllers.requestToken)
  .get('/logout', UsersControllers.logout)
  .post('/register', UsersControllers.register)
  .post('/profile', UsersControllers.profile)
  .post('/change-password', UsersControllers.changePassword)

module.exports = Route

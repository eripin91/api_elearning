/* global UsersControllers */

'use strict'

var Route = express.Router()

Route
  .get('/get', UsersControllers.get)
  .get('/:userId/classes', UsersControllers.getUserClass)

module.exports = Route

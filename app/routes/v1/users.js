/* global UsersControllers */

'use strict'

var Route = express.Router()

Route
  .get('/get', UsersControllers.get)

module.exports = Route

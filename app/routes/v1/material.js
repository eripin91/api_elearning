/* global MaterialControllers */

'use strict'

var Route = express.Router()

Route
  .get('/user/:userId', MaterialControllers.get)

module.exports = Route
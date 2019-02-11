/* global DashboardControllers */

'use strict'

var Route = express.Router()

Route
  .get('/:userId', DashboardControllers.get)

module.exports = Route
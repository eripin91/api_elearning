/* global DashboardControllers AuthHelper */

'use strict'

var Route = express.Router()

Route
  .all('/*', AuthHelper.requiresAuthorization)
  .get('/:userId', AuthHelper.requiresAccessToken, DashboardControllers.get)

module.exports = Route

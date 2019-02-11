/* global StatsControllers AuthHelper */

'use strict'

var Route = express.Router()

Route
  .all('/*', AuthHelper.requiresAuthorization)
  .get('/get/:userId', AuthHelper.requiresAccessToken, StatsControllers.get)

module.exports = Route

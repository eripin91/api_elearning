/* global StatsControllers AuthHelper */

'use strict'

var Route = express.Router()

Route
  .all('/*', AuthHelper.requiresAuthorization)
  .get('/get/:userId', AuthHelper.requiresAccessToken, StatsControllers.get)
  .get('/get/allRank/:userId', StatsControllers.getRank)
  .get('/get/rank/:userId', StatsControllers.getRankLimit)

module.exports = Route

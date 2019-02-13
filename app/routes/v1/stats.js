/* global StatsControllers */

'use strict'

var Route = express.Router()

Route
  .get('/get/:userId', StatsControllers.get)
  .get('/get/allRank/:userId', StatsControllers.getRank)
  .get('/get/rank/:userId', StatsControllers.getRankLimit)

module.exports = Route

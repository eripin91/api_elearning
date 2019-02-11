/* global StatsControllers */

'use strict'

var Route = express.Router()

Route
  .get('/get/:userId', StatsControllers.get)

module.exports = Route

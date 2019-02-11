/* global StatsControllers */

'use strict'

var Route = express.Router()

Route
  .get('/get/:userId', StatsControllers.get)
  .get('/certificate/:userId/:classId', StatsControllers.getCertificate)
  .get('/certificate/:userId', StatsControllers.getCertificateList)

module.exports = Route

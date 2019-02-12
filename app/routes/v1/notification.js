/* global AssessmentControllers */

'use strict'

var Route = express.Router()

Route
  .get('/:userId', NotificationControllers.get)

module.exports = Route
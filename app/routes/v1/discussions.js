/* global DiscussionsControllers */

'use strict'

var Route = express.Router()

Route
  .get('/get/:courseId', DiscussionsControllers.getThread)

module.exports = Route

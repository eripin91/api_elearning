/* global DiscussionsControllers */

'use strict'

var Route = express.Router()

Route
  .get('/get/:courseId', DiscussionsControllers.getThread)
  .put('/', DiscussionsControllers.insertThreadTitle)
  .put('/reply', DiscussionsControllers.insertThreadContent)
  .post('/like', DiscussionsControllers.like)

module.exports = Route

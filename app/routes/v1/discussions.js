/* global DiscussionsControllers */

'use strict'

var Route = express.Router()

Route
  .get('/get/:courseId/:userId', DiscussionsControllers.getThread)
  .get('/detail/:discussionId/:userId', DiscussionsControllers.getThreadDetail)
  .put('/', DiscussionsControllers.insertThreadTitle)
  .put('/reply', DiscussionsControllers.insertThreadContent)
  .post('/like', DiscussionsControllers.like)

module.exports = Route

/* global AssessmentControllers */

'use strict'

var Route = express.Router()

Route
  .get('/get-questions/:parentId', AssessmentControllers.getQuestions)
  .get('/get-questions-number/:parentId/:userId', AssessmentControllers.getQuestionsNumber)
  .post('/answer/:parentId', AssessmentControllers.answer)

module.exports = Route

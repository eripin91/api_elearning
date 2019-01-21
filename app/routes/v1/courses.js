/* global CoursesControllers */

'use strict'

var Route = express.Router()

Route
  .get('/:idClass/', CoursesControllers.get)
  .get('/courseDetail/:idCourse/', CoursesControllers.detail)
module.exports = Route

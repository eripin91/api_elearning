/* global CoursesControllers */

'use strict'

var Route = express.Router()

Route
  .get('/:idClass/', CoursesControllers.get)
  .get('/course/:idCourse/', CoursesControllers.detail)
module.exports = Route

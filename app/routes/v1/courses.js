/* global CoursesControllers */

'use strict'

var Route = express.Router()

Route
  .get('/:idClass/', CoursesControllers.get)
  .get('/courseDetail/:idCourse/', CoursesControllers.detail)
  .get('/:idCourse/detail/:idDetail', CoursesControllers.material)
module.exports = Route

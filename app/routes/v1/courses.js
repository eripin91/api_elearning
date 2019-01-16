/* global CoursesControllers */

'use strict'

var Route = express.Router()

Route
  .get('/', CoursesControllers.get)
  .get('/:idCourse/', CoursesControllers.detail)

module.exports = Route
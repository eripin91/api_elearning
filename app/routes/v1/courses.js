/* global CoursesControllers */

'use strict'

var Route = express.Router()

Route
  .get('/:idClass/', CoursesControllers.get)
  .get('/course/:idCourse/', CoursesControllers.detail)
  .get('/get/:idDetail', CoursesControllers.material)
  .get('/material/:materialDetailId', CoursesControllers.materialDetail)
  .get('/detail/:idDetail/material/:materialDetailId', CoursesControllers.nextMaterial)

module.exports = Route

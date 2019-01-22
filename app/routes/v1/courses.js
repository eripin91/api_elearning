/* global CoursesControllers */

'use strict'

var Route = express.Router()

Route
  .get('/:idClass/', CoursesControllers.get)
  .get('/course/:idCourse/', CoursesControllers.detail)
  .get('/detail/:idDetail', CoursesControllers.material)
  .get('/material/:materialDetailId', CoursesControllers.materialDetail)
  
module.exports = Route

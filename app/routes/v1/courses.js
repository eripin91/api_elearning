/* global CoursesControllers */

'use strict'

var Route = express.Router()

Route
  .get('/:idClass/', CoursesControllers.get)
  .get('/course/:idCourse/', CoursesControllers.detail)
  .get('/get/:idUser/:idDetail', CoursesControllers.material)
  .get('/material/:materialDetailId', CoursesControllers.materialDetail)
  .get('/detail/:idDetail/material/:materialDetailId', CoursesControllers.nextMaterial)
  .get('/detailcomplete/:userId/:detailId', CoursesControllers.getUserCourseDetail)
  .post('/courseMaterial/:userId/:detailId/:materialId', CoursesControllers.updateUserCourseMaterial)
  .patch('/detailcomplete/:userId/:detailId', CoursesControllers.updateUserCourseDetail)

module.exports = Route

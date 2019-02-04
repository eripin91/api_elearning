/* global MaterialControllers */

'use strict'

var Route = express.Router()

Route
  .get('/user/:userId', MaterialControllers.get)
  .post('/:userId/:classId/:detailId/:materialId', MaterialControllers.update)

module.exports = Route

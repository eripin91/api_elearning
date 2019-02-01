/* global _ */

'use strict'

const async = require('async')
const materialModel = require('../models/material')
const courseModel = require('../models/courses')
const redisCache = require('../libs/RedisCache')

/*
 * GET : '/material/userid
 *
 *  @desc GET Downloaded Course
 *
 * @param {object} req - Parameter for Request
 *
 * @return {object} Request object
*/

exports.get = (req, res) => {
  const key = 'get-material-user-' + req.params.userId
  async.waterfall([
    (cb) => {
      redisCache.get(key, material => {
        if (material) {
          return MiscHelper.responses(res, material)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {

      materialModel.getUserMaterial(req, req.params.userId, (errMaterial, resultMaterial) => {
        resultMaterial.map((result) => {
          let minutes = Math.floor(result.duration / 60)
          let second = result.duration - (minutes * 60)
          result.duration = minutes + ':' + second
        })
        console.log(resultMaterial[0])
        cb(errMaterial, resultMaterial)
      })
    },
    (dataMaterials, cb) => {
      redisCache.setex(key, 600, dataMaterials)
      console.log('process cached')
      cb(null, dataMaterials)
    }
  ], (errMaterial, resultMaterial) => {
    if (!errMaterial) {
      return MiscHelper.responses(res, resultMaterial)
    } else {
      return MiscHelper.errorCustomStatus(res, errMaterial, 400)
    }
  })
}

exports.update = (req, res) => {
  // req.checkBody('userId', 'userid is Required').notEmpty.isInt()
  // req.checkBody('materialId', 'materialid is Required').notEmpty.isInt()

  // if (req.validationError()) {
  //   return MiscHelper.errorCustomStatus(res, req.validationError(true))
  // }

  const userId = req.params.userId
  const materialId = req.params.materialId
  async.waterfall([
    (cb) => {
      materialModel.checkUserMaterialAlreadyExist(req, userId, materialId, (errCheck, resultCheck) => {
        if (_.isEmpty(resultCheck) || errCheck) {
          console.log(1)
          cb(errCheck, 1)
        } else {
          const data = {
            updated_at: new Date()
          }
          if (req.body.is_downloaded === undefined) {
            Object.assign(data, { is_done_watching: req.body.is_done_watching })
          } else if (req.body.is_done_watching === undefined) {
            Object.assign(data, { is_downloaded: req.body.is_downloaded })
          }
          console.log(resultCheck)
          materialModel.updateUserMaterial(req, resultCheck[0].id, data, (err, resultUpdateMaterial) => {
            console.log(resultUpdateMaterial)
            console.log(1.1)
            if (err) {
              cb(err)
            } else {
              cb(err, resultCheck)
            }
          })
        }
      })
    },
    (trigger, cb) => {

      if (trigger === 1) {
        console.log(2)
        const data = {
          userid: userId,
          materialid: materialId,
          watchingduration: 0,
          is_done_watching: 0,
          is_downloaded: 0,
          status: 1,
          created_at: new Date(),
          updated_at: new Date()
        }
        if (req.body.is_downloaded === undefined) {
          data.is_done_watching = req.body.is_done_watching
        } else if (req.body.is_done_watching === undefined) {
          data.is_downloaded = req.body.is_downloaded
        }

        materialModel.insertUserMaterial(req, data, (err, result) => {
          console.log('ini result ' + result)
          const key = 'get-material-user-' + req.params.userId
          redisCache.del(key)
          const data = {
            userid: req.params.userId,
            materialid: req.params.materialId,
            is_material_complete: req.body.is_done_watching,
            detailid: req.params.detailId
          }
          cb(err, data)
        })
      } else {
        const key = 'get-material-user-' + req.params.userId
        redisCache.del(key)
        const data = {
          userid: req.params.userId,
          materialid: req.params.materialId,
          is_material_complete: trigger[0].is_done_watching,
          detailid: req.params.detailId
        }
        cb(null, data)
      }
    },
    (data, cb) => {
      courseModel.getCheckCourseComplete(req, req.params.detailId, (errMaterialDetail, resultMaterialDetail) => {
        if (resultMaterialDetail.jumlah_materi === resultMaterialDetail.user_materi) {
          data.is_completed_detail = 1
        } else {
          data.is_completed_detail = 0
        }
        cb(errMaterialDetail, data)
      })
    },
    (dataDetail, cb) => {
      if (dataDetail.is_completed === 1) {
        courseModel.checkUserCourseDetail(req, req.params.userId, req.params.detailId, (errDetail, resultDetail) => {
          if (_.isEmpty(resultDetail) || errDetail) {
            const data = {
              userid: req.params.userId,
              detailId: req.params.detailId,
              is_completed: 1,
              is_done_watching: 1,
              created_at: new Date(),
              updated_at: new Date()
            }
            courseModel.insertDetailMaterial(req, data, (err, result) => {
              const key = `get-user-course-detail-$:{req.params.userId}-$:{req.params.detailId}`
              redisCache.del(key)
              dataDetail.is_detail_completed = result[0].is_completed
              cb(err, dataDetail)
            })
          } else {
            courseModel.checkDetailMaterial(req, req.params.detailId, (err, result) => {
              const key = `get-user-course-detail-$:{req.params.userId}-$:{req.params.detailId}`
              redisCache.del(key)
              dataDetail.is_detail_completed = result[0].is_completed
              cb (err, dataDetail)
            })
          }
        })
      } else {
        cb(null, dataDetail)
      }
    }

  ],
    (errMaterial, resultMaterial) => {
      console.log(resultMaterial)
      if (!errMaterial) {
        return MiscHelper.responses(res, resultMaterial)
      } else {
        return MiscHelper.errorCustomStatus(res, errMaterial, 400)
      }
    })
}

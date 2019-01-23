/* global _ */

'use strict'

const async = require('async')
const courseModel = require('../models/material')
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
      courseModel.getUserMaterial(req, req.params.userId, (errMaterial, resultMaterial) => {
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

  const userId = req.body.userId
  const materialId = req.body.materialId
  let is_downloaded = req.body.is_downloaded
  let is_done_watching = req.body.is_done_watching
  async.waterfall([
    (cb) => {
      courseModel.checkUserMaterialAlreadyExist(req, userId, materialId, (errCheck, resultCheck) => {
        if (_.isEmpty(resultCheck) || errCheck) {
          cb(errCheck)
        } else {
          const data = {
            updated_at: new Date()
          }
          if (req.body.is_downloaded === undefined) {
            Object.assign(data, { is_done_watching: req.body.is_done_watching })
          } else if (req.body.is_done_watching === undefined) {
            Object.assign(data, { is_downloaded: req.body.is_downloaded })
          }
          console.log(data)
          courseModel.updateUserMaterial(req, resultCheck[0].id, data, materialId, (err, resultUpdateMaterial) => {
            if (err) {
              cb(err)
            } else {
              return MiscHelper.responses(res, resultUpdateMaterial)
            }
          })
        }
      })
    },
    (cb) => {
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
      if (is_downloaded === undefined) {
        data.is_done_watching = is_done_watching
      } else if (is_done_watching === undefined) {
        data.is_downloaded = is_downloaded
      }

      courseModel.insertUserMaterial(req, data, (err, result) => {
        const key = 'get-material-user-' + req.params.userId
        redisCache.del(key)
        cb(err, result)
      })
    }

  ],
    (errMaterial, resultMaterial) => {
      if (!errMaterial) {
        return MiscHelper.responses(res, resultMaterial)
      } else {
        return MiscHelper.errorCustomStatus(res, errMaterial, 400)
      }
    })
}

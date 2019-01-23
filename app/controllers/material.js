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

exports.updateMaterial = (req, res) => {
  req.checkBody('userid', 'userid is Required').notEmpty.isInt()
  req.checkBody('materialid', 'materialid is Required').notEmpty.isInt()

  if (req.validationError()) {
    return MiscHelper.errorCustomStatus(res, req.validationError(true))
  }

  // const userid = req.body.user
}

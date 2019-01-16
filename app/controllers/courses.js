/* global _ */

'use strict'

const async = require('async')
const coursesModel = require('../models/courses')
const redisCache = require('../libs/RedisCache')

/*
 * GET : '/courses/get/
 *
 * @desc Get course list
 *
 * @param {object} req - Parameters for request
 *
 * @return {object} Reuest object
 */

exports.get = (req, res) => {
  const key = 'get-course'
  async.waterfall([
    (cb) => {
      redisCache.get(key, courses => {
        if (courses) {
          return MiscHelper.responses(res, courses)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      coursesModel.get(req, (errCourses, resultCourses) => {
        cb(errCourses, resultCourses)
      })
    },
    (dataCourses, cb) => {
      redisCache.setex(key, 600, dataCourses)
      console.log('process cached')
      cb(null, dataCourses)
    }
  ],
    (errCourses, resultCourses) => {
      if (!errCourses) {
        return MiscHelper.responses(res, resultCourses)
      } else {
        return MiscHelper.errorCustomStatus(res, errCourses, 400)
      }
    })
}

exports.detail = (req, res) => {
  const key = 'get-detail-' + req.params.idCourse
  async.waterfall([
    (cb) => {
      redisCache.get(key, details => {
        if (details) {
          return MiscHelper.responses(res, details)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      coursesModel.getDetail(req, req.params.idCourse, (errCourses, resultCourses) => {
        cb(errCourses, resultCourses)
      })
    },
    (dataDetail, cb) => {
      redisCache.setex(key, 600, dataDetail)
      console.log('process cached')
      cb(null, dataDetail)
    }
  ],
    (errDetail, resultDetail) => {
      if (!errDetail) {
        return MiscHelper.responses(res, resultDetail)
      } else {
        return MiscHelper.errorCustomStatus(res, errDetail, 400)
      }
    })
}

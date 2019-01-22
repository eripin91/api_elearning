/* global _ */

'use strict'

const async = require('async')
const coursesModel = require('../models/courses')
const redisCache = require('../libs/RedisCache')

/*
 * GET : '/courses/idClass/
 *
 * @desc Get course list
 *
 * @param {object} req - Parameters for request
 *
 * @return {object} Request object
 */

exports.get = (req, res) => {
  const key = 'get-course' + req.params.idClass
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
      coursesModel.get(req, req.params.idClass, (errCourses, resultCourses) => {
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

/*
 * GET : '/courses/course/idCourse/
 *
 * @desc Get course detail
 *
 * @param {object} req - Parameters for request
 *
 * @return {object} Request object
 */

exports.detail = (req, res) => {
  const key = 'get-course-detail-' + req.params.idCourse
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

/*
 * GET : '/detail/idDetail
 *
 * @desc Get course list
 *
 * @param {object} req - Parameters for request
 *
 * @return {object} Request object
 */
exports.material = (req, res) => {
  const key = 'get-course-material-' + req.params.idDetail
  async.waterfall([
    (cb) => {
      redisCache.get(key, materials => {
        if (materials) {
          return MiscHelper.responses(res, materials)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      coursesModel.getMaterial(req, req.params.idDetail, (errMaterial, resultMaterial) => {
        cb(errMaterial, resultMaterial)
      })
    },
    (dataMaterial, cb) => {
      redisCache.setex(key, 600, dataMaterial)
      console.log('process cached')
      cb(null, dataMaterial)
    }
  ],
  (errMaterial, resultMaterial) => {
    if (!errMaterial) {
      return MiscHelper.responses(res, resultMaterial)
    } else {
      return MiscHelper.errorCustomStatus(res, errMaterial, 400)
    }
  }
  )
}

/*
 * GET : '/material/idMaterial
 *
 * @desc Get course list
 *
 * @param {object} req - Parameters for request
 *
 * @return {object} Request object
 */
exports.materialDetail = (req, res) => {
  const key = 'get-course-material-detail-' + req.params.materialDetailId
  async.waterfall([
    (cb) => {
      redisCache.get(key, materials => {
        if (materials) {
          return MiscHelper.responses(res, materials)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      coursesModel.getMaterialDetail(req, req.params.materialDetailId, (errMaterialDetail, resultMaterialDetail) => {
        cb(errMaterialDetail, resultMaterialDetail)
      })
    },
    (dataMaterialDetail, cb) => {
      redisCache.setex(key, 600, dataMaterialDetail)
      console.log('process cached')
      cb(null, dataMaterialDetail)
    }
  ],
  (errMaterialDetail, resultMaterialDetail) => {
    if (!errMaterialDetail) {
      return MiscHelper.responses(res, resultMaterialDetail)
    } else {
      return MiscHelper.errorCustomStatus(res, errMaterialDetail, 400)
    }
  })
}

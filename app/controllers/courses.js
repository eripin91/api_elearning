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
  const key = 'get-course-' + req.params.idUser + '-' + req.params.idClass
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
        // checked if result === undefined
        if (resultCourses === undefined) {
          let data = { message: 'tidak ada course untuk class ini' }
          cb(null, data)
        } else {
          resultCourses.course.map((course) => {
            let minutes = Math.floor(course.durasi / 60)
            let second = course.durasi - (minutes * 60)
            course.durasi = minutes + ':' + second
          })
          cb(errCourses, resultCourses)
        }
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
 * @desc Get course detail / BAB
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
* GET : '/detail/idUser/idDetail
*
* @desc Get Material in BAB
*
* @param {object} req - Parameters for request
*
* @return {object} Request object
*/
exports.material = (req, res) => {
  const key = 'get-user-course-material-' + req.params.idUser + req.params.idDetail
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
      coursesModel.getMaterial(req, req.params.idUser, req.params.idDetail, (errMaterial, resultMaterial) => {
        console.log(resultMaterial)
        resultMaterial.map((result) => {
          let minutes = Math.floor(result.duration / 60)
          let second = result.duration - (minutes * 60)
          result.duration = minutes + ':' + second
          if (result.is_downloaded === null) {
            result.is_downloaded = 0
          }
        })
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
* @desc Get Material
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
        let minutes = Math.floor(resultMaterialDetail.duration / 60)
        let second = resultMaterialDetail.duration - (minutes * 60)
        resultMaterialDetail.duration = minutes + ':' + second
        resultMaterialDetail.next.map((result) => {
          minutes = Math.floor(result.duration / 60)
          second = result.duration - (minutes * 60)
          result.duration = minutes + ':' + second
        })
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

/*
* GET : '/courses/detail/idDetail/material/idMaterial
*
* @desc Get Material
*
* @param {object} req - Parameters for request
*
* @return {object} Request object
*/
exports.nextMaterial = (req, res) => {
  const key = 'get-course-detail-material-' + req.params.materialDetailId
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
      const data = [req.params.idDetail, req.params.materialDetailId]
      coursesModel.getNextMaterial(req, data, (errMaterialDetail, resultMaterialDetail) => {
        cb(errMaterialDetail, resultMaterialDetail)
      })
    },
    (dataMaterialDetail, cb) => {
      redisCache.setex(key, 600, dataMaterialDetail)
      console.log('process cached')
      cb(null, dataMaterialDetail)
    }
  ], (errMaterialDetail, resultMaterialDetail) => {
    if (!errMaterialDetail) {
      return MiscHelper.responses(res, resultMaterialDetail)
    } else {
      return MiscHelper.errorCustomStatus(res, errMaterialDetail, 400)
    }
  })
}

exports.getUserCourseDetail = (req, res) => {
  async.waterfall([
    (cb) => {
      coursesModel.getCheckCourseComplete(req, req.params.detailId, (errMaterialDetail, resultMaterialDetail) => {
        let data = {}
        if (resultMaterialDetail.jumlah_materi === resultMaterialDetail.user_materi) {
          data.is_completed = 1
        } else {
          data.is_completed = 0
        }
        cb(errMaterialDetail, data)
      })
    },
    (dataDetail, cb) => {
      coursesModel.checkUserCourseDetail(req, req.params.userId, req.params.detailId, (errCheck, resultCheck) => {
        if (_.isEmpty(resultCheck) || errCheck) {
          cb(errCheck, dataDetail)
        } else {
          return MiscHelper.responses(res, resultCheck)
        }
      })
    },
    (dataDetail, cb) => {
      if (dataDetail.is_completed === 1) {
        const data = {
          userid: req.params.userId,
          detailid: req.params.detailId,
          is_completed: 1,
          created_at: new Date(),
          updated_at: new Date()
        }

        coursesModel.insertMaterialDetail(req, data, (err, result) => {
          const key = `get-user-course-detail-$:{req.params.userId}-$:req.params.detailId`
          console.log('post')
          redisCache.del(key)
          cb(err, result)
        })
      } else {
        const data = {
          userid: req.params.userId,
          detailid: req.params.detailId,
          is_completed: dataDetail.is_completed
        }
        cb(null, data)
      }
    }
  ], (errMaterialDetail, resultMaterialDetail) => {
    if (!errMaterialDetail) {
      return MiscHelper.responses(res, resultMaterialDetail)
    } else {
      return MiscHelper.errorCustomStatus(res, errMaterialDetail, 400)
    }
  })
}

'use strict'

const async = require('async')
const discussionsModel = require('../models/discussions')
const redisCache = require('../libs/RedisCache')

exports.getThread = (req, res) => {
  const key = 'get-thread-' + req.params.courseId
  async.waterfall([
    (cb) => {
      redisCache.get(key, detail => {
        if (detail) {
          return MiscHelper.responses(res, detail)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      discussionsModel.getThread(req, req.params.courseId, (errThread, resultThread) => {
        cb(errThread, resultThread)
      })
    },
    (dataThread, cb) => {
      redisCache.setex(key, 600, dataThread)
      console.log('proccess cached')
      cb(null, dataThread)
    }
  ], (errThreads, resultThreads) => {
    if (!errThreads) {
      return MiscHelper.responses(res, resultThreads)
    } else {
      return MiscHelper.errorCustomStatus(res, errThreads)
    }
  })
}

exports.insertThreadTitle = (req, res) => {
  req.checkBody('userId', 'userId is required').notEmpty().isInt()
  req.checkBody('courseId', 'courseId is required').notEmpty().isInt()
  req.checkBody('title', 'title is required').notEmpty()

  const data = {
    userid: req.body.userId,
    courseid: req.body.courseId,
    post_title: req.body.title,
    post_content: '',
    parent:0,
    status:1,
    created_at: new Date(),
    updated_at: new Date() 
  }

  discussionsModel.insertThreadTitle(req, data, (errInsert, resultInsert) => {
    if (!errInsert) {
      return MiscHelper.responses(res, resultInsert)
    } else {
      return MiscHelper.errorCustomStatus(res, errInsert, 400)
    }
  })
}

exports.insertThreadContent = (req, res) => {
  req.checkBody('userId', 'userId is required').notEmpty().isInt()
  req.checkBody('parentId', 'parentId is required').notEmpty().isInt()
  req.checkBody('content', 'content is required').notEmpty()

  const data = {
    userid: req.body.userId,
    post_title: '',
    post_content: req.body.content,
    parent: req.body.parentId,
    status: 1,
    created_at: new Date(),
    updated_at: new Date()
  }

  discussionsModel.insertThreadContent(req, data, (errInsert, resultInsert) => {
    if (!errInsert) {
      return MiscHelper.responses(res, resultInsert)
    } else {
      return MiscHelper.errorCustomStatus(res, errInsert, 400)
    }
  })
}
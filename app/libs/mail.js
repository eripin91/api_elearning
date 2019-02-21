'use strict'

const mailgun = require('mailgun-js')({ apiKey: CONFIG.MAILGUN.API_KEY, domain: CONFIG.MAILGUN.DOMAIN })

const mail = {
  sendEmail: (data, callback) => {
    mailgun.messages().send(data, (error, body) => {
      callback(error, body)
    })
  }
}

module.exports = mail

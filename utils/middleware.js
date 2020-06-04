const morgan = require('morgan')

const morganLogger = morgan.token('body', function (req) {
  if (req.method !== 'POST') {
    return ' '
  }
  return JSON.stringify(req.body)
})

module.exports = {morganLogger}
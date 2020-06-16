const morgan = require('morgan')
const logger = require('./logger')
const morganLogger = morgan.token('body', function (req) {
  if (req.method !== 'POST') {
    return ' '
  }
  return JSON.stringify(req.body)
}) 

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  //logger.error(error.message)
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'Internal Server Error'){
    return response.status(500).json({ error: error.message })
  }
  next(error)
}

module.exports = {morganLogger, unknownEndpoint, errorHandler}
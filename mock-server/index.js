const jsonServer = require('json-server')
const server = jsonServer.create()
const middlewares = jsonServer.defaults()
const port = process.env.PORT || 3000

server.use(jsonServer.bodyParser)
server.use(middlewares)

server.listen(port, () => {
 console.log('JSON Server is running')
})

server.get('/api/questionnaires', (request, response) => {
  if (request.method === 'GET') {
    const questionnaire = require('./questionnaire')
    response.status(200).jsonp(questionnaire())
  }
})

server.get('/api/questionnaires/tape', (request, response) => {
  if (request.method === 'GET') {
    const questionnaire = require('./questionnaire-tape')
    response.status(200).jsonp(questionnaire())
  }
})

server.get('/api/questionnaires/types', (request, response) => {
  if (request.method === 'GET') {
    const questionnaires = ['tape']
    response.status(200).jsonp(questionnaires)
  }
})

server.get('/api/options', (request, response) => {
  if (request.method === 'GET') {
    const options = require('./options')
    response.status(200).jsonp(options())
  }
})

server.get('/api/search/conveyors', (request, response) => {
  if (request.method === 'GET') {
    const conveyors = require('./search/conveyors-get')
    response.status(200).jsonp(conveyors())
  }
})

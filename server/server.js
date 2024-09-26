const jsonServer = require('json-server')

const server = jsonServer.create()

const router = jsonServer.router('./server/db.json')
const middlewares = jsonServer.defaults()
 
server.use(middlewares)
server.use('/api/v1', router)
server.listen(process.env.PORT || 4444, () => {
  console.log('JSON Server is running')
})
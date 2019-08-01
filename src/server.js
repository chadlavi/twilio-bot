import {routes as Routes} from './routes'
import express from 'express'
import bodyParser from 'body-parser'

const app = express()
 
app.use(express.static(__dirname + '/views'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
 
const routes = Routes(app)
 
const server = app.listen(3000, function () {
  console.log('\n\r\n\r\n\r🥳 listening on port %s\n\r\n\r---\n\r', server.address().port)
})
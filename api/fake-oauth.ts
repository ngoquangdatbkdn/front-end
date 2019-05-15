import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import cors from 'cors'

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.get('/auth/user', async function (req, res) {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    const userInfo = await jwt.decode(token)
    return res.status(200).json(userInfo)
  }
  return res.status(401).json({ error: 'Bad credentials' })
})

app.post('/auth/login', function (req, res) {
  const token = jwt.sign(req.body, 'secret-key')
  res.status(200).json({ data: { token } })
})

app.post('/auth/logout', function (req, res) {
  res.json({ ok: true })
})

export default {
  path: '/api',
  handler: app
}

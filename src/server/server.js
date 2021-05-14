import config from '../../config/default.json'
import cors from 'cors'
import express from 'express'

const serverConfig = { config }
const app = express()
const port = process.env.STUDY_PORT || serverConfig.port

app.use(cors())
app.use((req, res, next) => {
  initiateHeader(res)
  next()
})
app.use(express.static('dist/'))

const initiateHeader = res => {
  res.set({
    'X-XSS-Protection': '1; mode=block',
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
  })
  return res
}

app.listen(port, () =>
  console.log(
    `Listening on port ${port}! Go to http://localhost:${port} to view the app.`
  )
)

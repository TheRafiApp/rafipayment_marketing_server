const express = require('express')
const cors = require('cors')
const chalk = require('chalk')
const mcapi = require('mailchimp-api')
const key = require('../key')

if (!key) {
  throw Error('Mailchimp API key is missing')
}

const log = console.log
const port = process.env.PORT || 3001

const app = express()

app.use(cors())
app.use(express.json())

const mailchimp = new mcapi.Mailchimp(key)

app.post('/', (req, res) => {
  const email = req.body.email

  log(
    chalk`{blueBright Received {magenta ${email}}, validating...}`
  )

  mailchimp.lists.subscribe({
    id: 'b8bb9fbd61', email: { email }
  }, data => {
    log(
      chalk`{greenBright Validated {magenta ${email}}, saved to list}`
    )
    res.json({
      message: `User subscribed successfully! Look for the confirmation email.`
    })
  }, err => {
    const error = err.error || `Unable to subscribe ${email}`
    log(
      chalk`{magenta ${error}}`
    )
    return res.json({ error })
  })
})

app.get('/', (req, res) => {
  res.json({
    message: 'ok'
  })
})

app.listen(port, () => {
  log(
    chalk`{greenBright Marketing server running at:} {blueBright http://localhost:${port}/}`
  )
})

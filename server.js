const express = require('express')
const fs = require('fs')
const cors = require('cors')
const mcapi = require('mailchimp-api')
const bodyParser = require('body-parser')

const app = express();

// app.set('port', (process.env.PORT || 3001))
const port = process.env.PORT || 3001

app.use(cors())
app.use(bodyParser.json())

const key = require('./key')

if (!key) throw Error('MAILCHIMP_KEY not set')

const mc = new mcapi.Mailchimp(key)

app.post('/', (req, res) => {
  const email = req.body.email
  console.log(`validating ${email}`);
  mc.lists.subscribe({id: 'b8bb9fbd61', email: { email } }, (data) => {
    console.log('passed validation', data)
    const message = `User subscribed successfully!
      Look for the confirmation email.`
    res.json({
      message
    })
  }, (err) => {
    const error = err.error
      ? err.error
      : 'There was an error subscribing that user'
    return res.json({ error })
  })
})

app.get('/', (req, res) => {
  res.json({
    'message': 'ok'
  })
})

app.listen(port, () => {
  console.log(`Find the server at: http://localhost:${port}/`)
})

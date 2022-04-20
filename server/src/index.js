require('dotenv').config()

const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const users = [
  { username: 'qxb3', password: 'test123' }
]

// Routes
app.use(require('./routes/register')(users))
app.use(require('./routes/login')(users))
app.use(require('./routes/authenticate'))

app.listen(3000, () => {
  console.log('express server is running')
})

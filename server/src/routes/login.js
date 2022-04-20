const { Router } = require('express')

const credentialError = require('../middlewares/credential-errors')
const jwt = require('jsonwebtoken')

module.exports = (users) => {
  const router = Router()

  router.post('/login', credentialError, (req, res) => {
    const { username, password } = req.body

    if (!users.some(user => user.username === username && user.password === password)) {
      return res.status(401).send({
        status: 401,
        message: 'Invalid username or password'
      })
    }

    const accessToken = jwt.sign({ user: username }, process.env.ACCESS_TOKEN)
    const refreshToken = jwt.sign({ user: username }, process.env.REFRESH_TOKEN)

    res.status(200).send({
      status: 200,
      accessToken,
      refreshToken
    })
  })

  return router
}

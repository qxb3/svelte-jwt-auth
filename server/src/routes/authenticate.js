const { Router } = require('express')
const router = Router()

const jwt = require('jsonwebtoken')

router.post('/authenticate', (req, res) => {
  if (!req.headers.authentication) {
    return res.status(401).send({
      status: 401,
      message: 'authentication is required'
    })
  }

  const accessToken = req.headers.authentication?.split(' ')[1]
  if (!accessToken) {
    return res.status(401).send({
      status: 401,
      message: 'accessToken is required'
    })
  }

  jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      return res.status(403).send({
        status: 403,
        message: 'invalid access token'
      })
    }

    res.send({
      status: 200,
      user
    })
  })
})

module.exports = router

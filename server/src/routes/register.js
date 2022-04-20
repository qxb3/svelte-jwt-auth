const { Router } = require('express')

const credentialErrors = require('../middlewares/credential-errors')

module.exports = (users) => {
  const router = Router()

  router.post('/register', credentialErrors, (req, res) => {
    const { username, password } = req.body

    users.push({ username, password })
    res.status(200).send({
      status: 200,
      message: 'Successfuly registered'
    })
  })

  return router
}

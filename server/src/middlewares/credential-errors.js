module.exports = (req, res, next) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(401).send({
      status: 401,
      message: 'username and password is required'
    })
  }

  if (typeof username !== 'string' || typeof password !== 'string') {
    return res.status(400).send({
      status: 400,
      message: 'username and password needs to be typeof string'
    })
  }

  next()
}

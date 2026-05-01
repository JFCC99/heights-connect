const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

router.post('/login', async (req, res) => {
  const { username, password } = req.body

  if (username !== process.env.ADMIN_USERNAME) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const valid = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH)
  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '8h' })
  res.json({ token })
})

module.exports = router

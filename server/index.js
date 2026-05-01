const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '../public')))

// Routes
const businessRoutes = require('./routes/businesses')
const authRoutes = require('./routes/auth')
app.use('/api/businesses', businessRoutes)
app.use('/api/auth', authRoutes)

// Serve the detail page for clean URLs like /business/64abc123
app.get('/business/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/business.html'))
})

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Heights Connect server is running!' })
})

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:3000`)
    })
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err)
  })
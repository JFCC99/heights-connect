const express = require('express')
const router = express.Router()
const Business = require('../models/Business')
const requireAuth = require('../middleware/auth')

// GET all businesses including unapproved — admin only
router.get('/admin/all', requireAuth, async (req, res) => {
  try {
    const businesses = await Business.find().sort({ createdAt: -1 })
    res.json(businesses)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// PATCH approve a business — admin only
router.patch('/:id/approve', requireAuth, async (req, res) => {
  try {
    const business = await Business.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    )
    if (!business) return res.status(404).json({ message: 'Business not found' })
    res.json(business)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// DELETE a business — admin only
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const business = await Business.findByIdAndDelete(req.params.id)
    if (!business) return res.status(404).json({ message: 'Business not found' })
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET all approved businesses
router.get('/', async (req, res) => {
  try {
    const businesses = await Business.find({ approved: true })
    res.json(businesses)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET businesses by category
router.get('/category/:category', async (req, res) => {
  try {
    const businesses = await Business.find({ 
      category: req.params.category,
      approved: true 
    })
    res.json(businesses)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET search businesses by name, description, or category
router.get('/search', async (req, res) => {
  try {
    // Escape special regex characters so user input is treated as a literal string,
    // not a regex pattern — prevents ReDoS attacks
    const escaped = (req.query.q || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const businesses = await Business.find({
      $or: [
        { name: { $regex: escaped, $options: 'i' } },
        { description: { $regex: escaped, $options: 'i' } },
        { category: { $regex: escaped, $options: 'i' } }
      ],
      approved: true
    })
    res.json(businesses)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET a single approved business by ID — used by the detail page
router.get('/:id', async (req, res) => {
  try {
    const business = await Business.findOne({ _id: req.params.id, approved: true })
    if (!business) return res.status(404).json({ message: 'Business not found' })
    res.json(business)
  } catch {
    // Mongoose throws CastError for malformed ObjectIds — treat as 404
    res.status(404).json({ message: 'Business not found' })
  }
})

// POST submit a new business
router.post('/', async (req, res) => {
  const business = new Business({
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    address: req.body.address,
    phone: req.body.phone,
    hours: req.body.hours,
    website: req.body.website,
    instagram: req.body.instagram
  })
  try {
    const newBusiness = await business.save()
    res.status(201).json(newBusiness)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

module.exports = router
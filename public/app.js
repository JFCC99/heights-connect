const API_URL = '/api/businesses'
let allBusinesses = []
let currentCategory = 'all'

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// Load businesses when page opens
document.addEventListener('DOMContentLoaded', () => {
  loadBusinesses()
  setupForm()
})

// Fetch all approved businesses from the API
async function loadBusinesses() {
  try {
    const response = await fetch(API_URL)
    const businesses = await response.json()
    allBusinesses = businesses
    displayBusinesses(businesses)
    updateStats(businesses.length)
  } catch (err) {
    console.error('Error loading businesses:', err)
    document.getElementById('businessGrid').innerHTML = 
      '<div class="empty-state">Unable to load businesses. Please try again.</div>'
  }
}

// Display businesses in the grid
function displayBusinesses(businesses) {
  const grid = document.getElementById('businessGrid')
  
  if (businesses.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <h3>No businesses yet</h3>
        <p>Be the first to add one using the form below!</p>
      </div>
    `
    return
  }

  grid.innerHTML = businesses.map(b => `
    <a href="/business/${b._id}" class="business-card">
      <span class="business-category">${escapeHtml(b.category)}</span>
      <h3 class="business-name">${escapeHtml(b.name)}</h3>
      <p class="business-description">${escapeHtml(b.description)}</p>
      <div class="business-details">
        <div class="business-detail">
          <span class="detail-icon">📍</span>
          <span>${escapeHtml(b.address)}</span>
        </div>
        ${b.phone ? `
          <div class="business-detail">
            <span class="detail-icon">📞</span>
            <span>${escapeHtml(b.phone)}</span>
          </div>
        ` : ''}
        ${b.hours ? `
          <div class="business-detail">
            <span class="detail-icon">🕐</span>
            <span>${escapeHtml(b.hours)}</span>
          </div>
        ` : ''}
        ${b.instagram ? `
          <div class="business-detail">
            <span class="detail-icon">📸</span>
            <span>${escapeHtml(b.instagram)}</span>
          </div>
        ` : ''}
      </div>
    </a>
  `).join('')
}

// Filter by category
function filterCategory(category) {
  currentCategory = category
  document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'))
  event.target.classList.add('active')

  if (category === 'all') {
    displayBusinesses(allBusinesses)
  } else {
    const filtered = allBusinesses.filter(b => b.category === category)
    displayBusinesses(filtered)
  }
}

// Search businesses
function searchBusinesses() {
  const query = document.getElementById('searchInput').value.toLowerCase()
  if (!query) {
    displayBusinesses(allBusinesses)
    return
  }
  const filtered = allBusinesses.filter(b =>
    b.name.toLowerCase().includes(query) ||
    b.description.toLowerCase().includes(query) ||
    b.category.toLowerCase().includes(query)
  )
  displayBusinesses(filtered)
}

// Enter key triggers search
document.getElementById('searchInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') searchBusinesses()
})

// Update stat counter
function updateStats(count) {
  document.getElementById('totalCount').textContent = count
}

// Handle form submission
function setupForm() {
  const form = document.getElementById('businessForm')
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const message = document.getElementById('formMessage')
    const data = {
      name: document.getElementById('name').value,
      category: document.getElementById('category').value,
      description: document.getElementById('description').value,
      address: document.getElementById('address').value,
      phone: document.getElementById('phone').value,
      hours: document.getElementById('hours').value,
      website: document.getElementById('website').value,
      instagram: document.getElementById('instagram').value
    }
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (response.ok) {
        message.className = 'form-message success'
        message.textContent = '✓ Business submitted! Pending approval. / ¡Negocio enviado! Pendiente de aprobación.'
        form.reset()
      } else {
        throw new Error('Submission failed')
      }
    } catch (err) {
      message.className = 'form-message error'
      message.textContent = '✗ Something went wrong. Please try again.'
    }
  })
}
// Run: node scripts/generate-hash.js yourpassword
// Copy the output hash into your .env as ADMIN_PASSWORD_HASH

const bcrypt = require('bcryptjs')

const password = process.argv[2]
if (!password) {
  console.error('Usage: node scripts/generate-hash.js <your-password>')
  process.exit(1)
}

bcrypt.hash(password, 10).then(hash => {
  console.log('\nAdd this to your .env file:\n')
  console.log(`ADMIN_PASSWORD_HASH=${hash}`)
  console.log()
})

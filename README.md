# Heights Connect

A community-driven business directory for Washington Heights, New York. Helping residents discover and support local businesses in the neighborhood.

**Live site:** [heights-connect-production.up.railway.app](https://heights-connect-production.up.railway.app)

---

## Features

- Browse and search approved local businesses
- Filter by category: Restaurants, Barbershops, Grocery, Health, Beauty, Retail, Services
- Individual detail pages for each business
- Submit a business for review
- Admin panel with JWT authentication to approve, reject, or delete submissions
- Bilingual interface (English / Spanish)

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js, Express |
| Database | MongoDB Atlas (Mongoose) |
| Frontend | Vanilla HTML, CSS, JavaScript |
| Auth | JSON Web Tokens (JWT), bcryptjs |
| Deployment | Railway |

## Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB Atlas account and cluster

### Local Setup

```bash
# Clone the repo
git clone https://github.com/JFCC99/heights-connect.git
cd heights-connect

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your values (see Environment Variables below)

# Start the development server
npm run dev
```

Visit `http://localhost:3000`

### Environment Variables

Create a `.env` file in the project root:

```
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/heights-connect
PORT=3000
JWT_SECRET=your-long-random-secret-here
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=your-bcrypt-hash-here
```

To generate a bcrypt hash for your admin password:

```bash
node scripts/generate-hash.js yourpassword
```

### Seed Data

To populate the database with real Washington Heights businesses:

```bash
node scripts/seed.js
```

This is safe to run multiple times — it skips seeding if the database already has businesses.

## Admin Panel

Access the admin panel at `/admin.html`. Log in with your `ADMIN_USERNAME` and password to:

- Review pending business submissions
- Approve businesses to make them publicly visible
- Delete submissions

## Project Structure

```
heights-connect/
├── public/                 # Frontend static files
│   ├── index.html          # Homepage and submit form
│   ├── business.html       # Individual business detail page
│   ├── admin.html          # Admin dashboard
│   ├── app.js              # Frontend JavaScript
│   └── styles.css          # Shared styles
├── scripts/
│   ├── seed.js             # Database seed script
│   └── generate-hash.js    # Bcrypt password hash utility
└── server/
    ├── index.js            # Express entry point
    ├── middleware/
    │   └── auth.js         # JWT authentication middleware
    ├── models/
    │   └── Business.js     # Mongoose business schema
    └── routes/
        ├── auth.js         # POST /api/auth/login
        └── businesses.js   # Business CRUD routes
```

## API Routes

| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/api/businesses` | No | Get all approved businesses |
| GET | `/api/businesses/:id` | No | Get a single business |
| GET | `/api/businesses/search?q=` | No | Search businesses |
| GET | `/api/businesses/category/:cat` | No | Filter by category |
| POST | `/api/businesses` | No | Submit a new business |
| GET | `/api/businesses/admin/all` | Yes | Get all businesses including pending |
| PATCH | `/api/businesses/:id/approve` | Yes | Approve a business |
| DELETE | `/api/businesses/:id` | Yes | Delete a business |

## Deployment

The app is deployed on [Railway](https://railway.app). Any push to the `main` branch triggers an automatic redeploy.

Required environment variables must be set in the Railway Variables tab before the app will start successfully.

---

Built for the Washington Heights community.

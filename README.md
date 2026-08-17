# ⚡ Snipzy — URL Shortener API

> A fast, lightweight REST API to shorten long URLs, track redirects, and view click analytics — built with Node.js, Express, and MongoDB Atlas.

---

## 📖 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Server](#running-the-server)
- [API Reference](#-api-reference)
- [Example Usage](#-example-usage)
- [Security Notes](#-security-notes)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## 📌 About

**Snipzy** is a minimal yet powerful URL shortener REST API. It takes any long URL, generates a unique 8-character short ID using [nanoid](https://github.com/ai/nanoid), stores it in MongoDB, and serves redirects. Each click is logged with a timestamp, enabling basic click analytics.

---

## ✨ Features

- 🔗 Shorten any valid URL with a single POST request
- ↩️ Instant HTTP redirect via short ID
- 📊 Click analytics — track total visit count with timestamps
- 🗄️ Persistent storage with MongoDB Atlas
- ⚙️ Environment-variable driven configuration (no hardcoded secrets)
- 🚀 Ready for local development with `nodemon` auto-reload

---

## 🛠 Tech Stack

| Layer        | Technology                  |
|--------------|-----------------------------|
| Runtime      | Node.js (CommonJS)          |
| Framework    | Express v5                  |
| Database     | MongoDB Atlas via Mongoose  |
| ID Generator | nanoid v6                   |
| Dev Server   | nodemon                     |
| Config       | dotenv                      |

---

## 📁 Project Structure

```
url-shortener/
├── index.js                        # App entry point — starts HTTP server
├── package.json
├── .env                            # ⚠️ NOT committed — see Environment Variables
├── .gitignore
└── src/
    ├── app.js                      # Express app setup, middleware, routes
    ├── db/
    │   └── db.js                   # MongoDB connection logic
    ├── model/
    │   └── url.model.js            # Mongoose schema & model
    ├── controller/
    │   └── url.controller.js       # Business logic for all endpoints
    └── routes/
        └── url.routes.js           # Route definitions
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster (or local MongoDB instance)
- npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/snipzy.git
cd snipzy

# 2. Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root of the project. **Never commit this file.**

```env
PORT=8000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/urlshortner?retryWrites=true&w=majority
```

| Variable    | Description                              | Example             |
|-------------|------------------------------------------|---------------------|
| `PORT`      | Port the server listens on               | `8000`              |
| `MONGO_URI` | Full MongoDB connection string           | `mongodb+srv://...` |

> 💡 Get your `MONGO_URI` from the **MongoDB Atlas dashboard → Connect → Drivers**.

### Running the Server

```bash
# Development (with auto-reload via nodemon)
npm start

# The server will start at:
# http://localhost:8000
```

---

## 📡 API Reference

All endpoints are prefixed with `/api` **or** can be accessed from the root `/`.

---

### `POST /api/url`

Shorten a long URL.

**Request Body**

```json
{
  "url": "https://www.example.com/some/very/long/path?query=value"
}
```

**Response `201 Created`**

```json
{
  "message": "Url shortend successfully",
  "shortId": "aB3xYz9K",
  "shortUrl": "http://localhost:3000/aB3xYz9K"
}
```

**Response `400 Bad Request`** — if `url` is missing

```json
{
  "message": "URL is needed to continue"
}
```

---

### `GET /:shortId`

Redirect to the original URL associated with the given short ID.

**Response `302 Found`** — redirects the client to the original URL.

**Response `404 Not Found`** — if the short ID doesn't exist.

```json
{
  "message": "This is short id is not registered"
}
```

---

### `GET /:shortId/analytics`

Get click analytics (total visit count) for a short URL.

**Response `200 OK`**

```json
{
  "message": "Clicked retrieved successfully",
  "analytics": 42
}
```

**Response `500 Internal Server Error`** — if something goes wrong.

---

## 🧪 Example Usage

Using `curl`:

```bash
# 1. Shorten a URL
curl -X POST http://localhost:8000/api/url \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.github.com/some/very/long/repository/path"}'

# 2. Redirect (visit in browser or curl -L)
curl -L http://localhost:8000/aB3xYz9K

# 3. Get analytics
curl http://localhost:8000/aB3xYz9K/analytics
```

Using [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/), import the routes above as a collection.

---

## 🔒 Security Notes

- ✅ `.env` is listed in `.gitignore` — credentials are **not** committed to git.
- ✅ `node_modules/` is excluded from version control.
- ⚠️ The MongoDB connection string contains credentials — **always** use environment variables, never hardcode.
- ⚠️ Consider rotating your Atlas DB password if you've ever accidentally committed your `.env` file.
- ⚠️ In production, restrict MongoDB Atlas IP whitelist to your server's IP instead of `0.0.0.0/0`.
- ⚠️ Add input validation / URL sanitization before deploying publicly (e.g., reject `javascript:` or `data:` URLs).
- ⚠️ Consider adding rate limiting (e.g., `express-rate-limit`) to prevent abuse.

---

## 🗺 Roadmap

- [ ] Custom alias support (e.g., `/api/url/my-link`)
- [ ] Expiry / TTL for short URLs
- [ ] Per-URL analytics dashboard
- [ ] Auth (JWT) to manage your own links
- [ ] Frontend UI

---

## 📄 License

ISC License © 2026 Sahil Singh

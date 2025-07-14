# Affordmed Internship Project – URL Shortener Application

**Candidate Name:** Chandana Mukesh 
**Project Title:** React-Based URL Shortener with Click Analytics  
**Date:** 14-07-2025

---

## 1. Project Overview

This application is a browser-based URL shortener built entirely using React. It allows users to create short links for long URLs, track clicks, and view link analytics — all within the client side using localStorage. The application runs entirely on the frontend, with no backend APIs or database.

---

## 2. Design & Architecture

- The application follows a modular component structure:
  - `pages/` folder contains each route’s component
  - `utils/` handles client-side storage logic
  - `middleware/` includes a custom logger
- It uses React functional components with hooks for state and lifecycle management.
- All state and persistence are managed client-side using localStorage.

---

## 3. Technologies Used

| Technology       | Why It Was Chosen                                      |
|------------------|--------------------------------------------------------|
| React            | For building a responsive single-page application      |
| Material UI      | For fast, professional-looking UI components           |
| react-router-dom | For routing between shortener, stats, and redirect     |
| localStorage     | For persisting short links and click data              |
| Custom Middleware| To replace console logging with structured logs        |

---

## 4. Routing Strategy

| Route               | Description                                      |
|---------------------|--------------------------------------------------|
| `/`                | Main page to enter up to 5 URLs                   |
| `/stats`           | Statistics dashboard showing all shortened URLs   |
| `/:shortcode`      | Redirect handler for accessing original URLs      |

All routes are handled with `react-router-dom`, and redirection is done using `window.location.href` after validating the shortcode.

---

## 5. Data Structure (localStorage)

All shortened URLs are stored under the key `"shortLinks"` in the browser's localStorage.

Each shortcode maps to the following structure:

```json
{
  "shortcode123": {
    "url": "https://example.com",
    "createdAt": 1720891711701,
    "expiresAt": 1720893511701,
    "clicks": [
      {
        "time": "14-07-2025 10:10 AM",
        "source": "direct",
        "location": "local"
      }
    ]
  }
}


## 6.6. Logging Middleware
A custom logger (logger.js) was built to replace console.log. It stores logs in an in-memory array using the following function:

js
Copy code
recordLog('Short URL created', { url, code });
This ensures logging compliance with assignment rules and makes debugging cleaner.
# VESTIGE
### _A luxury sneaker archive & e-commerce experience_

> **Live Demo →** [vestige-edit.vercel.app](https://vestige-edit.vercel.app)

---

## Overview

**Vestige** is a high-concept, luxury sneaker e-commerce web application inspired by editorial fashion archives. It features a dark, minimal aesthetic with a unique archive/vault system for browsing and acquiring rare sneakers.

The project was designed and built entirely from scratch — from concept to deployment — as a demonstration of frontend development skills, UI/UX thinking, and attention to detail.

---

## Features

- 🖤 **Cinematic Hero Section** — Full-screen dark landing with bold serif typography
- 👟 **Collection Page** — Clean product grid with image-forward card layout
- 📄 **Product Detail Page** — Split-layout product view with size selector grid and acquisition flow
- 🗄️ **The Archive** — Unique archive page with sold-out/available status tags and record stamps
- 🛒 **Acquisition Manifest (Cart)** — Styled as an internal document with timestamps and operator IDs
- 🔍 **Search Functionality** — Header search icon integration
- ⚡ **Scroll Animations** — Intersection Observer-powered reveal animations throughout

---

## Tech Stack

| Technology | Purpose |

| **React 19** | UI component library |
| **React Router DOM v7** | Client-side routing & navigation |
| **React Intersection Observer** | Scroll-triggered animations |
| **Vite 7** | Build tool & dev server |
| **CSS (Custom)** | Styling — no UI framework, all hand-crafted |
| **Vercel** | Deployment & hosting |

---

## Pages

| Route | Description |
| `/` | Hero landing page |
| `/collection` | Product listing grid |
| `/product/:id` | Individual product detail page |
| `/archive` | The_Archive — past & current inventory |
| `/cart` | Acquisition Manifest (Cart) |

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/imohwisdom07-del/Vestige.git

# Navigate into the project
cd Vestige

# Install dependencies
npm install

# Start development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Screenshots

| Hero | Collection | Product Detail |
|---|---|---|
| ![Hero](./public/screenshots/hero.png) | ![Collection](./public/screenshots/collection.png) | ![Product](./public/screenshots/product.png) |

---

## What I Learned

- Building multi-page React apps with React Router DOM v7
- Managing cart/global state with React Context API
- Implementing scroll-based animations using Intersection Observer
- Designing and building a complete UI system from scratch without a component library
- Deploying a React + Vite app to Vercel

---

## Roadmap / Future Improvements

- [ ] Add user authentication (Firebase / Supabase)
- [ ] Integrate Paystack payment gateway
- [ ] Make fully mobile responsive
- [ ] Add search and filter functionality
- [ ] Persist cart with localStorage

---

## Author

**Wisdom Imoh**
Frontend Developer | Lagos, Nigeria

[![GitHub](https://img.shields.io/badge/GitHub-imohwisdom07--del-black?style=flat&logo=github)](https://github.com/imohwisdom07-del)

---

> _"Style is a way to say who you are without having to speak."_
> — Rachel Zoe

---

⭐ If you like this project, leave a star — it means a lot!

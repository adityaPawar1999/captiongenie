# Caption & Blog Website

This is a **React + Vite** project where users can browse and post Instagram captions and blogs. Users can access content with or without logging in.

## Features
- 📝 **Create, Read, and View Posts**
- 🔍 **Public Access:** Browse posts without logging in
- 🔒 **Authentication:** Login & Signup
- 🎨 **Dark Mode Support**
- 🖼️ **Image Upload for Posts**
- 🏷️ **Categories & Tags for Organization**

## Tech Stack
- **Frontend:** React.js, Redux Toolkit, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT (JSON Web Token)
- **Hosting:** Vercel (Frontend), Render (Backend)

## Installation & Setup

### 1️⃣ Clone the Repository
```sh
 git clone https://github.com/your-username/your-repo.git
 cd your-repo
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Start Development Server
```sh
npm run dev
```

### 4️⃣ Build for Production
```sh
npm run build
```

## Environment Variables
Create a `.env` file and add:
```
VITE_BACKEND_URL=http://localhost:5003
```

## API Routes
- **GET /api/posts** - Fetch all posts (Public)
- **GET /api/posts/:id** - Fetch a single post
- **POST /api/posts** - Add new post (Authenticated)
- **POST /api/auth/login** - Login User
- **POST /api/auth/signup** - Register User

## Deployment
- **Frontend:** Hosted on Vercel (`npm run build` → Deploy)
- **Backend:** Hosted on Render (`node server.js`)

## Contributing
Feel free to open an issue or submit a pull request. 🚀


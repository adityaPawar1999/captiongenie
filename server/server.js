import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Mock data for testing
let posts = [
  {
    id: 1,
    title: 'First Post',
    description: 'This is the first post content',
    categories: ['Technology'],
    tags: ['web', 'development'],
    links: [{ type: 'Website', url: 'https://example.com' }],
    images: []
  }
];

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'your-secret-key'); // Use a secure secret key in production
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Get all posts - This endpoint is intentionally public and accessible without authentication
// to allow both logged-in and non-logged-in users to view posts
app.get('/api/posts', (req, res) => {
  try {
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error: error.message });
  }
});

// Create a new post
app.post('/api/posts/create', verifyToken, (req, res) => {
  const newPost = {
    id: posts.length + 1,
    ...req.body,
    createdAt: new Date().toISOString()
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { getDb } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage });

// Serve static files from public/uploads (if not using Vite's public handling for this)
// In production, you'd serve this via Nginx or similar, or let Vite handle it if built.
// For now, we rely on Vite serving 'public' folder contents at root.
// But since we are adding files dynamically, we might need to serve them via express to be sure.
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));


// --- Routes ---

// Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const db = await getDb();
  const admin = await db.get('SELECT * FROM admins WHERE username = ? AND password = ?', username, password);
  
  if (admin) {
    res.json({ success: true, token: 'dummy-token' }); // In real app, use JWT
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Masterpieces
app.get('/api/masterpieces', async (req, res) => {
  const db = await getDb();
  const items = await db.all('SELECT * FROM masterpieces');
  res.json(items);
});

app.post('/api/masterpieces', upload.single('image'), async (req, res) => {
  const { title, category } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
  
  const db = await getDb();
  const result = await db.run(
    'INSERT INTO masterpieces (title, category, image_url) VALUES (?, ?, ?) RETURNING id',
    title, category, imageUrl
  );
  
  // For SQLite, lastID is returned. For PG wrapper, we return { lastID: row.id }
  const id = result.lastID;
  
  res.json({ id, title, category, image_url: imageUrl });
});

app.delete('/api/masterpieces/:id', async (req, res) => {
  const db = await getDb();
  await db.run('DELETE FROM masterpieces WHERE id = ?', req.params.id);
  res.json({ success: true });
});

// Packages
app.get('/api/packages', async (req, res) => {
  const db = await getDb();
  const items = await db.all('SELECT * FROM packages');
  // Parse features JSON if needed, but we store as text
  res.json(items);
});

app.post('/api/packages', upload.single('image'), async (req, res) => {
  const { title, price, description, features } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
  
  const db = await getDb();
  const result = await db.run(
    'INSERT INTO packages (title, price, description, features, image_url) VALUES (?, ?, ?, ?, ?) RETURNING id',
    title, price, description, features, imageUrl
  );
  
  const id = result.lastID;
  
  res.json({ id, title, price, description, features, image_url: imageUrl });
});

app.delete('/api/packages/:id', async (req, res) => {
  const db = await getDb();
  await db.run('DELETE FROM packages WHERE id = ?', req.params.id);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

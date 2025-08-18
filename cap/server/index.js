// server/index.js (ESM)
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// serve static assets (images, models, etc.) from ./public
app.use(express.static(path.join(__dirname, 'public')));

// ===== POI DATA (with xy) =====
const poiData = [
  {
    id: 1,
    name: "Boronia Library",
    description: "Main campus library with study spaces, computers, and quiet zones.",
    image: "/images/library.jpg",
    modelUrl: "/models/BST.splat",
    xy: { x: 0.452, y: 0.381 }
  },
  {
    id: 2,
    name: "Science Building",
    description: "Faculty of Science laboratories, classrooms, and research facilities.",
    image: "/images/science.jpg",
    modelUrl: "/models/JG.splat",
    xy: { x: 0.600, y: 0.400 }
  },
  {
    id: 3,
    name: "Agora",
    description: "Popular coffee and lunch spot on campus.",
    image: "/images/agora.jpg",
    modelUrl: "/models/NR7.splat",
    xy: { x: 0.500, y: 0.520 }
  }
];

// Now it's safe to log:
console.log('SERVER BOOT FROM:', __dirname);
console.log('POIs with XY?', poiData.every(p => p.xy && typeof p.xy.x === 'number' && typeof p.xy.y === 'number'));

// ===== API =====
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

app.get('/api/poi', (req, res) => {
  res.json(poiData);
});


app.get('/api/models/:id', (req, res) => {
  const { id } = req.params;
  // If you serve from local /public/models, you could look up by id here.
  // For now, just echo a CDN-style URL:
  res.json({ modelUrl: `/models/${id}.glb` });
});

// ===== START =====
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  console.log(`Test POIs: http://localhost:${PORT}/api/poi`);
});

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

// Serve models with cache headers (1 year)
app.use(
  '/models',
  express.static(path.join(__dirname, 'public/models'), {
    maxAge: '1y',
    setHeaders: (res, path) => {
      res.setHeader('Cache-Control', 'public, max-age=31536000');
    },
  })
);

// serve static assets (images, models, etc.) from ./public
app.use(express.static(path.join(__dirname, 'public')));

// ===== POI DATA (with xy) =====
const poiData = [
    {
    id: 1,
    name: 'Bus Stop',
    coords: [-37.720633390642845, 145.04632099734553],
    modelUrl: '/models/BST.splat',
    description: 'Bus stop on campus',
    xy: { x: 0.5, y: 0.5 }
  },
  {
    id: 2,
    name: 'Statue',
    coords: [-37.71987763017671, 145.0464783764545],
    modelUrl: '/models/JG-BST.splat',
    description: 'Statue near the quad',
    xy: { x: 0.5, y: 0.5 }
  },
  {
    id: 3,
    name: 'Jenny Graves',
    coords: [-37.72079511810905, 145.0470506813924],
    modelUrl: '/models/JG.splat',
    description: 'Jenny Graves building',
    xy: { x: 0.5, y: 0.5 }
  },
  {
    id: 4,
    name: 'John Scott Meeting House',
    coords: [-37.719405172981254, 145.05110354716055],
    modelUrl: '/models/JSM.splat',
    description: 'Meeting house',
    xy: { x: 0.5, y: 0.5 }
  },
  {
    id: 5,
    name: 'Graduate House',
    coords: [-37.71353942258608, 145.05038653906396],
    modelUrl: '/models/NR7.splat',
    description: 'Graduate house',
    xy: { x: 0.5, y: 0.5 }
  },
  {
    id: 6,
    name: 'George Singer Building',
    coords: [-37.7189637428938, 145.0475871562958],
    modelUrl: '/models/NewBuilding.splat',
    description: 'Description of the new building',
    xy: { x: 0.5, y: 0.5 }
  },
  {
    id: 7,
    name: 'Biological Sciences Building',
    coords: [-37.71918015433441, 145.0469219684601],
    modelUrl: '/models/NewBuilding.splat',
    description: 'Description of the new building',
    xy: { x: 0.5, y: 0.5 }
  },
  {
    id: 8,
    name: 'East Lecture Theatre',
    coords: [-37.720779882040674, 145.0492608547211],
    modelUrl: '/models/NewBuilding.splat',
    description: 'Description of the new building',
    xy: { x: 0.5, y: 0.5 }
  },
  {
    id: 9,
    name: 'La Trobe Institue for Molecular Science',
    coords: [-37.719905764551186, 145.0475871562958],
    modelUrl: '/models/NewBuilding.splat',
    description: 'Description of the new building',
    xy: { x: 0.5, y: 0.5 }
  },
  {
    id: 10,
    name: 'Indoor Sports Centre;',
    coords: [-37.71952870615465, 145.05314806283425],
    modelUrl: '/models/NewBuilding.splat',
    description: 'Description of the new building',
    xy: { x: 0.5, y: 0.5 }
  },
  {
    id: 11,
    name: 'Peribolos East',
    coords: [-37.72155642048775, 145.04895377706816],
    modelUrl: '/models/NewBuilding.splat',
    description: 'Description of the new building',
    xy: { x: 0.5, y: 0.5 }
  },
  {
    id: 12,
    name: 'Peribolos West',
    coords: [-37.72153942235765, 145.04795193672183],
    modelUrl: 'models/NewBuilding.splat',
    description: 'Description of the new building',
    xy: { x: 0.5, y: 0.5 }
  },
  {
    id: 13,
    name: 'David Myers Centre',
    coords: [-37.72205709341803, 145.0483971834183],
    modelUrl: 'models/NewBuilding.splat',
    description: 'Description of the new building',
    xy: { x: 0.5, y: 0.5 }
  },
  {
    id: 14,
    name: 'David Myers West',
    coords: [-37.72205285022732, 145.04768908023837],
    modelUrl: 'models/NewBuilding.splat',
    description: 'Description of the new building',
    xy: { x: 0.5, y: 0.5 }
  },
  {
    id: 15,
    name: 'David Myers East',
    coords: [-37.72206557979871, 145.04921257495883],
    modelUrl: 'models/NewBuilding.splat',
    description: 'Description of the new building',
    xy: { x: 0.5, y: 0.5 }
  },
  {
    id: 16,
    name: 'Library Building',
    coords: [-37.720024577242846, 145.04840254783633],
    modelUrl: 'models/NewBuilding.splat',
    description: 'Description of the new building',
    xy: { x: 0.5, y: 0.5 }
  },
  {
    id: 17,
    name: 'Chisholm College',
    coords: [-37.723767079486024, 145.0498723983765],
    modelUrl: 'models/NewBuilding.splat',
    description: 'Description of the new building',
    xy: { x: 0.5, y: 0.5 }
  },
  {
    id: 18,
    name: 'Glenn College',
    coords: [-37.7207247195914, 145.0514227151871],
    modelUrl: 'models/NewBuilding.splat',
    description: 'Description of the new building',
    xy: { x: 0.5, y: 0.5 }
  },
  {
    id: 19,
    name: 'North and South Apartments',
    coords: [-37.720711989789585, 145.0532948970795],
    modelUrl: 'models/NewBuilding.splat',
    description: 'Description of the new building',
    xy: { x: 0.5, y: 0.5 }
  },
  {
    id: 20,
    name: 'Menzies College',
    coords: [-37.7216285299291, 145.05170166492465],
    modelUrl: 'models/NewBuilding.splat',
    description: 'Description of the new building',
    xy: { x: 0.5, y: 0.5 }
  },
];

const modelMetadata = [
  {
    id: "BST",
    name: "Boronia Library Model",
    file: "BST.splat",
    type: "splat",
    size: "2.3MB"
  },
  {
    id: "JG",
    name: "Science Building Model",
    file: "JG.splat",
    type: "splat",
    size: "1.8MB"
  },
  {
    id: "Poppy",
    name: "Agora Model",
    file: "Poppy.glb",
    type: "glb",
    size: "3.1MB"
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

app.get('/api/models', (req, res) => {
  res.json(modelMetadata);
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



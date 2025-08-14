import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

const poiData = [
    {
        id: 1,
        name: "Boronia Library",
        description: "Main campus library with study spaces, computers, and quiet zones.",
        image: "/images/library.jpg",
        modelUrl: "/models/library.glb"
    },
    {
        id: 2,
        name: "Science Building",
        description: "Faculty of Science laboratories, classrooms, and research facilities.",
        image: "/images/science.jpg",
        modelUrl: "/models/science.glb"
    },
    {
        id: 3,
        name: "Cafe Central",
        description: "Popular coffee and lunch spot on campus.",
        image: "/images/cafe.jpg",
        modelUrl: "/models/cafe.glb"
    }
];


// API to get Points of Interest
app.get('/api/poi', (req, res) => {
  res.json(poiData);
});

// API to get 3D model URLs
app.get('/api/models/:id', (req, res) => {
  const { id } = req.params;
  res.json({ modelUrl: `https://cdn.example.com/models/${id}.glb` });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});

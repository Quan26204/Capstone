Capstone Campus Map & 3D Viewer
An interactive campus map and 3D model viewer built with React and Node.js.

Getting Started
1. Clone the Repository
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

2. Install Dependencies
Frontend
cd src
npm install

Backend
cd ../server
npm install

3. Run the Project
Start the Backend
cd server
node index.js

Start the Frontend
Open a new terminal window/tab:
npm run dev

The frontend will run on http://localhost:5173 (or as shown in your terminal).
The backend will run on http://localhost:3000 (or as configured in index.js).
4. Usage
Open your browser and go to http://localhost:5173.
Explore the interactive campus map.
Click on markers to view building info and launch 3D models.
Use the search box and other features as needed.

5. Project Structure
src/         # React frontend
server/      # Node.js backend
public/      # Static assets (models, images)

6. Notes
Make sure both frontend and backend are running for full functionality.
Static models and assets are served from the public folder.
POI data and dynamic features require the backend API.
7. Troubleshooting
If you see errors or missing data, ensure both servers are running.
Check terminal output for port conflicts or missing dependencies.
License
MIT


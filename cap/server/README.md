# Backend Server Access & Run Instructions

This guide explains how any team member can log into the RHEL server, access the backend, install dependencies, and run the application without re-uploading all files.

---

## 1. SSH into the Server

Each teammate has their own student account.

Run this command (replace `YOUR_STUDENT_ID` with your actual ID):

```bash
ssh -p 6022 YOUR_STUDENT_ID@aiotcentre-01.latrobe.edu.au
```

Example:

```bash
ssh -p 6022 21478272@aiotcentre-01.latrobe.edu.au
```

Enter your password when prompted.

---

## 2. Navigate to the Backend Folder

Once logged in:

```bash
cd /data/home/ad/21478272/server
```

> This is where the backend files are stored.  
> **Do not re-upload the entire folder** — only update files you’ve changed.

---

## 3. Pull Latest Changes (Optional)

If files are tracked in Git, you can pull the latest updates:

```bash
git pull
```

If not using Git, you can use `scp` from your local machine to replace specific files.

Example (from your local terminal):

```bash
scp -P 6022 path/to/local/file.js 21478272@aiotcentre-01.latrobe.edu.au:/data/home/ad/21478272/server
```

---

## 4. Install Dependencies (Only Needed First Time or After Changes to `package.json`)

```bash
npm install
```

---

## 5. Run the Backend

You can run the backend normally:

```bash
node index.js
```

Or use `nodemon` if installed for auto-reload:

```bash
npx nodemon index.js
```

---

## 6. Test the Backend from Your Local Machine

Use **SSH port forwarding** so you can open `http://localhost:5000` on your own machine and see the backend output:

```bash
ssh -p 6022 -L 5000:localhost:5000 YOUR_STUDENT_ID@aiotcentre-01.latrobe.edu.au
```

Keep this terminal open — then open your browser and go to:

```
http://localhost:5000/api/poi
```

---

## 7. Stopping the Backend

To stop the backend:

- Press `CTRL + C` in the terminal where it’s running.

---

## 8. Notes

- Always coordinate before overwriting files — don’t undo another teammate’s work.
- If you get `EADDRINUSE` errors, another process is already using the port — check with:

```bash
ss -lntp | grep 5000
```

# INT222 - Web Development Project

This repository contains all the learning materials, practicals, and assignments for the INT222 course.

## 🚀 Getting Started

If you have just cloned this repository, follow these steps to set up your environment:

### 1. Install Dependencies
Restore the `node_modules` folder by running:
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory and add any necessary keys (e.g., your Groq API key or Database URL):
```text
GROQ_API_KEY=your_key_here
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
```

### 3. Setup Prisma
Generate the Prisma client to interact with your database:
```bash
npx prisma generate
```
*Note: If you need to sync your database schema, run:*
```bash
npx prisma db push
```

### 4. Run the Project
To start the main application:
```bash
npm start
```
For development with auto-reload:
```bash
npm run dev
```

---

## 📂 Project Structure
- **Course-Learning/**: Topic-wise lessons (Express, MongoDB, Sockets, etc.)
- **Practicals-and-Work/**: Assignments, practice files, and CA work.
- **Infrastructure/**: Backend setups, server configs, and templates.
- **Docs-and-Guides/**: Course summaries and reference guides.

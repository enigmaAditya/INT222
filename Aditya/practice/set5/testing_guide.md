# Set 5: Testing & Demonstration Guide

This guide explains how to test each application in Set 5 using simple terminal commands (CURL).

---

### 🔐 Q1: Student Login (JWT + MongoDB)

**Server**: `node q1.mjs` (Port 6001)

1. **Register**:
   ```bash
   curl -X POST http://localhost:6001/register -H "Content-Type: application/json" -d '{"username":"student1","password":"password123"}'
   ```
2. **Login**:
   ```bash
   curl -X POST http://localhost:6001/login -H "Content-Type: application/json" -d '{"username":"student1","password":"password123"}'
   ```

   *Copy the "token" value from the response.*
3. **View Profile**:
   ```bash
   curl http://localhost:6001/profile -H "Authorization: YOUR_TOKEN_HERE"
   ```

---

### 📦 Q2: File Compression

**Server**: `node q2.mjs` (Port 6002)

1. Open your browser to `http://localhost:6002`.
2. Type text in the textarea and click **Submit**.
3. You will receive a `compressed.txt.gz` file in your downloads.

---

### 👔 Q3: Employee Portal (RBAC)

**Server**: `node q3.mjs` (Port 6003)

1. **As Admin**: `http://localhost:6003/employees?role=admin` (Shows everyone)
2. **As User**: `http://localhost:6003/employees?role=user&id=102` (Shows only Employee A)

---

### 📝 Q4: Notes API (CRUD)

**Server**: `node q4.mjs` (Port 6004)

1. **Create Note**:
   ```bash
   curl -X POST http://localhost:6004/notes -H "Content-Type: application/json" -H "userid: user123" -d '{"title":"My Note","content":"Hello world"}'
   ```
2. **View My Notes**:
   ```bash
   curl http://localhost:6004/notes -H "userid: user123"
   ```

---

###  💬 Q5: Feedback + LLM

**Server**: `node q5.mjs` (Port 6005)

1. **Submit Feedback**:
   ```bash
   curl -X POST http://localhost:6005/feedback -H "Content-Type: application/json" -d '{"text":"The service was excellent and the staff was friendly"}'
   ```

---

### 🍪 Q6: Session Login

**Server**: `node q6.mjs` (Port 6006)

1. Open browser to `http://localhost:6006/login`.
2. Then go to `http://localhost:6006/dashboard`.
3. Go to `http://localhost:6006/logout` to clear the session.

---

### 🛒 Q7: Product Management

**Server**: `node q7.mjs` (Port 6007)

1. **Login as Admin**:
   ```bash
   curl -X POST http://localhost:6007/login -H "Content-Type: application/json" -d '{"role":"admin"}'
   ```

   *Copy the token.*
2. **Add Product**:
   ```bash
   curl -X POST http://localhost:6007/products -H "Content-Type: application/json" -H "Authorization: ADMIN_TOKEN" -d '{"name":"iPhone 15"}'
   ```

---

### 🪵 Q8: Log Saver

**Server**: `node q8.mjs` (Port 6008)

1. Visit `http://localhost:6008/` or `http://localhost:6008/about`.
2. Check the file `activity.log` in your folder to see the logs.

---

### 🎬 Q9: Movie Recommendations

**Server**: `node q9.mjs` (Port 6009)

1. **Get Recommendations**:
   ```bash
   curl -X POST http://localhost:6009/recommend -H "Content-Type: application/json" -d '{"movie":"Inception"}'
   ```

---

### 🚚 Q10: Parcel Tracking

**Server**: `node q10.mjs` (Port 6010)

1. **Update Status**:
   ```bash
   curl -X POST http://localhost:6010/parcel/update -H "Content-Type: application/json" -d '{"id":"101","status":"Delivered"}'
   ```
2. **Track**: `http://localhost:6010/parcel/101`

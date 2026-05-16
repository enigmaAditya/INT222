# Exam Demonstration Cheat Sheet (All 10 Questions)
### Short snippets to prove your code works during the practical exam.

---

## 🟢 Category 1: Use the URL Bar (GET Requests)
*Just type these in your browser address bar and hit Enter.*

*   **Q3 (RBAC)**: `http://localhost:6003/employees?role=admin` (Shows all) or `?role=user&id=102` (Shows one).
*   **Q6 (Session)**: `http://localhost:6006/login` (Sets cookie) -> `http://localhost:6006/dashboard` (Shows name).
*   **Q8 (Logs)**: Visit `http://localhost:6008/`. Then show the examiner the `activity.log` file in VS Code.
*   **Q10 (Tracking)**: `http://localhost:6010/parcel/105` (Shows parcel status from PG logic).

---

## 🔵 Category 2: Use the Console (POST Requests)
*Open Console (F12) and paste these 4 lines.*

### Q1: Student Login (JWT)
```javascript
fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'adi', password: '123' })
}).then(r => r.json()).then(console.log);
```

### Q4: Notes API (Ownership)
```javascript
fetch('/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'userid': 'userA' },
    body: JSON.stringify({ title: 'Secret Note' })
}).then(r => r.text()).then(console.log);
```

### Q5: Feedback + LLM
```javascript
fetch('/feedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: 'The food was great!' })
}).then(r => r.json()).then(console.log);
```

### Q7: Product Management (JWT Auth)
```javascript
fetch('/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'authorization': 'ADMIN_TOKEN' },
    body: JSON.stringify({ name: 'iPhone' })
}).then(r => r.text()).then(console.log);
```

### Q9: Movie Recs (LLM)
```javascript
fetch('/recommend', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ movie: 'Inception' })
}).then(r => r.json()).then(console.log);
```

---

## 🟡 Category 3: Special Cases (Manual)

### Q2: File Compression
1.  Open `http://localhost:6002`.
2.  Type text in the box and click **Submit**.
3.  Show the browser downloading the `.gz` file.

---

### 🏆 Final Tips for a Perfect Demo:
1.  **Always use `/`**: If you are testing `localhost:6001`, open the browser to that URL first before opening the console.
2.  **Check JSON**: If the console says "Unexpected token < in JSON", it means your server crashed or sent a string instead of an object.
3.  **Port check**: Make sure the port in your URL matches the port in your code (`app.listen`).

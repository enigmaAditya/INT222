# Postman Demonstration: Step-by-Step Guide for Set 5

Follow these exact steps in the Postman application to demonstrate your code.

---

## 🔐 Q1: Student Login (JWT)
1.  **Register**:
    *   Method: `POST` | URL: `http://localhost:6001/register`
    *   **Body** -> **raw** -> **JSON**: `{"username":"adi", "password":"123"}`
    *   Click **Send**.
2.  **Login**:
    *   Method: `POST` | URL: `http://localhost:6001/login`
    *   **Body** -> **raw** -> **JSON**: `{"username":"adi", "password":"123"}`
    *   Click **Send**. *Copy the token from the response.*
3.  **Profile**:
    *   Method: `GET` | URL: `http://localhost:6001/profile`
    *   **Headers**: Add Key: `Authorization`, Value: `PASTE_TOKEN_HERE`.
    *   Click **Send**.

---

## 📦 Q2: File Compression
*Note: This is best shown in the browser (localhost:6002) as it involves a download.*

---

## 👔 Q3: Employee Portal (RBAC)
1.  **Admin View**:
    *   Method: `GET` | URL: `http://localhost:6003/employees?role=admin`
    *   Click **Send**.
2.  **User View**:
    *   Method: `GET` | URL: `http://localhost:6003/employees?role=user&id=102`
    *   Click **Send**.

---

## 📝 Q4: Notes API (CRUD)
1.  **Create Note**:
    *   Method: `POST` | URL: `http://localhost:6004/notes`
    *   **Headers**: Add Key: `userid`, Value: `123`.
    *   **Body** -> **raw** -> **JSON**: `{"title":"Exam Note", "content":"Secret Data"}`
    *   Click **Send**.
2.  **Get Notes**:
    *   Method: `GET` | URL: `http://localhost:6004/notes`
    *   **Headers**: Add Key: `userid`, Value: `123`.
    *   Click **Send**.

---

## 💬 Q5: Feedback + LLM
1.  **Submit**:
    *   Method: `POST` | URL: `http://localhost:6005/feedback`
    *   **Body** -> **raw** -> **JSON**: `{"text":"The training was amazing and very practical."}`
    *   Click **Send**.

---

## 🍪 Q6: Session Login
1.  **Login**: `GET http://localhost:6006/login`
2.  **Dashboard**: `GET http://localhost:6006/dashboard`
    *   *Note: Postman handles cookies automatically.*

---

## 🛒 Q7: Product Management (RBAC + JWT)
1.  **Login**: `POST http://localhost:6007/login` with `{"role":"admin"}`. Copy token.
2.  **Add Product**:
    *   Method: `POST` | URL: `http://localhost:6007/products`
    *   **Headers**: Add Key: `authorization`, Value: `PASTE_TOKEN_HERE`.
    *   **Body** -> **raw** -> **JSON**: `{"name":"MacBook"}`
    *   Click **Send**.

---

## 🪵 Q8: Log Saver
1.  **Action**: `GET http://localhost:6008/`
2.  **Verification**: Show the examiner the `activity.log` file in VS Code.

---

## 🎬 Q9: Movie Recommendations
1.  **Action**:
    *   Method: `POST` | URL: `http://localhost:6009/recommend`
    *   **Body** -> **raw** -> **JSON**: `{"movie":"John Wick"}`
    *   Click **Send**.

---

## 🚚 Q10: Parcel Tracking
1.  **Update**:
    *   Method: `POST` | URL: `http://localhost:6010/parcel/update`
    *   **Body** -> **raw** -> **JSON**: `{"id":"105", "status":"Delivered"}`
    *   Click **Send**.
2.  **Track**: `GET http://localhost:6010/parcel/105`

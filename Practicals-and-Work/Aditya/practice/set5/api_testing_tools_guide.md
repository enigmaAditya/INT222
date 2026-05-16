# API Testing Tools Tutorial (Postman, REST Client, Thunder Client)

This guide teaches you how to demonstrate your Node.js APIs using the three most popular tools.

---

## 🟠 Part 1: Postman (Syllabus Requirement)
Postman is a powerful graphical tool for API development.

### Step 1: Basic Setup
1.  Open Postman.
2.  Click **"New"** or the **"+"** tab.
3.  Choose your **HTTP Method** (GET for fetching, POST for sending data).

### Step 2: Sending a POST Request (e.g., Q1 Register)
1.  **URL**: Enter `http://localhost:6001/register`.
2.  **Body**:
    *   Click the **Body** tab.
    *   Select **raw**.
    *   Select **JSON** from the dropdown menu.
3.  **Payload**: Enter your JSON data:
    ```json
    {
        "username": "aditya",
        "password": "123"
    }
    ```
4.  Click **Send**.

### Step 3: Handling Auth Tokens (e.g., Q1 Profile)
1.  Switch Method to **GET**.
2.  URL: `http://localhost:6001/profile`.
3.  Go to the **Headers** tab.
4.  Add a new Key: `Authorization`.
5.  Value: Paste the token you got from the Login response.
6.  Click **Send**.

---

## 🔵 Part 2: VS Code REST Client (Internal Tool)
This tool uses `.http` or `.rest` files to execute requests.

### How to use:
1.  Install the **REST Client** extension.
2.  Open [**requests.http**](file:///Users/adii/Desktop/INT222/Aditya/practice/set5/requests.http).
3.  Look for the text **"Send Request"** in light grey above each URL.
4.  Click it to see the response in a split window.
5.  **Tip**: Use `###` to separate different requests in the same file.

---

## ⚡ Part 3: Thunder Client (VS Code Extension)
A lightweight alternative to Postman that stays inside VS Code.

### How to use:
1.  Install the **Thunder Client** extension.
2.  Click the **Lightning Bolt** icon on the left sidebar.
3.  Click **"New Request"**.
4.  The UI is very similar to Postman:
    *   **Method Dropdown**: Choose GET/POST.
    *   **Body Tab**: Choose JSON to send data.
    *   **Response**: Shown on the right side of the screen.

---

## 🏁 Summary Table for Exam Demonstration

| Feature | Postman | REST Client | Thunder Client |
| :--- | :--- | :--- | :--- |
| **Location** | External App | VS Code (Text file) | VS Code (Sidebar) |
| **JSON Setup** | Body -> raw -> JSON | Automated in `.http` | Body -> JSON |
| **Headers** | Headers Tab | Below the URL | Headers Tab |
| **Best for** | Formal Demo | Fast execution | UI lovers |

---
### 💡 Final Tip for the Practical Exam:
If the examiner asks why we use these tools instead of the browser, say: 
> *"Browsers natively only support GET requests through the URL bar. To test POST, PUT, and DELETE methods with custom headers and JSON bodies, we use specialized tools like Postman to simulate real-world client-server interactions."*

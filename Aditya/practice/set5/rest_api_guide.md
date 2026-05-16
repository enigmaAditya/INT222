# The Complete Guide to REST APIs

## 1. What is an API?
An **Application Programming Interface (API)** is a set of definitions and protocols for building and integrating application software. It acts as a bridge that allows two applications to talk to each other.

## 2. What is REST?
**REST (Representational State Transfer)** is an architectural style for designing networked applications. It relies on a stateless, client-server, cacheable communications protocol — and in virtually all cases, the **HTTP** protocol is used.

## 3. Key Principles of REST

### A. Resources
Everything in REST is a resource. A resource can be a student, a picture, a video, or a collection of these. Each resource is identified by a **URI (Uniform Resource Identifier)**.
*   Example: `https://api.example.com/students/101`

### B. Statelessness
This is a core requirement. The server does not store any state about the client session on the server-side. Each request from any client contains all the information necessary to service the request. This is why we send **JWT Tokens** in every request.

### C. Standard HTTP Methods (The Verbs)
*   **GET**: Retrieve a resource.
*   **POST**: Create a new resource.
*   **PUT**: Update an existing resource.
*   **DELETE**: Remove a resource.
*   **PATCH**: Partially update a resource.

## 4. Anatomy of a REST Request

1.  **Endpoint**: The URL you are calling.
2.  **Method**: The type of action (GET, POST, etc.).
3.  **Headers**: Key-value pairs containing metadata (e.g., `Content-Type: application/json`).
4.  **Body**: The data payload (usually JSON).

## 5. HTTP Status Codes

### 2xx: Success
*   `200 OK`: Successful request.
*   `201 Created`: Successfully created a resource.

### 4xx: Client Error
*   `400 Bad Request`: General client error.
*   `401 Unauthorized`: Authentication is required.
*   `403 Forbidden`: You don't have permission (RBAC).
*   `404 Not Found`: Resource does not exist.

### 5xx: Server Error
*   `500 Internal Server Error`: Something went wrong on the server.

## 6. Real World Example (Social Media API)
*   **GET** `/posts`: See all posts.
*   **POST** `/posts`: Create a new post.
*   **GET** `/posts/123`: See post #123.
*   **PUT** `/posts/123`: Edit post #123.
*   **DELETE** `/posts/123`: Delete post #123.

---

### 🏆 Pro-Tip for Practicals
When building a REST API in Express, always use:
1. `app.use(express.json())` to read JSON bodies.
2. `res.status(code).json(data)` to send standardized responses.
3. Middleware to handle **Authorization** (checking tokens) and **Logging**.

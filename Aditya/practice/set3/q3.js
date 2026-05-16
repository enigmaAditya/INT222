import express from 'express'
import cookieSession from 'cookie-session'

const app = express()
const port = 4002

// a) Create a session of 1 minute
app.use(cookieSession({
    name: 'session',
    keys: ['secretkey'],
    maxAge: 60 * 1000 // 1 minute
}))

// Global count tracking (approximate for simulation)
let sessionCounter = 0
const activeSessions = new Set()

app.get('/', (req, res) => {
    // If it's a new session, track it
    if (!req.session.isPopulated) {
        req.session.id = Date.now().toString()
    }
    
    // In a real scenario, tracking 'connected clients' usually involves Socket.io or a DB.
    // For this exercise, we'll simulate by adding the current session ID to a set.
    activeSessions.add(req.session.id)

    res.send(`
        <html>
        <body style="font-family: sans-serif; text-align: center; padding: 50px;">
            <h2>Session Tracking (1 Minute)</h2>
            <p>Your Session ID: <b>${req.session.id}</b></p>
            <button onclick="location.reload()" style="padding: 10px 20px; cursor: pointer;">
                Show Connection Count
            </button>
            <h1 style="color: #007bff;">Total Active Sessions: ${activeSessions.size}</h1>
            <p><i>Note: Refresh in multiple tabs to see count increase. Sessions expire after 1 min.</i></p>
        </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log(`Express app running at http://localhost:${port}`);
});

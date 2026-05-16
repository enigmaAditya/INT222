import express from 'express'

const app = express()
const port = 3009

app.get('/', (req, res) => {
    res.send(`
        <body style="font-family: sans-serif; text-align: center; padding: 50px;">
            <h1>Main Website</h1>
            <nav>
                <a href="/">Home Page</a> | 
                <a href="/contact">Contact Us</a> | 
                <a href="/support">Support</a>
            </nav>
            <hr>
            <h2>Welcome to Home Page</h2>
        </body>
    `);
});

app.get('/contact', (req, res) => {
    res.send(`
        <body style="font-family: sans-serif; text-align: center; padding: 50px;">
            <nav>
                <a href="/">Home Page</a> | 
                <a href="/contact">Contact Us</a> | 
                <a href="/support">Support</a>
            </nav>
            <hr>
            <h2>Contact Us</h2>
            <p>Email: support@example.com</p>
        </body>
    `);
});

app.get('/support', (req, res) => {
    res.send(`
        <body style="font-family: sans-serif; text-align: center; padding: 50px; background: #f0f2f5;">
            <nav>
                <a href="/">Home Page</a> | 
                <a href="/contact">Contact Us</a> | 
                <a href="/support">Support</a>
            </nav>
            <hr>
            <h2>Support Center</h2>
            
            <div id="chatbox" style="width: 300px; height: 400px; background: white; margin: 20px auto; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); display: flex; flex-direction: column; overflow: hidden; border: 1px solid #ddd;">
                <div style="background: #007bff; color: white; padding: 15px; font-weight: bold;">Support Chat</div>
                <div id="messages" style="flex: 1; padding: 15px; text-align: left; overflow-y: auto;">
                    <!-- Message from server -->
                    <div style="background: #e9ecef; padding: 8px 12px; border-radius: 15px; margin-bottom: 10px; display: inline-block;">
                        Hi! How can I help you?
                    </div>
                </div>
                <div style="padding: 10px; border-top: 1px solid #eee;">
                    <input type="text" placeholder="Type a message..." style="width: 80%; padding: 8px; border-radius: 5px; border: 1px solid #ccc;">
                </div>
            </div>
        </body>
    `);
});

app.listen(port, () => {
    console.log(`Support app running at http://localhost:${port}`);
});

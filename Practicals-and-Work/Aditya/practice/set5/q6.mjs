/*
6. Build a login system using express-session and cookie-parser where users remain logged in until logout.
*/
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());
app.use(session({
    secret: 'session_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 } // 1 minute
}));

app.get('/login', (req, res) => {
    req.session.isLoggedIn = true;
    req.session.username = "Aditya";
    res.send("Logged in via Session!");
});

app.get('/dashboard', (req, res) => {
    if (req.session.isLoggedIn) {
        res.send(`Welcome ${req.session.username} (Persisted via Cookies)`);
    } else {
        res.status(401).send("Please login first");
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.send("Logged out and session cleared!");
});

app.listen(6006, () => console.log("Q6 Session Login at 6006"));

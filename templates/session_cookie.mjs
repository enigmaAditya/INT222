import session from 'express-session';
import cookieParser from 'cookie-parser';
import express from 'express';

const app = express();
app.use(cookieParser());
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 } // 1 min
}));

app.get('/set', (req, res) => {
    req.session.user = "Aditya";
    res.send("Session set!");
});

app.get('/get', (req, res) => {
    res.send("Welcome " + req.session.user);
});

import express from 'express';
const app = express();

// Route that throws error
app.get('/error', (req, res, next) => {
    next(new Error("Database failed!"));
});

// GLOBAL ERROR HANDLER (Always keep at the BOTTOM)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: err.message
    });
});

/*
Q9. Create an Express route that intentionally throws an error and a global eroor-handling middleware that catches it and sends a 500 status
*/
import express from 'express';
const app = express();

app.get('/cause-error', (req, res, next) => {
    // 1. Intentionally throw an error
    const err = new Error("Something went wrong!");
    next(err); 
});

// 2. Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({
        status: 500,
        message: "Internal Server Error Caught by Global Middleware!",
        error: err.message
    });
});

app.listen(7009, () => console.log("Q9 Error Handler at 7009"));

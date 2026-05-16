// Very Simple Pagination Middleware
const paginate = (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    
    req.skip = (page - 1) * limit;
    req.limit = limit;
    
    next();
};

export default paginate;

// Usage: 
// app.get('/data', paginate, async(req, res) => {
//    const data = await Model.find().skip(req.skip).limit(req.limit);
//    res.json(data);
// });

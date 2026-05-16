// Simple Pagination Middleware
const simplePaginate = (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    
    // Attach values to request object
    req.skip = (page - 1) * limit;
    req.limit = limit;
    
    next();
};

export default simplePaginate;

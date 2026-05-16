// Simple RBAC Middleware
const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user?.role || req.query.role; // Check token or query
        
        if (allowedRoles.includes(userRole)) {
            next();
        } else {
            res.status(403).send("Forbidden: Access Denied for your role");
        }
    };
};

// Usage:
// app.get('/admin', checkRole(['admin']), (req, res) => res.send("Hello Admin"));

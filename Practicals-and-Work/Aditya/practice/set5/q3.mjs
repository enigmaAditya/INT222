/*
3. Develop an employee portal where admin users can view all employee data while normal employees can only view their own profile using RBAC.
*/
import express from 'express';
const app = express();

const employees = [
    { id: 101, name: "Admin User", role: "admin", salary: "50,000" },
    { id: 102, name: "Employee A", role: "user", salary: "30,000" },
    { id: 103, name: "Employee B", role: "user", salary: "32,000" }
];

// Simple RBAC check
app.get('/employees', (req, res) => {
    const { role, id } = req.query; // Simulate logged in user

    if (role === 'admin') {
        res.json(employees); // Admin sees all
    } else if (role === 'user') {
        const myProfile = employees.find(e => e.id == id);
        res.json(myProfile || "Profile not found"); // User sees only own
    } else {
        res.status(403).send("Unauthorized Role");
    }
});

app.listen(6003, () => console.log("Q3 Employee Portal (RBAC) at 6003"));

import { MongoClient } from 'mongodb'

const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)
const dbName = 'officeDB'

async function main() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const employees = db.collection('Employee');

        // b) Add multiple documents with Employee data
        const data = [
            { empid: 101, name: 'Alice', dept: 'HR', city: 'Delhi', salary: 45000 },
            { empid: 102, name: 'Bob', dept: 'IT', city: 'Mumbai', salary: 75000 },
            { empid: 103, name: 'Charlie', dept: 'Sales', city: 'Bangalore', salary: 35000 },
            { empid: 104, name: 'David', dept: 'IT', city: 'Pune', salary: 90000 },
            { empid: 105, name: 'Eve', dept: 'Marketing', city: 'Delhi', salary: 55000 }
        ];

        await employees.deleteMany({}); // Clear for demo
        const result = await employees.insertMany(data);
        console.log(`Inserted ${result.insertedCount} employee records.`);

        // c) Query to find employees with more than a specific salary (e.g., 50000)
        const threshold = 50000;
        console.log(`\nQuerying employees with salary > ${threshold}:`);
        
        const filteredEmployees = await employees.find({ salary: { $gt: threshold } }).toArray();
        
        filteredEmployees.forEach(emp => {
            console.log(`EmpID: ${emp.empid} | Name: ${emp.name} | Dept: ${emp.dept} | Salary: ${emp.salary}`);
        });

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

main().catch(console.dir);

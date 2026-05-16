/*
Q10. Write a basic Node.js script that executes a raw INSERT INTO SQL command to add a new record to an "Orders" table in PostgreSQL
*/
import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'exam_db',
    password: 'password',
    port: 5432,
});

async function addOrder() {
    await client.connect();
    
    // Execute raw SQL command
    const query = "INSERT INTO Orders (product, quantity) VALUES ('Laptop', 1)";
    
    try {
        await client.query(query);
        console.log("Record added to Orders table successfully!");
    } catch (err) {
        console.error("SQL Error:", err.message);
    } finally {
        await client.end();
    }
}

addOrder();

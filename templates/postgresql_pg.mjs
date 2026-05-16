import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'exam_db',
    password: 'password',
    port: 5432
});

async function pgQuery() {
    await client.connect();
    
    // Select
    const res = await client.query('SELECT * FROM students');
    console.log(res.rows);
    
    // Insert
    await client.query('INSERT INTO students (name) VALUES ($1)', ['Aditya']);
    
    await client.end();
}

import { MongoClient } from 'mongodb';

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'practiceDB';

async function main() {
    try {
        // Use connect method to connect to the server
        await client.connect();
        console.log('Connected successfully to MongoDB server');
        
        const db = client.db(dbName);
        const collection = db.collection('students');

        // Insert 5 documents
        const documents = [
            { name: 'Aditya', roll: 1, course: 'CSE' },
            { name: 'Rahul', roll: 2, course: 'ECE' },
            { name: 'Sneha', roll: 3, course: 'IT' },
            { name: 'Priya', roll: 4, course: 'ME' },
            { name: 'Amit', roll: 5, course: 'CE' }
        ];

        const insertResult = await collection.insertMany(documents);
        console.log('Inserted documents:', insertResult.insertedIds);

        // Verify insertion
        const findResult = await collection.find({}).toArray();
        console.log('Found documents in database:', findResult);

    } catch (err) {
        console.error('An error occurred:', err);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

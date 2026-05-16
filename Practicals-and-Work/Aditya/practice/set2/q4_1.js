import { MongoClient } from 'mongodb';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'set2db';

async function run() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        
        const db = client.db(dbName);
        const col = db.collection('items');

        // iii. Insert 5 documents
        const items = [
            { name: 'Monitor', price: 15000, qty: 5 },
            { name: 'Keyboard', price: 1500, qty: 20 },
            { name: 'Mouse', price: 800, qty: 30 },
            { name: 'Printer', price: 12000, qty: 2 },
            { name: 'Laptop', price: 65000, qty: 10 }
        ];

        await col.deleteMany({});
        await col.insertMany(items);
        console.log('Inserted 5 documents into items');

        // iv. Sort all documents (by price ascending)
        console.log('\nSorted Documents (by price):');
        const sortedDocs = await col.find().sort({ price: 1 }).toArray();
        
        // v. Show all documents
        sortedDocs.forEach(doc => {
            console.log(`${doc.name} - $${doc.price} - Qty: ${doc.qty}`);
        });

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);

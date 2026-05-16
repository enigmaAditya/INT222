import { MongoClient } from 'mongodb'

const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)
const dbName = 'houseDB'

async function main() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const houses = db.collection('House');

        // a) Add documents (literal prompt says 'student data' for 'House collection')
        // I will include marks to satisfy the sorting requirement
        const data = [
            { hno: 1, rooms: 2, furniture: 'Full', rent: 15000, studentName: 'Aditya', marks: 85 },
            { hno: 2, rooms: 1, furniture: 'Semi', rent: 8000, studentName: 'Rahul', marks: 72 },
            { hno: 3, rooms: 3, furniture: 'None', rent: 12000, studentName: 'Sneha', marks: 94 },
            { hno: 4, rooms: 2, furniture: 'Full', rent: 18000, studentName: 'Amit', marks: 68 },
            { hno: 5, rooms: 4, furniture: 'Full', rent: 25000, studentName: 'Vikram', marks: 81 }
        ];

        await houses.deleteMany({});
        await houses.insertMany(data);
        console.log('Inserted house collection documents.');

        // Sort student details with marks (ascending)
        console.log('\nSorted House/Student details by Marks:');
        const sorted = await houses.find().sort({ marks: 1 }).toArray();
        
        sorted.forEach(item => {
            console.log(`Student: ${item.studentName} | Marks: ${item.marks} | House No: ${item.hno} | Rent: ${item.rent}`);
        });

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

main().catch(console.dir);

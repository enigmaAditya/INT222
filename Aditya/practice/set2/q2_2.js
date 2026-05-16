import { MongoClient } from 'mongodb';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'new1';

async function run() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        
        const db = client.db(dbName);
        const students = db.collection('student');

        // iii. Insert 6 documents
        const studentDocs = [
            { regno: 1, name: 'Alice', marks: 85 },
            { regno: 2, name: 'Bob', marks: 75 },
            { regno: 3, name: 'Charlie', marks: 92 },
            { regno: 4, name: 'David', marks: 65 },
            { regno: 5, name: 'Eve', marks: 88 },
            { regno: 6, name: 'Frank', marks: 79 }
        ];

        // Clear existing to make it repeatable
        await students.deleteMany({});
        
        const insertResult = await students.insertMany(studentDocs);
        console.log(`Inserted ${insertResult.insertedCount} students.`);

        // iv. Update the marks of the student whose regno is 2
        const updateResult = await students.updateOne(
            { regno: 2 },
            { $set: { marks: 82 } }
        );
        console.log(`Updated marks for regno 2. Matches: ${updateResult.matchedCount}`);

        // v. Show the marks of those students who have more than 80 marks
        console.log('\nStudents with more than 80 marks:');
        const highScorers = await students.find({ marks: { $gt: 80 } }).toArray();
        highScorers.forEach(s => {
            console.log(`RegNo: ${s.regno} | Name: ${s.name} | Marks: ${s.marks}`);
        });

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);

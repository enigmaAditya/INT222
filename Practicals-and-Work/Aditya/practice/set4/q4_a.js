import { MongoClient } from 'mongodb'

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'carDB';

async function main() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const cars = db.collection('car');

        // a) Add multiple documents
        // Note: prompt mentioned "Employee data" and "salary" for a Car collection.
        // I will include an 'OwnerSalary' field to satisfy the prompt's literal requirements.
        const data = [
            { model: 'Civic', company: 'Honda', mileage: 18, color: 'White', owner: 'Aditya', ownerSalary: 60000 },
            { model: 'Thar', company: 'Mahindra', mileage: 12, color: 'Black', owner: 'Rahul', ownerSalary: 85000 },
            { model: 'Swift', company: 'Maruti', mileage: 22, color: 'Blue', owner: 'Sneha', ownerSalary: 45000 },
            { model: 'Safari', company: 'Tata', mileage: 14, color: 'Grey', owner: 'Amit', ownerSalary: 120000 },
            { model: 'Fortuner', company: 'Toyota', mileage: 10, color: 'White', owner: 'Vikram', ownerSalary: 250000 }
        ];

        await cars.deleteMany({});
        await cars.insertMany(data);
        console.log('Inserted car collection documents.');

        // Query: find employees (owners) with more than a specific salary
        const threshold = 80000;
        console.log(`\nQuerying Car Owners with salary > ${threshold}:`);
        
        const results = await cars.find({ ownerSalary: { $gt: threshold } }).toArray();
        results.forEach(car => {
            console.log(`Owner: ${car.owner} | Car: ${car.company} ${car.model} | Salary: ${car.ownerSalary}`);
        });

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

main().catch(console.dir);

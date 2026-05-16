import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:6001';

async function testQ1() {
    console.log("--- Testing Q1: Student Login ---");

    try {
        // 1. Register
        console.log("1. Registering student...");
        const regRes = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'aditya_test', password: 'password123' })
        });
        const regMsg = await regRes.text();
        console.log("Registration Response:", regMsg);

        // 2. Login
        console.log("\n2. Logging in...");
        const loginRes = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'aditya_test', password: 'password123' })
        });
        const loginData = await loginRes.json();
        console.log("Login Success! Token received.");

        // 3. Profile
        console.log("\n3. Accessing Protected Profile...");
        const profileRes = await fetch(`${BASE_URL}/profile`, {
            headers: { 'Authorization': loginData.token }
        });
        const profileMsg = await profileRes.text();
        console.log("Profile Response:", profileMsg);

    } catch (err) {
        console.error("Error: Make sure the server (q1.mjs) is running on port 6001!");
    }
}

testQ1();

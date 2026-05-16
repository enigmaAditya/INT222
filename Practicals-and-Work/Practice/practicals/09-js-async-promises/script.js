/**
 * Practical 9: Asynchronous JavaScript
 */

console.log("1. Start of script (Synchronous)");

// 1. setTimeout (Task Queue)
setTimeout(() => {
    console.log("2. Inside setTimeout (After 2 seconds)");
}, 2000);

// 2. Promises (Microtask Queue)
const fetchData = () => {
    return new Promise((resolve, reject) => {
        const success = true;
        console.log("3. Fetching data...");
        
        setTimeout(() => {
            if (success) {
                resolve({ id: 101, status: "Complete" });
            } else {
                reject("Error: Failed to fetch");
            }
        }, 1500);
    });
};

// 3. Using .then()
fetchData()
    .then(data => console.log("4. Promise Resolved:", data))
    .catch(err => console.error(err));

// 4. async/await
async function runTask() {
    console.log("5. Async Task Started");
    try {
        const result = await fetchData();
        console.log("6. Async Result:", result);
    } catch (error) {
        console.log("6. Async Error:", error);
    }
}

runTask();

console.log("7. End of script (Synchronous)");

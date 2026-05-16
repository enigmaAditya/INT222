/**
 * Practical 4: JavaScript Basics
 * Demonstrating variables, data types, operators, and control flow.
 */

// 1. Variables and Data Types
let name = "Aditya"; // String
const age = 20;      // Number (constant)
let isStudent = true; // Boolean
let skills = ["HTML", "CSS", "JS"]; // Array (Object)
let user = { id: 1, role: "Admin" }; // Object
let undefinedVar;    // Undefined
let nullVar = null;  // Null

console.log("--- Data Types ---");
console.log(typeof name, name);
console.log(typeof age, age);
console.log(typeof isStudent, isStudent);
console.log(typeof skills, skills);
console.log(typeof user, user);

// 2. Operators
let a = 10;
let b = 3;

console.log("\n--- Operators ---");
console.log("Arithmetic: a + b =", a + b);
console.log("Comparison: a > b =", a > b);
console.log("Logical: (a > 5 && b < 5) =", (a > 5 && b < 5));

// 3. Control Flow
console.log("\n--- Control Flow ---");

// If-Else
if (age >= 18) {
    console.log("Status: Adult");
} else {
    console.log("Status: Minor");
}

// Switch
let day = "Monday";
switch (day) {
    case "Monday":
        console.log("Start of the week!");
        break;
    case "Friday":
        console.log("Weekend is near!");
        break;
    default:
        console.log("Just another day.");
}

// Loops
console.log("Looping through skills:");
for (let i = 0; i < skills.length; i++) {
    console.log(`- Skill ${i + 1}: ${skills[i]}`);
}

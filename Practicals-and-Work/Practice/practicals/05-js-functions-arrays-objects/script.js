/**
 * Practical 5: JS Functions, Arrays, and Objects
 */

// 1. Normal Function
function greet(name) {
    return `Hello, ${name}!`;
}

// 2. Arrow Function
const square = (n) => n * n;

console.log(greet("Aditya"));
console.log("Square of 5:", square(5));

// 3. Array Operations
let numbers = [10, 20, 30, 40, 50];

// push, pop, shift, unshift
numbers.push(60);
console.log("After push:", numbers);

// Map, Filter, Reduce
let doubled = numbers.map(n => n * 2);
let filtered = numbers.filter(n => n > 25);
let sum = numbers.reduce((acc, curr) => acc + curr, 0);

console.log("Doubled:", doubled);
console.log("Filtered (>25):", filtered);
console.log("Sum:", sum);

// 4. Object Operations
let laptop = {
    brand: "Apple",
    model: "MacBook Pro",
    year: 2023,
    specs: {
        ram: "16GB",
        storage: "512GB"
    }
};

// Accessing properties
console.log(`Laptop: ${laptop.brand} ${laptop.model}`);

// Adding/Updating properties
laptop.color = "Space Gray";
laptop.year = 2024;

// Object methods
laptop.getInfo = function() {
    return `${this.brand} (${this.year})`;
};

console.log(laptop.getInfo());
console.log("Keys:", Object.keys(laptop));
console.log("Values:", Object.values(laptop));

export {};

/**
 * Practical 12: TypeScript Basics
 * To compile: tsc script.ts
 */

// 1. Type Annotations
let username: string = "Aditya";
let age: number = 20;
let isActive: boolean = true;

// 2. Interfaces
interface User {
    id: number;
    name: string;
    email: string;
    isAdmin?: boolean; // Optional property
}

const employee: User = {
    id: 1,
    name: "John Doe",
    email: "john@example.com"
};

// 3. Type Aliases
type Point = {
    x: number;
    y: number;
};

const coordinate: Point = { x: 10, y: 20 };

// 4. Union Types
type Status = "Pending" | "Approved" | "Rejected"; // Literal union
let currentStatus: Status = "Pending";

function printId(id: number | string) {
    console.log(`Your ID is: ${id}`);
}

printId(101);
printId("USR-202");

// 5. Functions with Types
function add(a: number, b: number): number {
    return a + b;
}

console.log(add(5, 10));
console.log(`User ${username} is ${age} years old.`);

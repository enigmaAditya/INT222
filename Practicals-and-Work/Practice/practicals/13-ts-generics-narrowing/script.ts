/**
 * Practical 13: TypeScript Generics and Narrowing
 */

// 1. Generic Functions
function identity<T>(arg: T): T {
    return arg;
}

let output1 = identity<string>("myString");
let output2 = identity<number>(100);

// Example: Generic Box
interface Box<T> {
    content: T;
}

const stringBox: Box<string> = { content: "Hello" };
const numberBox: Box<number> = { content: 42 };

// 2. Type Narrowing
function processValue(val: string | number) {
    if (typeof val === "string") {
        // TypeScript knows 'val' is string here
        console.log("Length:", val.length);
    } else {
        // TypeScript knows 'val' is number here
        console.log("Square:", val * val);
    }
}

// 3. Narrowing with 'in' operator
interface Bird {
    fly: () => void;
}
interface Fish {
    swim: () => void;
}

function move(animal: Bird | Fish) {
    if ("fly" in animal) {
        animal.fly();
    } else {
        animal.swim();
    }
}

// 4. Type Inference
let x = 10; // TS infers x is a number
// x = "hello"; // This would cause an error

console.log("Generics and Narrowing demonstrated.");

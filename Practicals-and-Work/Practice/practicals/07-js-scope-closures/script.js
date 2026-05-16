/**
 * Practical 7: Execution Context, Scope, and Closures
 */

// 1. Global Scope
let globalVar = "I am global";

function outerFunction() {
    // 2. Local/Function Scope
    let outerVar = "I am outer";
    
    console.log("Outer accessing:", globalVar);
    console.log("Outer accessing:", outerVar);

    function innerFunction() {
        // 3. Nested Scope & Closure
        // innerFunction has access to outerVar even after outerFunction has finished execution (if returned)
        let innerVar = "I am inner";
        
        console.log("--- Inner Scope ---");
        console.log("Inner accessing:", globalVar);
        console.log("Inner accessing:", outerVar);
        console.log("Inner accessing:", innerVar);
    }

    return innerFunction;
}

const myClosure = outerFunction();
console.log("\nCalling closure:");
myClosure(); // innerFunction still has access to 'outerVar'

// 4. Practical Closure Example: Counter
function createCounter() {
    let count = 0; // Private variable
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
}

const counter = createCounter();
console.log("\nCounter Example:");
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2
// count variable is not accessible directly from outside!

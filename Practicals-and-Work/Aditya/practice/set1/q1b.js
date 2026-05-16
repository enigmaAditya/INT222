import EventEmitter from 'events';

// Create an instance of EventEmitter
const myEmitter = new EventEmitter();

// Define an event listener
myEmitter.on('greet', (name) => {
    console.log(`Hello, ${name}! The 'greet' event was triggered.`);
});

// Another event listener for the same event
myEmitter.on('greet', () => {
    console.log('Implementation of Events in Node.js is successful.');
});

// Trigger the event
console.log("Triggering the 'greet' event...");
myEmitter.emit('greet', 'Aditya');

// Example with arguments
myEmitter.on('calculate', (a, b) => {
    console.log(`Sum: ${a + b}`);
});

myEmitter.emit('calculate', 10, 20);

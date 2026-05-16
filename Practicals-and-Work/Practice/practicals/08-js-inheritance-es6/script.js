/**
 * Practical 8: Prototype Inheritance & ES6 Features
 */

// 1. Prototype-based Inheritance (Old Way)
function Animal(name) {
    this.name = name;
}

Animal.prototype.speak = function() {
    console.log(`${this.name} makes a noise.`);
};

function Dog(name) {
    Animal.call(this, name); // Call parent constructor
}

// Inherit prototype
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.speak = function() {
    console.log(`${this.name} barks!`);
};

const d = new Dog('Rex');
d.speak();

console.log("\n--- ES6 Features ---");

// 2. let & const
let score = 10;
const MAX_SCORE = 100;

// 3. Destructuring
const user = { id: 1, username: 'adi', email: 'adi@example.com' };
const { username, email } = user;
console.log(`User: ${username}, Email: ${email}`);

const colors = ['red', 'green', 'blue'];
const [first, second] = colors;
console.log(`First color: ${first}`);

// 4. Spread & Rest
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // Spread
console.log("Combined Array:", arr2);

function sum(...numbers) { // Rest
    return numbers.reduce((a, b) => a + b, 0);
}
console.log("Sum using Rest:", sum(10, 20, 30));

// 5. Template Literals
console.log(`Score is ${score} out of ${MAX_SCORE}`);

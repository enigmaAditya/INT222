/*
Q2. You are building a survey app where a "feedback" event triggers a thank-you note. Use EventEmitter to listen for "surveySubmit" and use the fs module to append the student's name to a responses.txt file
*/
import EventEmitter from 'events';
import fs from 'fs';

const myEmitter = new EventEmitter();

// Listener
myEmitter.on('surveySubmit', (name) => {
    console.log(`Thank you for your feedback, ${name}!`);
    fs.appendFileSync('responses.txt', `${name}\n`);
    console.log("Name saved to responses.txt");
});

// Trigger the event
console.log("Submitting survey for Aditya...");
myEmitter.emit('surveySubmit', 'Aditya');

/**
 * Practical 14: TypeScript Frontend Integration
 * Compiled output goes to dist/app.js
 */

interface AppConfig {
    title: string;
    version: number;
}

const config: AppConfig = {
    title: "TypeScript Integration Demo",
    version: 1.0
};

const displayMessage = (msg: string): void => {
    const el = document.getElementById('message');
    if (el) {
        el.textContent = msg;
    }
};

// Simulate fetching data with a type
async function init() {
    displayMessage("Initializing TypeScript App...");
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    displayMessage(`${config.title} v${config.version} is now active!`);
    console.log("TS App initialized successfully.");
}

init();

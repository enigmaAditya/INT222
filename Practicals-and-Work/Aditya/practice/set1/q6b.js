import EventEmitter from 'events';

class UnitConverter extends EventEmitter {}

const converter = new UnitConverter();

// Listener for conversion
converter.on('convert', (fahrenheit) => {
    const celsius = (fahrenheit - 32) * 5 / 9;
    console.log(`Input: ${fahrenheit}°F | Output: ${celsius.toFixed(2)}°C`);
});

// Demonstrate usage
console.log("--- Unit Converter (Fahrenheit to Celsius) ---");

const inputs = [32, 98.6, 100, 212, -40];

inputs.forEach(f => {
    converter.emit('convert', f);
});

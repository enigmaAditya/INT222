import EventEmitter from 'events';

class DataFetcher extends EventEmitter {}

const fetcher = new DataFetcher();

// Listener 1: Data Received
const onDataReceived = (data) => {
    console.log(`[Listener 1] Data received: ${JSON.stringify(data)}`);
};

// Listener 2: Logging
const onDataLogged = () => {
    console.log(`[Listener 2] Data arrival time: ${new Date().toLocaleTimeString()}`);
};

// Adding listeners
fetcher.on('data', onDataReceived);
fetcher.addListener('data', onDataLogged);

// Emit the event
console.log("Emitting 'data' event...");
fetcher.emit('data', { id: 101, status: 'Active' });

// Show number of listeners
console.log(`Total listeners for 'data': ${fetcher.listenerCount('data')}`);

// Remove a listener
fetcher.removeListener('data', onDataLogged);
console.log("Removed Listener 2. Emitting again...");

fetcher.emit('data', { id: 102, status: 'Pending' });
console.log(`Remaining listeners for 'data': ${fetcher.listenerCount('data')}`);

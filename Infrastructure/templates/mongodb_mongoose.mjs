import mongoose from 'mongoose';

// 1. Connect
mongoose.connect('mongodb://localhost:27017/my_database');

// 2. Define Schema & Model
const userSchema = new mongoose.Schema({ name: String, age: Number });
const User = mongoose.model('User', userSchema);

// 3. CRUD operations
async function crud() {
    // Create
    await User.create({ name: 'Aditya', age: 20 });
    
    // Read
    const users = await User.find({ age: { $gt: 18 } });
    
    // Update
    await User.updateOne({ name: 'Aditya' }, { age: 21 });
    
    // Delete
    await User.deleteOne({ name: 'Aditya' });
}

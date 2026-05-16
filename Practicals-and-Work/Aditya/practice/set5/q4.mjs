/*
4. Build a notes API using Express and MongoDB where logged-in users can create, update, and delete their notes.
*/
import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/notes_v5');

const noteSchema = new mongoose.Schema({ 
    userId: String, 
    title: String, 
    content: String 
});
const Note = mongoose.model('Note', noteSchema);


const checkUser = (req, res, next) => {
    req.user = req.headers['userid']; 
    if (!req.user) return res.status(401).send("Not Logged In");
    next();
};

app.post('/notes', checkUser, async (req, res) => {
    const note = new Note({ ...req.body, userId: req.user });
    await note.save();
    res.send("Note Created");
});

app.get('/notes', checkUser, async (req, res) => {
    const myNotes = await Note.find({ userId: req.user });
    res.json(myNotes);
});
app.get('/notes/:id', checkUser, async (req, res) => {
    const note = await Note.findOne({ _id: req.params.id, userId: req.user });
    if (!note) return res.status(404).send("Note not found or not yours");
    res.json(note);
});

app.delete('/notes/:id', checkUser, async (req, res) => {
    const note = await Note.findOne({ _id: req.params.id, userId: req.user });
    if (!note) return res.status(404).send("Note not found or not yours");
    await Note.findByIdAndDelete(req.params.id);
    res.send("Note Deleted");
});
// app.post("/student", async(req, res) => {
//     const student = new Student(req.body);
//     await student.save();
//     res.send("Student Created");
// });
// app.get ("/student", async(req, res) => {
//     const students = await Student.find();
//     res.json(students);
// });
// app.delete("/student/:id", async(req, res) => {
//     await Student.findByIdAndDelete(req.params.id);
//     res.send("Student Deleted");
// });
// // delete student by name
// app.delete("/student/name/:name", async(req, res) => {
//     await Student.findOneAndDelete({ name: req.params.name });
//     res.send("Student Deleted by Name");
// });

app.listen(6004, () => console.log("Q4 Notes API at 6004"));


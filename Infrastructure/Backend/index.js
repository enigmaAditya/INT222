import express from 'express'
import fs from 'fs'
const app = express();
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({extended:true}));

const file = path.join(__dirname, 'data.txt');

app.get('/', (req, res)=>{
    res.send(`<H1> File Handler<h1>
        <form action="/write" method="post">
            <textarea name="content" placeholder="write Something...."></textarea>
            <input type="submit" value="write to file">
            </form>
            <form action="/read" method="get">
            <input type="submit" value="read file content">
            </form>
            <form action="/delete" method="post">
            <input type="submit" value="delete file">
            </form>
        `)
})

app.post('/write', (req, res)=>{
    const data = req.body.content;
    fs.writeFileSync(file, data);
    res.send('content written');
})

app.get('/read', (req, res)=>{
    const rd = fs.readFileSync(file, 'utf-8');
    res.send(`content : ${rd}`);
})

app.post('/delete', (req, res)=>{
    fs.writeFileSync(file, "");
    res.send('deleted');
})

app.listen(3000, ()=>{
    console.log("http://localhost:3000");
});

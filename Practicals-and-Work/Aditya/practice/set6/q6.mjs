/*
Q6. Users need to upload large documents. Implement a system using Streams to handle the file video I/O efficiently and Zlib for compression. Secure the download route using JWT implementation and cookie-parser, while keeping the file metadata(size, owner) in a PostgreSQL database managed by Prisma
*/
import express from 'express';
import fs from 'fs';
import zlib from 'zlib';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
app.use(cookieParser());
const SECRET = "secure_key";

// 1. JWT Implementation for route protection
const protect = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.send("Auth required");
    req.user = jwt.verify(token, SECRET);
    next();
};

app.post('/upload', protect, (req, res) => {
    const inputFile = 'large_doc.txt';
    const outputZip = 'large_doc.gz';

    // 2. Use Streams and Zlib for efficient I/O and compression
    const readStream = fs.createReadStream(inputFile);
    const writeStream = fs.createWriteStream(outputZip);
    const gzip = zlib.createGzip();

    readStream.pipe(gzip).pipe(writeStream).on('finish', async () => {
        // 3. Store metadata in PostgreSQL via Prisma
        const stats = fs.statSync(outputZip);
        await prisma.fileMetadata.create({
            data: {
                name: outputZip,
                size: stats.size,
                owner: req.user.username
            }
        });
        res.send("File Compressed and Metadata saved in PostgreSQL!");
    });
});

app.listen(7006, () => console.log("Q6 Secure Stream API at 7006"));

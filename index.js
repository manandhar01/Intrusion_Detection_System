const express = require('express');
const app = express();
const http=require('http');
const { Server } = require('socket.io');
const cors=require('cors');
const server = http.createServer(app);
const fs = require('fs');
const csvtojson = require("csvtojson");

app.use(cors());

const io = new Server(server,{
    cors:{
        //accept request from localhost:3000 and allowed methods will be GET,POST
        origin: "*",
        methods: ["GET","POST"]
    }
});

const filename="./test.csv";
io.on("connection",(socket)=>{
    fs.watchFile(filename,()=>{
        csvtojson()
            .fromFile(filename)
            .then((data) => {
                let columns = [];
                cols = Object.keys(data[0]);
                cols.forEach((col) => {
                    columns.push({ accessorKey: col, header: col });
                });
                socket.emit("sent from the server",data,columns);
            });
    });
    console.log(`User connected: ${socket.id}`);
});

server.listen(3001,()=>{
    console.log("Listening at 3001")
});
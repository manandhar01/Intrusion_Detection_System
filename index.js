const express = require('express');
const app = express();
const http=require('http');
const { Server } = require('socket.io');
const cors=require('cors');
const server = http.createServer(app);
const fs = require('fs');
const csvtojson = require("csvtojson");
const bodyParser = require('body-parser');
const multer  = require('multer');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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


app.post('/formpost',(req,res)=>{
    console.log(req.body);
    // res.json(req.body);
})

const storage= multer.diskStorage({
    destination: function(req,file,cb){
        //cb(error,destination)
        cb(null,'./uploads/');
    },
    filename: function(req,file,cb){
        //cb(error,filename)
        cb(null,file.originalname)
    }
})
const upload = multer({
    storage:storage
}).single('file');

app.post('/csvpost',upload,(req,res)=>{
    // res.send(req.file);
    res.send(req.file);
})

server.listen(3001,()=>{
    console.log("Listening at 3001")
});
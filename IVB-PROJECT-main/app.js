const express = require('express');
const app = express();

const ws = require('ws')
const wss = new ws.Server({ port: 5000 })
wss.on('connection', (socket) =>{
    console.log("New Client Connected")

    socket.onmessage = function (message)
    {
        wss.clients.forEach(client => {
            if (client != socket)
            {
                client.send(message.data);
             }
     })   

    }
})


app.set('view engine', 'ejs');
app.get("/", (req, res) => {
    res.render("client.ejs");
})

app.get("/admin", (req, res) => {
    res.render("admin.ejs");
})



app.listen(3000, (error) =>{
    if (error)
        console.log(error);
    else
        console.log("Server is running on port 3000")
})
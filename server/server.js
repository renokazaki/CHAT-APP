const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const app = express();

const port = process.env.PORT || 5000;
const staticPath = path.resolve(__dirname, "dist");

// setup middleware 
app.use(express.static(staticPath));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://chat-app-5y9l.onrender.com",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
    console.log("client coonect");
    socket.on ("value",value => {
      console.log(value)
      io.emit("value",value);
  })
  //クライアントから受信
  socket.on ("user",user => {
      console.log(user)
      io.emit("user",user);
  })
  
  socket.on("reset", user => {
      console.log("リセットイベント受信");
      io.emit("reset", user);
  })

  socket.on("disconnect", () => {
    console.log("client disconnected");
  });
});

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    const indexFile = path.join(__dirname, "dist", "index.html");
    return res.sendFile(indexFile);
  });
}

server.listen(port, () => console.log(`server listening on port ${port}`));

const http =require("http");

const {register}=require("./register");

const {login} = require("./login");

const {delete1} = require("./delete");

const {update} = require("./update");

const myserver = http.createServer((req, res) => {
    if (req.url.startsWith("/register")){ 
      // Pass the request to the `register` server
      register.emit("request", req, res);
    }
     else if (req.url.startsWith("/login")) {
        // Pass the request to the `login` server
        login.emit("request", req, res);
      }

      else if(req.url.startsWith("/delete")){
        delete1.emit("request",req, res);
      }

      else if(req.url.startsWith("/update")){
        update.emit("request",req, res);
      }

          else {
      // Handle unsupported routes
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Route not found." }));
    }
  });

myserver.listen(4000,()=>
console.log("server started in port 4000")
);
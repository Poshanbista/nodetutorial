const http = require("http");

const myserver=http.createServer((req,res) => {
    
    const url=req.url;
    if(url=="/")
        res.end("Homepage");
    else if(url=="/about")
        res.end("about page");
    else
       res.end("404! not found");
});

myserver.listen(5000, ()=>console.log("server started")); 


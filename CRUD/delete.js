const http = require("http");
const fs = require("fs");
const path =require("path");

const filepath = path.join(__dirname,"users.json");

// create a server

const delete1=http.createServer((req,res)=>{
    if(req.method==='DELETE' && req.url.startsWith('/delete'))
    {

        //example: Extract name from the URL(eg: /delete/poshan)
        const name = req.url.split('/')[2];

        if(!name)
        {

            //simulation deletation logic (eg: remove item from database)
            res.writeHead(200,{'Content-Type' : 'application/json'});
            res.end(JSON.stringify({message:'name is required'}));
            return;
        }

        fs.readFile(filepath, "utf-8",(err,data) =>{
            if(err)
            {
                res.writeHead(500,{'Content-Type':'application/json'});
                res.end(JSON.stringify({message:'failed to read the file'}));
                return;
            }

            let users;
            try{
                users = JSON.parse(data);  // parse the json file
            }
            catch(parseError)
            {
                res.writeHead(500,{'Content-Type':'application/json'});
                res.end(JSON.stringify({message:'invalid json data file'}));
                return;
            }

            // check if the user exists
            if(!users.some(user=>user.name===name))
            {
                res.writeHead(404,{'Content-Type':'application/json'});
                res.end(JSON.stringify({message:'users not found'}));
                return;
            }

            //filter out the user to delete
            const updatedusers = users.filter(user => user.name !==name);

            //write the updated data back to the file

            fs.writeFile(filepath,JSON.stringify(updatedusers,null, 2),(writeError) =>{
                if(writeError)
                {
                    res.writeHead(500,{'Content-Type':'application/json'});
                    res.end(JSON.stringify({message:'failed to update data file'}));
                    return;
                }
                    res.writeHead(200,{'Content-Type':'application/json'});
                    res.end(JSON.stringify({message:'user deleted successfully'}));
            });
        });   
    }

    else
    {

        // unsupported route 
        res.writeHead(404,{'Content-Type':'application/json'});
        res.end(JSON.stringify({message:'Route not found'}));
    }
});

module.exports= {delete1};
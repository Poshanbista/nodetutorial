const http = require("http");
const fs = require("fs");
  

//create the server
const login=http.createServer((req, res)=>{
    if(req.method==='POST' && req.url==='/login')
    {
        let body='';
              

        //collect the incoming data
        req.on('data', (chunks)=>{
            body+=chunks.toString();
        });

        req.on('end',()=>{
            try{
                const credentials=JSON.parse(body);
                

                // validation input data
                if(!credentials.email || !credentials.password)
                {
                    res.writeHead(400,{'Content-Type':'application/json'});
                    res.end(JSON.stringify({message:'provide email and password'}));
                    return ;
                }
                

                // read the user.json file
                fs.readFile('users.json',(err,data)=>{
                    if(err)
                    {
                        res.writeHead(500, {'Content-Type':'application/json'});
                        res.end(JSON.stringify({message:'Error reading data.'}));
                        return;
                    }

                    const users=data.length > 0 ?JSON.parse(data) : [];
                
                    //check if the user exits and the password matches

                    const user=users.find( 
                        (u)=>u.email === credentials.email && u.password === credentials.password
                    );

                    if (user)
                    {
                        res.writeHead(200,{'Content-Type' : 'application/json'});
                        res.end(JSON.stringify({message:'Login successfully',user}));

                        
                    }

                    else
                    {
                        res.writeHead(401,{'Content-Type': 'application/json'});
                        res.end(JSON.stringify({message:'invalid Email and password '}));
                    }
                });
            }
            catch(error)
            {
                res.writeHead(400,{'content-Type': 'application/json'});
                res.end(JSON.stringify({message:'invalid json format'}));
            }
        });
    }

    else
    {
        // for unsupported routes
        res.writeHead(404,{'Content-Type':'application/json'});
        res.end(JSON.stringify({message:'Route not found.'}));
    }
});

module.exports= {login};
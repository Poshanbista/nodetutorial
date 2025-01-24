const http = require('http');
const fs = require('fs');


// Get the contents of the HTML, CSS, JS and Logo files
const homePage = fs.readFileSync('./index.html');
const homeStyles = fs.readFileSync('./style.css');
const about_page = fs.readFileSync('./about.html');
const contact = fs.readFileSync('./contact.html');




// Creating the Server
const server = http.createServer((req, res) => {
    const url = req.url;
    if(url === '/'){
        res.writeHead(200, {'content-type': 'text/html'});
        res.write(homePage);
        res.end();
    } else if(url === '/about'){
        res.writeHead(200, {'content-type': 'text/html'});
        res.write(about_page);
        res.end();
    } else{
        res.writeHead(200, {'content-type': 'text/html'});
        res.write(contact);
        res.end();
    }
})

server.listen(5000, () => {
    console.log('Server listening at port 5000');
})
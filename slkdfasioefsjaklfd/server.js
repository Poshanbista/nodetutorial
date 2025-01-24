const http = require("http");
const fs = require("fs");

// Read the files synchronously
const loginpage = fs.readFileSync("./loginpage.html");
const loginpagestyle = fs.readFileSync("./loginpage.css");
const form = fs.readFileSync("./form.html");
const formstyle = fs.readFileSync("./form.css");

// Create the server
const myserver = http.createServer((req, res) => {
    const url = req.url;

    if (url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(loginpage);
        res.end();
    } else if (url === '/form') { // Corrected the else condition
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(form);
        res.end();
    } else if (url === '/loginpage.css') { // Serve CSS for the login page
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.write(loginpagestyle);
        res.end();
    } else if (url === '/form.css') { // Serve CSS for the form page
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.write(formstyle);
        res.end();
    } else {
        // Handle 404 errors for unknown routes
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<h1>404 - Page Not Found</h1>');
        res.end();
    }
});

// Start the server
myserver.listen(5500, () => {
    console.log("Server running at port 6000.");
});

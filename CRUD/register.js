const http = require("http");
const fs = require("fs");

const register = http.createServer((req, res) => {
  if (req.method === "POST" && req.url.startsWith("/register")) {
    let body = "";

    // Collect incoming data
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const user = JSON.parse(body);

        // Validate user data
        if (!user.name || !user.email || !user.password) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              message: "Please provide name, email, and password.",
            })
          );
          return;
        }

        // Read existing users or initialize an array
        fs.readFile("users.json", (err, data) => {
          const users = !err && data.length > 0 ? JSON.parse(data) : [];
          users.push(user);

          // Save updated users to the file
          fs.writeFile(
            "users.json",
            JSON.stringify(users, null, 2),
            (writeErr) => {
              if (writeErr) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Failed to save user." }));
              } else {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(
                  JSON.stringify({ message: "User registered successfully." })
                );
              }
            }
          );
        });
      } catch (error) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Invalid JSON format" }));
      }
    });
  } else {
    // Unsupported routes
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found." }));
  }
});

module.exports = { register };

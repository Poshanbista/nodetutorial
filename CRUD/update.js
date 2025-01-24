const http = require("http");
const path = require("path");
const fs = require("fs");

const dataFilePath = path.join(__dirname, "users.json");

// Helper function to read data from the JSON file
function readData() {
    if (!fs.existsSync(dataFilePath)) {
        return [];
    }
    const data = fs.readFileSync(dataFilePath);
    return JSON.parse(data);
}

// Helper function to write data to the JSON file
function writeData(data) {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

const update = http.createServer((req, res) => {
    if (req.method === "PATCH" && req.url.startsWith("/update/")) {
        const name = req.url.split("/").pop(); // Extract the name from the URL
        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            try {
                const { email } = JSON.parse(body);
                if (!email) {
                    throw new Error("Missing email field");
                }

                const data = readData();
                const entryIndex = data.findIndex(entry => entry.name === name);

                if (entryIndex !== -1) {
                    // Update the email
                    data[entryIndex].email = email;
                    writeData(data);

                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify(data[entryIndex]));
                } else {
                    res.writeHead(404, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ message: "Entry not found" }));
                }
            } catch (error) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: error.message || "Invalid JSON input" }));
            }
        });
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

// Export the server
module.exports = { update };

// const express = require("express");
// const app = express();
// const port = process.env.PORT || 3000;
//
// app.get("/", (req, res) => {
//     res.send("Hello from Dockerized Node.js server!");
// });
//
// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });
const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;


// Serve static HTML from public/
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

// Handle form submission
app.post("/submit", (req, res) => {
    const message = req.body.message;
    console.log("User submitted:", message);
    res.send(`<p>You wrote: ${message}</p><a href="/">Back</a>`);
});

app.listen(port, () => {
    console.log(`UI app listening at http://localhost:${port}`);
});

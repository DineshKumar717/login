
const express = require("express");
const app = express(); 
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./Config");

// use ejs view engine
app.set("view engine", "ejs");

// parse incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// static file
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
    res.render("Login");
});

app.get("/Signin", (req, res) => {
    res.render("Signin");
});

// Signin route (register new user)
app.post("/Signin", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    };
    const existingUser = await collection.findOne({ name: data.name });
    if (existingUser) {
        res.send("User already exists. Please choose a different username.");
    } else {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword;

        await collection.insertOne(data);
        res.redirect("/");
    }
});

// Login route
app.post("/Login", async (req, res) => {
    try {
        const user = await collection.findOne({ name: req.body.username });
        if (!user) {
            return res.send("Username not found");
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
        if (isPasswordMatch) {
            res.render("Home");
        } else {
            res.send("Wrong password");
        }
    } catch (err) {
        console.error(err);
        res.send("Something went wrong");
    }
});

// Start server
const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})
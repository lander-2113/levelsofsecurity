//jshint esversion:6
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect("mongodb://127.0.0.1:27017/userDB");//, {useNewUrlParser: true});

const userSchema = {
    email: String,
    password: String
};

const User = new mongoose.model("User", userSchema);


app.get("/", function(req, res){
    res.render("home");
});

app.get("/login", function(req, res){
    res.render("login");
});
app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", function(req, res){
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });
    newUser.save()
    .then(saved=>{
        res.render("secrets");

    })
    .catch(err=>{
        console.log("error", err);
        res.send("Some error");
    });
});

app.post("/login", function(req, res){
    const username = req.body.username;
    const password = req.body.password;
    console.log(username + " " + password);
    
    var flag = 
    User.findOne({email: username, password:password});
    if(flag) {
        res.render("secrets");
    } else {
        res.send("Wrong credentials");
    }
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});
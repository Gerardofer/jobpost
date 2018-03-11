const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();


const PORT = process.env.PORT || 8080;

mongoose.connect("mongodb://localhost/job_tracker");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//----------------------------------------  MONGO DATA BASE SET UP  ------------------------------------
var jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    dateApplied: {
        type: Date
    },
    contact: {
        type: String
    }
});

var Job = mongoose.model("Job", jobSchema);

Job.create({
    company: "Facebook",
    position: "Front End Developer",
    dateApplied: "03/01/2018",
    contact: "Grace Cho"
})

//----------------------------------------  ROUTES  ----------------------------------------------------
app.get("/", (req, res) => {
    res.redirect("/jobs");
});

app.get("/jobs", (req, res) => {
    res.render("index")
})



//----------------------------------------  END OF ROUTES  ---------------------------------------------
app.listen(PORT, () => {
    console.log('server listening on port', PORT);
})
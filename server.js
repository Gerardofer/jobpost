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

//----------------------------------------  ROUTES  ----------------------------------------------------
app.get("/", (req, res) => {
    res.render("home");
});
//----  Get all jobs  ---------
app.get("/jobs", (req, res) => {
    Job.find({}, (err, allJobs) => {
        if (err) {
            console.log(err);
        } else {
            res.render("index", { jobs: allJobs });
        }
    });
});

//Create new job GET route
app.get("/jobs/new", (req, res) => {
    res.render("new");
});

//Create new job POST route
app.post("/jobs", (req, res) => {
    Job.create(req.body.jobs, (err, crateJob) => {
        if (err) {
            res.redirect("/jobs/new");
        } else {
            res.redirect("/jobs")
        }
    })
})


//----------------------------------------  END OF ROUTES  ---------------------------------------------
app.listen(PORT, () => {
    console.log('server listening on port', PORT);
})
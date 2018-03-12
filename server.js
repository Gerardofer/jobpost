const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();


const PORT = process.env.PORT || 8080;

mongoose.connect("mongodb://localhost/job_tracker");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

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
    });
});

//Create a GET route to show specific job
app.get("/jobs/:id", (req, res) => {
    var id = req.params.id;
    Job.findById(id, (err, jobFound) => {
        if (err) {
            res.redirect("/jobs");
        } else {
            res.render("show", { job: jobFound });
        }
    });
});


//Create a GET route to show the form to edit an existing specific job.
app.get("/jobs/:id/edit", (req, res) => {
    var id = req.params.id;
    Job.findById(id, (err, jobToUpdate) => {
        if (err) {
            res.redirect("/jobs")
        } else {
            res.render("edit", { job: jobToUpdate });
        }
    });
});

//Create a PUT route to update the database, then redirects to the the post
app.put("/jobs/:id", (req, res) => {
    var id = req.params.id;
    var jobs = req.body.jobs
    Job.findByIdAndUpdate(id, jobs, (err, updatedJob) => {
        if (err) {
            res.redirect("/jobs");
        } else {
            res.redirect("/jobs/" + id)
        }
    });
});

//Create a DELETE route to destroy an entry
app.delete("/jobs/:id", (req, res) => {
    var id = req.params.id;
    Job.findByIdAndRemove(id, (err) => {
        if (err) {
            res.redirect("/jobs");
        } else {
            res.redirect("/jobs")
        }
    })
})

//----------------------------------------  END OF ROUTES  ---------------------------------------------
app.listen(PORT, () => {
    console.log('server listening on port', PORT);
})
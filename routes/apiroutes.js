module.exports = function(app) {
    app.get("/", (req, res) => {
        res.redirect("/jobs");
    });

    app.get("/jobs", (req, res) => {
        res.render("index")
    })
}
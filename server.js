const express = require ("express");
const app = express();

const PORT = process.env.PORT || 8080;

app.set("view engine", "ejs");
app.use(express.static("public"));

require("./routes/apiroutes.js")(app);

app.listen(PORT, () => {
    console.log('server listening on port', PORT);
})
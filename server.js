const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/pk-fitness-tracker", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// routes
app.use(require("./routes/APIroutes.js"));
app.use(require("./routes/HTMLroutes.js"))

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
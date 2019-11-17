const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Parses incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: true })); // Extended:true is the default, could be dropped.
// Parses incoming requests with json payloads
app.use(express.json());

// If the environment variable is set to production, it will serve static assets
// that it finds in the client/build directory.  The build directory would exist
// on Heroku; where I build/deploy.
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Get all my routes
app.use(routes);

// Connect to the Mongo DB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/parkingLot")
  .then(
    // Only start listening after the connect is complete
    app.listen(PORT, function() {
      console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
    })
  );

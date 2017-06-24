// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: "application/vnd.api+json"
}));

// Table Reservations (DATA)
// =============================================================
var reservations = {
  currentReservations: {
    tables: [
      {name: "Jeff",
       phoneNumber: 1111111,
       email: "Jedi Master",
       uniqueID: Jeff,
      }, 
      {name: "Greg",
       phoneNumber: 2222222,
       email: "greg@greg.com",
       uniqueID: Greg,
      }, 
      {name: "Yoda",
       phoneNumber: 3333333,
       email: "JediMasterBiatch@jedi.com",
       uniqueID: Yoda,
      }
    ]
  },

  waitlist: {
      tables: []
  }
};
  
var reset = {
  currentReservations: {
    tables: []
  },

  waitlist: {
      tables: []
  }
};


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});
// A route to get to the page to make a reservation
app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});
//route to get to the current reservations
app.get("/reservations", function(req, res) {
  res.sendFile(path.join(__dirname, "reservations.html"));
});
//display the api data for current reservations
app.get("/api/tables", function(req, res) {
  res.json(reservations.currentReservations);
});
//display the api data for the waiting list
app.get("/api/waiting-list", function(req, res) {
  res.json(reservations.waitlist);
});
//clear the reservations and waiting list
app.get("/api/clear", function(req, res) {
  reservations = reset;
  res.sendFile(path.join(__dirname, 'reservations.html'));
  });
//create new reservation and add it to tables if there are less than 5 entries, or add it to the waitlist.
app.post("/api/new", function (req, res) {
  var newReservation = req.body;
  console.log(newReservation);
  if (reservations.currentReservations.tables.length > 5) {
    reservations.waitlist.tables.push(newReservation);
  } else {
    reservations.currentReservations.tables.push(newReservation);
  }
  res.sendFile(path.join(__dirname, 'reservations.html'))
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

//array for users
var users = [ ];

//body parser to parse json
app.use(bodyParser.json());

//App running on port 3000
app.listen(3000, function () {
  console.log('Reminder app Running on port 3000')
});


app.get('/users/:userId', function (req, res) {
  var inputId = req.params.userId;
  var arrayplace = inputId - 1;
  if(!users[arrayplace]){
    res.status(404);
    res.json({"message" : "userId not found: " + inputId});
  }
  else {
    res.status(200);
    res.json(users[arrayplace].user);
  }
});

app.get('/users/:userId/reminders', function (req, res) {
  var inputId = req.params.userId;
  var userPlace = inputId - 1;
  if(!users[userPlace]){
    res.status(404);
    res.json({"message" : "userId not found: " + inputId});
  }
  else {
    var remindPlace = users[userPlace].reminders.length - 1;
    var eachReminder = []; users[userPlace].reminders.forEach(function(getStuff) {
      eachReminder.push(getStuff.reminder)
    });
    res.status(200);
    res.json(eachReminder);
  }
});

app.get('/users/:userId/reminders/:reminderId', function (req, res) {
  var userID = req.params.userId;
  var remindID = req.params.reminderId;
  var userPlace = userID - 1;
  var remindPlace = remindID - 1;
  if(!users[userPlace].reminders[remindPlace]){
    res.status(404);
    res.json({"message" : "reminderId not found: " + remindID});
  }
  else {
    res.status(200);
    res.json(users[userPlace].reminders[remindPlace].reminder);
  }
});

//post commands
app.post('/users', function (req, res) {
  var id = {"id" : users.length + 1};
  var newUser = req.body;
  newUser.id = id.id;
  newUser.reminders = [ ];
  users.push(newUser);
  res.status(200);
  res.json(id);
});

app.post('/users/:userId/reminders', function (req, res) {
  var inputId = req.params.userId;
  var arrayplace = inputId - 1;
  var date = new Date();
  if(!users[arrayplace]){
    res.status(404);
    res.json({"message" : "userId not found: " + inputId});
  }
  else {
    var id = {"id" : users[arrayplace].reminders.length + 1};
    var newRemind = req.body;
    newRemind.id = id.id;
    newRemind.reminder.created = date;
    users[arrayplace].reminders.push(newRemind);
    res.status(200);
    res.json(id);
  }
});

//delete commands
app.delete('/users/:userId', function (req, res) {
  var userID = req.params.userId;
  var userPlace = userID - 1;
  if(!users[userPlace]){
    res.status(404);
    res.json({"Message" : "userId not found: " + userID})
  }
  else {
    delete users[userPlace];
    
    res.send("204 No Content");
  }
});

app.delete('/users/:userId/reminders', function (req, res) {
  var userID = req.params.userId;
  var userPlace = userID - 1;
  if(!users[userPlace]){
    res.status(404)
    res.json({"Message" : "userId not found: " + userID})
  }
  else {
    users[userPlace].reminders = [ ];
   
    res.send("204 No Content");
  }
});

app.delete('/users/:userId/reminders/:reminderId', function (req, res) {
  var userID = req.params.userId;
  var remindID = req.params.reminderId;
  var userPlace = userID - 1;
  var remindPlace = remindID - 1;
  if(!users[userPlace].reminders[remindPlace]){
    res.status(404);
    res.json({"Message" : "reminderId not found: " + remindID})
  }
  else {
    delete users[userPlace].reminders[remindPlace];
    
    res.send("204 No Content");
  }
});
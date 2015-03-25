/* ---------------------------------------------------- +/

## Publications ##

All publications-related code. 

/+ ---------------------------------------------------- */

// PLAYERS

// Publish all players

Meteor.publish('allPlayers', function(options) {
  check(options, {
    sort: Object,
    limit: Number
  });
  return Players.find({}, options);
});


// Publish x players sorted on score

Meteor.publish('PlayersOnScore', function(limit) {
  return Players.find({},{sort:{score:-1}, limit: limit});
});

// Publish a single player

Meteor.publish('singlePlayer', function(id) {
  return Players.find(id);
});


// Matches

// Publish all Matches

Meteor.publish('allMatches', function() {
  return Matches.find();
});

// Publish all finished Matches

Meteor.publish('allFinishedMatches', function(options) {
  check(options, {
    sort: Object,
    limit: Number
  });
  return Matches.find({finished:true}, options);
});

// Publish all ongoing Matches

Meteor.publish('allOngoingMatches', function() {
  return Matches.find({finished:false});
});


// Publish Matches on player_id sorted on date
Meteor.publish ('allMatchesOnPlayer', function (player_id){
  finished = 

	condition1 = {"player1._id":player_id};
	condition2 = {"player2._id":player_id};
	return Matches.find({ 
    $and:[
      {$or: [condition1, condition2] },
      {finished:true}
    ]},
    {sort:{createdAt:-1}});
});

// Publish x Matches sorted on date

Meteor.publish('MatchesOnDate', function(limit) {
  return Matches.find({finished:true},{sort:{createdAt:-1}, limit: limit});
});



// Publish x Matches sorted on score

// Meteor.publish('MatchesOnPlayer', function(howMany) {
//   return Matches.find({},{sort:{score:-1}, limit: howMany});
// });

// Publish a single game

Meteor.publish('singleMatch', function(id) {
  return Matches.find(id);
});

Meteor.publish("userStatus", function() {
  return Meteor.users.find({ "status.online": true });
});


// Events

// Publish x events sorted on date

Meteor.publish('EventsOnDate', function(limit) {
  return Events.find({},{sort:{createdAt:-1}, limit: limit});
});

//Notifications

Meteor.publish('notifications', function() {
  return Notifications.find();
});
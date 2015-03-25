/* ---------------------------------------------------- +/

## Items ##

All code related to the Items collection goes here. 

/+ ---------------------------------------------------- */

Matches = new Meteor.Collection('matches');

// Allow/Deny

Matches.allow({
  insert: function(userId, doc){
    return can.createMatch(userId);
  },
  update:  function(userId, doc, fieldNames, modifier){
    return can.editMatch(userId, doc);
  },
  remove:  function(userId, doc){
    return can.removeMatch(userId, doc);
  }
});

// Methods

Meteor.methods({
  createMatch: function(){
    new_match = {
      createdAt : new Date().getTime(),
      finished:false,
      createdByName: "Anonymus user",
      createdById:false
    };
    playerId = Meteor.userId();
    if (playerId!==null) {
      player1 = Players.findOne(playerId);
      player1.points = 0;
      new_match.createdByName = Meteor.user().profile.name;
      new_match.createdById = Meteor.user()._id;
      new_match.player1 = player1;
    };
    return Matches.insert(new_match);
  },
  updateMatchPlayer1:function(matchId, player1){
   if (player1){
      player1['points']=0;
    }
    result = Matches.update(matchId, {$set:{player1:player1}});
    if (player1){
      return player1._id;
    } else {
      return result;
    }
  },
  updateMatchPlayer2:function(matchId, player2){
    match = Matches.findOne(matchId);
    if (player2._id===match.player1._id) {
       throw new Meteor.Error(403, 'Please choose different players');
    } else {
      if (player2){
        player2['points']=0;
      }
    }
    result = Matches.update(matchId, {$set:{player2:player2}});
    if (player2){
      return player2._id;
    } else {
      return undefined;
    }
  },
  updateMatchPlayersScore: function(matchId, player, points){
    if (player === "player1") {
      Matches.update(matchId, {$inc:{'player1.points':points}});
    } else if (player === "player2") {
      Matches.update(matchId, {$inc:{'player2.points':points}});
    }
  },
  finishMatch: function(matchId){
      match = Matches.findOne(matchId);
      //check if match has players defined
      if ("player1" in match && 'player2' in match) {
        //check if both players have 0 points, if yes, don't log the game
        if (match.player1.points===0 && match.player2.points===0) {
          return false;
        } else{
          Matches.update(matchId, {$set:{'finished':true, finishedAt: new Date().getTime()}});
          //create event
          Meteor.call('createEvent', " logged a game between "+match.player1.name+" and "+match.player2.name+".", matchId, function (error, result) {
            if (error) {
               console.log("createEvent from finishMatch function error: "+error);
            }
          });
          //Notifications
          //parameters for createNotification: fromUserId, toUsers, title, text, link
          notificationTitle = "Confirmation needed";
          if (Meteor.user()!==null) { //if there is a logged in user who is logging the game
            notificationText = Meteor.user().profile.name+" logged a match that needs your confimation.";   
          } else{
            notificationText = "Anonymous user logged a match that needs your confimation.";   
          }
          toPlayers = [match.player1._id, match.player2._id];  
          link = matchId;
          Meteor.call('createNotification', Meteor.userId(), toPlayers, notificationTitle, notificationText, link, function (error, result) {});
        }
      } else{
        return false;
      }
  },
  updateMatch: function(match){
    if(can.updateMatch(Meteor.user()))
      Matches.update(match);
  },
  removeMatch: function(match){
    if(can.removeMatch(Meteor.user(), match)){
      Matches.remove(match._id);
    }else{
      throw new Meteor.Error(403, 'You do not have the rights to delete this match.')
    }
  },
  updateMatchPlayer1ConfirmedScore: function(matchId){
    //Meteor.userId() updates match, if he has a notification on that match it marks it read
    Notifications.update({toUserId:Meteor.userId(), link:matchId}, {$set:{read:true}});
    Meteor.call('createEvent', "confirmed a match.", matchId, function(error, result){if (error) {return error.result;}});
    Matches.update(matchId, {$set:{"player1.confirmedScore":true, "player1.deniedScore":false}});
    if (Meteor.call('bothPlayersConfirmed', matchId)) {
       Meteor.call('updatePlayerPointsAndGames', matchId);
    };
  },
  updateMatchPlayer2ConfirmedScore: function(matchId){
    //Meteor.userId() updates match, if he has a notification on that match it marks it read
    Notifications.update({toUserId:Meteor.userId(), link:matchId}, {$set:{read:true}});
    Meteor.call('createEvent', "confirmed a match.", matchId, function(error, result){if (error) {return error.result;}});
    Matches.update(matchId, {$set:{"player2.confirmedScore":true,"player2.deniedScore":false, }});
    if (Meteor.call('bothPlayersConfirmed', matchId)) {
       Meteor.call('updatePlayerPointsAndGames', matchId);
    };
  },
  updateMatchPlayer1DeniedScore: function(matchId){
    //Meteor.userId() updates match, if he has a notification on that match it marks it read
    Notifications.update({toUserId:Meteor.userId(), link:matchId}, {$set:{read:true}});
    Meteor.call('createEvent', "confirmed a match.", matchId, function(error, result){if (error) {return error.result;}});
    Matches.update(matchId, {$set:{"player1.deniedScore":true, "player1.confirmedScore":false,}});
    if (Meteor.call('bothPlayersDenied', matchId)) {
      return Matches.remove(matchId);
    };
  },
  updateMatchPlayer2DeniedScore: function(matchId){
    //Meteor.userId() updates match, if he has a notification on that match it marks it read
    Notifications.update({toUserId:Meteor.userId(), link:matchId}, {$set:{read:true}});
    Meteor.call('createEvent', "confirmed a match.", matchId, function(error, result){if (error) {return error.result;}});
    Matches.update(matchId, {$set:{"player2.deniedScore":true, "player2.confirmedScore":false,}});
    if (Meteor.call('bothPlayersDenied', matchId)) {
      return Matches.remove(matchId);
    };
  },
  bothPlayersConfirmed: function(matchId){
    match = Matches.findOne(matchId);
    if (match.player1.confirmedScore&&match.player2.confirmedScore) {
      return true;
    } else {
      return false;
    }
  },
  bothPlayersDenied: function(matchId){
    match = Matches.findOne(matchId);
    if (match.player1.deniededScore&&match.player2.deniededScore) {
      return true;
    } else {
      return false;
    }
  },
  updatePlayerPointsAndGames: function(matchId){
    player1Id = match.player1._id;
    player1MatchPoints = match.player1.points;
    player2Id = match.player2._id;
    player2MatchPoints = match.player2.points;
    games=player1MatchPoints+player2MatchPoints;// total games played by players
    player1ProfilePoints = player1MatchPoints-player2MatchPoints;//points to be added to player 1 profile. if positive, it will add. If negative, it will subtract
    player2ProfilePoints = player2MatchPoints-player1MatchPoints;//points to be added to player 2 profile.

    //game duration in seconds
    var a = moment(match.createdAt);
    var b = moment(match.finishedAt);
    matchTime = b.diff(a, 'seconds');

    if(player1ProfilePoints>0&&player2ProfilePoints<0){
      player1WonMatch = 1;
      player1LostMatch = 0;
      player2WonMatch = 0;
      player2LostMatch = 1;
      drawMatch = 0;
    } else if(player1ProfilePoints<0&&player2ProfilePoints>0){
      player1WonMatch = 0;
      player1LostMatch = 1;
      player2WonMatch = 1;
      player2LostMatch = 0;
      drawMatch = 0;
    } else if (player1ProfilePoints===0&&player2ProfilePoints===0) {
      player1WonMatch = 0;
      player1LostMatch = 0;
      player2WonMatch = 0;
      player2LostMatch = 0;
      drawMatch = 1;
    };
    Players.update({_id:player1Id}, {
        $inc:{
          score:player1ProfilePoints, 
          gamesPlayed:games, 
          gamesWon:player1MatchPoints, 
          gamesLost:player2MatchPoints, 
          matchesPlayed:1, 
          matchesWon:player1WonMatch, 
          matchesLost:player1LostMatch, 
          matchesDraw:drawMatch, 
          timePlayed:matchTime
        }
      })
    Players.update({_id:player2Id}, {
        $inc:{
          score:player2ProfilePoints, 
          gamesPlayed:games, 
          gamesWon:player2MatchPoints, 
          gamesLost:player1MatchPoints, 
          matchesPlayed:1, 
          matchesWon:player2WonMatch, 
          matchesLost:player2LostMatch, 
          matchesDraw:drawMatch, 
          timePlayed:matchTime
        }
      });
  },

});

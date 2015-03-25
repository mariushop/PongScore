//selectPlayer2Results 

Template.selectPlayer2Results.created = function () {
  //
};


Template.selectPlayer2Results.helpers({
  players: function() {
    return PlayersSearch.getData({
      sort: {score: -1}
    });
  },
  
  isLoading: function() {
    return PlayersSearch.getStatus().loading;
  },

  resultsNumber: function(){
    return PlayersSearch.getData({
      sort: {score: -1}
    }).length;
  },

  selected: function(){
    return Session.get("selectedPlayer");
  }, 

});

Template.selectPlayer2Results.rendered = function() {
  PlayersSearch.search('');
};


Template.selectPlayer2Results.events({
	//
  "click .player-item": function (e){
    if (Session.get('player1')&&Session.get('player1')._id===this._id) {
      swal("Please choose different players.", "We need different players to have a match.", 'error');
    } else{
      Session.set('player2', this);
      matchId = Session.get('MatchId');
      Meteor.call('updateMatchPlayer2', matchId, this, function(error, result){
        if (error) {
         swal("Oops...", error.reason, 'error');
        };
      });
    }
  },
});




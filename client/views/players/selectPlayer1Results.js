//selectPlayer1Results 

Template.selectPlayer1Results.created = function () {
  //
};


Template.selectPlayer1Results.helpers({
  players: function() {
    return PlayersSearch.getData({
      sort: {score: -1}
    });
  },
  
  isLoading: function() {
    return PlayersSearch.getStatus().loading;
  },


});

Template.selectPlayer1Results.rendered = function() {
  PlayersSearch.search('');
};



Template.selectPlayer1Results.events({
  "click .player-item": function (e){
    if (Session.get('player2')&&Session.get('player2')._id===this._id){
      swal("Please choose different players.", "We need different players to have a match.", 'error');
    }else{
      matchId = Session.get('MatchId');
      Session.set('player1', this);
      return Meteor.call('updateMatchPlayer1', matchId, this, function(error, result){
        if (error) {
          alert(error);
        };
      });
    } 
  },
});




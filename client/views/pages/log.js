/* ---------------------------------------------------- +/

## Log ##

Code related to the log template

/+ ---------------------------------------------------- */

Template.log.created = function () {
//
};

Template.log.helpers({
  pointsFlat: function(points){
    if (points<=0) {
      return "disabled";
    };
  },
  setSession:function(){
    Session.set('player1', this.player1);
  }
});

Template.log.rendered = function () {
  //
};

Template.log.events({
	'click #change_player_1': function(event){
		event.preventDefault();
    player_stored = null;
    matchId = Session.get('MatchId');
    Session.set('player1', null);
    return Meteor.call('updateMatchPlayer1', matchId, player_stored, function(error, result){
      if (error) {
        swal("Oops...", error.reason, 'error');
      };
    });
	},
  'click #change_player_2': function(event){
    event.preventDefault();
    player_stored = null;
    matchId = Session.get('MatchId');
    Session.set('player2', null);
    Meteor.call('updateMatchPlayer2', matchId, player_stored, function(error, result){
        if (error) {
        swal("Oops...", error.reason, 'error');
      };
    });
  },
  'click #player_1_won': function(event){
    event.preventDefault();
    swal({   
      title: "Add a game?",   
      text: "We'll add a point to the player's score after it's confirmed.",   
      type: "success",     
      showCancelButton: true,   
      confirmButtonColor: "#449d44",   
      confirmButtonText: "Yes, add this game to the score",   
      closeOnConfirm: true,
      closeOnCancel: true
    },
      function(isConfirm){   
        if (isConfirm) {
          //update player score
          player = "player1";
          matchId = Session.get('MatchId');
          return Meteor.call('updateMatchPlayersScore', matchId, player, 1);
        }
    });
  },
  'click #player_2_won': function(event){
    event.preventDefault();
    swal({   
      title: "Add a game?",   
      text: "We'll add a point to the player's score after it's confirmed.",   
      type: "success",   
      showCancelButton: true,   
      confirmButtonColor: "#449d44",   
      confirmButtonText: "Yes, add this game to the score",   
      closeOnConfirm: true,
      closeOnCancel: true
    },
      function(isConfirm){   
        if (isConfirm) {
          player = "player2";
          matchId = Session.get('MatchId');
          return Meteor.call('updateMatchPlayersScore', matchId, player, 1);
        } 
    });
  },

  'click #player_1_lost': function(event){
    event.preventDefault();
    swal({   
      title: "Subtract one game?",   
      text: "We'll remove a point from the match score.",   
      type: "warning",     
      showCancelButton: true,   
      confirmButtonColor: "#d9534f",   
      confirmButtonText: "Yes, remove 1 point.",   
      closeOnConfirm: true,
      closeOnCancel: true
    },
      function(isConfirm){   
         if (isConfirm) {
          player = "player1";
          matchId = Session.get('MatchId');
          return Meteor.call('updateMatchPlayersScore', matchId, player, -1);
        }
    });
  },

  'click #player_2_lost': function(event){
    event.preventDefault();
    swal({   
      title: "Subtract one game?",   
      text: "We'll remove a point from the match score.",   
      type: "warning",     
      showCancelButton: true,   
      confirmButtonColor: "#d9534f",   
      confirmButtonText: "Yes, remove 1 point.",   
      closeOnConfirm: true,
      closeOnCancel: true
    },
      function(isConfirm){   
        if (isConfirm) {
          player = "player2";
          matchId = Session.get('MatchId');
          return Meteor.call('updateMatchPlayersScore', matchId, player, -1);
        } 
    });
  },
  'click #finish_match': function(event){
    event.preventDefault();
    swal({   
      title: "Match over?",   
      text: "We'll ask the players to confirm this match and then add it to their general score.",   
      type: "warning",     
      showCancelButton: true,   
      confirmButtonColor: "#d9534f",   
      confirmButtonText: "Yes, finish match.",   
      closeOnConfirm: true,
      closeOnCancel: true
    },
      function(isConfirm){   
        if (isConfirm) {
          matchId = Session.get('MatchId');
          Meteor.call('finishMatch', matchId);
          Router.go("/match/"+matchId);
        } 
    });
  },
});
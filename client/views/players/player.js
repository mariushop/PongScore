/* ---------------------------------------------------- +/

## Item ##

Code related to the item template

/+ ---------------------------------------------------- */

Template.player.created = function () {
  //
};

Template.player.helpers({
  //verify if the user isn't looking at own pofile
  isNotCurentUser: function(userId){
    var player = this;
    if (player._id===Meteor.userId()) {
      return false;
    } else{
      return true;
    }
  },
  //verify if the user is looking at own pofile
  isCurrentUser: function(userId){
    var player = this;
    if (player._id===Meteor.userId()) {
      return true;
    } else{
      return false;
    }
  },
  zeroMatches: function(){
    if (this.matches.count()===0) {
      return true;
    } else {
      return false;
    }
  },
  memberSince: function(date){
    return moment(date).format('MMMM Do YYYY');
  }
});

Template.player.rendered = function () {
  //
};

Template.player.events({
  'click #edit_own_account': function(e){
    e.preventDefault();
    $("#player_card").addClass("hidden");
    $('#player_card_edit').removeClass("hidden"); 
  },
  'click .cancel': function(e){
    e.preventDefault();
    $("#player_card").removeClass("hidden");
    $('#player_card_edit').addClass("hidden");
  },
  'click .save, submit #edit_player_form': function(e){
    e.preventDefault();
     A_name = $("#player_name").val().trim();
    if (A_name==="") {
       swal("Oops...", "We need you to enter a name for this player.", 'error');
    };
    setter={
      name: A_name
    };
    Meteor.call('updatePlayer', this, setter, function (error, result) {
      if (error) {
        swal("Oops...", error.reason, 'error');
      } else{
        $("#player_card").removeClass("hidden");
        $('#player_card_edit').addClass("hidden");
      }
    });
  },
  'click .delete': function(e, instance){
    var player = this;
    e.preventDefault();
    Meteor.call('removePlayer', player, function(error, result){
      alert('Player deleted.');
      Router.go('/players');
    });
  }
});
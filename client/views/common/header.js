Template.header.created = function () {
  //
};
Template.header.helpers({
	activeIfTemplateIs: function (template) {
		var currentRoute = Router.current().route.getName();
			if (currentRoute==template) {
				return "active";
			};
		},
	});

Template.header.events({
  'click #signout_button': function(event){
    event.preventDefault();
    Meteor.logout(function(error){
      if(error){
        sweetAlert("Oops...", error.reason, "error");
      }else{
        Router.go('/');
      }
    });
  },
  'click #log_a_game': function(event){
    event.preventDefault();
    Meteor.call('createMatch', function(error, result){
      Session.set('MatchId',result);
    });
    Router.go('/log');
  },
  'click .confirm': function(event){
    event.preventDefault();
    messageId = this._id;
    matchId = this.matchId;
    Meteor.call('confirmMatchScore', messageId, matchId, function(error, result){
      if (error) {
        sweetAlert("Oops...", error.reason, "error");
      }
    })
  },
  'click .deny': function(event){
    event.preventDefault();
    messageId = this._id;
    matchId = this.matchId;
    Meteor.call('denyMatchScore', messageId, matchId, function(error, result){
      if (error) {
        sweetAlert("Oops...", error.reason, "error");
      }
    })
  },
  'click .confirm_first_message': function(event){
    event.preventDefault();
    Meteor.call('confirmFirstMessage', this, function(error, result){
      if (error) {
        sweetAlert("Oops...", error.reason, "error");
      }
    })
  }
})
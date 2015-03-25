/* ---------------------------------------------------- +/

## Item ##

Code related to the match template

/+ ---------------------------------------------------- */

Template.match.created = function () {
  //
};

Template.match.helpers({
  matchDate:function(){
    return moment(this.createdAt).fromNow(); 
     // return  moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
  },
  duration: function() {
    var a = moment(this.createdAt);
    var b = moment(this.finishedAt);
    differrence = b.diff(a);
    return  moment.utc(differrence).format("HH:mm:ss");
  },
  userIsPlayer: function(playerId){
  	if (Meteor.userId()===playerId) {
  		return true;
  	} else {
  		return false;
  	}
  }, 
	notConfirmedOrDenied: function(confirm, deny){
		if (typeof confirm === 'undefined'&&typeof deny === 'undefined') {
			return true;
		} else{
			return false;
		}
	},
	loggedTime:function(){
		return moment(this.finishedAt).format('MMMM D YYYY, HH:mm');
	}
});

Template.match.rendered = function () {

};

Template.match.events({
	'click .confirm': function(e){
		e.preventDefault();
		if (e.target.id==="player1") {
			Meteor.call('updateMatchPlayer1ConfirmedScore', this._id, function(error, result){
				if (error) {
					swal("Oops...", error.reason, 'error');
				};
			});  
		};
		if (e.target.id=="player2") {
			Meteor.call('updateMatchPlayer2ConfirmedScore', this._id, function(error, reason){
				if (error) {
					swal("Oops...", error.reason, 'error');
				};
			});  
		};
	},
	'click .deny': function(e){
		e.preventDefault();
		if (e.target.id==="player1") {
			Meteor.call('updateMatchPlayer1DeniedScore', this._id, function(error, result){
				if (error) {
					swal("Oops...", error.reason, 'error');
				};
			});  
		};
		if (e.target.id=="player2") {
			Meteor.call('updateMatchPlayer2DeniedScore', this._id, function(error, reason){
				if (error) {
					swal("Oops...", error.reason, 'error');
				};
			});  
		};
	}
});
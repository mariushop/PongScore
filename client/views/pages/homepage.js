/* ---------------------------------------------------- +/

## Item ##

Code related to the game template

/+ ---------------------------------------------------- */

Template.homepage.created = function () {
  
};

Template.homepage.helpers({
//
});

Template.homepage.rendered = function () {
//
};

Template.homepage.events({
  'click #login_with_facebook': function(event){
    event.preventDefault();
    Meteor.loginWithFacebook({}, function (err) {
      if (err){
        Session.set('errorMessage', err.reason || 'Unknown error');
        sweetAlert("Oops...", error.reason, "error");
      }else{
        Router.go('/');
      }
    });
  },
  'click #login_with_google': function(event){
    event.preventDefault();
    Meteor.loginWithGoogle({}, function (err) {
      if (err){
        Session.set('errorMessage', err.reason || 'Unknown error');
        sweetAlert("Oops...", error.reason, "error");
      }else{
        Router.go('/');
      }
    });
  },
  'click #login_with_twitter': function(event){
    event.preventDefault();
    Meteor.loginWithTwitter({}, function (err) {
      if (err){
        Session.set('errorMessage', err.reason || 'Unknown error');
        sweetAlert("Oops...", error.reason, "error");
      }else{
        Router.go('/');
      }
    });
  },
});
Template.login.events = {
  'submit #login_form': function(event){
    event.preventDefault();
    var email = $('#email').val();
    var password = $('#password').val();

    if(!email || !password){
      sweetAlert("Oops...", "Please fill in all fields required.", "error");
    } else{
      Meteor.loginWithPassword(email, password, function(error){
        if(error){
          sweetAlert("Oops...", error.reason, "error");
        }else{
          Router.go('/');
        }
      });
    }
  },
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
};
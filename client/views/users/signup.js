Template.signup.events = {
  'submit #signup_form': function(event){
    event.preventDefault();

    var user = {
      email: $('#email').val(),
      password: $('#password').val()
    };
    var nameForUser = $('#name').val();
    user['profile'] = {
      name: nameForUser
    };

    if(!nameForUser || !user.email || !user.password){
      sweetAlert("Oops...", "Please fill in all fields required.", "error");
    }else{
      Accounts.createUser(user, function(error){
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
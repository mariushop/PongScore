Template.forgot.events = {
  'click input[type=submit]': function(e){
    e.preventDefault();

    var options = {
      email: $('#email').val()
    };

    Accounts.forgotPassword(options, function(error){
      if(error){
        sweetAlert("Oops...", error.reason, "error");
      }else{
        Router.go('/login');
        sweetAlert("Thank you!", "We sent an email with instructions on how to reset your password.", "succes");
      }
    });

  }
};
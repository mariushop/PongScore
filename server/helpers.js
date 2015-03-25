Meteor.startup(function() {



  // user roles
  var roles = ['player', 'admin']

  // this will fail if the roles package isn't installed
  if(Meteor.roles.find().count() === 0) {
    roles.map(function(role) {
      Roles.createRole(role)
    })
  }

//setting up the initial admin user, if there is none

  if (Meteor.users.find().count() === 0) {
    var users=[{
      email: "", //put your email here
      name: "Administrator", 
      roles:['admin']
    }];
      _.each(users, function(user){
       id=Accounts.createUser({
            email: user.email,
            password: "",  //put your password here
            profile: {name: user.name, },
        });
        Roles.addUsersToRoles(id, 'admin');
    });
  };

});


//setting up the initial admin user, if there is no users
if (Meteor.users.find().count() === 0) {
  var users=[{
    email: "",//put your email  here
    name: "Administrator", 
    roles:['admin']
  }];
    _.each(users, function(user){
     id=Accounts.createUser({
          email: user.email,
          password: "", //put your own password here
          profile: {name: user.name, profilePicture:'/images/users/droopy.jpg'},
      });
      Roles.addUsersToRoles(id, 'admin');
    });
  };

//add a default role of "player" at user creation. 
Accounts.onCreateUser( function (options, user) {
    //roles
  user.roles = ["player"];

  //get a random pic for the user
  rand = Math.floor(Math.random() * 4) + 1;

  if (options.profile){
    if (typeof(user.services.facebook) != "undefined") {
      user.services.facebook.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
      options.profile.profilePicture = user.services.facebook.picture;
    } else if (typeof(user.services.twitter) != "undefined") {
      options.profile.profilePicture = user.services.twitter.profile_image_url;
    } else if (typeof(user.services.google) !== "undefined") {
      options.profile.profilePicture = user.services.google.picture;
    } else{
      options.profile.profilePicture = '/images/users/'+rand+'.png';
    };
    //add weolcome message
    options.profile.messagesUnread=1
    options.profile.messages=[{
        "_id": new Meteor.Collection.ObjectID()._str,
        "title": "Welcome!",
        "content": " This is where you will recieve notifications on important stuff. Thanks for signing up!",
        "matchId": "",
        "createdAt": new Date().getTime(),
        "unread": true,
        "unconfirmed": true,
        "firstMessage": true
    }];
    user.profile = options.profile;
  }
  Players.insert({
    _id: user._id,
    name: user.profile.name,
    photo: user.profile.profilePicture,
    about: "",
    score: 0,
    gamesPlayed:0,
    gamesWon:0,
    gamesLost:0,
    matchesPlayed:0,
    matchesWon:0,
    matchesLost:0,
    matchesDraw:0,
    timePlayed:0,
    createdAt: new Date().getTime(),
  });
	return user;
  });

//denies updating users accounts from console
Meteor.users.deny({
  update: function() {
    return true;
  }
});




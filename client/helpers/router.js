/* ---------------------------------------------------- +/

## Client Router ##

Client-side Router.

/+ ---------------------------------------------------- */

// Config

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',   
   waitOn: function() {
    return [Meteor.subscribe('notifications')]
  }
});


// Filters

var filters = {

  isAdmin: function(){
    userIsAdmin = Roles.userIsInRole(Meteor.userId(), 'admin')
    if (userIsAdmin) {
      this.next();
    } else{
      alert('Restricted Access');
      this.stop();
    }
  },

  isLoggedIn: function() {
    if (!(Meteor.loggingIn() || Meteor.user())) {
      alert('Please Log In First.')
      this.stop();
    }
  }

}

Router.onBeforeAction(filters.myFilter, {only: ['items']});
Router.onBeforeAction(filters.isAdmin, {only: ['administrative']});

// Routes
Router.map(function() {
  // Players
  this.route('players', {
    path:'/players/:postsLimit?',
    controller:'playersController',
    
  });
  this.route('player', {
    path: '/player/:_id',
    waitOn: function () {
      return [
        Meteor.subscribe('singlePlayer', this.params._id),
        Meteor.subscribe('allMatchesOnPlayer', this.params._id)
        ]
    },
    data: function () {
      return {
        player: Players.findOne(this.params._id),
        matches: Matches.find()
      }
    }
  });
  // Matches
  this.route('matches', {
    path:'/matches/:postsLimit?',
    controller: 'matchesController',
  });
  this.route('match', {
    path: '/match/:_id',
    waitOn: function () {
      return Meteor.subscribe('singleMatch', this.params._id)
    },
    data: function () {
      return {
        match: Matches.findOne(this.params._id)
      }
    }
  });
  // Top 50
  this.route('leaderboard', {
    waitOn: function () {
      return Meteor.subscribe('PlayersOnScore', 50)
    },
    data: function () {
      return {
        players: Players.find({}, {$sort:{score:-1}})
      }
    }
  });
  // Pages 
  this.route('homepage', {
    path: '/',
    waitOn: function () {
      return [
        Meteor.subscribe('PlayersOnScore',10),
        Meteor.subscribe('MatchesOnDate',10),
        Meteor.subscribe('EventsOnDate', 5)
      ]
    },
    data: function () {
      return {
        players: Players.find({},{sort:{score:-1}}),
        matches: Matches.find({finished:true},{sort:{createdAt:-1}}),
        lastEvents: Events.find({},{sort:{createdAt:-1}})
      }
    }
  });
  //admin route
  this.route('administrative',{
    waitOn: function(){
      return Meteor.subscribe('userStatus');
    },
    data: function(){
      return{
        logged: Meteor.users.find({ "status.online": true })
      }
    }
  });
  this.route('log',{
    path:'/log',
     waitOn: function () {
      return Meteor.subscribe('singleMatch', Session.get('MatchId'))
    },
    data: function () {
      return {
        match: Matches.findOne(Session.get('MatchId'))
      }
    }
  });
  // Users
  this.route('login');
  this.route('myAccount',{
    waitOn: function () {
      return [
        Meteor.subscribe('singlePlayer', this.userId),
        Meteor.subscribe('allMatchesOnPlayer', this.userId)
        ]
    },
    data: function () {
      return {
        player: Players.findOne(this.userId),
        matches: Matches.find()
      }
    }
  });
  this.route('logout');
  this.route('signup');
  this.route('forgot');
  //controlers
  playersController = RouteController.extend({
    template: 'players',
    increment: 10, 
    postsLimit: function() { 
      return parseInt(this.params.postsLimit) || this.increment; 
    },
    findOptions: function() {
      return {sort: {name: 1}, limit: this.postsLimit()};
    },
    subscriptions: function() {
      this.playersSub = Meteor.subscribe('allPlayers', this.findOptions());
    },
    players: function(){
      return Players.find({}, this.findOptions());
    },
    data: function() {
      var hasMore = this.players().count() === this.postsLimit();
      var nextPath = this.route.path({postsLimit: this.postsLimit() + this.increment});
      return {
        players: this.players(),
        ready: this.playersSub.ready,
        nextPath: hasMore ? nextPath : null
      };
    }
  });
  matchesController = RouteController.extend({
    template: 'matches',
    increment: 9, 
    postsLimit: function() { 
      return parseInt(this.params.postsLimit) || this.increment; 
    },
    findOptions: function() {
      return {sort: {createdAt: -1}, limit: this.postsLimit()};
    },
    subscriptions: function() {
      this.matchesSub = Meteor.subscribe('allFinishedMatches', this.findOptions());
    },
    matches: function(){
      return Matches.find({}, this.findOptions());
    },
    data: function() {
      var hasMore = this.matches().count() === this.postsLimit();
      var nextPath = this.route.path({postsLimit: this.postsLimit() + this.increment});
      return {
        matches: this.matches(),
        ready: this.matchesSub.ready,
        nextPath: hasMore ? nextPath : null
      };
    }
  });
});

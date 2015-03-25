/* ---------------------------------------------------- +/

## players ##

Code related to the players template

/+ ---------------------------------------------------- */

Template.players.created = function () {
  //
};

Template.players.helpers({
  //
  searchedText: function(){
  	text = Session.get('searchedText');
  	if (text && text.length>0) {
  		return true;
  	} else{
  		return false;
  	}
  },
  playersResults: function() {
    return PlayersSearch.getData({
      sort: {score: -1}
    });
  },
  isLoading: function() {
    return PlayersSearch.getStatus().loading;
  }
});

Template.players.rendered = function () {
  //
};

Template.players.events({
    "keyup .search-box": _.throttle(function(e) {
      var text = $(e.target).val().trim();
      Session.set('searchedText', text);
      PlayersSearch.search(text);
    }, 200)
});



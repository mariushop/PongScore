/* ---------------------------------------------------- +/

## Items ##

Code related to the items template

/+ ---------------------------------------------------- */

Template.matches.created = function () {
  //
};

Template.matches.helpers({
  
  searchedText: function(){
    text = Session.get('searchedText');
    if (text&&text.length>0) {
      return true;
    } else{
      return false;
    }
  },

  matchesResults: function() {
    return MatchesSearch.getData({
      sort: {score: -1}
    });
  },
  
  isLoading: function() {
    return PlayersSearch.getStatus().loading;
  },
  
});

Template.matches.rendered = function () {
  //
};

Template.matches.events({
  //
  "keyup .search-box": _.throttle(function(e) {
    var text = $(e.target).val().trim();
    Session.set('searchedText', text);
    MatchesSearch.search(text);
  }, 200)
});


SearchSource.defineSource('players', function(searchText, options) {
  var options = {sort: {score: -1}, limit: 7};
  
  if(searchText) {
    var regExp = buildRegExp(searchText);
    var selector = {name: regExp};

    return Players.find(selector, options).fetch();
  } else {
    return Players.find({}, options).fetch();
  }
});

function buildRegExp(searchText) {
  // this is a dumb implementation
  var parts = searchText.trim().split(/[ \-\:]+/);
  return new RegExp("(" + parts.join('|') + ")", "ig");
}


SearchSource.defineSource('matches', function(searchText, options) {
  var options = {sort: {finishedAt: -1}, limit: 20};
  
  if(searchText) {
    var regExp = buildRegExp(searchText);
    var selector = {
      $and:[
        { $or: [ {"player1.name": regExp} , {"player2.name": regExp} ] },
        {finished:true}
      ]
    };
    return Matches.find(selector, options).fetch();
  } else {
    return Matches.find({finished:true}, options).fetch();
  }
});
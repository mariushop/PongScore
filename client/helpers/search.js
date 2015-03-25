var options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};

var playerFields = ['name', 'score'];
PlayersSearch = new SearchSource('players', playerFields, options);


var matchesFields = ['player1', 'player2'];
MatchesSearch = new SearchSource('matches', matchesFields, options);




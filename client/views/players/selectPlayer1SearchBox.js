//selectPlayer1SearchBox
Template.selectPlayer1SearchBox.created = function () {
  //
};

Template.selectPlayer1SearchBox.helpers({
  //
});

Template.selectPlayer1SearchBox.rendered = function () {
  //
};

Template.selectPlayer1SearchBox.events({
  "keyup .search-box": _.throttle(function(e) {
    var text = $(e.target).val().trim();
    PlayersSearch.search(text);
  }, 200)
});
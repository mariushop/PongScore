//selectPlayer2SearchBox
Template.selectPlayer2SearchBox.created = function () {
  //
};

Template.selectPlayer2SearchBox.helpers({
  //
});

Template.selectPlayer2SearchBox.rendered = function () {
  //
};

Template.selectPlayer2SearchBox.events({
  "keyup .search-box": _.throttle(function(e) {
    var text = $(e.target).val().trim();
    PlayersSearch.search(text);
  }, 200)
});
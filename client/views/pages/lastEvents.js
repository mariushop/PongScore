/* ---------------------------------------------------- +/

## lastEvents ##

Code related to the lastEvents template

/+ ---------------------------------------------------- */

Template.lastEvents.created = function () {
	//
};

Template.lastEvents.helpers({
	eventDate: function(){
    return moment(this.createdAt).fromNow(); 
  },
});

Template.lastEvents.rendered = function () {
  //
};

Template.lastEvents.events({
  //
});
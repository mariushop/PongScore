/* ---------------------------------------------------- +/

## Events ##

All code related to the Events collection goes here. 

/+ ---------------------------------------------------- */

Events = new Meteor.Collection('events');

// Allow/Deny

Events.allow({
  insert: function(userId, doc){
    return can.createEvent(userId);
  },
  update:  function(userId, doc, fieldNames, modifier){
    return can.editEvent(userId, doc);
  },
  remove:  function(userId, doc){
    return can.removeEvent(userId, doc);
  }
});

// Methods

Meteor.methods({
  createEvent: function(eventText, eventLink){
    user = Meteor.user();
    if(can.createEvent(Meteor.userId())){
      item={
        createdAt: new Date().getTime(),
        createdByName: "Anonymus user",
        createdByPhoto: "images/users/anonymus.png",
        createdById: null,
        link: eventLink,
        text: eventText
      };
      if (user!==null) {
        item.createdByName = user.profile.name;
        item.createdByPhoto = user.profile.profilePicture;
        item.createdById = user._id;
      }
      return Events.insert(item);
    }
  },
  removeEvent: function(item){
    if(can.removeEvent(Meteor.userId(), item)){
      Events.remove(item._id);
    }else{
      throw new Meteor.Error(403, 'You do not have the rights to delete this event.')
    }
  },
  editEvent: function(item, doc){
    if(can.editEvent(Meteor.userId()))
      Events.update(item._id, doc);
  },

});

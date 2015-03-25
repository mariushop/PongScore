/* ---------------------------------------------------- +/

## Notifications ##

All code related to the Notifications collection goes here. 

/+ ---------------------------------------------------- */

Notifications = new Meteor.Collection('notifications');

// Allow/Deny

Notifications.allow({
  insert: function(userId, doc){
    return can.createNotification(userId);
  },
  update:  function(userId, doc, fieldNames){
    return can.editNotification(userId, doc) && fieldNames.length === 1 && fieldNames[0]==='read';
  },
  remove:  function(userId, doc){
    return can.removeNotification(userId, doc);
  }
});

// Methods

Meteor.methods({
  createNotification: function(fromUserId, toPlayers, title, text, link){
    if(can.createNotification(Meteor.userId())){
        for (var i = toPlayers.length - 1; i >= 0; i--) {
          Notifications.insert({
          fromUserId: fromUserId,
          toUserId: toPlayers[i],
          createdAt: new Date().getTime(),
          link: link,
          title: title,
          content: text, 
          read: false
        });
      };
    }
  },
  removeNotification: function(item){
    if(can.removeNotification(Meteor.userId(), item)){
      Notifications.remove(item._id);
    }else{
      throw new Meteor.Error(403, 'You do not have the rights to delete this notification.')
    }
  },
  editNotification: function(item, doc){
    if(can.editNotification(Meteor.userId()))
      Notifications.update(item._id, doc);
  },

});

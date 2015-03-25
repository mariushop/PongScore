/* ---------------------------------------------------- +/

## Permissions ##

Permission checks

Usage:

if (can.editItem(Meteor.user(), myItem)){
  // do something  
}

/+ ---------------------------------------------------- */

can = {
  createPlayer: function (userId) {
    return true;
  },
  editPlayer: function (userId, item) {
    return userId === item._id;
  },
  removePlayer: function (userId, item) {
    return userId === item._id;
  },
  createMatch: function (userId) {
    return true;
  },
  editMatch: function (userId, item) {
    return true;
  },
  removeMatch: function (userId, item) {
    return true;
  },
  createEvent: function (userId) {
    return true;
  },
  editEvent: function (userId, item) {
    return true;
  },
  removeEvent: function (userId, item) {
    return true;
  },
  createNotification: function (userId) {
    return true;
  },
  editNotification: function (userId, item) {
    return userId === item.toUserId;
  },
  removeNotification: function (userId, item) {
    return true;
  }
}
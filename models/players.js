/* ---------------------------------------------------- +/

## Items ##

All code related to the Items collection goes here. 

/+ ---------------------------------------------------- */

Players = new Meteor.Collection('players');

// Allow/Deny

Players.allow({
  insert: function(userId, doc){
    return can.createPlayer(userId);
  },
  update:  function(userId, doc, fieldNames, modifier){
    return can.editPlayer(userId, doc);
  },
  remove:  function(userId, doc){
    return can.removePlayer(userId, doc);
  }
});

// Methods

Meteor.methods({
  createPlayer: function(player){
    if(can.createPlayer(Meteor.user()))
      Players.insert(player);
  },
  removePlayer: function(player){
    if(can.removePlayer(Meteor.user(), player)){
      Players.remove(player._id);
    }else{
      throw new Meteor.Error(403, 'You do not have the rights to delete this player.')
    }
  },
  updatePlayer: function(player, setter){
    new_name = setter.name;
    if(can.editPlayer(Meteor.userId(), player)){
      Meteor.users.update(player._id, {
        $set: { "profile.name": new_name}
      });
      return Players.update(player._id,{$set:setter});
    }else{
      throw new Meteor.Error(403, 'You do not have the rights to edit this content.')
    }
  },
  editPlayer: function(player, doc){
    if(can.updatePlayer(Meteor.user()))
      Players.update(player._id, doc);
  }
});

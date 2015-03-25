Template.notifications.helpers({
  notifications: function() {
    return Notifications.find({toUserId: Meteor.userId(), read: false});
  },
  notificationCount: function(){
      return Notifications.find({toUserId: Meteor.userId(), read: false}).count();
  }
});



//template notificationItem
Template.notificationItem.helpers({
  // notificationPostPath: function() {
  //   return Router.routes.postPage.path({_id: this.postId});
  // },
  notificationDate:function(createdAt){
    return moment(createdAt).format('MMMM D, HH:mm');
  },
});

Template.notificationItem.events({
  'click a': function() {
    Notifications.update(this._id, {$set: {read: true}});
  }
});
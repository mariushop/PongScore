Meteor.startup(function () {
  smtp = {
  	//PLEASE EDIT THIS TO MATCH YOUR SETTINGS
    username: '',   // eg: server@gentlenode.com
    password: '',   // eg: 3eeP1gtizk5eziohfervU
    server:   '',  // eg: mail.gandi.net
    port: 465
  }
  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});

//FACEBOOK
configureFacebook = function(config) {
    ServiceConfiguration.configurations.remove({
        service: 'facebook'
    });
     
    ServiceConfiguration.configurations.insert({
        service: 'facebook',
        appId: config.clientId,
        secret: config.secret
    });
};
// set the settings object with meteor --settings private/settings-local.json
var facebookConfig = Meteor.settings.facebook;
if(facebookConfig) {
    // console.log('Got settings for facebook', facebookConfig)
    configureFacebook(facebookConfig);
};



//TWITTER
configureTwitter = function(config) {
    ServiceConfiguration.configurations.remove({
        service: 'twitter'
    });
     
    ServiceConfiguration.configurations.insert({
        service: 'twitter',
        consumerKey: config.clientId,
        secret: config.secret
    });
}
// set the settings object with meteor --settings private/settings-local.json
var twitterConfig = Meteor.settings.twitter;
if(twitterConfig) {
    // console.log('Got settings for twitter', twitterConfig)
    configureTwitter(twitterConfig);
};

//GOOGLE
//for google we don't really need a switch, since google accespts multiple url's as app's domain, but will add it anyway (keeping the same clientId and secret in settings files)
configureGoogle = function(config) {
    ServiceConfiguration.configurations.remove({
        service: 'google'
    });
     
    ServiceConfiguration.configurations.insert({
        service: 'google',
        clientId: config.clientId,
        secret: config.secret
    });
}
// set the settings object with meteor --settings private/settings-local.json
var googleConfig = Meteor.settings.google;
if(googleConfig) {
    // console.log('Got settings for google', googleConfig)
    configureGoogle(googleConfig);
};















// ServiceConfiguration.configurations.remove({
//     service: "github"
// });

// ServiceConfiguration.configurations.insert({
//     service: 'github',
//     clientId: '54c4cb6f681dc663c72c',
//     secret: '03fc8775438a425c0c475f7a33d77099accb9667'
// });



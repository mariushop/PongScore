# PongScore
Simple score-keeping app made with Meteor

Note that:
 - the app doesn't send an email to confirm new users email. If you want to, switch sendVerificationEmail to "true" in server/accounts-config.js;
 - for using social logins and disqus feature, please configure your app details in private/local-settings.json and private/production-settings.json, the start your app with "meteor --settings private/local-settings.json" for local development and use "meteor deploy yourappnamehere.meteor.com --settings private/production-settings.json" for production;
 - the app adds a admin account if there's no users in the database. You can configure the details of this accounts in server/helpers.js.
 
 Thanks!
 

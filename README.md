# PongScore
Simple score-keeping app made with Meteor.

Note that:
 - the app doesn't send an email to confirm new users email. If you want to, switch sendVerificationEmail to "true" in server/accounts-config.js;
 - for using social logins and disqus feature, please configure your app details in private/local-settings.json and private/production-settings.json, the start your app with "meteor --settings private/local-settings.json" for local development and use "meteor deploy --settings private/production-settings.json yourappnamehere.meteor.com" for production;
 - the app adds an admin account if there's no users in the database. You can configure the details of this account in server/helpers.js.

##Packages used:
 - accounts-facebook          1.0.4  Login service for Facebook accounts
 - accounts-github            1.0.4  Login service for Github accounts
 - accounts-google            1.0.4  Login service for Google accounts
 - accounts-password          1.1.0  Password support for accounts
 - accounts-twitter           1.0.4  Login service for Twitter accounts
alanning:roles             1.2.13  Role-based authorization
email                      1.0.6  Send email messages
iron:router                1.0.7  Routing specifically designed for Meteor
kevohagan:sweetalert       0.4.2  a beautiful replacement for javascript's al...
linto:fontawesome          4.2.6  fontawesome 4.2.0 re-packaged for meteorjs
meteor-platform            1.2.2  Include a standard set of Meteor packages i...
meteorhacks:search-source  1.2.0  Reactive Data Source for Search
mizzao:user-status         0.6.4  User connection and idle state tracking for...
mrt:moment                 2.8.1  Moment.js, a JavaScript date library for da...
msavin:mongol              1.0.2* The insanely handy development package for ...
obvio171:disqus            1.0.0  Disqus package. Add {{>disqus}} to template...
pcuci:bootcards            1.0.0_6  A cards-based UI with dual-pane capabilit...
sacha:spin                 2.0.4  Simple spinner package for Meteor
service-configuration      1.0.4  Manage the configuration for third-party se...
twbs:bootstrap             3.3.4  The most popular front-end framework for de...


 Thanks!
 


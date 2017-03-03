// Requirements
var restify = require('restify');
var builder = require('botbuilder');

// Setup restify server
var server = restify.createServer();
server.listen(process.env.PORT || 3000, 
    function()
    {
        console.log('%s listening to %s', server.name, server.url);
    }
);

// Create chat bot
var connector = new builder.ChatConnector({ appId:'092cb0ca-92a9-461a-9103-97ac45363ca9', appPassword: 'axZjyVtLPyzRYADBjtKFcDy' });
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// Create bot dialogs
// bot.dialog('/', [
//     function (session, args, next) {
//         if (!session.userData.name) {
//             session.beginDialog('/profile');
//         } else {
//             next();
//         }
//     },
//     function (session, results) {
//         session.send('Hello %s!', session.userData.name);
//     }
// ]);

var intents = new builder.IntentDialog();
bot.dialog('/', intents);

intents.matches(/^change name/i, [
    function (session) {
        session.beginDialog('/profile');
    },
    function (session, results) {
        session.send('Ok... Changed your name to %s', session.userData.name);
    }
]);

intents.onDefault([
    function (session, args, next) {
        if (!session.userData.name) {
            session.beginDialog('/profile');
        } else {
            next();
        }
    },
    function (session, results) {
        session.send('Hello %s!', session.userData.name);
    }
]);

bot.dialog('/profile', [
    function (session) {
        builder.Prompts.text(session, 'Hi! What is your name?');
    },
    function (session, results) {
        session.userData.name = results.response;
        session.endDialog();
    }
]);
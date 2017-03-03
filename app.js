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
bot.dialog('/', [
    function(session)
    {
        builder.Prompts.text(session, 'Hi! What is your name?');
    }
     function (session, results) 
     {
        session.send('Hello %s!', results.response);
    }
]);
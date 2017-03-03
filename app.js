// Requirements
var restify = require('restify');
var builder = require("botbuilder");

// Setup restify server
var server = restify.createServer();
server.listen(process.env.PORT || 3000, 
    function()
    {
        console.log('%s listening to %s', server.name, server.url);
    }
);

// Create chat bot
var connector = new builder.ChatConnector({ appId: 'appid', appPassword: 'password' });
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// Create bot dialogs
bot.dialog('/', function(session)
{
    session.send('hello world');
});
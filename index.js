var restify = require('restify');
var builder = require('botbuilder');

function respond(req, res, next) {
  res.send('hello ');
  next();
}

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

server.get('/', respond);

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    /*
    Ben: Hello, Eigor
    Eigor: Hey, buddy. How can I help you today?
    Ben: Just checking, do we have data for employee's profiles?
    Eigor: Em, let me check the data lake … Yes, we have hr_profile for US and hr_employee_skills for UK. But it contains PII sensitive information that you can’t use . You can find more information about this here about using anoymonized data.
    Ben: Got it, do we have data for employee holiday hours?
    Eigor: Let me check the data lake … Yes, we have hr_employee_holiday_remain_hours data for UKI, but the GPDR policy is very restricted for using the Europe data.
    Ben: Who is the owner of the US data?
    Eigor: The data owner is marissa.heather.
    Ben: Can I get sample data?
    Eigor: Yes, we have sample data. But in our system, it shows that you haven't got approval yet. Here is the link to get approval. You can come back to me after you get approved. Then we can send you link to download data.
    Ben: Will do. Thank you.
    */
     console.log(session.message.text)
    if (session.message.text == 'Hello') {
        session.send("Hey buddy. How can I help you today?");
    }
    else if (session.message.text == 'Just checking, do we have data for employee\'s profiles?') {
        session.send("Em, let me check the data lake …");
        setTimeout(function() {
            session.send("Yes, we have hr_profile for US and hr_employee_skills for UK. But it contains PII sensitive information that you can't use. You can find more information about this here about using anoymonized data.")
        }, 1000);
    }
    else if (session.message.text == "Got it, do we have data for employee holiday hours?") {
        session.send("Let me check the data lake …");
        setTimeout(function() {
            session.send("Yes, we have hr_employee_holiday_remain_hours data for UKI, but the GPDR policy is very restricted for using the Europe data.")
        }, 1000);
    }
    else if (session.message.text == "Who is the owner of the US data?") {
        session.send("The data owner is marissa.heather.");
    }
    else if (session.message.text == "Can I get sample data?") {
        session.send("Yes, we have sample data. But in our system, it shows that you haven't got approval yet. Here is the link to get approval. You can come back to me after you get approved. Then we can send you link to download data.");
    }
    else if (session.message.text == "Will do. Thank you.") {
        session.send("No problem!");
    }
    else {
        session.send("Eigor did not understand the request");
    }
});




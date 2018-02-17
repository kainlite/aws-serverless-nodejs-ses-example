var aws = require('aws-sdk');
var ses = new aws.SES({
   region: 'us-east-1'
});

module.exports.handler = function(event, context) {
    console.log("Incoming: ", event);
    // var output = querystring.parse(event);

    var eParams = {
        Destination: {
            ToAddresses: ["kainlite@gmail.com"]
        },
        Message: {
            Body: {
                Text: {
                   Data: "The message is: " + event.body.message
                }
            },
            Subject: {
               Data: "Respond to: " + event.body.email
            }
        },
        Source: "kainlite@gmail.com"
    };

    console.log('===SENDING EMAIL===');
    var email = ses.sendEmail(eParams, function(err, data){
       if(err) {
          console.log(err);
          context.fail(err);
       } else {
            console.log("===EMAIL SENT===");
            console.log("EMAIL CODE END");
            console.log('EMAIL: ', email);
            console.log(data);
            context.succeed(event);
        }
    });

};

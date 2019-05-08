function main(params) {

    var request = require('request');
    var searchTerm = "";
    var returnObject = {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        body: ""
    };

    /* handle the challenge */
    if (params.challenge) {

        
        returnObject.body = new Buffer(JSON.stringify({
            "challenge": params.challenge
        })).toString('base64');

        return returnObject;

    } else if (params.event["com.adobe.mcloud.pipeline.pipelineMessage"]["com.adobe.mcloud.protocol.trigger"].enrichments.analyticsHitSummary.dimensions.prop11.data) {

        searchTerm = params.event["com.adobe.mcloud.pipeline.pipelineMessage"]["com.adobe.mcloud.protocol.trigger"].enrichments.analyticsHitSummary.dimensions.prop11.data[0];
        returnObject.body = searchTerm;
        var options = {
            url: "https://hooks.slack.com/services/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",
            json: true,
            body: {
                "text": searchTerm
            }
        }

        request.post(options, function(error, response, body) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            
        });
        return returnObject;
        // do stuff with your event!

    }

}
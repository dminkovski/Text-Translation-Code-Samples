/* This simple app uses the '/translate' resource to translate text from
one language to another. */

/* This template relies on the request module, a simplified and user friendly
way to make HTTP requests. */
const request = require('request');
const { v4: uuidv4 } = require('uuid');

var key_var = 'TRANSLATOR_TEXT_RESOURCE_KEY';
if (!process.env[key_var]) {
    throw new Error('Please set/export the following environment variable: ' + key_var);
}
var resourceKey = process.env[key_var];

var endpoint_var = 'TRANSLATOR_TEXT_ENDPOINT';
if (!process.env[endpoint_var]) {
    throw new Error('Please set/export the following environment variable: ' + endpoint_var);
}
var endpoint = process.env[endpoint_var];

var region_var = 'TRANSLATOR_TEXT_REGION';
if (!process.env[region_var]) {
    throw new Error('Please set/export the following environment variable: ' + region_var);
}
var region = process.env[region_var];

/* If you encounter any issues with the base_url or path, make sure that you are
using the latest endpoint: https://docs.microsoft.com/azure/cognitive-services/translator/reference/v3-0-translate */
function translateText(){
    let options = {
        method: 'POST',
        baseUrl: endpoint,
        url: 'translate',
        qs: {
          'api-version': '3.0',
          'to': ['de', 'it']
        },
        headers: {
          'Ocp-Apim-Subscription-Key': resourceKey,
          'Ocp-Apim-Subscription-Region': region,
          'Content-type': 'application/json',
          'X-ClientTraceId': uuidv4()
        },
        body: [{
              'text': 'Hello World!'
        }],
        json: true,
    };

    request(options, function(err, res, body){
        console.log(JSON.stringify(body, null, 4));
    });
};

// Call the function to translate text.
translateText();

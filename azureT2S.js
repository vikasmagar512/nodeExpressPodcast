// Requires request for HTTP requests
const request = require('request');
// Requires fs to write synthesized speech to a file
const fs = require('fs');
// Requires readline-sync to read command line inputs
const readline = require('readline-sync');
// Requires xmlbuilder to build the SSML body
const xmlbuilder = require('xmlbuilder');

//https://azure.microsoft.com/en-us/try/cognitive-services/my-apis/?apiSlug=speech-services&country=India&allowContact=true&fromLogin=True
// End point: https://westus.api.cognitive.microsoft.com/sts/v1.0
const key1="c6996c07fbf54d82bb2756d3424c2b2b"
const key2= "90b50fcc539c4976a30744fcaaf32a4b"

// https://portal.azure.com/#@Inteliment.com/resource/subscriptions/222dd4a2-6898-4a55-ae41-3a74023f06e6/resourceGroups/voxsnap/providers/Microsoft.CognitiveServices/accounts/voxsnap/keys
// const key1="4ff1c8884ec4450ab55f8284b886b689"
// const key2="c6d5b98a05174d858ad78d194e570687"
const key = key2

function textToSpeech(subscriptionKey, saveAudio) {
    let options = {
        method: 'POST',
        uri: 'https://westus.api.cognitive.microsoft.com/sts/v1.0/issueToken',
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey
        }
    };
    // This function retrieve the access token and is passed as callback
    // to request below.
    function getToken(error, response, body) {
        console.log("Getting your token...\n")
        if (!error && response.statusCode == 200) {
            //This is the callback to our saveAudio function.
            // It takes a single argument, which is the returned accessToken.
            saveAudio(body)
        }
        else {
            throw new Error(error);
        }
    }
    request(options, getToken)
}
// Make sure to update User-Agent with the name of your resource.
// You can also change the voice and output formats. See:
// https://docs.microsoft.com/azure/cognitive-services/speech-service/language-support#text-to-speech
function saveAudio(accessToken) {
    const text = "The fault, dear Brutus, is not in our stars, But in ourselves, that we are underlings.";

    // Create the SSML request.
    let xml_body = xmlbuilder.create('speak')
        .att('version', '1.0')
        .att('xml:lang', 'en-us')
        .ele('voice')
        .att('xml:lang', 'en-us')
        .att('name', 'Microsoft Server Speech Text to Speech Voice (en-US, Guy24KRUS)')
        .txt(text)
        .end();
    // Convert the XML into a string to send in the TTS request.
    let body = xml_body.toString();

    let options = {
        method: 'POST',
        baseUrl: 'https://westus.tts.speech.microsoft.com/',
        url: 'cognitiveservices/v1',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'cache-control': 'no-cache',
            'User-Agent': 'voxsnap',
            'X-Microsoft-OutputFormat': 'riff-24khz-16bit-mono-pcm',
            'Content-Type': 'application/ssml+xml'
        },
        body: body
    };
    // This function makes the request to convert speech to text.
    // The speech is returned as the response.
    function convertText(error, response, body){
        if (!error && response.statusCode == 200) {
            console.log("Converting text-to-speech. Please hold...\n")
        }
        else {
            throw new Error(error);
        }
        console.log("Your file is ready.\n")
    }
    // Pipe the response to file.
    request(options, convertText).pipe(fs.createWriteStream('sample.wav'));
}
// Start the sample app.
textToSpeech(key, saveAudio);
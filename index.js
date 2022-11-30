const express = require("express");
const Joi = require("joi"); //used for validation
const app = express();
app.use(express.json());
let http = require('http');
let f_s = require('fs');
app.use(express.static('./public'));


const textToSpeech = require('@google-cloud/text-to-speech')

require("dotenv").config()

const fs = require('fs');
const util = require('util');
// Creates a client
const client = new textToSpeech.TextToSpeechClient();

app.get("/", (req, res) => {
  res.download("/Users/ck/Documents/nodeJs/text_to_speech/output.mp3");
});

async function convertTextToM3(text){
    const request = {
      input: {text: text},
      // Select the language and SSML voice gender (optional)
      voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL',name:'en-GB-Standard-A'},
      // select the type of audio encoding
      audioConfig: {audioEncoding: 'MP3'},
    };
  
    // Performs the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);
    // Write the binary audio content to a local file
    const writeFile = util.promisify(fs.writeFile);
    await writeFile('./public/output.mp3', response.audioContent, 'binary');
    console.log('Audio content written to file: output.mp3');
  }

//CREATE Request Handler
app.post("/api/tts", async (req, res) => {
  await convertTextToM3(req.body.text)
  res.send({"status":"success"});
});

//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}..`));


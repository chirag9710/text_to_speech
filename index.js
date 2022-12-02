const express = require("express");
const Joi = require("joi"); //used for validation
let http = require('http');
let f_s = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const textToSpeech = require('@google-cloud/text-to-speech')
const fs = require('fs');
const util = require('util');
require("dotenv").config()
const helmet = require('helmet');

const app = express();

app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(express.static('./public'));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
http.Server(app);

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
app.get("/api/tts", async (req, res) => {
  console.log(req.query.text)
  await convertTextToM3(req.query.text)
  res.send(JSON.stringify({"status":"success"}));
});



//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}..`));


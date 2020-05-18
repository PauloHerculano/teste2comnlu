const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const express = require('express');
const bodyParser = require('body-parser');

var app = express();
var content;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS, PUSH, LISTEN"
    );
    next();
  });

app.get('/nlu', async function (req, res) {
  content = req.query.text;
  var result = await analyzer(content);
  res.send(result);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2019-07-12',
  authenticator: new IamAuthenticator({
    apikey: 'IMinyq6Z_c_7CebAulM_Mi4fP7JDbMUr5g8hWQYZx_kR',
  }),
  url: 'https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/699e499c-020f-441c-8fc9-693b902b0325',
});

async function analyzer(content){
var cont = content;
var res = "Erro";
const analyzeParams = {
  'features': {
        'sentiment': {
      'targets': [
        'nba'
      ]
    'relations': {}
      
  },
  'text': cont
};

await naturalLanguageUnderstanding.analyze(analyzeParams)
  .then(analysisResults => {

    res = JSON.stringify(analysisResults, null, 2);

  })
  .catch(err => {

    console.log('error:', err);
  });
return res;
}

const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
var express = require('express');
var cors = require('cors')
var app = express();
var content;

app.get('/nlu', cors(corsOptionsDelegate), async function (req, res) {
  content = req.query.text;
  var result = await analyzer(content);
  res.send(result);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

var whitelist = ['http://localhost:4200', 'http://example2.com']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

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

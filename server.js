// server.js file that takes an arbitrary port number as a command line argument (i.e. I should be able to run it with node server.js. The port should default to 5000 if no argument is given.

// Require Express.js
import express from 'express';
const app = express()
import { argv as args } from 'yargs';


// define port variable
const port = args.port;

if(args.port == 'undefined'){
  port = 5000;
}
// Start an app server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',port))
});

// Check endpoint at /app/ that returns 200 OK.
app.get('/app/', (req, res) => {
// Respond with status 200
	res.status = 200;
// Respond with status message "OK"
    res.statusMessage = 'OK';
    res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
    res.end(res.statusCode+ ' ' +res.statusMessage)
});

function coinFlip() {
    var coin = ["heads", "tails"];
    return coin[Math.floor(Math.random()*coin.length)];
  }
// Endpoint /app/flip/ that returns JSON {"flip":"heads"}
// or {"flip":"tails"} corresponding to the results of the random coin flip.
app.get('/app/flip', (req, res) => {
    res.status(200).json({'flip' : coinFlip()})
    res.type("text/plain")
});

function coinFlips(flips) {
    var i = 0;
    var results = new Array();
    while (i < flips) {
      results[i] = coinFlip();
      i++;
    }
    return results;
}

function countFlips(array) {
    if(array.length == 0){
      return;
    }
    var heads = 0;
    var tails = 0;

    for(var i = 0; i < array.length; i++){
      if(array[i] == "heads"){
        heads++;
      }
      else if(array[i] == "tails"){
        tails++;
      }
    }
    if(heads == 0){
      return "{ tails: "+tails+" }";
    }
    else if(tails == 0){
      return "{ heads: "+heads+" }";
    }
    return "{ heads: "+heads+", tails: "+tails+" }";
}

// Endpoint /app/flips/:number that returns JSON including an array of the raw random flips and a summary.
app.get('/app/flips/:number', (req, res) => {
    const flips = coinFlips(req.params.number)
    res.status(200).json({"raw": flips,"summary": countFlips(flips)})
    res.type("text/plain")
});

function flipACoin(call) {
    var flip = coinFlip();
    var result = "";
    if(call == flip){
      result = "win";
    }
    else{
      result = "lose";
    }
    return "{ call: "+call+", flip: "+flip+", result: "+result+" }";
}

// Endpoint /app/flip/call/heads that returns the result of a random flip match against heads or tails as JSON.
app.get('/app/flip/call/:call', (req, res) => {
    res.status(200).json(flipACoin(req.params.call))
    res.type("text/plain")
});


// Default API endpoint that returns 404 Not found for any endpoints that are not defined.
app.use(function(req, res){
  res.status(404).send('404 NOT FOUND')
  res.type("text/plain")
});

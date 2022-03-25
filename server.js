// server.js file that takes an arbitrary port number as a command line argument (i.e. I should be able to run it with node server.js. The port should default to 5000 if no argument is given.



//     Endpoint /app/flips/:number that returns JSON including an array of the raw random flips and a summary. Example below.
//     Endpoint /app/flip/call/heads that returns the result of a random flip match against heads as JSON.
//     Endpoint /app/flip/call/tails that returns the result of a random flip match against tails as JSON.
//     ALL endpoints should return HTTP headers including a status code and the appropriate content type for the response.
//     All of this should be in a Node package with "main" set to server.js.
//     The test script defined in package.json should be set to "node server.js --port=5555"




// Require Express.js
const express = require('express')
const app = express()

// Start an app server
const server = app.listen(HTTP_PORT, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',HTTP_PORT))
});

// Default API endpoint that returns 404 Not found for any endpoints that are not defined.
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});

// Check endpoint at /app/ that returns 200 OK.
app.get('/app/', (req, res) => {
// Respond with status 200
	res.statusCode = 200;
// Respond with status message "OK"
    res.statusMessage = 'OK';
    res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
    res.end(res.statusCode+ ' ' +res.statusMessage)
});


// Endpoint /app/flip/ that returns JSON {"flip":"heads"}
// or {"flip":"tails"} corresponding to the results of the random coin flip.
app.get('/app/flip/:number', (req, res) => {
    const flips = manyflips(req.params.number)
	//Some
	//expressions
	//go
	//here
});


app.get('/app/flips/:number', (req, res) => {
    const flips = manyflips(req.params.number)
	//Some
	//expressions
	//go
	//here
});
var http = require('http');

var express = require('express');
var app = express();

const port = 2001

var Chance = require('chance');
var chance = new Chance();
var roll = chance.d20()
var no = 0

var no_of_attempts = 0;
var attempts = [];
var Answer = ""

app.use(express.static('public'));

app.get('/play', function(request, response){
	console.log("Got a request !")
	console.log(request.query)
	no = request.query.number
	attempts.push(no)
	no_of_attempts++
	if(no == roll)
	{
		response.json({
			no_of_attempts : no_of_attempts,
			attempts
		})
	}
	else
	{
		if(no > roll)
		{
			Answer = "Try lower..."
		}
		if(no < roll)
		{
			Answer = "Try Higher..."
		}
		response.send(`<html>
						<head>
							<title>GuessTheNumber</title>
						</head>
						<body>
							<p>${Answer}</p>
							<form action="play" method="get">
								<input type="number" id="number" name="number" value=0><br>
								<input type="submit" id="submit" value="Submit">
							</form>
						</body>
					</html>`
					)
	}
})

app.get('/', function(request, response){
	response.sendfile('guessTheNumber.html')
})

app.listen(port, () => {console.log(`Accepting HTTP requests on port ${port}`)
	console.log(`rolled a ${roll}`)})
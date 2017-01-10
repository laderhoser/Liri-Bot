//My dependancies

var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request')
var fs = require('fs');


//Placed my keys in separate gitignore file for security on github
var temp = require('./keys.js');



var client = new Twitter(temp.twitterKeys);



inputString1 = process.argv[2]
value = process.argv[3]

var spotify = function() {
    if (value == null) {
        value = "ace of base the sign";
    }

    request('https://api.spotify.com/v1/search?q=' + value + '&type=track', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            data = JSON.parse(body);
            console.log(' ');
            console.log('Artist: ' + data.tracks.items[0].artists[0].name);
            console.log('Song: ' + data.tracks.items[0].name);
            console.log('Preview Link: ' + data.tracks.items[0].preview_url);
            console.log('Album: ' + data.tracks.items[0].album.name);
            console.log(' ');
            ;
        };
    })

}




//Tweets input

if (inputString1 == "my-tweets") {
    var params = {
        screen_name: 'choochee1234',
        count: 20
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++) {
                var number = i + 1;
                console.log(' ');
                console.log([i + 1] + '. ' + tweets[i].text);
                console.log('Created on: ' + tweets[i].created_at);
                console.log(' ')
            }
        };
    })

//Spotify input

} else if (inputString1 == 'spotify-this-song') {

spotify();

 
  //  OMDBapi input

} else if (inputString1 == 'movie-this') {
    
    if (value == null) {
        value = 'Mr Nobody';
    }
    

    request('http://www.omdbapi.com/?t=' + value + '&tomatoes=true&r=json', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            jsonBody = JSON.parse(body);
            console.log(' ');
            console.log('Title: ' + jsonBody.Title);
            console.log('Year: ' + jsonBody.Year);
            console.log('IMDb Rating: ' + jsonBody.imdbRating);
            console.log('Country: ' + jsonBody.Country);
            console.log('Language: ' + jsonBody.Language);
            console.log('Plot: ' + jsonBody.Plot);
            console.log('Actors: ' + jsonBody.Actors);
            console.log('Rotten Tomatoes Rating: ' + jsonBody.tomatoRating);
            console.log('Rotten Tomatoes URL: ' + jsonBody.tomatoURL);

        }

    })

} else if (inputString1 == 'do-what-it-says') {
	fs.readFile('random.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  } else {
  	var dataArr = data.split(',');

  	inputString1 = dataArr[0] 
  	value = dataArr[1]

  	spotify(inputString1, value);


  }
  
});
}

//Delault case
else {
	console.log('Liri doesnt know that.')
}



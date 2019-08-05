/**
 * An express application which serves root route and provides an API to get current ISS coordinates in GeoJSON format.
 */

const request = require('request'),
    geojson = require('geojson'),
    express = require('express'),
    path = require('path');

const ISS_URL = "https://api.wheretheiss.at/v1/satellites/25544";

const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

const sendFileFunction = (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
}

app.get('/', sendFileFunction());

app.get('/findiss', function (req, res) {
    request(ISS_URL, function (err, resp, body) {
        if (err) {
            console.log(err);
            res.status(400).json({error: 'Unable to contact ISS API'});
            return;
        }

        const apiResponse = JSON.parse(body);
        const issGeoJSON = geojson.parse([apiResponse], {Point: ['latitude', 'longitude']});

        res.json(issGeoJSON);
    });
});

app.listen(app.get('port'), function () {
    console.log("App listening on port " + app.get('port'));
});
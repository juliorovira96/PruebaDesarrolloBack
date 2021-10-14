const express = require('express');
const app = express();
const request = require('request');
const async = require('async');
const bodyParser = require('body-parser')
const port = process.env.PROT || 8010

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/proximas', (req, res) => {
    async.times(4, (i, callback) => {
        var options = {
            url: 'https://api.themoviedb.org/3/movie/upcoming?api_key=f99ede0f6a3e9cb702422be3a84b9c7b&language=en-US&page=1',
            qs: {
                'language': 'en-US',
                'page': i+1,
                'region': 'us'
            },
        }
        request(options, (error, response, body) => {
            var result = JSON.parse(body)
            var data = result.results;
            callback(null, data);
        });
        }, (err, results) => {
            res.json(results);
    });
})

app.get('/generos', (req, res) => {
    async.times(1, (i, callback) => {
        var options = {
            url: 'https://api.themoviedb.org/3/genre/movie/list?api_key=f99ede0f6a3e9cb702422be3a84b9c7b&language=en-US',
            qs: {
                'language': 'en-US',
                'page': i+1,
                'region': 'us'
            },
        }
        request(options, (error, response, body) => {
            var result = JSON.parse(body)
            var data = result;
            callback(null, data);
        });
        }, (err, results) => {
            res.json(results);
    });
})

app.listen(port, () => {
    console.log('Connection Successful');
})
const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
app.locals.moment = require('moment');
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/ContributionTemplatesDatabase', {useNewUrlParser: true});
const port = 80;

app.use('/static', express.static('static'));
app.use(express.urlencoded());


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

var ContributeSchema = new mongoose.Schema({
    name: String,
    email: String,
    topic: String,
    code: String,
});

var ContributeSchemaModel = mongoose.model('ContributionTable', ContributeSchema);

app.get('/', function (req, res) {
    const params = {}
    res.status(200).render('home.pug', params);
});

app.get('/contribute', function (req, res) {
    const params = {}
    res.status(200).render('contribute.pug', params);
});

app.post('/contribute', function (req, res) {
    var ContributionData = new ContributeSchemaModel(req.body);
    ContributionData.save().then(()=>{
        res.send("Thank you so much for your contribution, our team panel will soon review your code and get back to you at the earliest");
    }).catch(()=>{
        res.status(404).send("We are really sorry. Your response could not be saved in our database");
    })
});

app.get('/about', function (req, res) {
    const params = {}
    res.status(200).render('about.pug', params);
});

app.get('/explore', function (req, res) {
    const params = {}
    res.status(200).render('explore.pug', params);
});

app.get('/explore/minimumandmaximumspanningtree', function (req, res) {
    const params = {}
    res.status(200).render('algospanningtree.pug', params);
});

app.get('/explore/dijkstraalgorithmwithmultipleedges', function (req, res) {
    const params = {}
    res.status(200).render('algodijkstra.pug', params);
});

app.listen(port, function () {
    console.log(`Listening at port ${port}`);
});
/*
 * Serve JSON to our AngularJS client
 */

var _ = require('underscore');

var database = {
    "debates": [{
        "id" : 0,
        "title": "Should guns be legal in the US?",
        "text": "I've always wondered whether guns should be legal in the United States"
    }],
    
    "responses" : [
        {
          "debateId" : 0,
          "user" : "John",
          "text" : "Yes!  I need my shotgun",
          "isYay" : true
        },
        {
          "debateId" : 0,
          "user" : "Joe",
          "text" : "No! People don't kill people, guns do!",
          "isYay" : false
        },
        {
          "debateId" : 0,
          "user" : "Charlie",
          "text" : "Hell yes",
          "isYay" : true
        },
        {
          "debateId" : 99,
          "user" : "FAKE",
          "text" : "FAKE FAKE FAKE",
          "isYay" : true
        }
    ]
};

exports.getAllDebates = function(req, res) {
    var debates = [];
    database.debates.forEach(function(debate) {
        var postText = debate.text;
        if (postText.length > 50) {
            postText = postText.substr(0, 47) + '...';
        }

        debates.push({
            id: debate.id,
            title: debate.title,
            text: postText,
            yayCount: _.where(database.responses, {isYay: true, debateId: debate.id }).length,
            nayCount: _.where(database.responses, {isYay: false, debateId: debate.id }).length
        });
    });
    res.json({
        debates: debates
    });
};

exports.readDebate = function(req, res) {
    var dId = req.params.id;
    var debate = _.find(database.debates, function(debate) { return debate.id == dId});
    if (dId >= 0 && debate !== typeof('undefined')) {
        var responses = _.where(database.responses, {debateId: debate.id});
        res.json({
            debate: debate,
            responses: responses
        });
    }
    else {
        res.json(false);
    }
};

exports.addDebate = function(req, res) {
    var nextId = _.max(database.debates, function(debate) { return debate.id; }).id + 1;
    var newDebate = {
     "id" : nextId,
     "title" : req.body.title,
     "text" : req.body.text
    };
    database.debates.push(newDebate);
    res.json(newDebate);
};

exports.addDebateResponse = function(req, res) {
    var debate = _.find(database.debates, function(debate) {
        return debate.id == req.params.id;
    });
    if (req.params.id >= 0 && debate !== typeof('undefined') && req.body.user && req.body.text) {
        var newResponse = {
            "debateId": debate.id,
            "user": req.body.user,
            "text": req.body.text,
            "isYay": req.body.isYay
        };
        database.responses.push(newResponse);
        res.json(debate);
    }
    else {
        console.log('invalid parameters received for adding a debate response');
        res.json(false);
    }
};
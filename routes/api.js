/*
 * Serve JSON to our AngularJS client
 */

var database = {
    "posts": [{
        "title": "Foobar",
        "text": "BAZ BAT"
    }]
};

exports.posts = function(req, res) {
    var posts = [];
    database.posts.forEach(function(post, i) {
        var postText = post.text;
        if (postText.length > 50) {
            postText = postText.substr(0, 47) + '...';
        }

        posts.push({
            id: i,
            title: post.title,
            text: postText
        });
    });
    res.json({
        posts: posts
    });
};

exports.post = function(req, res) {
    var id = req.params.id;
    if (id >= 0 && id < database.posts.length) {
        res.json({
            post: database.posts[id]
        });
    }
    else {
        res.json(false);
    }
};

// POST
exports.addPost = function(req, res) {
    database.posts.push(req.body);
    res.json(req.body);
};

// PUT
exports.editPost = function(req, res) {
    var id = req.params.id;

    if (id >= 0 && id < database.posts.length) {
        database.posts[id] = req.body;
        res.json(true);
    }
    else {
        res.json(false);
    }
};

// DELETE
exports.deletePost = function(req, res) {
    var id = req.params.id;

    if (id >= 0 && id < database.posts.length) {
        database.posts.splice(id, 1);
        res.json(true);
    }
    else {
        res.json(false);
    }
};
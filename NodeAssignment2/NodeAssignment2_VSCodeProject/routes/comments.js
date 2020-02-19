// Using { mergeParams: true } to include params via routers from app.js. 
// If not used, postId will not be available in comments module
const router = require("express").Router({ mergeParams: true });
const fs = require('fs');

// Get AllComments. It calls getComments() to perform action.
router.get("/:commentId", (req, res) => getComments(req, res))

// Add comment. It calls addComment() to perform action.
router.post("/", (req, res) => addComment(req, res))

// Update comment. It calls addComment() to perform action.
router.put("/:commentId", (req, res) => updateComment(req, res))

// delete one comment. It calls removeComment() to perform action.
router.delete("/:commentId", (req, res) => removeComment(req, res))


////////////////////////   Core Functionality //////////////////////////////

// Get all Comments from respective Post
function getComments(req, res) {
    console.log("getComments started");
    try {
        let newComment = req.body;
        let posts = fs.readFileSync('./Data/Post.json');
        let jsonPost = JSON.parse(posts);

        let postId = req.params.postId;
        console.log(postId);
        let comments = "";
        jsonPost.forEach((post, index) => {
            if (postId == (index + 1)) {
                console.log(post.comments);
                comments = post.comments;
            }
        });
        res.send(comments);
    }
    catch{
        res.status(500).send("Bad request!!");
    }
}

// Adds one comments to post.
function addComment(req, res) {
    try {
        let newComment = req.body;
        let posts = fs.readFileSync('./Data/Post.json');
        let jsonPost = JSON.parse(posts);

        let postId = req.params.postId;
        let comments = [];

        jsonPost.forEach((post, index) => {
            if (postId == (index + 1)) {
                post.comments.forEach((comment, index) => {
                    comments.push(comment);
                });

                comments.push(newComment);
                post.comments = comments;
            }
        });

        fs.writeFileSync("./Data/Post.json", JSON.stringify(jsonPost))

        // Setting the Location For newly created comment
        res.header("location", "posts/" + postId + "/comments/" + comments.length);
        res.status(201).send(jsonPost);
    }
    catch{
        res.status(500).send("Bad request!!");
    }
}

// Updates respective comment.
function updateComment(req, res) {
    try {
        let newComment = req.body;
        let posts = fs.readFileSync('./Data/Post.json');
        let jsonPost = JSON.parse(posts);

        let postId = req.params.postId;
        let comments = [];

        jsonPost.forEach((post, index) => {
            if (postId == (index + 1)) {
                let commentId = req.params.commentId;
                post.comments.forEach((comment, index) => {
                    if (commentId == (index + 1)) {
                        comments.push(newComment);
                    }
                    else {
                        comments.push(comment);
                    }
                });
                post.comments = comments;
            }
        });

        fs.writeFileSync("./Data/Post.json", JSON.stringify(jsonPost))

        res.send(jsonPost);
    }
    catch{
        res.status(500).send("Bad request!!");
    }
}

// Deletes one comment.
function removeComment(req, res) {
    try {
        let newComment = req.body;
        let posts = fs.readFileSync('./Data/Post.json');
        let jsonPost = JSON.parse(posts);

        let postId = req.params.postId;

        jsonPost.forEach((post, index) => {
            if (postId == (index + 1)) {
                let commentId = req.params.commentId;
                post.comments.forEach((comment, index) => {
                    if (commentId == (index + 1)) {
                        post.comments.splice(index, 1);
                    }
                });
            }
        });

        fs.writeFileSync("./Data/Post.json", JSON.stringify(jsonPost))

        res.send(jsonPost);
    }
    catch{
        res.status(500).send("Bad request!!");
    }
}
module.exports = router;
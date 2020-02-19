const router = require("express").Router();
const fs = require('fs');

// Get All post. It calls getPosts() to perform action.
router.get("/", (req, res) => getPosts(req, res))

// Add All post. It calls addPost() to perform action.
router.post("/", (req, res) => addPost(req, res))

// Update post. //It calls updatePost() to perform action.
router.put("/:postId", (req, res) => updatePost(req, res))

// Delete post. //It calls removePost() to perform action.
router.delete("/:postId", (req, res) => removePost(req, res))

////////////////////////   Core Functionality //////////////////////////

// This Method helps to get All the posts.
function getPosts(req, res) {
    try {
        let posts = fs.readFileSync('./Data/Post.json');
        res.send(JSON.parse(posts));
    }
    catch{
        res.status(500).send("Bad request!!");
    }
}

// This Method helps to add one post to existing array.
function addPost(req, res) {
    try {
        let newPost = req.body;
        let posts = fs.readFileSync('./Data/Post.json');
        let jsonPost = JSON.parse(posts);

        jsonPost.push(newPost);

        console.log(jsonPost);

        fs.writeFileSync("./Data/Post.json", JSON.stringify(jsonPost))

        // Setting the Location For newly created comment
        res.header("location", "posts/" + jsonPost.length);
        res.status(201).send(jsonPost);
    }
    catch{
        res.status(500).send("Bad request!!");
    }
}

// This Method helps to Update Post.
function updatePost(req, res) {
    try {
        let newPost = req.body;

        let posts = fs.readFileSync('./Data/Post.json');
        let jsonPost = JSON.parse(posts);

        let updatedPost = [];

        let postId = req.params.postId;
        jsonPost.forEach((post, index) => {
            if (postId == (index + 1)) {
                updatedPost.push(newPost);
            }
            else {
                updatedPost.push(post);
            }
        });

        fs.writeFileSync("./Data/Post.json", JSON.stringify(updatedPost))

        res.send(updatedPost);
    }
    catch{
        res.status(500).send("Bad request!!");
    }
}

// This Method helps to remove one post.
function removePost(req, res) {
    try {
        let posts = fs.readFileSync('./Data/Post.json');
        let jsonPost = JSON.parse(posts);

        let postId = req.params.postId;
        jsonPost.forEach((post, index) => {
            if (postId == (index + 1)) {
                jsonPost.splice(index, 1);
            }
        });

        fs.writeFileSync("./Data/Post.json", JSON.stringify(jsonPost))

        res.send(jsonPost);
    }
    catch {
        res.status(500).send("Bad request!!");
    }
}

module.exports = router;
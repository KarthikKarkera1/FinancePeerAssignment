const express = require("express");
const router = express.Router();
const request = require("request");
const Post = require("../models/Posts");
const multer = require("multer");

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

const uploadDB = (post) => {
    const newPost = new Post(post)
    newPost.save((err, post) => {
        if(err)
            console.log(err)
        else
            console.log("Post added Successfully")
    })
}
router.post("/upload",upload.single('data'), function(req,res){

    const data = JSON.parse(req.file.buffer.toString())

    data.map(post => uploadDB(post))

    res.send("File Uploaded Successfully")
});

router.get('/posts', function(req, res) {
    Post.find(function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            res.send(data);
        }
    });  
 });
 module.exports= router;
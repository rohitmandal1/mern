const router = require("express").Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");//Table name is (Post) //
const Comment = mongoose.model("Comment");//Table name is (Post) //

router.get("/", async (req, res) => {

      const posts = await Post.find({})
      res.send(posts)  
  
});

router.get("/:postID", async (req,res) => {
        const post = await Post.findOne({ _id: req.params.postID }) //if dont want data an array form then use findOne  //
        res.send(post)

});

router.put("/:postID", async (req,res) => {
        const post = await Post.findByIdAndUpdate({
            _id: req.params.postID
        }, req.body,{
            new: true,
            runValidators: true
        });

        res.send(post)

});

router.delete("/:postID", async (req,res) =>{
       const post = await Post.findByIdAndRemove({
           _id:req.params.postID
       });
       res.send(post)

})

router.post("/send", async (req, res) => {
    res.send(req.body)
    console.log(req.body);
    console.log(res.body);
        const post = new Post();
        post.title = req.body.title;
        post.content = req.body.content;
        await post.save();
        res.send(post);

})

// Comments

// create Comments
router.post("/:postID/comment", async (req, res) => {
    // Find post
    const post = await Post.findOne({_id: req.params.postID});

    // Create a comment
    const comment = new Comment();
    comment.content = req.body.content;
    comment.post = post._id;
    await comment.save();

    // Associate Post with comment
    post.comments.push(comment._id);
    await post.save();

    res.send(comment);
});

//Read all comment
router.get("/:postID/comment", async (req,res) => {
    const post = await Post.findOne({_id: req.params.postID}).populate("comments");
    res.send(post);
})
module.exports = router;
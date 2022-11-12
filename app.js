const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "Though we all know not to judge a book by its cover, we'll likely pick the one with an intriguing title and beautiful imagery over something that looks dated and bombards you with too much text. The same is true of your blog homepage design: it could be the make-or-break reason why someone decides to dig deeper into your content or to leave the site and search elsewhere.If that sounds daunting to you, don't panic. Creating a good blog homepage that makes readers stick around is all about making the right choices in what content you choose to display, and I’ve got some advice to help you do just that.";
const aboutContent = "Hey!! My name is Apoorv Pandey and I am pursing my graduation from Chandigarh University in the field of computer science and I am a certified cyber security analyst. I am a quick learner and an enthusiastic web developer. I am well versed with latest web development technologies and I am a keen learner of software. I am fond of ethical hacking and founding loopholes and help on fixing them . Apart from academics, I am a good speaker with leadership qualities and this website is designed be me";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://ApoorvPandey:Pandey9044@cluster0.xshfz4x.mongodb.net/Blog-website?retryWrites=true&w=majority", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      apoorvpandey: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});

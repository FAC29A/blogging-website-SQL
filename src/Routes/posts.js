const express = require("express");
const router = express.Router();
const { posts } = require("../template");
const blogPosts = [];

router.get("/", (request, response) => {
  const body = posts(blogPosts);
  response.send(body);
});

router.post("/", (request, response) => {
  const name = request.body.name;
  const blogpost = request.body.blogpost;
  //validation and error handling
  const errorsObject = {};
  if (!name) {
    errorsObject.nameError = "please enter your name";
  }
  if (!blogpost) {
    errorsObject.postError = "please enter a message";
  }
  if (Object.keys(errorsObject).length > 0) {
    const errorBody = posts(blogPosts, errorsObject, request.body);
    response.status(404).send(errorBody);
  } else {
    const date = new Date();
    let displayDate = date.toDateString();
    const postId = date.getTime();
    blogPosts.push({ name, blogpost, postId, displayDate });
    response.redirect("/posts");
  }
});

router.post("/delete/:id", (req, res) => {
  const postId = Number(req.params.id);
  const index = blogPosts.findIndex((post) => post.postId === postId);
  if (index > -1) {
    blogPosts.splice(index, 1);
    res.redirect("/posts");
  } else {
    res.status(404).send("Post not found");
  }
});

module.exports = {
  router: router,
  blogPosts: blogPosts,
};
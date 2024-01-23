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
  blogPosts.push({ name, blogpost }); //
  response.redirect("/posts");
});

module.exports = router;

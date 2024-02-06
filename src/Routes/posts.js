const express = require("express");
const router = express.Router();
const helper = require("../helper");
const model = require("../../model/blogs")


const errorsObject = {}; // declare it globally so all render methods are able to pass it as an argument. Empty object serve as default purpose

router.get("/", (request, response) => {
  
  const requestBody = {}; // no actual utility in this block- declare it in order to pass into render method
  const blogs = model.displayBlogs();
  response.render("posts", {
    title: "posts",
    errorsObject, // no actual utility in this block but mandatory to pass it as part of render method constraint (otherwise ejs file won't find variable)
    requestBody, // no actual utility in this block but mandatory to pass it as part of render method constraint (otherwise ejs file won't find variable)
    helper,
    blogs
  });
});

router.post("/", (request, response) => {
  const requestBody = request.body;
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
     const blogs = model.displayBlogs();
     response.render("posts", {
       title: "posts",
       errorsObject,
       requestBody,
       helper,
       blogs
     });
   } else {
  const blogEntry = {
    name: name,
    blogpost: blogpost
  }
  model.createBlog(blogEntry);
  response.redirect("/posts");
}
});


router.post("/delete/:id", (req, res) => {
  const postId = Number(req.params.id);
  model.deleteTask(postId);
  res.redirect("/posts");
});

module.exports = router;

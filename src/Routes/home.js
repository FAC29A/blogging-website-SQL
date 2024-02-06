const express = require("express");
const router = express.Router();

//---new route: 
router.get("/", (request, response) => {
  response.render("index", { title: "Home" });
});

//----old code: without display blog at home route
// router.get("/", (request, response) => {
//   response.render("index", { title: "Home" });
// });

module.exports = router;

const test = require("node:test");
const assert = require("node:assert");
const model = require("../model/blogs.js")
const db = require("../database/db.js")

function reset() {
    db.exec(/*sql*/`
    DELETE FROM blog_posts;
    DELETE FROM sqlite_sequence WHERE name = "name";
    `)
}

test("can create, delete & display a blog post in the database", () => {
    reset()

    const post = model.createBlog({ name: "test", blogpost: "testing" })
    assert.equal(post.name, "test")
    assert.equal(post.id, 1)
    assert.equal(post.blogpost, "testing")

    model.deleteTask(post.id)
    const posts = model.displayBlogs()
    assert.equal(posts.length, 0)
   

})
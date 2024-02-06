const db = require("../database/db")

//create functions here:
  
const create_blog = db.prepare(/*sql*/ `
    INSERT into blog_posts (name, blogpost)
    VALUES($name, $blogpost)
    RETURNING name, blogpost, created_at, likes
`)

function createBlog (blog) {
    return create_blog.get(blog)
}

//read functions here:
const read_blogs = db.prepare(/*sql*/ `
    SELECT
    id,
    name, 
    blogpost, 
    DATE(created_at) AS created_at, 
    likes
    FROM blog_posts
`)

function displayBlogs () {
    return read_blogs.all()
}
//update functions here:
const update_blog = db.prepare(/*sql*/`
UPDATE blog_posts
SET blogpost = $blogpost
WHERE id = $id

`)


function editTask(task) {
    return update_blog.get(task)
}

//delete functions here:

const delete_blog = db.prepare(/*sql*/`
DELETE FROM blog_posts
WHERE id = ?
`)

function deleteTask(id) {
    return delete_blog.run(id)
}

// comment for pull request testing

//EXPORT YOUR FUNCTIONS!!

module.exports = {
    createBlog,
    displayBlogs, 
    editTask,
    deleteTask
}

//Testing PRs for Phoebe I don't know what is happening!




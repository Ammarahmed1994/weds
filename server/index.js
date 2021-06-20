const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');
const app = express();

const BlogService = require(`../server/libs/index`)
const { ErrorHandler } = require(`../server/utils/ErrorHandler`);

app.use(bodyParser.json());
app.use(cors())

  app.post(`/create`, async (req, res) => {
   await BlogService
      .createBlog(req.body.blog)
      .then(() => {
        res
          .status(200)
          .json({
            status: `SUCCESS`,
            message: `Successfully created blog`
          });
      })
      .catch(err => {
        ErrorHandler.handleServerError(req, err, res);
      });
});

app.put(`/update`, async (req, res) => {
  await BlogService
     .updateBlog(req.body.blog)
     .then((blog) => {
       res
         .status(200)
         .json({
           status: `SUCCESS`,
           message: `Successfully updated blog`,
           data: {blog}
         });
     })
     .catch(err => {
       ErrorHandler.handleServerError(req, err, res);
     });
});

app.get(`/list`, async (req, res) => {
 await BlogService
    .getBlogList()
    .then(blogs => {
      res
        .status(200)
        .json({
          status: `SUCCESS`,
          message: `Got blogs list.`,
          data: { blogs }
        });
    })
    .catch(err => {
      ErrorHandler.handleServerError(req, err, res);
    });
});

app.get(`/getById/`, async (req, res) => {
  await BlogService
     .getBlogById(req.query.id)
     .then(blog => {
       res
         .status(200)
         .json({
           status: `SUCCESS`,
           message: `Got blog details by Id.`,
           data: { blog }
         });
     })
     .catch(err => {
       ErrorHandler.handleServerError(req, err, res);
     });
 });

app.delete(``, (req, res) => {
  BlogService
    .deleteBlog(
      req.query.id
    )
    .then(() => {
      res
        .status(200)
        .json({
          status: `SUCCESS`,
          message: `Deleted blog.`
        });
    })
    .catch(err => {
      ErrorHandler.handleServerError(req, err, res);
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});


require('dotenv').config();
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();
const path = require("path")

const BlogService = require(`./libs/index`)
const { ErrorHandler } = require(`./utils/ErrorHandler`);

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "client", "build")));

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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(process.env.PORT || 5000), () => {
  console.log(`app running on port ${PORT}`)
};


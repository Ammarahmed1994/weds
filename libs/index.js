const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

//get list
exports.getBlogList = () => {
  return new Promise(async (resolve, reject) => {
    try {
      MongoClient.connect(process.env.MONGODB_URI, async function (err, client) {
        if (err) throw err;

        const db = client.db('wedsdb');
        const blogs = await db.collection('blogs').find(( { deleted_at : { $eq : null } } )).toArray();
        resolve(blogs)
      })
    } catch (err) {
      reject(err);
    }
  });
};

//get blog by Id
exports.getBlogById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      MongoClient.connect(process.env.MONGODB_URI, async function (err, client) {
        if (err) throw err;

        const db = client.db('wedsdb');
        const blog = await db.collection('blogs').find({ _id: ObjectId(id) }).toArray();

        resolve(blog)
      })
    } catch (err) {
      reject(err);
    }
  });
};

//create blog
exports.createBlog = (blog) => {
  return new Promise(async (resolve, reject) => {
    try {
      MongoClient.connect(process.env.MONGODB_URI, function (err, client) {
        if (err) throw err;

        const db = client.db('wedsdb');

        const newBlog = db.collection('blogs').insertOne({
          "author_name": blog.author_name,
          "article_title": blog.article_title,
          "article_image": blog.article_image,
          "article_body": blog.article_body,
          "article_date": blog.article_date,
          "deleted_at": blog.deleted_at ? blog.deleted_at : null
        });
        resolve(newBlog);

      })
    } catch (err) {
      reject(err)
    };
  });
}

//update blog
exports.updateBlog = (blog) => {
  return new Promise(async (resolve, reject) => {
    try {
      MongoClient.connect(process.env.MONGODB_URI, function (err, client) {
        if (err) throw err;

        const db = client.db('wedsdb');

        const updatedBlog = db.collection('blogs').findOneAndUpdate(
          { "_id": ObjectId(blog._id) },
          {
            $set: {
              author_name: blog.author_name,
              article_title: blog.article_title,
              article_image: blog.article_image,
              article_body: blog.article_body,
              article_date: blog.article_date
            }
          }
        );
        resolve(updatedBlog);
      })
    } catch (err) {
      reject(err)
    };
  });
}

//delete blog
exports.deleteBlog = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      MongoClient.connect(process.env.MONGODB_URI, function (err, client) {
        if (err) throw err;

        const db = client.db('wedsdb');

        const deleteId = db.collection('blogs').findOneAndUpdate(
          { "_id": ObjectId(id) },
          { $set: { deleted_at: new Date() } }
        )
        resolve(deleteId);

      })
    } catch (err) {
      reject(err)
    };
  });
}

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

//get list
exports.getBlogList = () => {
  MongoClient.connect('mongodb://localhost', function (err, client) {
  if (err) throw err;

  const db = client.db('weds');

  db.collection('blogs').find({}).toArray( function (findErr, result) {
    if (findErr) throw findErr;
    console.log(result);
    client.close();
  });
})}; 

//create blog
exports.createBlog = () => {
  MongoClient.connect('mongodb://localhost', function (err, client) {
  if (err) throw err;

  const db = client.db('weds');

  db.collection('blogs').insertOne({
  "author_name" : "Ammar Ahmed3",
  "article_title" : "Blog 3",
  "article_image" : "https://source.unsplash.com/aZjw7xI3QAA/1144x763",
  "article_body" : "Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit33",
  "article_date" : "June 18, 2021"

  }, function (findErr, result) {
    if (findErr) throw findErr;
    console.log(result);
    client.close();
  });
}); }

//delete blog
exports.deleteBlog = () => {
  MongoClient.connect('mongodb://localhost', function (err, client) {
    if (err) throw err;
  
    const db = client.db('weds');
  
    db.collection('blogs').remove({
    "_id" : ObjectId("60cb587083a2c2a474672a44")
    }, function (findErr, result) {
      if (findErr) throw findErr;
      console.log(result);
      client.close();
    });
  }); 
} 

//update blog
exports.updateBlog = () =>{
  MongoClient.connect('mongodb://localhost', function (err, client) {
    if (err) throw err;
  
    const db = client.db('weds');
  
    db.collection('blogs').findOneAndUpdate(
      {"_id" : ObjectId("60cc502cf51e5d0de0d5f02d")},
      { $set: { author_name: 'ammar4',article_title: 'blog4', article_image: 'ammar4' ,article_body: 'Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit444', article_date: 'June 18, 2022'}}
      , function (findErr, result) {
      if (findErr) throw findErr;
      console.log(result);
      client.close();
    });
  });
}

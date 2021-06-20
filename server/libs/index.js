const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

//get list
exports.getBlogList = () => {

  return new Promise(async (resolve, reject) => { 
    try {
      MongoClient.connect('mongodb+srv://wedsApp:Mummymero1994@cluster0.2ljp2.mongodb.net/wedsdb?retryWrites=true&w=majority', async function (err, client) {
        if (err) throw err;
      
        const db = client.db('wedsdb');
        const blogs = await db.collection('blogs').find({}).toArray();
        resolve(blogs)
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
      MongoClient.connect('mongodb+srv://wedsApp:Mummymero1994@cluster0.2ljp2.mongodb.net/wedsdb?retryWrites=true&w=majority', function (err, client) {
        if (err) throw err;
      
        const db = client.db('wedsdb');
      
       const newBlog =  db.collection('blogs').insertOne({
        "author_name" : blog.author_name,
        "article_title" : blog.article_title,
        "article_image" : blog.article_image,
        "article_body" : blog.article_body,
        "article_date" : blog.article_date,
        "deleted_at": blog.deleted_at ? blog.deleted_at : null
        });
        resolve(newBlog);

    }) 
   }  catch (err) {
      reject(err)
    };
});
}

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


// const MongoClient = require('mongodb').MongoClient;
 
// // Replace the following with your Atlas connection string                                                                                                                                        
// const url = "mongodb+srv://wedsApp:Mummymero1994@cluster0.2ljp2.mongodb.net/wedsdb?retryWrites=true&w=majority";
// const client = new MongoClient(url);
// async function run() {
//     try {
//         await client.connect();
//         console.log("Connected correctly to server");
//     } catch (err) {
//         console.log(err);
//     }
//     finally {
//         await client.close();
//     }
// }
// run().catch(console.dir);
